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

const RegisterReto = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fechaLimite, setFechaFin] = useState("");
  const [puntajeAsignado, setPuntajeAsignado] = useState("");

  const clearData = () => {
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setFechaFin("");
    setPuntajeAsignado("");
  };

  const registerReto = async () => {
    if (
      !nombre ||
      !descripcion ||
      !categoria ||
      !fechaLimite ||
      !puntajeAsignado
    ) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    try {
      const reto = {
        nombre,
        descripcion,
        categoria,
        fechaLimite,
        puntajeAsignado,
      };

      await AsyncStorage.setItem(
        nombre.trim().toLowerCase(),
        JSON.stringify(reto)
      );
      clearData();
      Alert.alert("Éxito", "Reto registrado correctamente");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el reto");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <View style={styles.container}>
                <Text style={styles.title}>Registrar Reto</Text>
                <InputText
                  style={styles.input}
                  placeholder="Nombre del reto"
                  value={nombre}
                  onChangeText={setNombre}
                />
                <InputText
                  style={styles.input}
                  placeholder="Descripción"
                  value={descripcion}
                  onChangeText={setDescripcion}
                />
                <InputText
                  style={styles.input}
                  placeholder="Categoría"
                  value={categoria}
                  onChangeText={setCategoria}
                />
                <InputText
                  style={styles.input}
                  placeholder="Fecha Límite (YYYY-MM-DD)"
                  value={fechaLimite}
                  onChangeText={setFechaFin}
                />
                <InputText
                  style={styles.input}
                  placeholder="Puntaje Asignado"
                  value={puntajeAsignado}
                  onChangeText={setPuntajeAsignado}
                  keyboardType="numeric"
                />
                <SingleButton title="Guardar Reto" customPress={registerReto} />
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

export default RegisterReto;
