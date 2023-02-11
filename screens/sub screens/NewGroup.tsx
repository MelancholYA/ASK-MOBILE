import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  StatusBar,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

import Filter from "../../componants/Gloabls/Filter";
import ImagePicker from "../../componants/Gloabls/ImagePicker";

import { useDispatch } from "react-redux";
import useNotification from "../../helpers/useNotification";
import { RootStackParamList } from "../../navigation/Stack";
import { addGroup, Igroup } from "../../redux/slices/groupsSlice";

import { texture } from "../Main screens/Welcome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImagePickerAsset } from "expo-image-picker/build/ImagePicker.types";
import useFetch from "../../helpers/useFetch";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "NewGroup">;

type groupBody = {
  description: string;
  name: string;
  topic: string;
  background?: ImagePickerAsset;
  avatar?: ImagePickerAsset;
};

const NewGroup = ({ navigation }: Props) => {
  const { openNotification } = useNotification();
  const { clearData, data, loading, postData } = useFetch();
  const dispatch = useDispatch();
  const [groupBody, setGroupBody] = useState<groupBody>({
    description: "",
    name: "",
    topic: "General",
  });

  const submit = async () => {
    if (!groupBody.name || !groupBody.description) {
      openNotification("Please fill the name and description");
      return;
    }
    const formData = new FormData();
    if (groupBody.avatar && groupBody.background) {
      const coverObj = {
        uri: groupBody.avatar.uri,
        type: "image/jpeg",
        name: groupBody.avatar.uri.split("/").pop(),
      } as unknown as Blob;
      const avatarObj = {
        uri: groupBody.avatar.uri,
        type: "image/jpeg",
        name: groupBody.avatar.uri.split("/").pop(),
      } as unknown as Blob;
      formData.append("cover", coverObj);
      formData.append("avatar", avatarObj);
    }
    const body = {
      name: groupBody.name,
      description: groupBody.description,
      topic: groupBody.topic,
    };
    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value);
    });

    postData("groups/new", formData, true);
  };

  useEffect(() => {
    if (data) {
      dispatch(addGroup(data.data.group));
      navigation.navigate("Groups");
    }
    return () => clearData();
  }, [data]);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <ImageBackground
        style={{
          aspectRatio: 16 / 6,
        }}
        source={
          groupBody.background ? { uri: groupBody.background.uri } : texture
        }
      >
        <View
          style={{
            aspectRatio: 16 / 6,
            backgroundColor: "#00000094",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              aspectRatio: 1 / 1,
              width: 80,
            }}
          >
            <Image
              style={styles.avatar}
              resizeMode="cover"
              source={
                groupBody.avatar ? { uri: groupBody.avatar.uri } : texture
              }
            />
            <ImagePicker
              size={40}
              style={{ bottom: -5, right: -5 }}
              aspect={[1, 1]}
              setImage={(e) => setGroupBody((prev) => ({ ...prev, avatar: e }))}
            />
          </View>
        </View>
        <ImagePicker
          aspect={[16, 6]}
          setImage={(e) => setGroupBody((prev) => ({ ...prev, background: e }))}
        />
      </ImageBackground>

      <TextInput
        value={groupBody.name}
        onChangeText={(e) => setGroupBody((prev) => ({ ...prev, name: e }))}
        theme={{ roundness: 7 }}
        label="Group name"
        style={styles.textInput}
        mode="outlined"
        activeOutlineColor="#9e9e9e"
        outlineColor="#a3a2a2"
      />
      <TextInput
        value={groupBody.description}
        onChangeText={(e) =>
          setGroupBody((prev) => ({ ...prev, description: e }))
        }
        theme={{ roundness: 7 }}
        multiline={true}
        numberOfLines={4}
        label="Short Description"
        style={styles.textInput}
        mode="outlined"
        activeOutlineColor="#9e9e9e"
        outlineColor="#a3a2a2"
      />
      <View style={{ flex: 0.72 }}>
        <Filter
          title="Topic"
          vertical
          setTopic={(e) => setGroupBody((prev) => ({ ...prev, topic: e }))}
          Case="newGroupChip"
        />
      </View>

      <Button
        mode="contained"
        icon="share"
        textColor="#FCA311"
        style={styles.button}
        onPress={submit}
      >
        Create
      </Button>
    </View>
  );
};

export default NewGroup;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  textInput: {
    marginVertical: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    aspectRatio: 1,
    borderRadius: 100,
    borderColor: "#ffffff",
    borderWidth: 1,
  },
  button: {
    marginTop: "auto",
    marginVertical: 10,
    padding: 5,
  },
});
