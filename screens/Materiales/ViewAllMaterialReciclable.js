import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import MyText from "../../components/MyText.js";

import {
  deleteMaterialByNombre,
  getAllMateriales,
} from "../../database/materialService.js";

const ViewAllMateriales = ({ navigation }) => {
  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    fetchMateriales();
  }, []);

  const fetchMateriales = async () => {
    try {
      const materialesData = await getAllMateriales();

      if (materialesData.length > 0) {
        setMateriales(materialesData);
      } else {
        Alert.alert(
          "Mensaje",
          "No hay materiales reciclables",
          [{ text: "OK", onPress: () => navigation.goBack() }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error al cargar los materiales reciclables!");
    }
  };

  const eliminarMaterial = (nombre) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro que querés eliminar el material "${nombre}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteMaterialByNombre(nombre);
              await fetchMateriales();
              Alert.alert("Material eliminado correctamente");
            } catch (error) {
              console.error(error);
              Alert.alert("Error al eliminar el material");
            }
          },
        },
      ]
    );
  };

  const listItemView = (item) => (
    <View key={item.id} style={styles.listItemView}>
      {item.imagen ? (
        <Image source={{ uri: item.imagen }} style={styles.materialImage} />
      ) : null}

      <MyText text={item.nombre} style={styles.titulo} />
      <MyText text="Descripción:" style={styles.label} />
      <MyText text={item.descripcion} style={styles.text} />

      <MyText text="Categoría:" style={styles.label} />
      <MyText text={item.categoria} style={styles.text} />

      <View style={styles.buttonContainer}>
        <Button
          title="Eliminar"
          color="red"
          onPress={() => eliminarMaterial(item.nombre)}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={materiales}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => listItemView(item)}
          ListEmptyComponent={
            <MyText
              text="No hay materiales reciclables para mostrar."
              style={styles.emptyText}
            />
          }
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewAllMateriales;

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewContainer: { flex: 1, backgroundColor: "white" },
  listItemView: {
    backgroundColor: "white",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  materialImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  label: {
    fontWeight: "bold",
    color: "black",
    marginTop: 5,
  },
  text: {
    marginTop: 2,
    color: "black",
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#444",
  },
  buttonContainer: {
    marginTop: 10,
    width: "80%",
  },
});
