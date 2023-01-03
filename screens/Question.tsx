import { StyleSheet, ScrollView, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Main";
import CustomText from "../componants/CustomText";
import { Avatar } from "react-native-paper";

//todo : make the reply componant

type Props = NativeStackScreenProps<RootStackParamList, "Question">;

const Question = ({ navigation, route }: Props) => {
  const post = route.params.data;
  return (
    <ScrollView>
      <View style={styles.container}>
        <Avatar.Image
          style={styles.avatar}
          size={45}
          source={{ uri: post.user.avatar }}
        />
        <CustomText style={styles.name}> {post.user.name}</CustomText>
        <CustomText style={styles.body}> {post.body} </CustomText>
      </View>
      <View>
        {post.answers?.map((answer) => (
          <View>{answer.body}</View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#14213d29",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  avatar: {
    margin: 10,
  },
  name: {
    fontFamily: "Montserrat-Bold",
    color: "#8795c9",
    textAlign: "center",
  },

  body: {
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    color: "#444D6E",
    marginTop: 15,
  },
  footer: {
    padding: 5,
    paddingVertical: 3,
    paddingRight: 10,
    backgroundColor: "#14213da9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
  },

  buttons: {
    flexDirection: "row",
  },
});
