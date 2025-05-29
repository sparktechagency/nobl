import { IconEmail, IconPassword } from "@/icons/Icon";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import { useLoginMutation } from "@/redux/apiSlices/authApiSlices";
import { toast } from "@backpackapp-io/react-native-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { Formik } from "formik";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const login = () => {
  const router = useRouter();
  const [checkBox, setCheckBox] = useState(false);
  const [login] = useLoginMutation();
  const [saveLoinInfo, setLoginInfo] = React.useState<any>(null);

  // console.log(saveLoinInfo);

  const handleFromSubmit = async (values: any) => {
    // console.log(values);
    try {
      if (checkBox) {
        AsyncStorage.setItem("loginInfo", JSON.stringify({ values }));
      }
      const res = await login(values).unwrap();
      if (res.status) {
        AsyncStorage.setItem("token", res?.data?.access_token);
        router?.push("/home");
      } else {
        toast(res.message, {
          icon: "❗",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    // check email valid
    if (!values.email.includes("@")) {
      errors.email = "Invalid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const { top } = useSafeAreaInsets();

  const handleSaveLoginInfo = async () => {
    const info = await AsyncStorage.getItem("loginInfo");
    const check = await AsyncStorage.getItem("check");
    setCheckBox(JSON.parse(check));
    // console.log("check",JSON.parse(check));
    setLoginInfo(JSON.parse(info));
  };

  React.useEffect(() => {
    handleSaveLoginInfo();
  }, []);
  // console.log(checkBox);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={top}
    >
      <View style={tw`flex-1 bg-white justify-end`}>
        <View style={tw`flex-1 justify-center items-center gap-0`}>
          <Image
            style={tw`w-72 h-20`}
            resizeMode="cover"
            source={require("@/assets/images/logo.png")}
          />
          <Text style={tw`text-xl font-PoppinsSemiBold text-primary`}>
            Login to your account
          </Text>
        </View>

        <View style={tw`bg-primary w-full p-4 rounded-t-[2rem] pt-8 pb-5`}>
          <Formik
            initialValues={saveLoinInfo?.values || { email: "", password: "" }}
            onSubmit={handleFromSubmit}
            validate={validate}
            enableReinitialize
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
            }) => (
              <>
                <View style={tw`gap-5`}>
                  <InputText
                    textInputProps={{
                      placeholder: "Enter your email",
                    }}
                    svgFirstIcon={IconEmail}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    touched={touched.email}
                    errorText={errors.email}
                  />
                  <InputText
                    textInputProps={{
                      placeholder: "Enter your password",
                    }}
                    svgFirstIcon={IconPassword}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    touched={touched.password}
                    errorText={errors.password}
                  />
                </View>

                <View
                  style={tw`gap-4 py-8 flex-row items-center justify-between`}
                >
                  <TouchableOpacity
                    onPress={async () => {
                      await AsyncStorage.setItem(
                        "check",
                        JSON.stringify(!checkBox)
                      );
                      setCheckBox(!checkBox);
                    }}
                    style={tw`flex-row items-center gap-2`}
                  >
                    <Checkbox
                      // color={"white"}
                      style={tw`border border-gray-50`}
                      value={checkBox}
                      onValueChange={async (value) => {
                        await AsyncStorage.setItem(
                          "check",
                          JSON.stringify(value)
                        );
                        setCheckBox(value);
                      }}
                    />
                    <Text style={tw`text-white text-sm font-PoppinsRegular`}>
                      Remember me
                    </Text>
                  </TouchableOpacity>
                  <Link
                    href="/auth/forget_password"
                    style={tw`text-white text-sm underline font-PoppinsRegular`}
                  >
                    Forgot Password?
                  </Link>
                </View>
                <TButton
                  title="Login"
                  onPress={() => {
                    handleSubmit();
                    // router.push("/home");
                  }}
                  containerStyle={tw`w-full bg-white`}
                  titleStyle={tw`text-primary text-base font-PoppinsSemiBold`}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default login;
