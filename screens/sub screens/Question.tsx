import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { chipStyle } from "../../componants/Gloabls/Filter";
import CustomText from "../../componants/Gloabls/CustomText";
import AnswerInput from "../../componants/QuestionScreenComponants/AnswerInput";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { RootStackParamList } from "../../navigation/Stack";
import { userImage } from "../../componants/HomeScreenComponants/PostCard";
import Answers from "../../componants/QuestionScreenComponants/Answers";

type Props = NativeStackScreenProps<RootStackParamList, "Question">;

const Question = ({ navigation, route }: Props) => {
  const { postId } = route.params;
  const post = useSelector((state: RootState) => state.posts.posts).filter(
    (post) => post._id === postId
  )[0];

  return (
    <>
      <StatusBar backgroundColor="#D7D9DD" />
      <View style={styles.container}>
        <View style={styles.post}>
          <View style={styles.header}>
            <Avatar.Image
              style={styles.avatar}
              size={45}
              source={post.user?.avatar ? { uri: post.user.avatar } : userImage}
            />
            <View>
              <CustomText style={styles.name}>
                {`${post.user.firstName} ${post.user.lastName}`}
              </CustomText>
              <CustomText style={styles.groupName}>
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
          <CustomText
            onPress={() => navigation.navigate("Question", { postId: postId })}
            style={styles.body}
          >
            {post.body}
          </CustomText>
        </View>
        <Answers post={post} />
        <AnswerInput postId={post._id} />
      </View>
    </>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D7D9DD",
    flex: 1,
  },
  post: {
    marginBottom: 10,
  },
  avatar: {
    marginRight: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
  },
  name: {
    fontFamily: "Montserrat-Bold",
    color: "#444D6E",
    textTransform: "capitalize",
  },
  groupName: {
    fontFamily: "Montserrat-Medium",
    color: "#444D6E",
  },
  body: {
    fontFamily: "Montserrat-Bold",
    color: "#444D6E",
    margin: 15,
    paddingHorizontal: 15,
  },
});
