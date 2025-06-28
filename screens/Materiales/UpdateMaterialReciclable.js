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
    const claveValor = nombreBusqueda.trim().toLowerCase();

    if (!claveValor) {
      Alert.alert("Error", "Ingrese un nombre valido para buscar.");
      return;
    }

    try {
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
        Alert.alert("Material Reciclable no encontrado");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error al buscar el material reciclable.");
    }
  };

  const updateMaterialReciclable = () => {
    const nombreBusquedaTrim = nombreBusqueda.trim();
    const nombreTrim = nombre.trim();
    const categoriaTrim = categoria.trim();
    const imagenTrim = imagen.trim();

    if (!nombreBusquedaTrim) {
      Alert.alert("Error", "Ingrese un nombre válido).");
      return;
    }
    
    if (!categoriaTrim) {
      Alert.alert("Error", "Por favor ingrese la categoria.");
      return;
    }

    if (!imagenTrim) {
      Alert.alert("Error", "Por favor ingrese la URL de la imagen.");
      return;
    }

    Alert.alert(
      "Confirmar actualización",
      `¿Desea actualizar el material "${nombreBusquedaTrim}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Actualizar",
          onPress: async () => {
            try {
              const data = await AsyncStorage.getItem("materiales");
              let materiales = data ? JSON.parse(data) : [];

              const index = materiales.findIndex(
                (mat) => mat.nombre.toLowerCase() === nombreBusquedaTrim.toLowerCase()
              );

              if (index === -1) {
                Alert.alert("Error", "Material no encontrado para actualizar.");
                return;
              }

              materiales[index] = {
                nombre: nombreTrim,
                categoria: categoriaTrim,
                imagen: imagenTrim,
              };

              await AsyncStorage.setItem("materiales", JSON.stringify(materiales));

              Alert.alert("Éxito", "Material actualizado con éxito.");
            } catch (error) {
              console.error(error);
              Alert.alert("Error al actualizar el material.");
            }
          },
        },
      ]
    );
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
                onChangeText={setNombreBusqueda}
                value={nombreBusqueda}
              />

              <SingleButton title="Buscar" customPress={searchMaterialReciclable} />

              <InputText
                placeholder="Nuevo nombre del material"
                value={nombre}
                onChangeText={setNombre}
              />
              <InputText
                placeholder="Nueva categoría del material"
                value={categoria}
                onChangeText={setCategoria}
              />
              <InputText
                placeholder="Nueva URL de imagen"
                value={imagen}
                onChangeText={setImagen}
              />

              <SingleButton title="Actualizar" customPress={updateMaterialReciclable} />
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
});
