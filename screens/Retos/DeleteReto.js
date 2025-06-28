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

const DeleteReto = ({ navigation }) => {
  const [nombreBuscar, setNombreBuscar] = useState("");
  const [retoEncontrado, setRetoEncontrado] = useState(null);

  const buscarReto = async () => {
    const clave = nombreBuscar.trim().toLowerCase();
    if (!clave) {
      Alert.alert("Error", "Por favor ingresa el nombre del reto a buscar");
      return;
    }

    try {
      const data = await AsyncStorage.getItem("retos");
      const retos = data ? JSON.parse(data) : [];

      const encontrado = retos.find(
        (r) => r.nombre.toLowerCase() === clave
      );

      if (!encontrado) {
        Alert.alert("No encontrado", "No se encontró ningún reto con ese nombre");
        setRetoEncontrado(null);
        return;
      }

      setRetoEncontrado(encontrado);
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al buscar el reto");
      console.error(error);
    }
  };

  const eliminarReto = () => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás segura que querés eliminar el reto "${retoEncontrado.nombre}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: eliminarConfirmado },
      ]
    );
  };

  const eliminarConfirmado = async () => {
    try {
      const data = await AsyncStorage.getItem("retos");
      const retos = data ? JSON.parse(data) : [];

      const nuevosRetos = retos.filter(
        (r) => r.nombre.toLowerCase() !== retoEncontrado.nombre.toLowerCase()
      );

      await AsyncStorage.setItem("retos", JSON.stringify(nuevosRetos));
      Alert.alert("Éxito", "Reto eliminado correctamente");
      setNombreBuscar("");
      setRetoEncontrado(null);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el reto");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Buscar Reto</Text>
            <InputText
              placeholder="Nombre del reto"
              value={nombreBuscar}
              onChangeText={setNombreBuscar}
              style={styles.input}
            />
            <SingleButton title="Buscar" customPress={buscarReto} />

            {retoEncontrado && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Nombre:</Text>
                <Text style={styles.resultValue}>{retoEncontrado.nombre}</Text>

                <Text style={styles.resultLabel}>Descripción:</Text>
                <Text style={styles.resultValue}>{retoEncontrado.descripcion}</Text>

                <Text style={styles.resultLabel}>Categoría:</Text>
                <Text style={styles.resultValue}>{retoEncontrado.categoria}</Text>

                <Text style={styles.resultLabel}>Fecha límite:</Text>
                <Text style={styles.resultValue}>{retoEncontrado.fechaLimite}</Text>

                <Text style={styles.resultLabel}>Puntaje asignado:</Text>
                <Text style={styles.resultValue}>{retoEncontrado.puntajeAsignado}</Text>

                <Text style={styles.resultLabel}>Estado:</Text>
                <Text style={styles.resultValue}>{retoEncontrado.estado}</Text>

                <SingleButton title="Eliminar Reto" customPress={eliminarReto} />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeleteReto;

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
  resultContainer: {
    marginTop: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  resultLabel: {
    fontWeight: "bold",
  },
  resultValue: {
    marginBottom: 10,
  },
});
