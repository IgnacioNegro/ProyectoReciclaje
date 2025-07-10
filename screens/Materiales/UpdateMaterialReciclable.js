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
  getMaterialByNombre,
  updateMaterial,
} from "../../database/materialService.js";

const UpdateMaterialReciclable = () => {
  const [nombreBusqueda, setNombreBusqueda] = useState("");
  const [materialId, setMaterialId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");

  const searchMaterialReciclable = async () => {
    const claveValor = nombreBusqueda.trim().toLowerCase();

    if (!claveValor) {
      Alert.alert("Error", "Ingrese un nombre válido para buscar.");
      return;
    }

    try {
      const materialEncontrado = await getMaterialByNombre(claveValor);

      if (materialEncontrado) {
        setMaterialId(materialEncontrado.id); // guardamos el ID para actualizar luego
        setNombre(materialEncontrado.nombre);
        setCategoria(materialEncontrado.categoria);
        setImagen(materialEncontrado.imagen);
      } else {
        Alert.alert("Material reciclable no encontrado.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error al buscar el material reciclable.");
    }
  };

  const updateMaterialReciclable = async () => {
    const nombreTrim = nombre.trim();
    const categoriaTrim = categoria.trim();
    const imagenTrim = imagen.trim();

    if (!materialId) {
      Alert.alert("Error", "Primero debe buscar un material para actualizar.");
      return;
    }

    if (!nombreTrim || !categoriaTrim || !imagenTrim) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    Alert.alert(
      "Confirmar actualización",
      `¿Desea actualizar el material "${nombreTrim}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Actualizar",
          onPress: async () => {
            try {
              await updateMaterial({
                id: materialId,
                nombre: nombreTrim,
                categoria: categoriaTrim,
                imagen: imagenTrim,
              });

              Alert.alert("Éxito", "Material actualizado con éxito.");
              clearFields();
            } catch (error) {
              console.error(error);
              Alert.alert("Error al actualizar el material.");
            }
          },
        },
      ]
    );
  };

  const clearFields = () => {
    setNombreBusqueda("");
    setMaterialId(null);
    setNombre("");
    setCategoria("");
    setImagen("");
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

              <SingleButton
                title="Buscar"
                customPress={searchMaterialReciclable}
              />

              {materialId && (
                <>
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

                  <SingleButton
                    title="Actualizar"
                    customPress={updateMaterialReciclable}
                  />
                </>
              )}
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
