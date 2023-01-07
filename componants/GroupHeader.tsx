import {
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
  ImageBackground,
} from "react-native";
import React from "react";
import { Appbar, Avatar, Button, Chip, IconButton } from "react-native-paper";
import { Igroup } from "../redux/slices/groupsSlice";
import { texture } from "../screens/Main screens/Welcome";
import CustomText from "./CustomText";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Props = {
  group: Igroup;
};

const GroupHeader = ({ group }: Props) => {
  const chip = useSelector((state: RootState) => state.chips.chips).filter(
    (chip) => chip.label === group.topic
  )[0];
  return (
    <ImageBackground
      source={group.background ? { uri: group.background } : texture}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Appbar.BackAction
            color="white"
            size={30}
          />
          <Avatar.Image
            style={styles.headerAvatar}
            size={50}
            source={group.avatar ? { uri: group.avatar } : texture}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.BodyHeader}>
            <CustomText
              variant="headlineSmall"
              color="white"
            >
              {group.name}
            </CustomText>
            <IconButton
              icon={chip.icon}
              mode="outlined"
              iconColor="white"
              size={15}
            />

            <IconButton
              style={{ marginLeft: "auto" }}
              icon="account-plus"
              mode="contained"
              containerColor="white"
              size={20}
            />
          </View>
          <CustomText
            variant="bodySmall"
            color="white"
          >
            {group.description}
          </CustomText>
        </View>
      </View>
    </ImageBackground>
  );
};

export default GroupHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#000000b5",
  },
  header: {
    flexDirection: "row",
  },
  headerAvatar: {
    position: "absolute",
    width: 50,
    left: Dimensions.get("screen").width / 2 - 25,
  },
  body: { padding: 15 },
  BodyHeader: { flexDirection: "row", alignItems: "center" },
  right: {},
});
