import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputText from "../../components/InputText";
import MyText from "../../components/MyText";
import SingleButton from "../../components/SingleButton";

import {
  deleteUserByUserName,
  getUserByUserName,
} from "../../database/userService"; // Ajusta ruta según proyecto

const ViewUser = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    const nombreTrim = userName.trim().toLowerCase();

    if (!nombreTrim) {
      Alert.alert("Error", "Ingrese un nombre válido para buscar.");
      return;
    }

    try {
      const usuario = await getUserByUserName(nombreTrim);

      if (usuario) {
        setUserData(usuario);
      } else {
        Alert.alert("Usuario no encontrado", `No existe "${nombreTrim}"`);
        setUserData(null);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al buscar el usuario.");
    }
  };

  const limpiarBusqueda = () => {
    setUserName("");
    setUserData(null);
  };

  const eliminarUsuario = () => {
    Alert.alert(
      "Eliminar usuario",
      `¿Estás segura/o de eliminar "${userData.userName}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteUserByUserName(userData.userName);

              Alert.alert("Usuario eliminado correctamente");
              limpiarBusqueda();
            } catch (error) {
              console.error(error);
              Alert.alert("Error al eliminar el usuario");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
            <MyText text="Buscar Usuario" style={styles.title} />

            <InputText
              style={styles.input}
              placeholder="Ingrese nombre de usuario"
              value={userName}
              onChangeText={setUserName}
            />

            <View style={styles.buttonGroup}>
              <SingleButton title="Buscar" customPress={getUserData} />
              {userData && (
                <TouchableOpacity onPress={limpiarBusqueda}>
                  <Text style={styles.clearText}>Limpiar</Text>
                </TouchableOpacity>
              )}
            </View>

            {userData && (
              <View style={styles.resultContainer}>
                <MyText
                  text={`Nombre de Usuario: ${userData.userName}`}
                  style={styles.resultText}
                />
                <MyText
                  text={`Email: ${userData.email}`}
                  style={styles.resultText}
                />
                <SingleButton
                  title="Eliminar Usuario"
                  customPress={eliminarUsuario}
                />
              </View>
            )}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    color: "#000",
  },
  keyboardView: {
    flex: 1,
  },
  resultContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 8,
    color: "#444",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clearText: {
    color: "#d32f2f",
    fontWeight: "bold",
    fontSize: 16,
    padding: 10,
  },
});
