import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { Igroup } from "../../redux/slices/groupsSlice";
import CustomText from "../Gloabls/CustomText";
import {
  Avatar,
  Button,
  IconButton,
  TouchableRipple,
} from "react-native-paper";
import { texture } from "../../screens/Main screens/Welcome";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProp } from "../HomeScreenComponants/Post";

type Props = {
  data: Igroup;
};

const GroupCard = ({ data }: Props) => {
  const navigate = useNavigation<useNavigationProp>();
  const chip = useSelector((state: RootState) => state.chips.chips).filter(
    (chip) => chip.label === data.topic
  )[0];
  return (
    <Pressable onPress={() => navigate.navigate("Group", { groupId: data.id })}>
      <View
        style={{
          borderRadius: 5,
          overflow: "hidden",
          marginBottom: 10,
        }}
      >
        <ImageBackground
          source={data.background ? { uri: data.background } : texture}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Avatar.Image
                size={55}
                source={data.avatar ? { uri: data.avatar } : texture}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: 175,
                }}
              >
                <CustomText
                  color="white"
                  variant="titleSmall"
                  numberOfLines={2}
                  style={{
                    marginLeft: 10,
                    fontFamily: "Montserrat-Bold",
                    textTransform: "capitalize",
                  }}
                >
                  {data.name}
                </CustomText>
                <IconButton
                  iconColor="white"
                  key={chip.label}
                  icon={chip.icon}
                  size={15}
                  mode="outlined"
                />
              </View>

              <CustomText
                style={{ marginLeft: "auto" }}
                color="white"
              >
                {data.members} members
              </CustomText>
            </View>

            <CustomText
              numberOfLines={4}
              color="white"
              variant="bodyMedium"
              style={{ padding: 10 }}
            >
              {data.description}
            </CustomText>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

export default GroupCard;

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center" },
  container: { padding: 10, backgroundColor: "#00000099" },
});
