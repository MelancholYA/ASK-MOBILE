import { StyleSheet } from "react-native";
import { Text, TextProps } from "react-native-paper";

interface Props extends TextProps {}

const CustomText = (props: Props) => {
  return (
    <Text
      style={[styles.text, props.style]}
      {...props}
    >
      {props.children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat-Medium",
  },
});
