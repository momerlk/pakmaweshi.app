import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button , Text } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';


export const SearchBar = (props : any) => {
  return (
    <View style={{...styles.container}}>
      <View
        style={
          !props.clicked
            ? styles.searchBar__unclicked
            : styles.searchBar__clicked
        }
      >
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={props.searchPhrase}
          onChangeText={props.setSearchPhrase}
          onFocus={() => {
            props.setClicked(true);
          }}
        />
        
        
      </View>
      {props.clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              props.setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor : "transparent",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    paddingLeft : 10,
    paddingTop : 60,
    paddingBottom : 16,
  },
  searchBar__unclicked: {
    padding: 7,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 10,
    alignItems: "center",

  },
  searchBar__clicked: {
    padding: 7,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: "90%",
  },
});