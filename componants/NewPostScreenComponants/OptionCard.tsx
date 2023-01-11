import { StyleSheet, Dimensions, View } from "react-native";
import React from "react";
import CustomText from "../Gloabls/CustomText";
import { IconButton } from "react-native-paper";

type Props = {
  value: string;
  remove: () => void;
};

const OptionCard = ({ value, remove }: Props) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text}> {value} </CustomText>
      <IconButton
        iconColor="#14213D"
        size={30}
        style={styles.button}
        mode="outlined"
        icon="trash-can"
        onPress={remove}
      />
    </View>
  );
};

export default OptionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    width: Dimensions.get("screen").width - 95,
    // borderWidth: 1,
    padding: 13,
    // borderColor: "grey",
    borderRadius: 5,
    backgroundColor: "white",
  },
  button: {
    padding: 0,
    borderRadius: 5,
  },
});
