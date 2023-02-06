import { StyleSheet, StatusBar, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import Filter from "../../componants/Gloabls/Filter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addPost, Ipost } from "../../redux/slices/postsSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useNotification from "../../helpers/useNotification";
import { RootStackParamList } from "../../navigation/Stack";
import axios from "axios";
import { BASE_URL } from "@env";
import { Ichip } from "../../redux/slices/chipsSlice";
import useFetch from "../../helpers/useFetch";
import { set } from "react-native-reanimated";

type Props = NativeStackScreenProps<RootStackParamList, "NewPost">;
interface question {
  body: string;
  topic: string;
}

const NewPost = ({ navigation, route }: Props) => {
  const chip = useSelector((state: RootState) => state.chips.newQuestionChip);
  const { openNotification } = useNotification();
  const { data, loading, postData, clearData } = useFetch();
  const groupId = route?.params?.groupId;
  const groupName = route?.params?.groupName;

  const dispatch = useDispatch();
  const [question, setQuestion] = useState<question>({
    body: "",
    topic: "General",
  });

  const submit = async () => {
    if (!question.body) {
      openNotification("Please fill the question body first");
      return;
    }
    const body: { body: string; chip: Ichip; group?: string } = {
      body: question.body,
      chip,
    };
    if (groupId && groupName) {
      body.group = groupId;
    }
    postData("posts/new", body);
  };

  useEffect(() => {
    if (data) {
      dispatch(addPost(data.data.post));
      clearData();
      navigation.navigate("Home");
    }
    return () => setQuestion({ body: "", topic: "General" });
  }, [loading, data]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <TextInput
        value={question.body}
        onChangeText={(e) => setQuestion((prev) => ({ ...prev, body: e }))}
        theme={{ roundness: 7 }}
        placeholder="What's on your mind ?"
        multiline={true}
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
          Case="newQuestionChip"
          setTopic={(e) => {
            setQuestion((prev) => ({ ...prev, topic: e }));
          }}
        />
      </View>

      <Button
        disabled={loading}
        loading={loading}
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
    color: "black",
    flex: 0.2,
  },
});
