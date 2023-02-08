import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ianswer } from "../../redux/slices/postsSlice";
import { Avatar } from "react-native-paper";
import CustomText from "../Gloabls/CustomText";
import { userImage } from "../HomeScreenComponants/PostCard";

type Props = {
  data: {
    _id: string;
    user: {
      _id: string;
      avatar?: string;
      firstName: string;
      lastName: string;
    };
    body: string;
  };
};

const Reply = ({ data }: Props) => {
  return (
    <View
      key={data._id}
      style={styles.reply}
    >
      <View style={styles.header}>
        <Avatar.Image
          style={styles.avatar}
          size={35}
          source={data.user.avatar ? { uri: data.user.avatar } : userImage}
        />
        <View>
          <CustomText
            style={styles.name}
          >{`${data.user.firstName} ${data.user.lastName}`}</CustomText>
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
