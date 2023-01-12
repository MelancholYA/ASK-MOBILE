import React from "react";
import { StyleSheet, ViewProps } from "react-native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker/build/ImagePicker.types";
import { FAB, IconButton } from "react-native-paper";

interface Props extends ViewProps {
  setImage: (image: ImagePickerAsset) => void;
  aspect: [16, 6] | [1, 1];
  size?: number;
}

const ImagePicker = ({ setImage, style, aspect, size }: Props) => {
  const styles = StyleSheet.compose(
    {
      backgroundColor: "#14213D",
      position: "absolute",
      bottom: 5,
      right: 5,
      zIndex: 9,
      borderRadius: 100,
      borderColor: "#FCA311",
      borderWidth: 1.3,
    },
    style
  );

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect,
      quality: 0.5,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <FAB
      theme={{ roundness: 100 }}
      onPress={pickImage}
      style={styles}
      customSize={size || 45}
      color="#FCA311"
      icon="camera"
    />
  );
};

export default ImagePicker;
