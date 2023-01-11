import { StyleSheet, TextInput, View, Dimensions } from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { answerQuestion } from "../../redux/slices/postsSlice";
import useNotification from "../../helpers/useNotification";

interface props {
  postId: string;
}

const AnswerInput = ({ postId }: props) => {
  const [answerBody, setAnswerBody] = useState("");
  const { openNotification } = useNotification();
  const dispatch = useDispatch();

  const answer = () => {
    if (answerBody.length === 0) {
      openNotification("Please write your answer first");
      return;
    }
    dispatch(answerQuestion({ answerBody, postId }));
    setAnswerBody("");
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={answerBody}
        onChangeText={(e) => setAnswerBody(e)}
        style={styles.input}
        placeholder="Answer"
      />
      <IconButton
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
