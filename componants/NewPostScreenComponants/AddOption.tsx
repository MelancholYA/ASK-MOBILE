import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import useNotification from "../../helpers/useNotification";

type Props = {
  add: (opt: string) => void;
  toggleFocus: (e: boolean) => void;
};

const AddOption = ({ add, toggleFocus }: Props) => {
  const [textBody, setTextBody] = useState("");
  const { openNotification } = useNotification();

  const submit = () => {
    if (!textBody || !textBody.length) {
      openNotification("Please write the options first");
      return;
    }
    add(textBody.trim());
    setTextBody("");
  };
  return (
    <TextInput
      onFocus={() => toggleFocus(true)}
      onBlur={() => toggleFocus(false)}
      value={textBody}
      onChangeText={(e) => setTextBody(e)}
      onSubmitEditing={submit}
      mode="outlined"
      placeholder="Write an option"
      style={{ marginBottom: 5 }}
      theme={{ roundness: 5 }}
      right={
        <TextInput.Icon
          onPress={submit}
          size={45}
          icon="plus-box-outline"
        />
      }
    />
  );
};

export default AddOption;

const styles = StyleSheet.create({});
