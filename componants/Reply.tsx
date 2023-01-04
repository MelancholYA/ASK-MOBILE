import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ianswer } from "../redux/slices/postsSlice";
import { Avatar } from "react-native-paper";
import CustomText from "./CustomText";

type Props = {
  data: {
    id: string;
    user: {
      id: string;
      avatar: string;
      name: string;
    };
    body: string;
  };
};

const Reply = ({ data }: Props) => {
  return (
    <View
      key={data.id}
      style={styles.reply}
    >
      <View style={styles.header}>
        <Avatar.Image
          style={styles.avatar}
          size={35}
          source={{ uri: data.user.avatar }}
        />
        <View>
          <CustomText style={styles.name}>{data.user.name}</CustomText>
          <CustomText style={styles.answerBody}>{data.body}</CustomText>
        </View>
      </View>
    </View>
  );
};

export default Reply;

const styles = StyleSheet.create({
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
  answerBody: {
    color: "#444D6E",
    width: 225,
    padding: 5,
  },
  name: {
    fontFamily: "Montserrat-Bold",
    color: "#444D6E",
  },
});
