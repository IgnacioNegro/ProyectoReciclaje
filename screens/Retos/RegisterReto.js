import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
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

const RegisterReto = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [puntajeAsignado, setPuntajeAsignado] = useState("");
  const [estado, setEstado] = useState("Pendiente");

  const clearData = () => {
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setFechaLimite("");
    setPuntajeAsignado("");
    setEstado("Pendiente");
  };

  const categorias = [
    "Papel",
    "Plastico",
    "Electronico",
    "Metal",
    "Textil",
    "Orgánico",
    "Otro",
  ];

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
        puntajeAsignado: parseInt(puntajeAsignado),
        estado, // <-- Estado agregado aquí
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

            {/* Selector de Estado */}
            <Text style={styles.label}>Estado del reto:</Text>
            <View style={styles.optionsContainer}>
              {["Pendiente", "Aprobado", "Rechazado"].map((estadoItem) => (
                <TouchableOpacity
                  key={estadoItem}
                  style={[
                    styles.optionButton,
                    estado === estadoItem && styles.optionSelected,
                  ]}
                  onPress={() => setEstado(estadoItem)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      estado === estadoItem && styles.optionTextSelected,
                    ]}
                  >
                    {estadoItem}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

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
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: "row",
    marginBottom: 15,
    flexWrap: "wrap",
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
});
