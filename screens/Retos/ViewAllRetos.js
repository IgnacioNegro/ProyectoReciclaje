import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import MyText from "../../components/MyText.js";

const ViewAllRetos = ({ navigation }) => {
  const [retos, setRetos] = useState([]);

  useEffect(() => {
    const fetchRetos = async () => {
      try {
        const data = await AsyncStorage.getItem("retos");
        const retosList = data ? JSON.parse(data) : [];

        if (retosList.length > 0) {
          setRetos(retosList);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay Retos!!!",
            [{ text: "OK", onPress: () => navigation.navigate("HomeScreen") }],
            { cancelable: false }
          );
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error al cargar retos!");
      }
    };
    fetchRetos();
  }, []);

  const clearStorage = async () => {
    Alert.alert(
      "Confirmar",
      "¿Seguro que quieres borrar todos los retos? Esta acción no se puede deshacer.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí, borrar todo",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("retos"); // Solo borrar la clave "retos"
              Alert.alert("Se borraron todos los retos");
              setRetos([]); // limpiar la lista en pantalla
              navigation.navigate("HomeScreen");
            } catch (e) {
              console.error("Error al borrar retos:", e);
              Alert.alert("Error al borrar los retos");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const listItemView = (item) => (
    <View key={item.nombre} style={styles.listItemView}>
      <MyText text="Nombre del Reto: " style={styles.text} />
      <MyText text={item.nombre} style={styles.text} />
      <MyText text="Descripción: " style={styles.text} />
      <MyText text={item.descripcion} style={styles.text} />
      <MyText text="Categoría: " style={styles.text} />
      <MyText text={item.categoria} style={styles.text} />
      <MyText text="Fecha Límite: " style={styles.text} />
      <MyText text={item.fechaLimite} style={styles.text} />
      <MyText text="Puntaje Asignado: " style={styles.text} />
      <MyText text={item.puntajeAsignado} style={styles.text} />
      <MyText text="------------------------" style={styles.text} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={retos}
          keyExtractor={(item) => item.nombre}
          renderItem={({ item }) => listItemView(item)}
          ListEmptyComponent={
            <MyText
              text="No hay retos para mostrar."
              style={{ textAlign: "center", marginTop: 20 }}
            />
          }
        />
        <View style={styles.clearButtonContainer}>
          <Button
            title="Borrar todos los retos"
            onPress={clearStorage}
            color="red"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllRetos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    padding: 5,
    marginLeft: 10,
    color: "black",
  },
  clearButtonContainer: {
    margin: 20,
  },
});
