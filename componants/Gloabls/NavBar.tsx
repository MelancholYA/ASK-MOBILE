import { View, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import {
  Appbar,
  Button,
  FAB,
  IconButton,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import CustomText from "./CustomText";

type Props = {
  props: NativeStackHeaderProps;
};

const NavBar = ({ props }: Props) => {
  const theme = useTheme();
  const buttons = [
    {
      icon: "home",
      title: "Home",
    },
    {
      icon: "account-group",
      title: "Groups",
    },
    {
      icon: "bell",
      title: "Notifications",
    },
    {
      icon: "message",
      title: "Messages",
    },
    {
      icon: "account",
      title: "Profile",
    },
  ];
  return (
    <Appbar.Header
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
    >
      {buttons.map((button) => (
        <TouchableOpacity
          key={button.title}
          onPress={() => props.navigation.navigate(button.title)}
          style={styles.button}
        >
          <IconButton
            size={20}
            style={{ marginVertical: 0, marginBottom: -5 }}
            selected={true}
            iconColor={
              button.title === props.route.name
                ? theme.colors.secondary
                : "white"
            }
            icon={button.icon}
          />
          <CustomText
            variant="labelSmall"
            style={{
              fontFamily: "Montserrat-light",
              color:
                button.title === props.route.name
                  ? theme.colors.secondary
                  : "white",
            }}
          >
            {button.title}
          </CustomText>
        </TouchableOpacity>
      ))}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    marginBottom: 10,
  },
});

export default NavBar;
