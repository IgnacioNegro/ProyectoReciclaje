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
import db from "../../database/db";
import {
  addReto,
  getAllRetos,
  initRetoTable,
} from "../../database/retoService";

const RegisterReto = ({ navigation }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  // Para fechas, opcional
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

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
    setTitulo("");
    setDescripcion("");
    setImagen("");
    setFechaInicio("");
    setFechaFin("");
  };

  const guardarReto = () => {
    const tituloTrim = titulo.trim();
    const descripcionTrim = descripcion.trim();
    const imagenTrim = imagen.trim();
    const fechaInicioTrim = fechaInicio.trim();
    const fechaFinTrim = fechaFin.trim();

    if (
      !tituloTrim ||
      !descripcionTrim ||
      !imagenTrim ||
      !fechaInicioTrim ||
      !fechaFinTrim
    ) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    try {
      const retos = getAllRetos(); // función síncrona
      const existe = retos.some(
        (r) => r.titulo && r.titulo.toLowerCase() === tituloTrim.toLowerCase()
      );

      if (existe) {
        Alert.alert("Error", "Ya existe un reto con ese título.");
        return;
      }

      const nuevoReto = {
        titulo: tituloTrim,
        descripcion: descripcionTrim,
        imagen: imagenTrim,
        fechaInicio: fechaInicioTrim,
        fechaFin: fechaFinTrim,
      };

      addReto(nuevoReto); // función síncrona
      Alert.alert("Éxito", "Reto registrado correctamente");
      clearFields();
      navigation.goBack();
    } catch (error) {
      console.error("Error al registrar reto:", error);
      Alert.alert("Error", "No se pudo registrar el reto.");
    }
  };

  const resetTable = () => {
    Alert.alert(
      "Confirmar reinicio",
      "¿Querés borrar todos los retos y reiniciar la tabla? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: () => {
            try {
              db.execSync("DROP TABLE IF EXISTS RETOS;");
              initRetoTable();
              Alert.alert("Tabla reiniciada correctamente");
              clearFields();
            } catch (error) {
              console.error(error);
              Alert.alert("Error al reiniciar la tabla");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.form}>
          <InputText
            placeholder="Título del reto"
            value={titulo}
            onChangeText={setTitulo}
          />
          <InputText
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
          />
          <InputText
            placeholder="Fecha Inicio (YYYY-MM-DD)"
            value={fechaInicio}
            onChangeText={setFechaInicio}
          />
          <InputText
            placeholder="Fecha Fin (YYYY-MM-DD)"
            value={fechaFin}
            onChangeText={setFechaFin}
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

          <View style={{ marginVertical: 10 }}>
            <Button
              title="Reiniciar Tabla RETOS"
              color="red"
              onPress={resetTable}
            />
          </View>
          <SingleButton title="Guardar Reto" customPress={guardarReto} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterReto;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  form: { padding: 20 },
  imagePreview: {
    height: 200,
    backgroundColor: "#eee",
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  image: { width: "100%", height: "100%", borderRadius: 10 },
  placeholder: { color: "#999" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
});
