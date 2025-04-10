import { Image, Text, View } from "react-native";
import React, { useState } from "react";

import { Formik } from "formik";
import { IconPassword } from "@/icons/Icon";
import InputText from "@/lib/inputs/InputText";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const new_password = () => {
  const router = useRouter();
  const [value, setValue] = useState(false);

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };
  return (
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
          initialValues={{ password: "", confirmPassword: "" }}
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
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  touched={touched.confirmPassword}
                  errorText={errors.confirmPassword}
                />
              </View>

              <TButton
                title="Change password"
                onPress={() => {
                  //   handleSubmit();
                  router.push("/auth/password_change_successful");
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

export default new_password;
