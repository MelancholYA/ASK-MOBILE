import { StyleSheet, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Reply from "./Reply";
import { TextInput } from "react-native-paper";
import { replyToAnswer } from "../../redux/slices/postsSlice";
import useFetch from "../../helpers/useFetch";
import useNotification from "../../helpers/useNotification";

type Props = {
  postId: string;
  answerId: string;
  focus: boolean;
};

const ReplyInput = ({ answerId, postId, focus }: Props) => {
  const [replyBody, setReplyBody] = useState("");
  const dispatch = useDispatch();

  const { openNotification } = useNotification();
  const { clearData, data, loading, postData } = useFetch();

  const handleReply = () => {
    if (!postData || !answerId || !replyBody) {
      openNotification("Please fill all the fields");
      return;
    }
    postData(`posts/${postId}/${answerId}/replies`, {
      postId,
      answerId,
      body: replyBody,
    });
  };

  useEffect(() => {
    if (data) {
      const { _id, body, user } = data.data.reply;
      dispatch(replyToAnswer({ answerId, postId, _id, body, user }));
      setReplyBody("");
    }
  }, [data]);

  return (
    <TextInput
      value={replyBody}
      onChangeText={(e) => setReplyBody(e)}
      theme={{ roundness: 5 }}
      style={styles.textInput}
      mode="outlined"
      activeOutlineColor="#afb2b8"
      autoFocus={focus}
      outlineColor="#D7D9DD"
      placeholder="Reply"
      placeholderTextColor="#95979b"
      right={
        <TextInput.Icon
          onPress={handleReply}
          icon="share"
        />
      }
    />
  );
};

export default ReplyInput;

const styles = StyleSheet.create({
  textInput: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#D7D9DD",
  },
});
