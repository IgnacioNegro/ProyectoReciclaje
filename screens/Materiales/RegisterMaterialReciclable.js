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
import InputText from "../../components/InputText.js";
import SingleButton from "../../components/SingleButton.js";

const RegisterMaterialReciclable = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");

  const clearData = () => {
    setNombre("");
    setCategoria("");
    setImagen("");
  };

  const registerMaterialReciclable = async () => {
    if (!nombre.trim() || !categoria.trim() || !imagen.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    try {
      const nuevoMaterial = {
        nombre: nombre.trim(),
        categoria: categoria.trim(),
        imagen: imagen.trim(),
      };

      // Obtener la lista actual o crear una vacía
      const data = await AsyncStorage.getItem("materiales");
      const materiales = data ? JSON.parse(data) : [];

      // Verificar que no exista un material con el mismo nombre (único)
      const existe = materiales.some(
        (mat) => mat.nombre.toLowerCase() === nuevoMaterial.nombre.toLowerCase()
      );

      if (existe) {
        Alert.alert("Error", "Ya existe un material con ese nombre");
        return;
      }

      // Agregar nuevo material y guardar
      materiales.push(nuevoMaterial);
      await AsyncStorage.setItem("materiales", JSON.stringify(materiales));

      clearData();
      Alert.alert("Éxito", "Material Reciclable registrado correctamente");
      navigation.goBack();
    } catch (error) {
      console.error(error);
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
                  placeholder="Categoría"
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
                  customPress={registerMaterialReciclable}
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
