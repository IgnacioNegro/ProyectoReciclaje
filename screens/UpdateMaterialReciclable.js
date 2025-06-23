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
      const materialReciclable = await AsyncStorage.getItem(nombreBusqueda);
      if (materialReciclable) {
        const retoData = JSON.parse(materialReciclable);
        setNombre(retoData.nombre);
        setCategoria(retoData.categoria);
        setImagen(retoData.imagen);
      } else {
        Alert.alert("Material Reciclable no encontrado!");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error al buscar Material.");
    }
  };

  const UpdateMaterialReciclable = async () => {
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
      const materialReciclable = {
        nombre,
        categoria,
        imagen,
      };
      await AsyncStorage.setItem(nombre, JSON.stringify(materialReciclable));
      Alert.alert("Material actualizado");
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
                customPress={UpdateMaterialReciclable}
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
