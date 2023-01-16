import { Pressable, StyleSheet, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Iconvo } from "../../redux/slices/MessagesSlice";
import { Avatar, Button, Modal, Portal } from "react-native-paper";
import { useNavigationProp, userImage } from "../HomeScreenComponants/PostCard";
import CustomText from "../Gloabls/CustomText";
import ConvoOptions from "./ConvoOptions";

interface Props {
  data: Iconvo;
}

const ConvoCard = ({ data }: Props) => {
  const navigation = useNavigation<useNavigationProp>();
  const [showModel, setShowModel] = useState(false);

  const handlePress = () => {
    navigation.navigate("Chat", {
      convoId: data.id,
      partnerName: data.partner.name,
    });
  };
  const handleLongPress = () => {
    setShowModel(true);
  };

  const handleModalClose = () => {
    setShowModel(false);
  };

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <Portal>
        <Modal
          visible={showModel}
          onDismiss={handleModalClose}
          contentContainerStyle={styles.model}
        >
          <ConvoOptions
            convoId={data.id}
            userId={data.partner.id}
          />
          <Button
            onPress={handleModalClose}
            style={styles.btn}
            contentStyle={styles.btnContnt}
            mode="contained"
          >
            Cancel
          </Button>
        </Modal>
      </Portal>
      <Avatar.Image
        size={50}
        source={data.partner.avatar ? { uri: data.partner.avatar } : userImage}
      />
      <View style={styles.subContainer}>
        <CustomText
          bold
          variant="titleSmall"
        >
          {data.partner.name}
        </CustomText>
        <CustomText variant="labelMedium">
          {data.messages[0].message}
        </CustomText>
      </View>
    </Pressable>
  );
};

export default ConvoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#d3d6db",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 9,
  },
  subContainer: {
    marginLeft: 15,
    justifyContent: "space-evenly",
  },
  model: {
    margin: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  btn: {
    margin: 5,
  },
  btnContnt: {
    padding: 10,
  },
});
