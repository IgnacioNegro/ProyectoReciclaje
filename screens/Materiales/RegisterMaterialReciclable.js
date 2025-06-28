import AsyncStorage from "@react-native-async-storage/async-storage";
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
  TouchableOpacity,
  View,
} from "react-native";
import InputText from "../../components/InputText.js";
import SingleButton from "../../components/SingleButton.js";

const RegisterMaterialReciclable = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");

  const categorias = [
    "Papel",
    "Plastico",
    "Electronico",
    "Metal",
    "Textil",
    "Orgánico",
    "Otro",
  ];

  const clearData = () => {
    setNombre("");
    setCategoria("");
    setImagen("");
  };

  const registerMaterialReciclable = async () => {
    const nombreTrim = nombre.trim();
    const categoriaTrim = categoria.trim();
    const imagenTrim = imagen.trim();

    if (!nombreTrim) {
      Alert.alert("Error", "Por favor selecciona un nombre");
      return;
    }

    if (!categoriaTrim) {
      Alert.alert("Error", "Por favor selecciona una categoria");
      return;
    }

    if (!imagenTrim) {
      Alert.alert("Error", "Por favor selecciona una imagen");
      return;
    }
    
    try {
      const nuevoMaterial = {
        nombre: nombreTrim,
        categoria: categoriaTrim,
        imagen: imagenTrim,
      };

      const data = await AsyncStorage.getItem("materiales");
      const materiales = data ? JSON.parse(data) : [];

      const existe = materiales.some(
        (mat) => mat.nombre.toLowerCase() === nuevoMaterial.nombre.toLowerCase()
      );

      if (existe) {
        Alert.alert("Error", "Ya existe un material con ese nombre");
        return;
      }

      materiales.push(nuevoMaterial);
      await AsyncStorage.setItem("materiales", JSON.stringify(materiales));

      clearData();
      Alert.alert("Éxito", "Material Reciclable registrado correctamente", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo registrar el Material Reciclable");
    }
  };

  const elegirImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Registrar Material Reciclable</Text>
            <InputText
              placeholder="Nombre del material"
              value={nombre}
              onChangeText={setNombre}
              style={styles.input}
            />
            <Text style={styles.label}>Selecciona una categoría:</Text>
            <View style={styles.optionsContainer}>
              {categorias.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.optionButton,
                    categoria === cat && styles.optionSelected,
                  ]}
                  onPress={() => setCategoria(cat)}
                >
                  <Text
                    style={
                      categoria === cat
                        ? [styles.optionText, styles.optionTextSelected]
                        : styles.optionText
                    }
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button title="Seleccionar imagen" onPress={elegirImagen} />
            {imagen ? (
              <Image
                source={{ uri: imagen }}
                style={styles.imagePreview}
              />
            ) : (
              <Text style={{ fontStyle: "italic", marginTop: 10 }}>
                Ninguna imagen seleccionada
              </Text>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.footer}>
        <SingleButton
          title="Guardar Material Reciclable"
          customPress={registerMaterialReciclable}
        />
      </View>
    </SafeAreaView>
  );
};

export default RegisterMaterialReciclable;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  formContainer: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 8 },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  optionSelected: {
    backgroundColor: "#4caf50",
    borderColor: "#388e3c",
  },
  optionText: {
    color: "#333",
    fontWeight: "600",
  },
  optionTextSelected: {
    color: "white",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
});
