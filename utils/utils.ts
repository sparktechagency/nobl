import { Dimensions } from "react-native";

export const PrimaryColor = "#4B5320";

export const _HIGHT = Dimensions.get("screen").height;
export const _WIGHT = Dimensions.get("screen").width;

export const getGreeting = () => {
  const currentHour = new Date().getHours();

  // description of logic here
  // hours 24 international time
  // so if i think 12am - 11am = good morning
  // so if i think 12pm - 5pm = good afternoon
  // so if i think 5pm - 12am = good evening

  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};
