import React from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";

type Props = {
  navigation: NativeStackHeaderProps;
  color?: string;
  title: string;
};

const CustomScreenHeader = ({ navigation, title, color }: Props) => {
  return (
    <Appbar.Header style={{ backgroundColor: color }}>
      <Appbar.BackAction
        style={{ zIndex: 9 }}
        onPress={navigation.navigation.goBack}
      />
      <Appbar.Content
        titleStyle={{ textAlign: "center", transform: [{ translateX: -35 }] }}
        title={title}
      />
    </Appbar.Header>
  );
};

export default CustomScreenHeader;
