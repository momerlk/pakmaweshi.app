import React from "react";
import {
    View
} from "react-native";



export const VStack = props => <View style={{flex : 1, flexDirection : "column" , ...props.style}}>{props.children}</View>

export const HStack = props => <View style={{flex : 1, flexDirection : "row" , ...props.style}}>{props.children}</View>