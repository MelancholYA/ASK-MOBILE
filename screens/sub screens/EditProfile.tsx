import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomText from "../../componants/Gloabls/CustomText";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import { texture } from "../Main screens/Welcome";
import ImagePicker from "../../componants/Gloabls/ImagePicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { userImage } from "../../componants/HomeScreenComponants/PostCard";
import { setUser } from "../../redux/slices/tokenSlice";
import useNotification from "../../helpers/useNotification";

type Props = {};

const EditProfile = (props: Props) => {
  const dispatch = useDispatch();
  const { openNotification } = useNotification();
  const [visible, setVisible] = useState(false);
  const user = useSelector((state: RootState) => state.token.user);
  const [userData, setUserData] = useState(user);
  const [currentPassword, setCurrentPassword] = useState("");

  const submitData = async () => {
    if (userData) {
      //send data tp server with currentPassword
      // server will respond with new userdata
      const serverResponse = { ...userData };
      serverResponse!.password = "";
      setCurrentPassword("");
      dispatch(setUser(serverResponse));
      setUserData(serverResponse);
      openNotification("Changes were saved succesfully");
    }
  };
  const save = () => {
    if (JSON.stringify(user) === JSON.stringify(userData)) {
      console.log("same");
      return;
    }
    const emailChanged = user?.email !== userData?.email;
    const passwordChanged = user?.password !== ("" || null);

    if (emailChanged || passwordChanged) {
      setVisible(true);
      return;
    }
    console.log("no changes");
    submitData();
  };

  return (
    userData && (
      <ScrollView contentContainerStyle={styles.container}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={{
              backgroundColor: "white",
              marginHorizontal: 15,
              padding: 15,
              borderRadius: 5,
            }}
          >
            <CustomText>
              Changing password or email requires writing current password
            </CustomText>
            <TextInput
              style={styles.input}
              label="Current Password"
              mode="outlined"
              value={currentPassword}
              onChangeText={(e) => setCurrentPassword(e)}
              theme={{ roundness: 7 }}
              activeOutlineColor="#9e9e9e"
              outlineColor="#a3a2a2"
            />
            <Button
              style={{ marginTop: "auto" }}
              mode="contained"
              icon="content-save"
              onPress={() => {
                if (currentPassword.length < 8) {
                  openNotification("Password must have more than 8 charecters");
                  return;
                }

                submitData();
                setVisible(false);
              }}
            >
              Save
            </Button>
          </Modal>
        </Portal>
        <View>
          <ImageBackground
            style={styles.cover}
            source={userData?.cover ? { uri: userData.cover } : texture}
          >
            <ImageBackground
              style={{
                width: 70,
                aspectRatio: 1,
                borderRadius: 100,
                overflow: "hidden",
                marginLeft: 15,
              }}
              source={userData?.avatar ? { uri: userData.avatar } : userImage}
            >
              <ImagePicker
                size={30}
                aspect={[1, 1]}
                setImage={(e) => {
                  setUserData({ ...userData, avatar: e.uri });
                }}
              />
            </ImageBackground>
            <ImagePicker
              aspect={[16, 6]}
              setImage={(e) => {
                setUserData({ ...userData, cover: e.uri });
              }}
            />
          </ImageBackground>

          <TextInput
            style={styles.input}
            value={userData.name}
            onChangeText={(e) => setUserData({ ...userData, name: e })}
            label="User Name"
            mode="outlined"
            theme={{ roundness: 7 }}
            activeOutlineColor="#9e9e9e"
            outlineColor="#a3a2a2"
          />
          <TextInput
            style={styles.input}
            value={userData.bio}
            onChangeText={(e) => setUserData({ ...userData, bio: e })}
            label="Bio"
            multiline
            numberOfLines={3}
            mode="outlined"
            theme={{ roundness: 7 }}
            activeOutlineColor="#9e9e9e"
            outlineColor="#a3a2a2"
          />
          <TextInput
            style={styles.input}
            value={userData.email}
            onChangeText={(e) => setUserData({ ...userData, email: e })}
            label="User Email"
            mode="outlined"
            theme={{ roundness: 7 }}
            activeOutlineColor="#9e9e9e"
            outlineColor="#a3a2a2"
          />
          <TextInput
            style={styles.input}
            value={userData.password}
            secureTextEntry
            onChangeText={(e) => setUserData({ ...userData, password: e })}
            label="User Password"
            mode="outlined"
            theme={{ roundness: 7 }}
            activeOutlineColor="#9e9e9e"
            outlineColor="#a3a2a2"
          />
        </View>

        <Button
          style={{ marginTop: "auto" }}
          mode="contained"
          icon="content-save"
          onPress={save}
        >
          Save
        </Button>
      </ScrollView>
    )
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    justifyContent: "space-between",
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    transform: [{ scale: 0.9 }],
  },
  cover: {
    marginVertical: 10,
    width: "100%",
    aspectRatio: 16 / 6,
    justifyContent: "center",
  },
  input: {
    marginBottom: 10,
  },
});
