import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NotificationLink } from "../../redux/slices/notificationsSlice";
import CustomText from "../../componants/Gloabls/CustomText";
import { RootStackParamList } from "../../navigation/Stack";
import { NavigationProp } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

interface Props {
  navigation: NavigationProp<RootStackParamList>;
}

const Notifications = ({ navigation }: Props) => {
  const notifications = useSelector((state: RootState) => state.notifications);

  const handlePress = (link: NotificationLink) => {
    const { path, data } = link;
    switch (path) {
      case "Group":
        if (data.groupId) {
          navigation.navigate(path, { groupId: data.groupId });
        }
        break;
      case "Question":
        if (data.postId) {
          navigation.navigate(path, { postId: data.postId });
        }
        break;
      case "Replies":
        if (data.postId && data.answerId) {
          navigation.navigate(path, {
            postId: data.postId,
            answerId: data.answerId,
          });
        }
        break;

      default:
        break;
    }
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={notifications}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => handlePress(item.link)}
          style={styles.notificationContainer}
        >
          <View style={styles.avatarContainer}>
            {item.avatar ? (
              <Avatar.Image
                size={45}
                source={{ uri: item.avatar }}
              />
            ) : (
              <Avatar.Icon
                size={45}
                icon="bell"
              />
            )}
          </View>

          <View style={styles.textContainer}>
            <CustomText bold>{item.title}</CustomText>
            <CustomText variant="bodySmall"> {item.message}</CustomText>
          </View>
        </Pressable>
      )}
    />
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#e4e4e4",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 9,
  },
  avatarContainer: {
    marginRight: 10,
  },
  textContainer: {
    height: 50,
    justifyContent: "space-around",
    alignItems: "stretch",
  },
});
