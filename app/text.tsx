import React, { useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialIcons as MDIcon } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";

const Compoents = () => {
  const refStandard = useRef(null);
  const refScrollable = useRef(null);
  const refDatePicker = useRef(null);
  const refInput = useRef(null);
  const refMessage = useRef(null);

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>REACT NATIVE RAW BOTTOM SHEET</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => refStandard.current.open()}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>STANDARD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => refScrollable.current.open()}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>SCROLLABLE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => refDatePicker.current.open()}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>DATE PICKER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => refInput.current.open()}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>TEXT INPUT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => refMessage.current.open()}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>MESSAGE</Text>
        </TouchableOpacity>
      </View>

      {/* List Menu */}
      <RBSheet ref={refStandard} draggable dragOnContent height={330}>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Create</Text>
          {[...Array(50)]?.map((grid) => (
            <View>
              <Text>asdfasd</Text>
            </View>
          ))}
        </View>
      </RBSheet>

      {/* Grid Menu */}
      <RBSheet
        ref={refScrollable}
        draggable
        // customModalProps={{
        //   animationType: "slide",
        //   statusBarTranslucent: true,
        // }}
        dragOnContent
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
          draggableIcon: {
            width: 80,
          },
        }}
      >
        <ScrollView>
          <View style={styles.gridContainer}>
            {[...Array(50)]?.map((grid) => (
              <View>
                <Text>asdfas asdfasdfd</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </RBSheet>

      {/* Date Picker IOS */}
      <RBSheet
        ref={refDatePicker}
        onOpen={() => console.log("RBSheet is Opened")}
        onClose={() => console.log("RBSheet is Closed")}
      >
        <View style={styles.dateHeaderContainer}>
          <TouchableOpacity
            onPress={() => refDatePicker.current.close()}
            style={styles.dateHeaderButton}
          >
            <Text style={styles.dateHeaderButtonCancel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => refDatePicker.current.close()}
            style={[styles.dateHeaderButton]}
          >
            <Text style={styles.dateHeaderButtonDone}>Done</Text>
          </TouchableOpacity>
        </View>
        {/* <DatePickerIOS mode="date" date={new Date()} /> */}
      </RBSheet>

      {/* TextInput */}
      <RBSheet
        ref={refInput}
        height={60}
        closeOnPressMask={true}
        closeOnPressBack={true}
        customStyles={{
          wrapper: { backgroundColor: "#fff" },
        }}
      >
        <View style={styles.inputContainer}>
          <MDIcon name="photo-camera" style={styles.inputIcon} />
          <MDIcon name="tag-faces" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            autoFocus
            placeholder="Write a comment..."
          />
          <MDIcon
            name="send"
            style={[styles.inputIcon, styles.inputIconSend]}
            onPress={() => refInput.current.close()}
          />
        </View>
      </RBSheet>

      {/* Alert */}
      <RBSheet
        ref={refMessage}
        openDuration={150}
        closeDuration={100}
        customStyles={{
          wrapper: { backgroundColor: "transparent" },
        }}
      >
        <View style={styles.messageContainer}>
          <Text style={styles.messageTitle}>Awesome!</Text>
          <Text style={styles.message}>
            You can add your own component whatever you want. If you don't like
            our default style you can customize whatever you like.
          </Text>
          <View style={styles.messageButtonContainer}>
            <TouchableOpacity
              style={styles.messageButton}
              onPress={() => refMessage.current.close()}
            >
              <Text style={styles.messageButtonText}>CLOSE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.messageButton, styles.messageButtonRight]}
              onPress={() => refMessage.current.close()}
            >
              <Text
                style={[
                  styles.messageButtonText,
                  styles.messageButtonTextRight,
                ]}
              >
                GREAT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  textTitle: {
    fontSize: 20,
    marginTop: 120,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    width: 150,
    backgroundColor: "#4EB151",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 3,
    margin: 10,
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    flex: 1,
    padding: 25,
  },
  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  listIcon: {
    fontSize: 26,
    color: "#666",
    width: 60,
  },
  listLabel: {
    fontSize: 16,
  },
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    marginBottom: 20,
  },
  gridButtonContainer: {
    flexBasis: "25%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  gridButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  gridIcon: {
    fontSize: 30,
    color: "white",
  },
  gridLabel: {
    fontSize: 14,
    paddingTop: 10,
    color: "#333",
  },
  dateHeaderContainer: {
    height: 45,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateHeaderButton: {
    height: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  dateHeaderButtonCancel: {
    fontSize: 18,
    color: "#666",
    fontWeight: "400",
  },
  dateHeaderButtonDone: {
    fontSize: 18,
    color: "#006BFF",
    fontWeight: "500",
  },
  inputContainer: {
    borderTopWidth: 1.5,
    borderTopColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  inputIcon: {
    fontSize: 24,
    color: "#666",
    marginHorizontal: 5,
  },
  inputIconSend: {
    color: "#006BFF",
  },
  input: {
    flex: 1,
    height: 36,
    borderRadius: 36,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    marginHorizontal: 10,
  },
  messageContainer: {
    flex: 1,
    padding: 25,
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  message: {
    fontSize: 17,
    lineHeight: 24,
    marginVertical: 20,
  },
  messageButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  messageButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#3385ff",
    marginLeft: 10,
  },
  messageButtonText: {
    color: "#3385ff",
    fontSize: 16,
    fontWeight: "bold",
  },
  messageButtonRight: {
    backgroundColor: "#3385ff",
  },
  messageButtonTextRight: {
    color: "#fff",
  },
});

export default Compoents;
