import { Image, Text, TouchableOpacity, View } from "react-native";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";

import { Checkbox } from "react-native-ui-lib";
import { Formik } from "formik";
import InputText from "@/lib/inputs/InputText";
import IwtButton from "@/lib/buttons/IwtButton";
import { PrimaryColor } from "@/utils/utils";
import tw from "@/lib/tailwind";

const login = () => {
  const router = useRouter();
  const [value, setValue] = useState(false);

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
      <View style={tw`items-center gap-2 my-12`}>
        <Image
          style={tw`w-60 h-20`}
          resizeMode="cover"
          source={require("@/assets/images/logo.png")}
        />
        <Text style={tw`text-xl font-PoppinsSemiBold text-primary`}>
          Login to your account
        </Text>
      </View>
      <View style={tw`bg-primary w-full p-4 rounded-t-[3rem] pt-12 pb-16`}>
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
              <IwtButton
                title="Login"
                onPress={() => {
                  //   handleSubmit();
                  router.push("/home");
                }}
                containerStyle={tw`w-full bg-white`}
                titleStyle={tw`text-primary font-PoppinsSemiBold`}
              />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default login;
