import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { RootStackParamList } from "../../navigation/Stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Button, TextInput } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

const Chat = ({ route }: Props) => {
  const [message, setMessage] = useState("");
  const convo = useSelector((state: RootState) => state.chats).filter(
    (chat) => chat.id === route.params.convoId
  )[0];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={convo.messages}
        renderItem={({ item }) => <Text>{item.message}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        value={message}
        onChangeText={(text) => setMessage(text)}
        placeholder="Enter message"
      />
      <Button>send</Button>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
