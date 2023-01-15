import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { chipStyle } from "../../componants/Gloabls/Filter";
import CustomText from "../../componants/Gloabls/CustomText";
import AnswerInput from "../../componants/QuestionScreenComponants/AnswerInput";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AnswerCard from "../../componants/QuestionScreenComponants/AnswerCard";
import { RootStackParamList } from "../../navigation/Stack";

type Props = NativeStackScreenProps<RootStackParamList, "Question">;

const Question = ({ navigation, route }: Props) => {
  const { postId } = route.params;
  const post = useSelector((state: RootState) => state.posts.posts).filter(
    (post) => post.id === postId
  )[0];
  return (
    <>
      <View style={styles.container}>
        <View style={styles.post}>
          <View style={styles.header}>
            <Avatar.Image
              style={styles.avatar}
              size={45}
              source={{ uri: post.user.avatar }}
            />
            <View>
              <CustomText style={styles.name}> {post.user.name}</CustomText>
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
        <FlatList
          listKey="1"
          style={styles.answers}
          renderItem={(item) => (
            <AnswerCard
              postId={post.id}
              data={item.item}
              key={item.item.id}
            />
          )}
          data={post.answers}
        />
        <AnswerInput postId={post.id} />
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
  answers: {
    padding: 10,
    paddingHorizontal: 20,
    minHeight: 50,
    overflow: "hidden",
  },
});
