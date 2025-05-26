import { Dimensions } from "react-native";

export const PrimaryColor = "#4B5320";

export const _HIGHT = Dimensions.get("screen").height;
export const _WIGHT = Dimensions.get("screen").width;

export const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Night";
  }
};
