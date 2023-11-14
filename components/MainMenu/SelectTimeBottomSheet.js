import React, { useCallback, useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { NativeViewGestureHandler } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;

export default function SelectTimeBottomSheet({
  close,
  setEndTime,
  setStartTime,
  startTime,
  endTime,
}) {
  const [start, setStart] = useState(startTime);
  const [end, setEnd] = useState(endTime);
  return (
    <NativeViewGestureHandler
      disallowInterruption={true}
      style={styles.container}
    >
      <View style={styles.timePickerContainer}>
        <View style={styles.pickerItemContainer}>
          <Text style={styles.pickerLabel}>Nhận xe</Text>
          <Picker
            selectedValue={start}
            onValueChange={(itemValue, itemIndex) => setStart(itemValue)}
            style={styles.pickerStyle}
            mode="dropdown"
          >
            <Picker.Item label="00:00" value="00:00" />
            <Picker.Item label="00:30" value="00:30" />
            <Picker.Item label="01:00" value="01:00" />
            <Picker.Item label="01:30" value="01:30" />
            <Picker.Item label="02:00" value="02:00" />
            <Picker.Item label="02:30" value="02:30" />
            <Picker.Item label="03:00" value="03:00" />
            <Picker.Item label="03:30" value="03:30" />
            <Picker.Item label="04:00" value="04:00" />
            <Picker.Item label="04:30" value="04:30" />
            <Picker.Item label="05:00" value="05:00" />
            <Picker.Item label="05:30" value="05:30" />
            <Picker.Item label="06:00" value="06:00" />
            <Picker.Item label="06:30" value="06:30" />
            <Picker.Item label="07:00" value="07:00" />
            <Picker.Item label="07:30" value="07:30" />
            <Picker.Item label="08:00" value="08:00" />
            <Picker.Item label="08:30" value="08:30" />
            <Picker.Item label="09:00" value="09:00" />
            <Picker.Item label="09:30" value="09:30" />
            <Picker.Item label="10:00" value="10:00" />
            <Picker.Item label="10:30" value="10:30" />
            <Picker.Item label="11:00" value="11:00" />
            <Picker.Item label="11:30" value="11:30" />
            <Picker.Item label="12:00" value="12:00" />
            <Picker.Item label="12:30" value="12:30" />
            <Picker.Item label="13:00" value="13:00" />
            <Picker.Item label="13:30" value="13:30" />
            <Picker.Item label="14:00" value="14:00" />
            <Picker.Item label="14:30" value="14:30" />
            <Picker.Item label="15:00" value="15:00" />
            <Picker.Item label="15:30" value="15:30" />
            <Picker.Item label="16:00" value="16:00" />
            <Picker.Item label="16:30" value="16:30" />
            <Picker.Item label="17:00" value="17:00" />
            <Picker.Item label="17:30" value="17:30" />
            <Picker.Item label="18:00" value="18:00" />
            <Picker.Item label="18:30" value="18:30" />
            <Picker.Item label="19:00" value="19:00" />
            <Picker.Item label="19:30" value="19:30" />
            <Picker.Item label="20:00" value="20:00" />
            <Picker.Item label="20:30" value="20:30" />
            <Picker.Item label="21:00" value="21:00" />
            <Picker.Item label="21:30" value="21:30" />
            <Picker.Item label="22:00" value="22:00" />
            <Picker.Item label="22:30" value="22:30" />
            <Picker.Item label="23:00" value="23:00" />
            <Picker.Item label="23:30" value="23:30" />
          </Picker>
        </View>
        <View style={styles.pickerItemContainer}>
          <Text style={styles.pickerLabel}>Trả xe</Text>
          <Picker
            selectedValue={end}
            onValueChange={(itemValue, itemIndex) => setEnd(itemValue)}
            style={styles.pickerStyle}
            mode="dropdown"
          >
            <Picker.Item label="00:00" value="00:00" />
            <Picker.Item label="00:30" value="00:30" />
            <Picker.Item label="01:00" value="01:00" />
            <Picker.Item label="01:30" value="01:30" />
            <Picker.Item label="02:00" value="02:00" />
            <Picker.Item label="02:30" value="02:30" />
            <Picker.Item label="03:00" value="03:00" />
            <Picker.Item label="03:30" value="03:30" />
            <Picker.Item label="04:00" value="04:00" />
            <Picker.Item label="04:30" value="04:30" />
            <Picker.Item label="05:00" value="05:00" />
            <Picker.Item label="05:30" value="05:30" />
            <Picker.Item label="06:00" value="06:00" />
            <Picker.Item label="06:30" value="06:30" />
            <Picker.Item label="07:00" value="07:00" />
            <Picker.Item label="07:30" value="07:30" />
            <Picker.Item label="08:00" value="08:00" />
            <Picker.Item label="08:30" value="08:30" />
            <Picker.Item label="09:00" value="09:00" />
            <Picker.Item label="09:30" value="09:30" />
            <Picker.Item label="10:00" value="10:00" />
            <Picker.Item label="10:30" value="10:30" />
            <Picker.Item label="11:00" value="11:00" />
            <Picker.Item label="11:30" value="11:30" />
            <Picker.Item label="12:00" value="12:00" />
            <Picker.Item label="12:30" value="12:30" />
            <Picker.Item label="13:00" value="13:00" />
            <Picker.Item label="13:30" value="13:30" />
            <Picker.Item label="14:00" value="14:00" />
            <Picker.Item label="14:30" value="14:30" />
            <Picker.Item label="15:00" value="15:00" />
            <Picker.Item label="15:30" value="15:30" />
            <Picker.Item label="16:00" value="16:00" />
            <Picker.Item label="16:30" value="16:30" />
            <Picker.Item label="17:00" value="17:00" />
            <Picker.Item label="17:30" value="17:30" />
            <Picker.Item label="18:00" value="18:00" />
            <Picker.Item label="18:30" value="18:30" />
            <Picker.Item label="19:00" value="19:00" />
            <Picker.Item label="19:30" value="19:30" />
            <Picker.Item label="20:00" value="20:00" />
            <Picker.Item label="20:30" value="20:30" />
            <Picker.Item label="21:00" value="21:00" />
            <Picker.Item label="21:30" value="21:30" />
            <Picker.Item label="22:00" value="22:00" />
            <Picker.Item label="22:30" value="22:30" />
            <Picker.Item label="23:00" value="23:00" />
            <Picker.Item label="23:30" value="23:30" />
          </Picker>
        </View>
        <Pressable
          style={styles.nextButton}
          onPress={() => {
            close();
            setEndTime(end);
            setStartTime(start);
          }}
        >
          <Text style={styles.nextButtonText}>Lưu</Text>
        </Pressable>
      </View>
    </NativeViewGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  timePickerContainer: {
    marginTop: 15,
  },

  pickerItemContainer: {
    marginLeft: 20,
    marginRight: 20,
  },

  pickerLabel: {
    fontSize: 20,
    fontWeight: "500",
  },

  pickerStyle: {
    color: "rgba(95,207,133,255)",
  },

  nextButton: {
    backgroundColor: "rgba(95,207,133,255)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 15,
    position: "absolute",
    left: 0,
    right: 0,
    top: (windowHeight / 100) * 35 - 115,
    marginLeft: 20,
    marginRight: 20,
  },

  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});
