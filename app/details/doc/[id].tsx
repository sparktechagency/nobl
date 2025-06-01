import { ActivityIndicator, Platform, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import { IconDownload } from "@/icons/Icon";
import IwtButton from "@/lib/buttons/IwtButton";
import Pdf from "react-native-pdf";
import { PrimaryColor } from "@/utils/utils";
import RNFetchBlob from "react-native-blob-util";
import tw from "@/lib/tailwind";

const DocumentDetails = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [localPath, setLocalPath] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | boolean>(false);
  const { id } = useLocalSearchParams();

  const [data, setData] = React.useState<any>(null);

  // Get the correct file URL based on type
  const handleLoadData = async () => {
    const getNewData = await AsyncStorage.getItem("document");
    try {
      const finalData = JSON.parse(getNewData as any);
      // console.log(finalData);
      if (finalData) {
        // console.log(newDocument);
        setData(finalData);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  React.useEffect(() => {
    handleLoadData();
  }, [id]);

  // console.log(data);

  React.useEffect(() => {
    setLoading(true);
    if (data?.document_type === ".pdf") {
      const downloadFile = async () => {
        try {
          const res = await RNFetchBlob.config({
            fileCache: true,
            appendExt: "pdf",
          }).fetch("GET", data?.file);
          setLocalPath(res.path());
          setLoading(false);
          // console.log(res?.path());
        } catch (error) {
          setError(true);
        }
      };
      downloadFile();
    }
  }, [data]);

  // const getViewerUrl = (url: string, type: string) => {
  //   const encodedUrl = encodeURIComponent(Document?.data?.file);
  //   switch (type) {
  //     case "doc":
  //       return `https://docs.google.com/gview?embedded=true&url=${"https://file-examples.com/index.php/sample-documents-download/sample-doc-download/"}`;
  //     case "excel":
  //       return `https://docs.google.com/gview?embedded=true&url=${encodedUrl}`;
  //     default:
  //       return url;
  //   }
  // };

  const handleDownload = useCallback(async () => {
    setLoading(true);
    try {
      const res = await RNFetchBlob.config({
        fileCache: true,
        appendExt: data?.document_type,
        addAndroidDownloads: {
          useDownloadManager: true,
          storeLocal: true,
          storeInDownloads: true,
          mediaScannable: true,
          notification: true,
          title: `${data?.title}.${data?.document_type}`,
          description: "File downloaded by download manager.",
          path: `${RNFetchBlob.fs.dirs.DownloadDir}/${data?.title}.${data?.type}`,
        },
      }).fetch("GET", data?.file);

      if (Platform.OS === "ios") {
        RNFetchBlob.ios.previewDocument(res.path());
      }

      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, [data]);

  let viewer = null;

  if (loading) {
    viewer = (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color={PrimaryColor} />
      </View>
    );
  } else if (data?.document_type === ".pdf") {
    viewer = <Pdf source={{ uri: `file://${localPath}` }} style={tw`flex-1`} />;
  }
  if (error) {
    viewer = (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-gray-300 text-2xl font-PoppinsRegular`}>
          File is not available
        </Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View
        style={tw`flex-row py-3 justify-between items-center bg-primary pr-4`}
      >
        <BackWithComponent onPress={() => router.back()} />
        {!error && (
          <IwtButton
            title="Download"
            svg={IconDownload}
            disabled={loading}
            containerStyle={tw`bg-white p-1 h-9 px-3 rounded-md`}
            titleStyle={tw`text-primary font-PoppinsRegular`}
            onPress={handleDownload}
          />
        )}
      </View>

      {/* Content */}
      {viewer}
    </View>
  );
};

export default DocumentDetails;
