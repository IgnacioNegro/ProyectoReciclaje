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

const ViewAllMaterialReciclable = ({ navigation }) => {
  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const data = await AsyncStorage.getItem("materiales");
        const materialesList = data ? JSON.parse(data) : [];

        if (materialesList.length > 0) {
          setMateriales(materialesList);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay Materiales Reciclables!!!",
            [{ text: "OK", onPress: () => navigation.navigate("HomeScreen") }],
            { cancelable: false }
          );
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error al cargar materiales reciclables!");
      }
    };
    fetchMateriales();
  }, []);

  const clearMaterials = () => {
    Alert.alert(
      "Confirmar",
      "¿Seguro que quieres borrar todos los materiales reciclables? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, borrar todo",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("materiales");
              setMateriales([]); // Limpia la lista en pantalla
              Alert.alert("Materiales reciclables borrados correctamente");
              navigation.navigate("HomeScreen");
            } catch (e) {
              console.error("Error borrando materiales reciclables:", e);
              Alert.alert("Error al borrar materiales reciclables");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const listItemView = (item) => {
    return (
      <View key={item.nombre} style={styles.listItemView}>
        <MyText text="Nombre del Material:" style={styles.text} />
        <MyText text={item.nombre} style={styles.text} />
        <MyText text="Categoría: " style={styles.text} />
        <MyText text={item.categoria} style={styles.text} />
        <MyText text="Imagen: " style={styles.text} />
        <MyText text={item.imagen} style={styles.text} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={materiales}
          keyExtractor={(item) => item.nombre}
          renderItem={({ item }) => listItemView(item)}
          ListEmptyComponent={
            <MyText
              text="No hay materiales para mostrar."
              style={{ textAlign: "center", marginTop: 20 }}
            />
          }
        />

        <View style={styles.listView}>
          <MyText
            text="Total de Materiales Reciclables: "
            style={styles.text}
          />
          <MyText text={materiales.length.toString()} style={styles.text} />
        </View>

        <View style={styles.clearButtonContainer}>
          <Button
            title="Borrar todos los materiales reciclables"
            color="red"
            onPress={clearMaterials}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllMaterialReciclable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {
    marginTop: 20,
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
    alignContent: "center",
    alignItems: "center",
  },
  clearButtonContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
});
