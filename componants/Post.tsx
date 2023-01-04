import { StyleSheet, View } from "react-native";
import React from "react";
import { Ipost } from "../redux/slices/postsSlice";
import { Text, Avatar, Button, IconButton } from "react-native-paper";
import { chipStyle } from "./Filter";
import CustomText from "./CustomText";
import {
  useNavigation,
  CompositeNavigationProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Main";

type Props = {
  post: Ipost;
};
export type useNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Post = ({ post }: Props) => {
  const navigation = useNavigation<useNavigationProp>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          style={styles.avatar}
          size={45}
          source={{ uri: post.user.avatar }}
        />
        <View>
          <CustomText style={styles.name}> {post.user.name}</CustomText>
          <CustomText style={styles.groupName}> {post.group?.name} </CustomText>
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
      <CustomText
        onPress={() => navigation.navigate("Question", { postId: post.id })}
        style={styles.body}
      >
        {post.body}
      </CustomText>
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
            onPress={() => navigation.navigate("Question", { postId: post.id })}
            style={{ width: 50 }}
            mode="contained"
            size={15}
            containerColor="white"
            iconColor="#444D6E"
            icon="comment-text-multiple"
          />
        </View>
        <CustomText
          variant="labelSmall"
          style={{ color: "#ffffff83" }}
        >
          {post.answersLength} answers
        </CustomText>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
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
