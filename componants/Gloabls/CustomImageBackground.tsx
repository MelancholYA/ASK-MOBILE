import { useState } from "react";
import {
  StyleSheet,
  ImageBackgroundProps,
  ImageBackground,
  Dimensions,
  Pressable,
  ViewStyle,
} from "react-native";
import { Modal, Portal, Text, TextProps } from "react-native-paper";

interface Props extends ImageBackgroundProps {
  children?: React.ReactNode;
}

const CustomImageBackground = (props: Props) => {
  const [visible, setVisible] = useState(false);

  const { style } = props;
  let aspectRatio: number | undefined;
  if (style) {
    aspectRatio = (style as ViewStyle).aspectRatio;
  }

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={styles.modalContainer}
        >
          <ImageBackground
            style={[{ aspectRatio }, styles.image]}
            source={props.source}
          />
        </Modal>
      </Portal>
      <Pressable onPress={() => setVisible(true)}>
        <ImageBackground {...props}>{props.children}</ImageBackground>
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#00000086",
  },
  image: {
    width: Dimensions.get("screen").width,
  },
});

export default CustomImageBackground;
