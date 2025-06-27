import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ParticiparReto = ({ navigation }) => {
  const [retosDisponibles, setRetosDisponibles] = useState([]);
  const [retoSeleccionado, setRetoSeleccionado] = useState(null);
  const [comentario, setComentario] = useState("");
  const [imagenUri, setImagenUri] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [usuario, setUsuario] = useState("");
  const [estado] = useState("Pendiente"); // Estado fijo para la participación

  useEffect(() => {
    const cargarDatos = async () => {
      const retos = await AsyncStorage.getItem("retos");
      const usuarioLogueado = await AsyncStorage.getItem("usuarioLogueado");
      setUsuario(usuarioLogueado);

      const retosParsed = retos ? JSON.parse(retos) : [];
      const retosAprobados = retosParsed.filter(
        (reto) => reto.estado === "Aprobado"
      );
      setRetosDisponibles(retosAprobados);
    };
    cargarDatos();
  }, []);

  const elegirImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagenUri(result.assets[0].uri);
    }
  };

  const obtenerUbicacion = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Activá la ubicación para continuar.");
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setUbicacion({
      lat: loc.coords.latitude.toFixed(5),
      lng: loc.coords.longitude.toFixed(5),
      time: new Date().toLocaleTimeString(),
    });
  };

  const registrarParticipacion = async () => {
    if (!retoSeleccionado || !imagenUri || !ubicacion) {
      Alert.alert("Faltan datos", "Completá todos los campos requeridos.");
      return;
    }

    const nuevaParticipacion = {
      id: Date.now().toString(),
      usuario,
      reto: retoSeleccionado,
      comentario,
      imagenUri,
      ubicacion,
      estado,
    };

    const data = await AsyncStorage.getItem("participaciones");
    const participaciones = data ? JSON.parse(data) : [];
    participaciones.push(nuevaParticipacion);
    await AsyncStorage.setItem(
      "participaciones",
      JSON.stringify(participaciones)
    );

    // ACTUALIZAR PUNTAJE Y RETOS PARTICIPADOS

    const reto = retosDisponibles.find((r) => r.nombre === retoSeleccionado);
    if (reto) {
      const usuariosData = await AsyncStorage.getItem("usuarios");
      const usuarios = usuariosData ? JSON.parse(usuariosData) : [];
      const index = usuarios.findIndex((u) => u.userName === usuario);

      if (index !== -1) {
        usuarios[index].puntaje += parseInt(reto.puntajeAsignado);
        usuarios[index].retosParticipados.push(reto.nombre);
        await AsyncStorage.setItem("usuarios", JSON.stringify(usuarios));
      }
    }

    Alert.alert("¡Éxito!", "Participación registrada correctamente", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Participar en Reto</Text>

        <Text style={styles.label}>Selecciona un reto:</Text>
        <View style={styles.optionsContainer}>
          {retosDisponibles.length === 0 && (
            <Text style={{ fontStyle: "italic", color: "white" }}>
              No hay retos disponibles
            </Text>
          )}
          {retosDisponibles.map((reto) => (
            <TouchableOpacity
              key={reto.nombre}
              style={[
                styles.optionButton,
                retoSeleccionado === reto.nombre && styles.optionSelected,
              ]}
              onPress={() => setRetoSeleccionado(reto.nombre)}
            >
              <Text
                style={[
                  styles.optionText,
                  retoSeleccionado === reto.nombre && styles.optionTextSelected,
                ]}
              >
                {reto.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Comentario (opcional):</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe un comentario"
          value={comentario}
          onChangeText={setComentario}
          multiline
        />

        <Button title="Seleccionar imagen" onPress={elegirImagen} />
        {imagenUri && (
          <Image source={{ uri: imagenUri }} style={styles.imagen} />
        )}

        <Button title="Obtener ubicación" onPress={obtenerUbicacion} />
        {ubicacion && (
          <Text style={styles.coords}>
            Ubicación: {ubicacion.lat}, {ubicacion.lng}
          </Text>
        )}

        <View style={{ marginTop: 20 }}>
          <Button
            title="Registrar participación"
            onPress={registrarParticipacion}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ParticiparReto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "white",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  optionSelected: {
    backgroundColor: "#1DB954",
  },
  optionText: {
    color: "white",
    fontWeight: "600",
  },
  optionTextSelected: {
    color: "black",
  },
  input: {
    backgroundColor: "#222",
    color: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    minHeight: 60,
  },
  imagen: {
    width: "100%",
    height: 200,
    marginVertical: 15,
    borderRadius: 8,
  },
  coords: {
    color: "white",
    marginVertical: 10,
    textAlign: "center",
  },
});
