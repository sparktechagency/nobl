import { IconDoc, IconExcel, IconPdf } from "@/icons/Icon";
import { Text, TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import { _HIGHT } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";

// const getMimeType = (filePath) => {
//   const extension = filePath.split(".").pop().toLowerCase();

//   switch (extension) {
//     case "xls":
//       return "application/vnd.ms-excel";
//     case "xlsx":
//       return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
//     case "doc":
//       return "application/msword";
//     case "docx":
//       return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
//     case "pdf":
//       return "application/pdf";
//     case "jpg":
//     case "jpeg":
//       return "image/jpeg";
//     case "png":
//       return "image/png";
//     default:
//       return "application/octet-stream"; // fallback for unknown types
//   }
// };
const DocumentCard = ({ document }: { document: any }) => {
  const router = useRouter();
  const [localPath, setLocalPath] = React.useState<string | null>(null);

  // React.useEffect(() => {
  //   if (
  //     document?.type === "pdf" ||
  //     document?.type === "doc" ||
  //     document?.type === "excel"
  //   ) {
  //     const downloadFile = async () => {
  //       try {
  //         const res = await RNFetchBlob.config({
  //           fileCache: true,
  //         }).fetch("GET", document?.url);
  //         console.log();
  //         setLocalPath(res.path());
  //       } catch (error) {}
  //     };
  //     downloadFile();
  //   }
  // }, []);
  return (
    <TouchableOpacity
      onPress={async () => {
        // if (document?.type == "pdf") {
        AsyncStorage.setItem("document", JSON.stringify(document));
        router.push(`/details/doc/${document?.id}`);
        // } else {
        //   console.log(localPath);
        //   viewDocument({
        //     uri: `file://${localPath}`,
        //     headerTitle: document?.title,
        //     mimeType: getMimeType(localPath),
        //     presentationStyle: "fullScreen",
        //   });
        // }
      }}
      style={tw` rounded-lg bg-deepBlue50 shadow `}
    >
      <Image
        source={{ uri: document?.thumbnail }}
        style={[
          tw`w-full h-44 border-b-0 border-t-2  border-r-2 border-l-2 border-gray-800 rounded-t-lg`,
          {
            height: _HIGHT * 0.2,
          },
        ]}
        contentFit="cover"
      />
      <View
        style={tw` flex-row justify-between items-center mt-3 px-4 pb-4 gap-2`}
      >
        <View style={tw`gap-1.5 flex-1`}>
          <Text style={tw`font-PoppinsSemiBold text-base flex-1`}>
            {document?.title}
          </Text>
          <Text
            style={tw`bg-primary text-white text-center text-xs py-1 self-start px-2 rounded-md font-PoppinsMedium `}
          >
            {document?.category?.name}
          </Text>
        </View>
        <Text style={tw`text-primary text-xs font-PoppinsMedium`}>
          {document?.no_of_page} P
        </Text>
      </View>
      <View
        style={tw`bg-primary absolute right-2 top-2 rounded-full  justify-center items-center  h-9 w-9 `}
      >
        {document?.type === "pdf" ? (
          <SvgXml xml={IconPdf} />
        ) : document?.type === "doc" ? (
          <SvgXml xml={IconDoc} />
        ) : document?.type === "excel" ? (
          <SvgXml xml={IconExcel} />
        ) : (
          <SvgXml xml={IconPdf} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DocumentCard;
