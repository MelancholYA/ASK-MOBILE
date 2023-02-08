import { useEffect } from "react";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, FlatList, View, StatusBar } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomText from "../../componants/Gloabls/CustomText";
import Reply from "../../componants/RepliesScreenComponants/Reply";
import ReplyInput from "../../componants/RepliesScreenComponants/ReplyInput";

import { RootStackParamList } from "../../navigation/Stack";
import { RootState } from "../../redux/store";
import { userImage } from "../../componants/HomeScreenComponants/PostCard";
import useFetch from "../../helpers/useFetch";
import { Ireply, setReplies } from "../../redux/slices/postsSlice";
import { NoData } from "../../componants/HomeScreenComponants/Posts";

type Props = NativeStackScreenProps<RootStackParamList, "Replies">;

const Replies = ({ navigation, route }: Props) => {
  const dispatch = useDispatch();
  const { postId, answerId, focus } = route.params;
  const { clearData, data, getData, loading } = useFetch();

  const answer = useSelector((state: RootState) => state.posts.posts)
    .filter((post) => post._id === postId)[0]
    .answers?.filter((answer) => answer._id === answerId)[0];

  useEffect(() => {
    getData(`posts/${postId}/${answerId}/replies`);
  }, []);

  useEffect(() => {
    if (data) {
      const replies: Ireply[] = data.data.replies;
      dispatch(setReplies({ answerId, postId, replies }));
    }
  }, [data]);

  return (
    <>
      <StatusBar backgroundColor="#D7D9DD" />
      <View style={styles.answerBody}>
        <Avatar.Image
          source={answer?.user.avatar ? { uri: answer.user.avatar } : userImage}
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
        ListEmptyComponent={
          loading ? <ActivityIndicator /> : <NoData text="No replies" />
        }
        renderItem={(item) => (
          <Reply
            data={item.item}
            key={item.item._id}
          />
        )}
      />
      <ReplyInput
        answerId={answerId}
        focus={focus || false}
        postId={postId}
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
});
