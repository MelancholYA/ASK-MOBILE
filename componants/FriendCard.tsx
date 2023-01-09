import { StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Iuser } from "../redux/slices/tokenSlice";
import { Avatar, Checkbox } from "react-native-paper";
import CustomText from "./CustomText";
import { texture } from "../screens/Main screens/Welcome";

type Props = {};

const FriendCard = ({
  data,
  add,
  remove,
}: {
  data: Iuser;
  add: () => void;
  remove: () => void;
}) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (checked) {
      add();
    } else {
      remove();
    }
  }, [checked]);
  return (
    <Pressable
      style={styles.checkboxContainer}
      onPress={() => setChecked(!checked)}
    >
      <Avatar.Image
        size={40}
        source={data.avatar ? { uri: data.avatar } : texture}
      />
      <CustomText style={styles.text}>{data.name}</CustomText>
      <Checkbox
        color="#14213D"
        status={checked ? "checked" : "unchecked"}
      />
    </Pressable>
  );
};

export default FriendCard;
const styles = StyleSheet.create({
  checkboxContainer: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
    marginRight: "auto",
    fontFamily: "Montserrat-Bold",
  },
});
