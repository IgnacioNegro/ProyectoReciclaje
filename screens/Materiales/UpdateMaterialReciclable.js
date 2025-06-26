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
import InputText from "../../components/InputText.js";
import MyText from "../../components/MyText.js";
import SingleButton from "../../components/SingleButton.js";

const UpdateMaterialReciclable = () => {
  const [nombreBusqueda, setNombreBusqueda] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");

  const searchMaterialReciclable = async () => {
    if (!nombreBusqueda.trim()) {
      Alert.alert("El nombre del material reciclable es requerido!");
      return;
    }

    try {
      const claveValor = nombreBusqueda.trim().toLowerCase();

      const data = await AsyncStorage.getItem("materiales");
      const materiales = data ? JSON.parse(data) : [];

      const materialEncontrado = materiales.find(
        (mat) => mat.nombre.toLowerCase() === claveValor
      );

      if (materialEncontrado) {
        setNombre(materialEncontrado.nombre);
        setCategoria(materialEncontrado.categoria);
        setImagen(materialEncontrado.imagen);
      } else {
        Alert.alert("Material Reciclable no encontrado!");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error al buscar Material.");
    }
  };

  const updateMaterialReciclable = async () => {
    if (
      !nombre.trim() ||
      !categoria.trim() ||
      !imagen.trim() ||
      !nombreBusqueda.trim()
    ) {
      Alert.alert("Por favor completa todos los campos");
      return;
    }

    try {
      const claveValor = nombreBusqueda.trim().toLowerCase();

      const data = await AsyncStorage.getItem("materiales");
      let materiales = data ? JSON.parse(data) : [];

      const index = materiales.findIndex(
        (mat) => mat.nombre.toLowerCase() === claveValor
      );

      if (index === -1) {
        Alert.alert("Material no encontrado para actualizar");
        return;
      }

      // Actualizar el material en la posición encontrada
      materiales[index] = {
        nombre,
        categoria,
        imagen,
      };

      await AsyncStorage.setItem("materiales", JSON.stringify(materiales));

      Alert.alert("Material actualizado con éxito");
    } catch (error) {
      console.error(error);
      Alert.alert("Error al actualizar el material.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView behavior="padding">
              <MyText text="Buscar Material Reciclable" style={styles.text} />
              <InputText
                placeholder="Ingrese el nombre del material reciclable a buscar"
                style={styles.inputStyle}
                onChangeText={(text) => setNombreBusqueda(text)}
                value={nombreBusqueda}
              />

              <SingleButton
                title="Buscar"
                customPress={searchMaterialReciclable}
              />
              <InputText
                placeholder="Ingrese la categoría del material reciclable"
                value={categoria}
                onChangeText={(text) => setCategoria(text)}
              />

              <InputText
                placeholder="Ingrese la URL de la imagen"
                value={imagen}
                onChangeText={(text) => setImagen(text)}
              />
              <SingleButton
                title="Actualizar"
                customPress={updateMaterialReciclable}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateMaterialReciclable;

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
