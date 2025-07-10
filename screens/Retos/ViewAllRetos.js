import AsyncStorage from "@react-native-async-storage/async-storage";
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
  approveReto,
  deleteRetoByTitulo,
  getAllRetos,
  rejectReto,
} from "../../database/retoService.js";

const ViewAllRetos = ({ navigation }) => {
  const [retos, setRetos] = useState([]);
  const [tipoUsuario, setTipoUsuario] = useState(null);

  useEffect(() => {
    fetchRetos();
    loadTipoUsuario();
  }, []);

  const loadTipoUsuario = async () => {
    try {
      const tipo = await AsyncStorage.getItem("tipoUsuario");
      setTipoUsuario(tipo);
    } catch (error) {
      console.error("Error al cargar tipoUsuario:", error);
    }
  };

  const fetchRetos = async () => {
    try {
      const retosData = await getAllRetos();
      setRetos(retosData);
    } catch (error) {
      Alert.alert("Error al cargar los retos");
    }
  };

  const eliminarReto = (titulo) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro que querés eliminar el reto "${titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteRetoByTitulo(titulo);
              await fetchRetos();
              Alert.alert("Reto eliminado correctamente");
            } catch (error) {
              Alert.alert("Error al eliminar el reto");
            }
          },
        },
      ]
    );
  };

  const aprobarRetoHandler = (titulo) => {
    Alert.alert("Aprobar reto", `¿Desea aprobar el reto "${titulo}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Aprobar",
        onPress: async () => {
          try {
            await approveReto(titulo);
            Alert.alert("Reto aprobado");
            await fetchRetos();
          } catch (error) {
            Alert.alert("Error al aprobar reto");
          }
        },
      },
    ]);
  };

  const rechazarRetoHandler = (titulo) => {
    Alert.alert("Rechazar reto", `¿Desea rechazar el reto "${titulo}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Rechazar",
        onPress: async () => {
          try {
            await rejectReto(titulo);
            Alert.alert("Reto rechazado");
            await fetchRetos();
          } catch (error) {
            Alert.alert("Error al rechazar reto");
          }
        },
      },
    ]);
  };

  const listItemView = (item) => (
    <View key={item.id} style={styles.listItemView}>
      {item.imagen ? (
        <Image source={{ uri: item.imagen }} style={styles.retoImage} />
      ) : null}

      <MyText text={item.titulo} style={styles.titulo} />
      <MyText text="Descripción:" style={styles.label} />
      <MyText text={item.descripcion} style={styles.text} />

      <MyText text="Fecha Inicio:" style={styles.label} />
      <MyText text={item.fechaInicio} style={styles.text} />

      <MyText text="Fecha Fin:" style={styles.label} />
      <MyText text={item.fechaFin} style={styles.text} />

      <MyText text="Estado:" style={styles.label} />
      <MyText text={item.estado || "pendiente"} style={styles.text} />

      <View style={styles.buttonContainer}>
        {tipoUsuario === "superadmin" && (
          <>
            <Button
              title="Aprobar"
              color="green"
              onPress={() => aprobarRetoHandler(item.titulo)}
            />
            <View style={{ height: 5 }} />
            <Button
              title="Rechazar"
              color="orange"
              onPress={() => rechazarRetoHandler(item.titulo)}
            />
            <View style={{ height: 5 }} />
            <Button
              title="Eliminar"
              color="red"
              onPress={() => eliminarReto(item.titulo)}
            />
          </>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={retos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => listItemView(item)}
          ListEmptyComponent={
            <MyText
              text="No hay retos para mostrar."
              style={styles.emptyText}
            />
          }
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewAllRetos;

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
  retoImage: {
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
