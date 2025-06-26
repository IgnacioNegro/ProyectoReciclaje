import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const AuthLoading = ({ navigation }) => {
  useEffect(() => {
    const checkLogin = async () => {
      const usuarioLogueado = await AsyncStorage.getItem("usuarioLogueado");
      if (usuarioLogueado) {
        navigation.replace("HomeScreen");
      } else {
        navigation.replace("Login");
      }
    };
    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default AuthLoading;
