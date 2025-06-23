import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import InputText from "../components/InputText.js";
import MyText from "../components/MyText.js";
import SingleButton from "../components/SingleButton.js";

const UpdateUser = () => {
  const [userNameSearch, setUserNameSearch] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setEmail] = useState("");

  const searchUser = async () => {
    console.log("searchUser");
    if (!userNameSearch.trim()) {
      Alert.alert("El nombre de usuario es requerido!");
      return;
    }

    try {
      const user = await AsyncStorage.getItem(userNameSearch);
      if (user) {
        const userData = JSON.parse(user);
        setUserName(userData.userName);
        setEmail(userData.email);
      } else {
        Alert.alert("Usuario no encontrado!");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error al buscar usuario.");
    }
  };

  const updateUser = async () => {
    console.log("updateUser");

    if (!userName.trim()) {
      Alert.alert("El nombre de usuario es requerido!");
      return;
    }
    if (!userEmail.trim()) {
      Alert.alert("El email es requerido!");
      return;
    }

    try {
      const user = { userName, email: userEmail };
      await AsyncStorage.setItem(userName, JSON.stringify(user));
      Alert.alert("Usuario actualizado");
    } catch (error) {
      console.error(error);
      Alert.alert("Error al actualizar el usuario.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView behavior="padding">
              <MyText text="Buscar Usuario" style={styles.text} />
              <InputText
                placeholder="Ingrese el nombre de Usuario"
                style={styles.inputStyle}
                onChangeText={(text) => setUserNameSearch(text)}
              />
              <SingleButton title="Buscar" customPress={searchUser} />

              <InputText
                placeholder="Ingrese el nombre de Usuario"
                value={userName}
                onChangeText={(text) => setUserName(text)}
              />
              <InputText
                placeholder="Ingrese el email"
                value={userEmail}
                onChangeText={(text) => setEmail(text)}
              />
              <SingleButton title="Actualizar" customPress={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },
  inputStyle: {
    padding: 15,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
});
