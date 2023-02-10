import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Avatar, Button, IconButton } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import CustomText from "../Gloabls/CustomText";
import { useNavigation } from "@react-navigation/native";

import { Ipost } from "../../redux/slices/postsSlice";
import { chipStyle } from "../Gloabls/Filter";
import { RootStackParamList } from "../../navigation/Stack";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Easing } from "react-native-reanimated";

type Props = {
  post: Ipost;
  footerless?: boolean;
};
export type useNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const userImage = require("../../assets/user.png");

const Post = ({ post, footerless }: Props) => {
  const navigation = useNavigation<useNavigationProp>();
  const user = useSelector((state: RootState) => state.token.user);

  const goToProfile = () => {
    const id = user?._id;
    const authorId = post.user._id;
    console.log({ id, authorId, user });
    if (id === authorId) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("Friend", { friendId: authorId });
    }
  };
  const goToGroup = () => {
    if (post.group) {
      navigation.navigate("Group", { groupId: post.group?.id });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={goToProfile}>
          <Avatar.Image
            style={styles.avatar}
            size={45}
            source={post.user.avatar ? { uri: post.user.avatar } : userImage}
          />
        </Pressable>

        <View>
          <CustomText
            onPress={goToProfile}
            style={styles.name}
          >
            {`${post.user.firstName} ${post.user.lastName}`}
          </CustomText>
          <CustomText
            onPress={goToGroup}
            style={styles.groupName}
          >
            {post.group?.name}
          </CustomText>
        </View>
        <Button
          textColor="white"
          style={[
            chipStyle.container,
            {
              marginLeft: "auto",
              transform: [{ scale: 0.8 }, { translateX: 15 }],
            },
          ]}
          icon={post.chip.icon}
        >
          {post.chip.label}
        </Button>
      </View>
      <CustomText style={styles.body}>{post.body}</CustomText>
      {!footerless && (
        <View style={styles.footer}>
          <View style={styles.buttons}>
            <IconButton
              style={{ width: 50 }}
              size={15}
              mode="contained"
              containerColor="white"
              iconColor={post.liked ? "#436ce7" : "#444d6edd"}
              icon="thumb-up"
            />
            <IconButton
              onPress={() =>
                navigation.navigate("Question", { postId: post._id })
              }
              style={{ width: 50 }}
              mode="contained"
              size={15}
              containerColor="white"
              iconColor="#444D6E"
              icon="comment-plus"
            />
          </View>
          <CustomText
            onPress={() =>
              navigation.navigate("Question", { postId: post._id })
            }
            variant="labelSmall"
            style={{ color: "#ffffff83" }}
          >
            {post.answersLength
              ? post.answersLength + " answers"
              : "No answers yet"}
          </CustomText>
        </View>
      )}
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: "#14213d29",
    borderRadius: 5,
    overflow: "hidden",
  },
  avatar: {
    marginRight: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  name: {
    fontFamily: "Montserrat-Bold",
    color: "#444D6E",
  },
  groupName: {
    fontFamily: "Montserrat-Medium",
    color: "#444D6E",
  },
  body: {
    fontFamily: "Montserrat-Bold",
    color: "#444D6E",
    margin: 15,
  },
  footer: {
    padding: 5,
    paddingVertical: 3,
    paddingRight: 10,
    backgroundColor: "#14213da9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
  },

  buttons: {
    flexDirection: "row",
  },
});
