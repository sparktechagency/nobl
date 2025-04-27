import { IconEmail, IconPassword } from "@/icons/Icon";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import { Formik } from "formik";
import { Checkbox } from "react-native-ui-lib";

const login = () => {
  const router = useRouter();
  const [value, setValue] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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

  return (
    <View style={tw`flex-1 bg-white justify-end`}>
      <View style={[tw`items-center gap-0 mt-52 mb-10`]}>
        <Image
          style={tw`w-72 h-20`}
          resizeMode="cover"
          source={require("@/assets/images/logo.png")}
        />
        <Text style={tw`text-xl font-PoppinsSemiBold text-primary`}>
          Login to your account
        </Text>
      </View>
      <ScrollView />
      <View style={tw`bg-primary w-full p-4 rounded-t-[2rem] pt-8 pb-5`}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => console.log(values)}
          validate={validate}
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
                <TouchableOpacity style={tw`flex-row items-center gap-2`}>
                  <Checkbox
                    color="white"
                    iconColor={PrimaryColor}
                    value={value}
                    size={20}
                    containerStyle={tw` rounded`}
                    onValueChange={setValue}
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
                  //   handleSubmit();
                  router.push("/home");
                }}
                containerStyle={tw`w-full bg-white`}
                titleStyle={tw`text-primary text-base font-PoppinsSemiBold`}
              />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default login;
