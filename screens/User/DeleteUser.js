import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import InputText from "../../components/InputText.js";
import SingleButton from "../../components/SingleButton.js";
import MyText from "../../components/MyText.js";

const DeleteUser = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);

  const buscarUsuario = async () => {
    const clave = userName.trim().toLowerCase();
    if (!clave) {
      Alert.alert("Error", "Por favor ingrese el nombre de usuario");
      return;
    }

    try {
      const data = await AsyncStorage.getItem("usuarios");
      const usuarios = data ? JSON.parse(data) : [];

      const encontrado = usuarios.find(
        (u) => u.userName.toLowerCase() === clave
      );

      if (!encontrado) {
        Alert.alert("No encontrado", "No se encontró un usuario con ese nombre");
        setUsuarioEncontrado(null);
        return;
      }

      setUsuarioEncontrado(encontrado);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al buscar el usuario");
    }
  };

  const eliminarUsuario = () => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás segura que querés eliminar el usuario "${usuarioEncontrado.userName}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: eliminarConfirmado },
      ]
    );
  };

  const eliminarConfirmado = async () => {
    try {
      const data = await AsyncStorage.getItem("usuarios");
      const usuarios = data ? JSON.parse(data) : [];

      const nuevosUsuarios = usuarios.filter(
        (u) => u.userName.toLowerCase() !== usuarioEncontrado.userName.toLowerCase()
      );

      await AsyncStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
      Alert.alert("Éxito", "Usuario eliminado correctamente");
      setUserName("");
      setUsuarioEncontrado(null);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo eliminar el usuario");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Buscar Usuario</Text>
            <InputText
              placeholder="Nombre de usuario"
              value={userName}
              onChangeText={setUserName}
              style={styles.input}
            />
            <SingleButton title="Buscar" customPress={buscarUsuario} />

            {usuarioEncontrado && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Nombre completo:</Text>
                <Text style={styles.resultValue}>{usuarioEncontrado.name}</Text>

                <Text style={styles.resultLabel}>Email:</Text>
                <Text style={styles.resultValue}>{usuarioEncontrado.email}</Text>

                <Text style={styles.resultLabel}>Barrio:</Text>
                <Text style={styles.resultValue}>{usuarioEncontrado.neighborhood}</Text>

                {usuarioEncontrado.profilePicture ? (
                  <Image
                    source={{ uri: usuarioEncontrado.profilePicture }}
                    style={styles.image}
                  />
                ) : (
                  <Text style={{ fontStyle: "italic" }}>Sin imagen</Text>
                )}

                <SingleButton title="Eliminar Usuario" customPress={eliminarUsuario} />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeleteUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  resultLabel: {
    fontWeight: "bold",
  },
  resultValue: {
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 8,
  },
});
