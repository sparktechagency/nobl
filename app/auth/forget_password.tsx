import { Image, Text, View } from "react-native";
import React, { useState } from "react";

import { Formik } from "formik";
import { IconEmail } from "@/icons/Icon";
import InputText from "@/lib/inputs/InputText";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const forget_password = () => {
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
          Forgot your password ?
        </Text>
        <Text style={tw`text-sm font-PoppinsRegular text-black px-4 mt-8`}>
          Enter your email here. We will send you a 6 digit OTP via your email
          address.
        </Text>
      </View>
      <View style={tw`bg-primary w-full p-4 rounded-t-[3rem] pt-12 pb-16`}>
        <Formik
          initialValues={{ email: "" }}
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
              <View style={tw`gap-5 mb-8 mt-3`}>
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
              </View>

              <TButton
                title="Send"
                onPress={() => {
                  //   handleSubmit();
                  router.push("/auth/otp_verify");
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

export default forget_password;
