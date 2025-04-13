import { ActivityIndicator, Platform, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import DocumentData from "@/assets/data/document.json";
import { IconDownload } from "@/icons/Icon";
import IwtButton from "@/lib/buttons/IwtButton";
import Pdf from "react-native-pdf";
import RNFetchBlob from "react-native-blob-util";
import React from "react";
import { WebView } from "react-native-webview";
import tw from "@/lib/tailwind";

const DocumentDetails = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [localPath, setLocalPath] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | boolean>(false);
  const { id } = useLocalSearchParams();
  const document = DocumentData.find((document) => document.id === Number(id));

  // Get the correct file URL based on type

  React.useEffect(() => {
    if (
      document?.type === "pdf" ||
      document?.type === "doc" ||
      document?.type === "excel"
    ) {
      const downloadFile = async () => {
        setLoading(true);
        try {
          const res = await RNFetchBlob.config({
            fileCache: true,
          }).fetch("GET", document?.url);
          setLocalPath(res.path());
          setLoading(false);
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      };
      downloadFile();
    }
  }, []);

  const getViewerUrl = (url: string, type: string) => {
    const encodedUrl = encodeURIComponent(localPath);
    switch (type) {
      case "doc":
        return `https://docs.google.com/gview?embedded=true&url=${"https://file-examples.com/index.php/sample-documents-download/sample-doc-download/"}`;
      case "excel":
        return `https://docs.google.com/gview?embedded=true&url=${encodedUrl}`;
      default:
        return url;
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await RNFetchBlob.config({
        fileCache: true,
        appendExt: document?.type,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: `${document?.title}.${document?.type}`,
          description: "File downloaded by download manager.",
          path: `${RNFetchBlob.fs.dirs.DownloadDir}/${document?.title}.${document?.type}`,
        },
      }).fetch("GET", document?.url);

      if (Platform.OS === "ios") {
        RNFetchBlob.ios.previewDocument(res.path());
      }

      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  let viewer = null;

  if (loading) {
    viewer = (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else if (document?.type === "pdf") {
    viewer = <Pdf source={{ uri: `file://${localPath}` }} style={tw`flex-1`} />;
  } else if (document?.type === "doc") {
    viewer = (
      <WebView
        startInLoadingState={true}
        source={{ uri: getViewerUrl(document?.url, document?.type) }}
        style={tw`flex-1`}
      />
    );
  } else if (document?.type === "excel") {
    viewer = (
      <WebView
        startInLoadingState={true}
        source={{ uri: getViewerUrl(document?.url, document?.type) }}
        style={tw`flex-1`}
      />
    );
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
