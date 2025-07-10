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

import {
  getAllRetos,
  updateReto as updateRetoInDB,
} from "../../database/retoService";

const UpdateReto = () => {
  const [tituloSearch, setTituloSearch] = useState("");
  const [originalRetoId, setOriginalRetoId] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [imagen, setImagen] = useState("");

  const clearForm = () => {
    setTituloSearch("");
    setOriginalRetoId(null);
    setTitulo("");
    setDescripcion("");
    setFechaInicio("");
    setFechaFin("");
    setImagen("");
  };

  const searchReto = () => {
    if (!tituloSearch.trim()) {
      Alert.alert("Error", "El título del reto es requerido.");
      return;
    }

    try {
      const retosData = getAllRetos(); // síncrono
      const retoFound = retosData.find(
        (r) =>
          typeof r.titulo === "string" &&
          r.titulo.toLowerCase() === tituloSearch.trim().toLowerCase()
      );

      if (!retoFound) {
        Alert.alert("Reto no encontrado");
        clearForm();
        return;
      }

      setOriginalRetoId(retoFound.id);
      setTitulo(retoFound.titulo);
      setDescripcion(retoFound.descripcion);
      setFechaInicio(retoFound.fechaInicio);
      setFechaFin(retoFound.fechaFin);
      setImagen(retoFound.imagen);
    } catch (error) {
      console.error(error);
      Alert.alert("Error al buscar el reto");
    }
  };

  const updateReto = () => {
    if (
      !titulo.trim() ||
      !descripcion.trim() ||
      !fechaInicio.trim() ||
      !fechaFin.trim() ||
      !imagen.trim()
    ) {
      Alert.alert("Error", "Todos los campos son requeridos.");
      return;
    }

    if (!originalRetoId) {
      Alert.alert("Error", "Primero busque un reto para actualizar.");
      return;
    }

    Alert.alert(
      "Confirmar actualización",
      `¿Desea actualizar el reto "${titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Actualizar",
          onPress: () => {
            try {
              const updatedReto = {
                id: originalRetoId,
                titulo,
                descripcion,
                fechaInicio,
                fechaFin,
                imagen,
              };

              updateRetoInDB(updatedReto); // síncrono

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
        <View style={styles.generalView}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView behavior="padding" style={{ padding: 20 }}>
              <MyText text="Buscar Reto" style={styles.text} />
              <InputText
                placeholder="Ingrese el título del Reto"
                style={styles.input}
                onChangeText={setTituloSearch}
                value={tituloSearch}
              />
              <SingleButton title="Buscar" customPress={searchReto} />

              {originalRetoId && (
                <>
                  <InputText
                    placeholder="Título"
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
                  <InputText
                    placeholder="URL de imagen"
                    value={imagen}
                    onChangeText={setImagen}
                  />
                  <SingleButton title="Actualizar" customPress={updateReto} />
                </>
              )}
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateReto;

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewContainer: { flex: 1, backgroundColor: "white" },
  generalView: { flex: 1 },
  text: { padding: 10, marginLeft: 5, color: "black", fontWeight: "bold" },
  input: { marginVertical: 8, paddingHorizontal: 10 },
});
