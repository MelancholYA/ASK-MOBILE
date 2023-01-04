import { StyleSheet, View } from "react-native";
import React from "react";
import { Avatar, Button, IconButton } from "react-native-paper";
import CustomText from "./CustomText";
import { Ianswer } from "../redux/slices/postsSlice";
import { useNavigation } from "@react-navigation/native";

import { useNavigationProp } from "./Post";

type Props = {
  data: Ianswer;
  postId: string;
};

const Answer = ({ data, postId }: Props) => {
  const navigation = useNavigation<useNavigationProp>();
  return (
    <View
      style={styles.answer}
      key={data.id}
    >
      <View style={styles.header}>
        <Avatar.Image
          style={styles.avatar}
          size={45}
          source={{ uri: data.user.avatar }}
        />
        <View>
          <CustomText style={styles.name}> {data.user.name}</CustomText>
          <CustomText style={styles.answerBody}>{data.body}</CustomText>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: -15,
          marginLeft: 60,
        }}
      >
        <IconButton
          size={20}
          iconColor="#444D6E"
          icon="thumb-up"
        />
        <IconButton
          size={20}
          style={{ marginLeft: -5 }}
          iconColor="#444D6E"
          icon={"share"}
          onPress={() =>
            navigation.navigate("Answer", {
              answerId: data.id,
              postId,
              focus: true,
            })
          }
        />
        <Button
          textColor="#444D6E"
          onPress={() =>
            navigation.navigate("Answer", { answerId: data.id, postId })
          }
          style={{ marginLeft: -15 }}
        >
          View 4 replies
        </Button>
      </View>
    </View>
  );
};

export default Answer;

const styles = StyleSheet.create({
  answer: {
    backgroundColor: "#A8AEB9",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  answerBody: {
    color: "#444D6E",
    width: 225,
    padding: 5,
  },
  replies: {},
  reply: {
    borderRadius: 5,
    backgroundColor: "#B8BDC6",
    marginBottom: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
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
});
