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
  deleteRetoByTitulo,
  getRetoByTitulo,
} from "../../database/retoService";

const DeleteReto = ({ navigation }) => {
  const [titulo, setTitulo] = useState("");
  const [retoEncontrado, setRetoEncontrado] = useState(null);

  const buscarReto = async () => {
    const clave = titulo.trim().toLowerCase();
    if (!clave) {
      Alert.alert("Error", "Por favor ingrese el título del reto");
      return;
    }

    try {
      const encontrado = await getRetoByTitulo(clave);

      if (!encontrado) {
        Alert.alert("No encontrado", "No se encontró un reto con ese título");
        setRetoEncontrado(null);
        return;
      }

      setRetoEncontrado(encontrado);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al buscar el reto");
    }
  };

  const eliminarReto = () => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro que querés eliminar el reto "${retoEncontrado.titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteRetoByTitulo(retoEncontrado.titulo);
              Alert.alert("Éxito", "Reto eliminado correctamente");
              setTitulo("");
              setRetoEncontrado(null);
              navigation.goBack();
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "No se pudo eliminar el reto");
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
            <Text style={styles.title}>Buscar Reto</Text>
            <InputText
              placeholder="Título del reto"
              value={titulo}
              onChangeText={setTitulo}
              style={styles.input}
            />
            <SingleButton title="Buscar" customPress={buscarReto} />

            {retoEncontrado && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Descripción:</Text>
                <Text style={styles.resultValue}>
                  {retoEncontrado.descripcion}
                </Text>

                <Text style={styles.resultLabel}>Fecha de Inicio:</Text>
                <Text style={styles.resultValue}>
                  {retoEncontrado.fechaInicio}
                </Text>

                <Text style={styles.resultLabel}>Fecha de Fin:</Text>
                <Text style={styles.resultValue}>
                  {retoEncontrado.fechaFin}
                </Text>

                {retoEncontrado.imagen ? (
                  <Image
                    source={{ uri: retoEncontrado.imagen }}
                    style={styles.image}
                  />
                ) : (
                  <Text style={{ fontStyle: "italic" }}>Sin imagen</Text>
                )}

                <SingleButton
                  title="Eliminar Reto"
                  customPress={eliminarReto}
                />
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
  image: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 8,
  },
});
