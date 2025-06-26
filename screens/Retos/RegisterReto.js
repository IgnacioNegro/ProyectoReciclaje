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

const RegisterReto = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [puntajeAsignado, setPuntajeAsignado] = useState("");

  const clearData = () => {
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setFechaLimite("");
    setPuntajeAsignado("");
  };

  const registerReto = async () => {
    if (
      !nombre.trim() ||
      !descripcion.trim() ||
      !categoria.trim() ||
      !fechaLimite.trim() ||
      !puntajeAsignado.trim()
    ) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    try {
      const data = await AsyncStorage.getItem("retos");
      const retos = data ? JSON.parse(data) : [];

      // Validar que no exista otro reto con el mismo nombre (case insensitive)
      const existeReto = retos.some(
        (r) => r.nombre.toLowerCase() === nombre.trim().toLowerCase()
      );
      if (existeReto) {
        Alert.alert("Error", "Ya existe un reto con ese nombre");
        return;
      }

      const nuevoReto = {
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        categoria: categoria.trim(),
        fechaLimite: fechaLimite.trim(),
        puntajeAsignado: puntajeAsignado.trim(),
      };

      retos.push(nuevoReto);
      await AsyncStorage.setItem("retos", JSON.stringify(retos));

      clearData();
      Alert.alert("Éxito", "Reto registrado correctamente", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Error al registrar reto:", error);
      Alert.alert("Error", "No se pudo registrar el reto");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Registrar Reto</Text>
            <InputText
              placeholder="Nombre del reto"
              value={nombre}
              onChangeText={setNombre}
              style={styles.input}
            />
            <InputText
              placeholder="Descripción"
              value={descripcion}
              onChangeText={setDescripcion}
              style={styles.input}
            />
            <InputText
              placeholder="Categoría"
              value={categoria}
              onChangeText={setCategoria}
              style={styles.input}
            />
            <InputText
              placeholder="Fecha Límite (YYYY-MM-DD)"
              value={fechaLimite}
              onChangeText={setFechaLimite}
              style={styles.input}
            />
            <InputText
              placeholder="Puntaje Asignado"
              value={puntajeAsignado}
              onChangeText={setPuntajeAsignado}
              keyboardType="numeric"
              style={styles.input}
            />
            <SingleButton title="Guardar Reto" customPress={registerReto} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterReto;

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
});
