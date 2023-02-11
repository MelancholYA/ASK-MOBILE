import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Igroup } from "../../redux/slices/groupsSlice";
import CustomText from "../Gloabls/CustomText";
import { Avatar, IconButton } from "react-native-paper";
import { texture } from "../../screens/Main screens/Welcome";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProp } from "../HomeScreenComponants/PostCard";
import { BASE_URL } from "@env";

type Props = {
  data: Igroup;
};

const GroupCard = ({ data }: Props) => {
  const navigate = useNavigation<useNavigationProp>();
  const chip = useSelector((state: RootState) => state.chips.chips).filter(
    (chip) => chip.label === data.topic
  )[0];
  return (
    <View
      style={{
        borderRadius: 5,
        width: "100%",
        aspectRatio: 16 / 6,
        marginBottom: 10,
        overflow: "hidden",
      }}
    >
      <Pressable
        onPress={() => navigate.navigate("Group", { groupId: data._id })}
      >
        <ImageBackground
          style={{ aspectRatio: 16 / 6 }}
          source={
            data.cover
              ? { uri: BASE_URL.replace("/api/", "") + data.cover }
              : texture
          }
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Avatar.Image
                size={55}
                source={
                  data.avatar
                    ? { uri: BASE_URL.replace("/api/", "") + data.avatar }
                    : texture
                }
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
                {data.membersLength === 0
                  ? "No Members"
                  : data.membersLength > 1
                  ? data.membersLength + " members"
                  : "1 member"}
              </CustomText>
            </View>

            <CustomText
              numberOfLines={2}
              color="white"
              variant="bodyMedium"
              style={{ padding: 10 }}
            >
              {data.description}
            </CustomText>
          </View>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

export default GroupCard;

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center" },
  container: { padding: 10, backgroundColor: "#00000099", aspectRatio: 16 / 6 },
});
