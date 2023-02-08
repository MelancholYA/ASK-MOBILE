import { StyleSheet, TextInput, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../../redux/slices/postsSlice";
import useNotification from "../../helpers/useNotification";
import useFetch from "../../helpers/useFetch";
import { RootState } from "../../redux/store";

interface props {
  postId: string;
}

const AnswerInput = ({ postId }: props) => {
  const user = useSelector((state: RootState) => state.token.user);
  const [answerBody, setAnswerBody] = useState("");
  const { openNotification } = useNotification();
  const dispatch = useDispatch();
  const { clearData, data, loading, postData } = useFetch();

  const answer = () => {
    console.log(user);
    if (!user) {
      return;
    }
    if (answerBody.length === 0) {
      openNotification("Please write your answer first");
      return;
    }
    postData("posts/answer", {
      userId: user._id,
      body: answerBody,
      postId,
    });
  };

  useEffect(() => {
    if (data) {
      console.log({ gg: data });
      dispatch(
        answerQuestion({
          _id: data.data.answer._id,
          body: data.data.answer.body,
          postId: data.data.answer.post,
          user: data.data.answer.user,
        })
      );
      setAnswerBody("");
      console.log({ data });
    }
  }, [data]);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={answerBody}
        onChangeText={(e) => setAnswerBody(e)}
        style={styles.input}
        placeholder="Answer"
      />
      <IconButton
        disabled={loading}
        size={20}
        style={styles.replyButton}
        icon="reply"
        onPress={answer}
      />
    </View>
  );
};

export default AnswerInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#B5B9C0",
    backgroundColor: "white",
    borderWidth: 5,
    margin: 10,
    padding: 5,
    width: Dimensions.get("screen").width - 20,
    borderRadius: 5,
    shadowColor: "#00000067",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 9,
  },
  input: {
    width: Dimensions.get("screen").width - 110,
    borderRadius: 5,
    backgroundColor: "white",
    padding: 5,
  },
  replyButton: {
    backgroundColor: "#B4B8BF",
    width: 70,
    margin: 0,
    borderRadius: 5,
  },
});
