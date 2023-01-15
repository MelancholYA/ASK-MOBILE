import { StyleSheet } from "react-native";
import { Text, TextProps } from "react-native-paper";

interface Props extends TextProps {
  color?: string;
  bold?: boolean;
}

const CustomText = (props: Props) => {
  const styles = StyleSheet.compose(
    {
      fontFamily: props.bold ? "Montserrat-Bold" : "Montserrat-Medium",
      color: props.color || "#444D6E",
    },
    props.style
  );
  return (
    <Text
      {...props}
      style={styles}
    >
      {props.children}
    </Text>
  );
};

export default CustomText;
