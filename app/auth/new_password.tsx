import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";

import { IconPassword } from "@/icons/Icon";
import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import { useResetPasswordMutation } from "@/redux/apiSlices/authApiSlices";
import { toast } from "@backpackapp-io/react-native-toast";
import { Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const new_password = () => {
  const router = useRouter();
  const [value, setValue] = useState(false);

  const { token } = useLocalSearchParams();

  const [resetPassword] = useResetPasswordMutation();

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.c_password) {
      errors.c_password = "Confirm password is required";
    }
    if (values.password !== values.c_password) {
      errors.c_password = "Passwords do not match";
    }
    return errors;
  };
  const { top } = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={top}
    >
      <View style={tw`flex-1 bg-white justify-end`}>
        <View style={tw`items-center gap-2 my-12`}>
          <Image
            style={tw`w-60 h-20`}
            resizeMode="cover"
            source={require("@/assets/images/logo.png")}
          />
          <Text style={tw`text-xl font-PoppinsSemiBold text-primary`}>
            Set your new password
          </Text>
          <Text style={tw`text-sm font-PoppinsRegular text-black px-4 mt-8`}>
            It must be different to your previous password.
          </Text>
        </View>
        <View style={tw`bg-primary w-full p-4 rounded-t-[3rem] pt-12 pb-16`}>
          <Formik
            initialValues={{ password: "", c_password: "" }}
            onSubmit={async (values) => {
              try {
                // console.log(token);
                const res = await resetPassword({
                  data: values,
                  token,
                }).unwrap();
                if (res.status) {
                  // console.log("sucss", res);
                  toast(res?.message, {
                    icon: "✅",
                  });
                  router?.replace("/auth/password_change_successful");
                } else {
                  // console.log(res);
                  toast(res?.message, {
                    icon: "❗",
                  });
                }
              } catch (error) {
                console.log(error);
              }
            }}
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
                <View style={tw`gap-5 mb-10`}>
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
                  <InputText
                    textInputProps={{
                      placeholder: "Confirm your password",
                    }}
                    svgFirstIcon={IconPassword}
                    value={values.c_password}
                    onChangeText={handleChange("c_password")}
                    onBlur={handleBlur("c_password")}
                    touched={touched.c_password}
                    errorText={errors.c_password}
                  />
                </View>

                <TButton
                  title="Change password"
                  onPress={() => {
                    handleSubmit();
                    // router.push("/auth/password_change_successful");
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

export default new_password;
