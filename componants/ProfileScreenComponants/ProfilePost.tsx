import { StyleSheet, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { deletePost, Ipost } from "../../redux/slices/postsSlice";
import Post from "../HomeScreenComponants/PostCard";
import { Button, Modal, Portal } from "react-native-paper";
import { useDispatch } from "react-redux";
import useNotification from "../../helpers/useNotification";

type Props = {
  data: Ipost;
};

const ProfilePost = ({ data }: Props) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { openNotification } = useNotification();
  const closeModel = () => setVisible(false);
  const openModel = () => setVisible(true);
  return (
    <Pressable onLongPress={openModel}>
      <Post post={data} />
      <Portal>
        <Modal
          contentContainerStyle={{
            margin: 10,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
          }}
          visible={visible}
          onDismiss={closeModel}
        >
          <Button
            style={styles.btn}
            icon="trash-can"
            mode="contained"
            onPress={() => {
              dispatch(deletePost(data.id));
              openNotification("Post deleted succesfully");
              closeModel();
            }}
          >
            Delete Post
          </Button>
          <Button
            style={styles.btn}
            icon="cancel"
            mode="contained"
            onPress={closeModel}
          >
            Cancel
          </Button>
        </Modal>
      </Portal>
    </Pressable>
  );
};

export default ProfilePost;

const styles = StyleSheet.create({
  btn: {
    marginVertical: 5,
    marginHorizontal: 20,
  },
});
