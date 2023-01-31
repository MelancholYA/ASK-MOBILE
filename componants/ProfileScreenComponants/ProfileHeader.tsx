import { StyleSheet, ImageBackground, View } from "react-native";
import React from "react";
import CustomText from "../Gloabls/CustomText";
import { Iuser } from "../../redux/slices/tokenSlice";
import { userImage } from "../HomeScreenComponants/PostCard";
import { texture } from "../../screens/Main screens/Welcome";
import CustomImageBackground from "../Gloabls/CustomImageBackground";

type Props = {
  user: Iuser;
};

//todo edit profile

const ProfileHeader = ({ user }: Props) => {
  return (
    <View style={[styles.shadow, { paddingBottom: 10 }]}>
      <ImageBackground
        source={user.cover ? { uri: user.cover } : texture}
        style={styles.cover}
      >
        <View style={[styles.avatarContainer, styles.shadow]}>
          <CustomImageBackground
            source={user.avatar ? { uri: user.avatar } : userImage}
            style={styles.avatar}
          />
        </View>
      </ImageBackground>

      <View style={styles.textContainer}>
        <CustomText
          style={{ fontSize: 16, marginBottom: 5 }}
          bold
        >
          {user.name}
        </CustomText>

        <CustomText color={user.bio ? "black" : "#0000009d"}>
          {user.bio || "No bio , edit profile to add a bio"}
        </CustomText>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  cover: {
    justifyContent: "center",
    aspectRatio: 16 / 6,
  },
  avatar: {
    width: 80,
    aspectRatio: 1,
    borderRadius: 100,
    overflow: "hidden",
  },
  avatarContainer: {
    marginLeft: 20,
    marginBottom: 10,
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 4,
    backgroundColor: "white",
    zIndex: 9,
  },
  textContainer: {
    padding: 10,
    paddingLeft: 20,
  },
});
