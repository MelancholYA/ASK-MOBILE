import { StyleSheet } from "react-native";
import { Text, TextProps } from "react-native-paper";

interface Props extends TextProps {}

const CustomText = (props: Props) => {
  const styles = StyleSheet.compose(
    {
      fontFamily: "Montserrat-Medium",
      color: "#444D6E",
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
