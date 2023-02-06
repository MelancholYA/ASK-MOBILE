import { StyleSheet, StatusBar, View, FlatList } from "react-native";
import React, { useState } from "react";
import { RootStackParamList } from "../../navigation/Stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TextInput } from "react-native-paper";
import { addMessage } from "../../redux/slices/MessagesSlice";
import MessageContainer from "../../componants/ChatPageComponants/MessageContainer";

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

const Chat = ({ route }: Props) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { messages, id, partner } = useSelector(
    (state: RootState) => state.chats
  ).filter((chat) => chat.id === route.params.convoId)[0];
  const messagesList = [...messages].reverse();

  const submit = () => {
    dispatch(
      addMessage({
        author: "ME",
        convoId: route.params.convoId,
        id: "an id",
        message,
      })
    );
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <FlatList
        inverted
        data={messagesList}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <MessageContainer
            author={item.author}
            id={item.id}
            message={item.message}
            partner={partner}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        theme={{ roundness: 10 }}
        style={styles.input}
        mode="outlined"
        onSubmitEditing={submit}
        blurOnSubmit={false}
        right={
          <TextInput.Icon
            iconColor="white"
            onPress={submit}
            containerColor="#14213D"
            mode="contained"
            icon="send"
            style={{ width: 60, borderRadius: 10 }}
          />
        }
        value={message}
        onChangeText={(text) => setMessage(text)}
        placeholder="Write message..."
        placeholderTextColor="grey"
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 5,
    marginBottom: 10,
    paddingRight: 7,
  },
});
