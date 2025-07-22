import * as ImagePicker from "expo-image-picker";

import { ScrollView, View } from "react-native";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/apiSlices/authApiSlices";

import Avatar from "@/lib/ui/Avatar";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import { Formik } from "formik";
import IButton from "@/lib/buttons/IButton";
import { IconCamera } from "@/icons/Icon";
import InputText from "@/lib/inputs/InputText";
import React from "react";
import TButton from "@/lib/buttons/TButton";
import { router } from "expo-router";
import tw from "@/lib/tailwind";

const edit_profile = () => {
  const { data: userData } = useGetProfileQuery({});
  const [userUpdate] = useUpdateProfileMutation();

  const [image, setImage] = React.useState<ImagePicker.ImagePickerAsset | null>(
    null
  );

  const handleFromSubmit = async (values: any) => {
    try {
      // console.log(image?.mimeType);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("address", values.address);
      if (image) {
        formData.append("photo", {
          uri: image.uri,
          type: image.mimeType || "image/jpeg",
          name: image.fileName || "uploaded_image.jpg",
        } as any);
      }

      // console.log([...formData.entries()]);
      const result = await userUpdate(formData).unwrap();
      // console.log("Response:", result);
      if (result?.status) {
        router.back();
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error("RTK Query Error:", error);
    }
  };

  const handleImageUpdate = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result?.canceled) {
      setImage(result?.assets![0]);
    }
  };

  const validate = (values: {
    name: string;
    email: string;
    address: string;
    badge_number: string;
  }) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    // check email valid
    if (!values.email.includes("@")) {
      errors.email = "Invalid email";
    }
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.address) {
      errors.address = "address is required";
    }
    return errors;
  };
  return (
    <View style={tw`flex-1 bg-base`}>
      <View style={tw`h-13 bg-primary`}>
        <BackWithComponent
          onPress={() => router.back()}
          title="Edit Profile"
          togather
        />
      </View>
      <Formik
        initialValues={
          userData?.data || {
            name: "",
            email: "",
            address: "",
            badge_number: "",
          }
        }
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
            <ScrollView contentContainerStyle={tw`p-4 bg-base`}>
              <View style={tw`flex-1 bg-white rounded-lg px-4 py-8 `}>
                <View style={tw`items-center self-center mt-2`}>
                  <Avatar
                    size={100}
                    source={{
                      uri: image?.uri ? image?.uri : userData?.data?.photo,
                    }}
                  />
                  <IButton
                    svg={IconCamera}
                    onPress={() => handleImageUpdate()}
                    containerStyle={tw`absolute bottom-0 right-0 bg-transparent p-0`}
                  />
                </View>

                <View style={tw`mt-8 gap-4`}>
                  <InputText
                    label="Name"
                    value={values?.name}
                    textInputProps={{
                      placeholder: "write your name",
                      style: tw`text-base font-PoppinsRegular`,
                    }}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    touched={touched?.name}
                    errorText={errors?.name}
                  />
                  <InputText
                    label="Email"
                    value={values?.email}
                    editable={false}
                    textInputProps={{
                      placeholder: "write your email",
                      style: tw`text-base font-PoppinsRegular`,
                    }}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    touched={touched?.email}
                    errorText={errors?.email}
                  />
                  <InputText
                    label="Address"
                    value={values?.address}
                    textInputProps={{
                      placeholder: "write your address",
                      style: tw`text-base font-PoppinsRegular`,
                    }}
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                    touched={touched?.address}
                    errorText={errors?.address}
                  />
                  <InputText
                    label="Badge Number"
                    value={values?.badge_number}
                    textInputProps={{
                      placeholder: "write your badge_number",
                      style: tw`text-base font-PoppinsRegular`,
                    }}
                    onChangeText={handleChange("badge_number")}
                    onBlur={handleBlur("badge_number")}
                    touched={touched?.badge_number}
                    errorText={errors?.badge_number}
                  />
                </View>
              </View>
            </ScrollView>
            <View style={tw`bg-white rounded-lg px-4 py-8 `}>
              <TButton
                title="Save Changes"
                onPress={() => {
                  handleSubmit();
                }}
                containerStyle={tw`bg-primary`}
                titleStyle={tw`text-white font-PoppinsRegular`}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default edit_profile;
