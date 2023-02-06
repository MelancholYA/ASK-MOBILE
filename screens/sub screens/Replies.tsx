import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, FlatList, View, StatusBar } from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "../../componants/Gloabls/CustomText";
import Reply from "../../componants/RepliesScreenComponants/Reply";
import { RootStackParamList } from "../../navigation/Stack";
import { replyToAnswer } from "../../redux/slices/postsSlice";
import { RootState } from "../../redux/store";

type Props = NativeStackScreenProps<RootStackParamList, "Replies">;

const Replies = ({ navigation, route }: Props) => {
  const [replyBody, setReplyBody] = useState("");
  const dispatch = useDispatch();
  const { postId, answerId, focus } = route.params;

  const answer = useSelector((state: RootState) => state.posts.posts)
    .filter((post) => post.id === postId)[0]
    .answers?.filter((answer) => answer.id === answerId)[0];

  const handleReply = () => {
    dispatch(replyToAnswer({ answerId, postId, replyBody }));
    setReplyBody("");
  };

  return (
    <>
      <StatusBar backgroundColor="#D7D9DD" />
      <View style={styles.answerBody}>
        <Avatar.Image
          source={{ uri: answer?.user.avatar }}
          style={{ marginBottom: 15 }}
        />
        <CustomText
          variant="bodyLarge"
          style={{ marginBottom: 15 }}
        >
          {answer?.body}
        </CustomText>
      </View>

      <FlatList
        listKey="2"
        data={answer?.replies}
        renderItem={(item) => (
          <Reply
            data={item.item}
            key={item.item.id}
          />
        )}
      />
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
    </>
  );
};

export default Replies;

const styles = StyleSheet.create({
  answerBody: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#D7D9DD",
  },
});
