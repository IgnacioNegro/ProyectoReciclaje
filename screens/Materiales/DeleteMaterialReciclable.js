import React, { useState } from "react";
import {
  Alert,
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
import {
  deleteMaterialByNombre,
  getMaterialByNombre,
} from "../../database/materialService";

const DeleteMaterialReciclable = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [materialEncontrado, setMaterialEncontrado] = useState(null);

  const buscarMaterial = async () => {
    const clave = nombre.trim().toLowerCase();
    if (!clave) {
      Alert.alert("Error", "Por favor ingrese el nombre del material");
      return;
    }

    try {
      const encontrado = await getMaterialByNombre(clave);

      if (!encontrado) {
        Alert.alert(
          "No encontrado",
          "No se encontró un material con ese nombre"
        );
        setMaterialEncontrado(null);
        return;
      }

      setMaterialEncontrado(encontrado);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al buscar el material");
    }
  };

  const eliminarMaterial = () => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro que querés eliminar el material "${materialEncontrado.nombre}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteMaterialByNombre(materialEncontrado.nombre);
              Alert.alert("Éxito", "Material eliminado correctamente");
              setNombre("");
              setMaterialEncontrado(null);
              navigation.goBack();
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "No se pudo eliminar el material");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Buscar Material</Text>
            <InputText
              placeholder="Nombre del material"
              value={nombre}
              onChangeText={setNombre}
              style={styles.input}
            />
            <SingleButton title="Buscar" customPress={buscarMaterial} />

            {materialEncontrado && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Categoría:</Text>
                <Text style={styles.resultValue}>
                  {materialEncontrado.categoria}
                </Text>

                {materialEncontrado.imagen ? (
                  <Image
                    source={{ uri: materialEncontrado.imagen }}
                    style={styles.image}
                  />
                ) : (
                  <Text style={{ fontStyle: "italic" }}>Sin imagen</Text>
                )}

                <SingleButton
                  title="Eliminar Material"
                  customPress={eliminarMaterial}
                />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeleteMaterialReciclable;

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
  image: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 8,
  },
});
