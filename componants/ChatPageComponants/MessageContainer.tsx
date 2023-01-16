import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Imessage } from "../../redux/slices/MessagesSlice";
import { Iuser } from "../../redux/slices/tokenSlice";
import { Avatar } from "react-native-paper";
import { userImage } from "../HomeScreenComponants/PostCard";

interface Props extends Imessage {
  partner?: Iuser;
}

const MessageContainer = ({ author, message, partner }: Props) => {
  return (
    <View style={styles(author === "ME").container}>
      {author === "PARTNER" && partner && (
        <Avatar.Image
          theme={{ roundness: 10 }}
          size={35}
          style={styles().avatar}
          source={partner.avatar ? { uri: partner.avatar } : userImage}
        />
      )}
      <Text style={styles(author === "ME").message}>{message}</Text>
    </View>
  );
};

export default MessageContainer;

const styles = (me?: boolean) =>
  StyleSheet.create({
    container: {
      borderRadius: 10,
      backgroundColor: me ? "#697796" : "#DEDBDB",
      padding: me ? 10 : 7,
      marginTop: 10,
      marginLeft: me ? "auto" : 5,
      width: "70%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: me ? "flex-end" : "flex-start",
    },
    message: {
      color: me ? "#ffffff" : "#354569",
      lineHeight: 20,
    },
    avatar: { marginRight: 10, backgroundColor: "#DEDBDB", borderRadius: 10 },
  });
