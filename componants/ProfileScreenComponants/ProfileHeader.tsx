import { StyleSheet, ImageBackground, View } from "react-native";
import React from "react";
import CustomText from "../Gloabls/CustomText";
import { Iuser } from "../../redux/slices/tokenSlice";
import { userImage } from "../HomeScreenComponants/PostCard";
import { texture } from "../../screens/Main screens/Welcome";

type Props = {
  user: Iuser;
};

//todo edit profile

const ProfileHeader = ({ user }: Props) => {
  return (
    <View style={[styles.shadow, { paddingBottom: 10 }]}>
      <ImageBackground
        source={user?.cover ? { uri: user.cover } : texture}
        style={styles.cover}
      >
        <View style={[styles.avatarContainer, styles.shadow]}>
          <ImageBackground
            source={user?.avatar ? { uri: user.avatar } : userImage}
            style={styles.avatar}
          />
        </View>
      </ImageBackground>

      <View style={styles.textContainer}>
        <CustomText
          style={{ fontSize: 16, marginBottom: 5 }}
          bold
        >
          {user?.name}
          Alex bartolini
        </CustomText>
        <CustomText>
          {user?.bio}Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Adipisci, provident laboriosam reprehenderit iusto earum vel.
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
