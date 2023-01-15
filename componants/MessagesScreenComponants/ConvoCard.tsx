import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Iconvo } from "../../redux/slices/MessagesSlice";
import { Avatar } from "react-native-paper";
import { useNavigationProp, userImage } from "../HomeScreenComponants/PostCard";
import CustomText from "../Gloabls/CustomText";

interface Props {
  data: Iconvo;
}

const ConvoCard = ({ data }: Props) => {
  const navigation = useNavigation<useNavigationProp>();
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate("Chat", {
          convoId: data.id,
          partnerName: data.partner.name,
        })
      }
    >
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
});
