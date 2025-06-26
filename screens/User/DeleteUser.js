import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputText from "../../components/InputText.js";
import MyText from "../../components/MyText.js";
import SingleButton from "../../components/SingleButton.js";

const DeleteUser = ({ navigation }) => {
  const [userName, setUserName] = useState("");

  const deleteUser = async () => {
    if (!userName.trim()) {
      Alert.alert("El nombre de usuario es requerido!");
      return;
    }

    try {
      const data = await AsyncStorage.getItem("usuarios");
      const usuarios = data ? JSON.parse(data) : [];

      const userIndex = usuarios.findIndex(
        (u) => u.userName.toLowerCase() === userName.trim().toLowerCase()
      );

      if (userIndex === -1) {
        Alert.alert("El usuario no existe");
        return;
      }

      // Eliminar el usuario del array
      usuarios.splice(userIndex, 1);

      // Guardar el array actualizado en AsyncStorage
      await AsyncStorage.setItem("usuarios", JSON.stringify(usuarios));

      Alert.alert("Usuario eliminado!");
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Error al eliminar el usuario");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText text="Buscar usuario a eliminar" style={styles.text} />
            <KeyboardAvoidingView style={styles.keyboardView}>
              <InputText
                placeholder="Nombre de usuario"
                onChangeText={(text) => setUserName(text)}
                value={userName}
              />
              <SingleButton title="Borrar usuario" customPress={deleteUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;

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
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
});
