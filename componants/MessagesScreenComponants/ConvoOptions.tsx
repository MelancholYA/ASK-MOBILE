import { StyleSheet, Text, Alert } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

type Props = {
  convoId: string;
  userId: string;
};

const ConvoOptions = ({ convoId, userId }: Props) => {
  return (
    <>
      <Button
        style={styles.btn}
        contentStyle={styles.btnContnt}
        mode="contained"
        icon="trash-can"
        onPress={() => {
          Alert.alert(
            "Delete",
            "Are you sure you want to delete this convo ?",
            [
              {
                text: "Delete",
                onPress: () => {
                  console.log("deleted " + convoId);
                },
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ]
          );
        }}
      >
        Delete
      </Button>
      <Button
        style={styles.btn}
        contentStyle={styles.btnContnt}
        mode="contained"
        icon="cancel"
        onPress={() => {
          Alert.alert(
            "Block User",
            "Are you sure you want to block this user ?",
            [
              {
                text: "Block",
                onPress: () => {
                  console.log("blocked user " + userId);
                },
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ]
          );
        }}
      >
        Block user
      </Button>
    </>
  );
};

export default ConvoOptions;

const styles = StyleSheet.create({
  btn: {
    margin: 5,
  },
  btnContnt: {
    padding: 10,
  },
});
