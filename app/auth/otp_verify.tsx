import { Image, Text, View } from "react-native";
import React, { useState } from "react";

import { Formik } from "formik";
import { OtpInput } from "react-native-otp-entry";
import { PrimaryColor } from "@/utils/utils";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const otp_verify = () => {
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
          Enter OTP
        </Text>
        <Text style={tw`text-sm font-PoppinsRegular text-black px-4 mt-8`}>
          Enter that OTP which we sent you through the email you provided.
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
              <View style={tw`gap-5 mb-4`}>
                <OtpInput
                  numberOfDigits={4}
                  focusColor={PrimaryColor}
                  autoFocus={false}
                  hideStick={true}
                  placeholder="0"
                  blurOnFilled={true}
                  disabled={false}
                  type="numeric"
                  secureTextEntry={false}
                  focusStickBlinkingDuration={500}
                  // onFocus={() => console.log("Focused")}
                  // onBlur={() => console.log("Blurred")}
                  // onTextChange={(text) => console.log(text)}
                  onFilled={async (text) => {
                    console.log(`OTP is ${text}`);
                    router.push("/auth/new_password");
                  }}
                  textInputProps={{
                    accessibilityLabel: "One-Time Password",
                  }}
                  theme={{
                    containerStyle: tw`rounded-full px-4 mb-4`,
                    pinCodeContainerStyle: tw`h-16 w-16 justify-center items-center bg-white rounded-full `,
                    pinCodeTextStyle: tw`text-primary text-2xl font-NunitoSansBold `,
                    placeholderTextStyle: tw`text-primary text-2xl font-NunitoSansBold`,
                  }}
                />
              </View>

              <TButton
                title="Verify"
                onPress={() => {
                  //   handleSubmit();
                  router.push("/auth/new_password");
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

export default otp_verify;
