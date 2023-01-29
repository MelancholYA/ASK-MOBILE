import { StyleSheet, FlatList, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import Filter from "../../componants/Gloabls/Filter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addPost } from "../../redux/slices/postsSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useNotification from "../../helpers/useNotification";
import { RootStackParamList } from "../../navigation/Stack";

type Props = NativeStackScreenProps<RootStackParamList, "NewPost">;
interface question {
  body: string;
  topic: string;
}

const NewPost = ({ navigation, route }: Props) => {
  const { openNotification } = useNotification();
  const chip = useSelector((state: RootState) => state.chips.newQuestionChip);
  const dispatch = useDispatch();
  const [question, setQuestion] = useState<question>({
    body: "",
    topic: chip.label,
  });

  const submit = () => {
    if (!question.body) {
      openNotification("Please fill the question body first");
      return;
    }
    dispatch(
      addPost({
        ...question,
        chip,
        id: "gdfsg",
        user: { id: "gdf", name: "user" },
      })
    );
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={question.body}
        onChangeText={(e) => setQuestion((prev) => ({ ...prev, body: e }))}
        theme={{ roundness: 7 }}
        placeholder="What's on your mind ?"
        multiline={true}
        textColor="white"
        style={styles.textInput}
        mode="outlined"
        placeholderTextColor="#C9CCD1"
        activeOutlineColor="#aaaaaa"
        outlineColor="#c9c9c9"
      />
      <View style={{ flex: 0.72 }}>
        <Filter
          title="Topic"
          vertical
          Case="newGroupChip"
        />
      </View>

      <Button
        mode="contained"
        icon="share"
        style={{
          marginTop: "auto",
          marginVertical: 10,
          padding: 5,
        }}
        onPress={submit}
      >
        Create
      </Button>
    </View>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  textInput: {
    height: 120,
    marginBottom: 10,

    padding: 5,
    // color: "white",
    flex: 0.2,
  },
});
