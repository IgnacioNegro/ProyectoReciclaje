import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import InputText from "../../components/InputText";
import SingleButton from "../../components/SingleButton";
import { addMaterial, getAllMateriales } from "../../database/materialService";

const RegisterMaterialReciclable = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");

  const pickFromGallery = async () => {
    const permisos = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permisos.granted) {
      Alert.alert("Permisos requeridos", "Habilitá acceso a la galería.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permisos = await ImagePicker.requestCameraPermissionsAsync();
    if (!permisos.granted) {
      Alert.alert("Permisos requeridos", "Habilitá acceso a la cámara.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });
    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const clearFields = () => {
    setNombre("");
    setCategoria("");
    setImagen("");
  };

  const registerMaterial = async () => {
    const nombreTrim = nombre.trim();
    const categoriaTrim = categoria.trim();
    const imagenTrim = imagen.trim();

    if (!nombreTrim || !categoriaTrim || !imagenTrim) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    try {
      const materiales = await getAllMateriales();
      const existe = materiales.some(
        (m) => m.nombre.toLowerCase() === nombreTrim.toLowerCase()
      );

      if (existe) {
        Alert.alert("Error", "Ya existe un material con ese nombre.");
        return;
      }

      const nuevoMaterial = {
        nombre: nombreTrim,
        categoria: categoriaTrim,
        imagen: imagenTrim,
      };

      await addMaterial(nuevoMaterial);
      Alert.alert("Éxito", "Material registrado correctamente");
      clearFields();
      navigation.goBack();
    } catch (error) {
      console.error("Error al registrar material:", error);
      Alert.alert("Error", "No se pudo registrar el material.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.form}>
          <InputText
            placeholder="Nombre del material"
            value={nombre}
            onChangeText={setNombre}
          />
          <InputText
            placeholder="Categoría (papel, plástico, vidrio...)"
            value={categoria}
            onChangeText={setCategoria}
          />

          <View style={styles.imagePreview}>
            {imagen ? (
              <Image source={{ uri: imagen }} style={styles.image} />
            ) : (
              <Text style={styles.placeholder}>
                Ninguna imagen seleccionada
              </Text>
            )}
          </View>

          <View style={styles.buttonRow}>
            <Button title="Galería" onPress={pickFromGallery} />
            <View style={{ width: 10 }} />
            <Button title="Cámara" onPress={takePhoto} />
          </View>

          <SingleButton
            title="Guardar Material"
            customPress={registerMaterial}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterMaterialReciclable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  form: {
    padding: 20,
  },
  imagePreview: {
    height: 200,
    backgroundColor: "#eee",
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  placeholder: {
    color: "#999",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
});
