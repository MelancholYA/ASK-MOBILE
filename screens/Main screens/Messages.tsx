import { FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NoData } from "../../componants/HomeScreenComponants/Posts";
import ConvoCard from "../../componants/MessagesScreenComponants/ConvoCard";

type Props = {};

const Messages = (props: Props) => {
  const convos = useSelector((state: RootState) => state.chats);

  return (
    <FlatList
      contentContainerStyle={{ padding: 15 }}
      data={convos}
      ListEmptyComponent={<NoData text="No messages yet" />}
      renderItem={({ item }) => <ConvoCard data={item} />}
    />
  );
};

export default Messages;
