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

const UpdateReto = () => {
  const [nombreBusqueda, setNombreBusqueda] = useState("");
  const [originalNombre, setOriginalNombre] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [puntajeAsignado, setPuntajeAsignado] = useState("");
  const [estado, setEstado] = useState("");

  const [retos, setRetos] = useState([]);

  const clearForm = () => {
    setNombreBusqueda("");
    setOriginalNombre("");
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setFechaLimite("");
    setPuntajeAsignado("");
    setEstado("");
    setRetos([]);
  };

  const searchReto = async () => {
    if (!nombreBusqueda.trim()) {
      Alert.alert("Error", "Ingrese el nombre del reto para buscar.");
      return;
    }
    try {
      const data = await AsyncStorage.getItem("retos");
      const retosData = data ? JSON.parse(data) : [];

      const retoEncontrado = retosData.find(
        (r) => r.nombre.toLowerCase() === nombreBusqueda.trim().toLowerCase()
      );

      if (!retoEncontrado) {
        Alert.alert("Reto no encontrado");
        clearForm();
        return;
      }

      setOriginalNombre(retoEncontrado.nombre);
      setNombre(retoEncontrado.nombre);
      setDescripcion(retoEncontrado.descripcion);
      setCategoria(retoEncontrado.categoria);
      setFechaLimite(retoEncontrado.fechaLimite);
      setPuntajeAsignado(String(retoEncontrado.puntajeAsignado));
      setEstado(retoEncontrado.estado);
      setRetos(retosData);
    } catch (error) {
      console.error(error);
      Alert.alert("Error al buscar reto");
    }
  };

  const updateReto = () => {
    if (
      !nombre.trim() ||
      !descripcion.trim() ||
      !categoria.trim() ||
      !fechaLimite.trim() ||
      !puntajeAsignado.trim() ||
      !estado.trim()
    ) {
      Alert.alert("Error", "Todos los campos son requeridos.");
      return;
    }

    const puntajeNum = parseInt(puntajeAsignado);
    if (isNaN(puntajeNum) || puntajeNum < 1 || puntajeNum > 10) {
      Alert.alert("Error", "El puntaje asignado debe estar entre 1 y 10.");
      return;
    }

    Alert.alert(
      "Confirmar actualización",
      `¿Desea actualizar el reto "${originalNombre}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Actualizar",
          onPress: async () => {
            try {
              const index = retos.findIndex(
                (r) => r.nombre.toLowerCase() === originalNombre.toLowerCase()
              );
              if (index === -1) {
                Alert.alert("Error", "Reto no encontrado para actualizar.");
                return;
              }

              retos[index] = {
                nombre,
                descripcion,
                categoria,
                fechaLimite,
                puntajeAsignado: puntajeNum,
                estado,
              };

              await AsyncStorage.setItem("retos", JSON.stringify(retos));
              Alert.alert("Éxito", "Reto actualizado correctamente.");
              clearForm();
            } catch (error) {
              console.error(error);
              Alert.alert("Error al actualizar el reto.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={{ padding: 20 }}>
            <MyText text="Buscar Reto" style={styles.text} />
            <InputText
              placeholder="Ingrese nombre del reto"
              style={styles.input}
              onChangeText={setNombreBusqueda}
              value={nombreBusqueda}
            />
            <SingleButton title="Buscar" customPress={searchReto} />

            {/* Muestra inputs solo si encontro el reto */}
            {originalNombre ? (
              <>
                <InputText placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                <InputText
                  placeholder="Descripción"
                  value={descripcion}
                  onChangeText={setDescripcion}
                />
                <InputText
                  placeholder="Categoría"
                  value={categoria}
                  onChangeText={setCategoria}
                />
                <InputText
                  placeholder="Fecha Límite (YYYY-MM-DD)"
                  value={fechaLimite}
                  onChangeText={setFechaLimite}
                />
                <InputText
                  placeholder="Puntaje Asignado (1-10)"
                  keyboardType="numeric"
                  value={puntajeAsignado}
                  onChangeText={setPuntajeAsignado}
                />
                <InputText placeholder="Estado" value={estado} onChangeText={setEstado} />

                <SingleButton title="Actualizar" customPress={updateReto} />
              </>
            ) : null}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UpdateReto;

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewContainer: { flex: 1, backgroundColor: "white" },
  text: { padding: 10, marginLeft: 5, color: "black", fontWeight: "bold" },
  input: { marginVertical: 8, paddingHorizontal: 10 },
});
