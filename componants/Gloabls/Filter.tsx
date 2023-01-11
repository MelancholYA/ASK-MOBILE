import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Ichip, setFilters } from "../../redux/slices/chipsSlice";
import CustomText from "./CustomText";

type Props = {
  Case:
    | "homePageChips"
    | "newQuestionChip"
    | "groupFilterChips"
    | "newGroupChip";
  shadow?: boolean;
  vertical?: boolean;
  title?: string;
};

const Filter = ({ Case, shadow, vertical, title }: Props) => {
  const chipsState = useSelector((state: RootState) => state.chips);
  const dispatch = useDispatch();

  const selected = (chip: Ichip) => {
    if (Case === "newGroupChip" || Case === "newQuestionChip") {
      return chipsState[Case].label === chip.label;
    }
    return chipsState[Case].map((chip) => chip.label).includes(chip.label);
  };

  return (
    <View style={shadow ? style.shadow : {}}>
      <View style={style.container}>
        <CustomText>{title || "Filters"} :</CustomText>
        <FlatList
          ListEmptyComponent={
            <CustomText style={style.empty}>No filters available</CustomText>
          }
          style={style.subContainer}
          data={chipsState.chips}
          horizontal={!vertical}
          renderItem={({ item }) => (
            <Button
              onPress={() => dispatch(setFilters({ chip: item, page: Case }))}
              key={item.label}
              textColor={selected(item) ? "#FF9E00" : "white"}
              icon={item.icon}
              style={[
                chipStyle.container,
                vertical && { margin: 5, padding: 10 },
              ]}
            >
              {item.label}
            </Button>
          )}
        />
      </View>
    </View>
  );
};

export const chipStyle = StyleSheet.create({
  container: {
    color: "red",
    marginRight: 5,
    backgroundColor: "#14213D",
  },
});
const style = StyleSheet.create({
  shadow: {
    padding: 10,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 3,
    zIndex: 9,
  },
  container: {
    padding: 10,
    paddingBottom: 10,
    borderRadius: 5,
    backgroundColor: "#14213D22",
  },
  empty: {
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
    color: "grey",
  },
  subContainer: {
    marginTop: 10,
    overflow: "scroll",
    paddingBottom: 10,
  },
});

export default Filter;
