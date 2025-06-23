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
} from "react-native";
import InputText from "../components/InputText.js";
import SingleButton from "../components/SingleButton.js";

const RegisterMaterialReciclable = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");

  const clearData = () => {
    setNombre("");
    setCategoria("");
    setImagen("");
  };

  const RegisterMaterialReciclable = async () => {
    if (!nombre || !categoria || !imagen) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    try {
      const materialReciclable = {
        nombre,
        categoria,
        imagen,
      };

      await AsyncStorage.setItem(
        nombre.trim().toLowerCase(),
        JSON.stringify(materialReciclable)
      );
      clearData();
      Alert.alert("Éxito", "Material Reciclable registrado correctamente");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el Material Reciclable");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <View style={styles.container}>
                <Text style={styles.title}>Registrar Material Reciclable</Text>
                <InputText
                  style={styles.input}
                  placeholder="Nombre del Material Reciclable"
                  value={nombre}
                  onChangeText={setNombre}
                />
                <InputText
                  style={styles.input}
                  placeholder="Categoria"
                  value={categoria}
                  onChangeText={setCategoria}
                />

                <InputText
                  style={styles.input}
                  placeholder="URL de la Imagen"
                  value={imagen}
                  onChangeText={setImagen}
                />

                <SingleButton
                  title="Guardar Material Reciclable"
                  customPress={RegisterMaterialReciclable}
                />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default RegisterMaterialReciclable;
