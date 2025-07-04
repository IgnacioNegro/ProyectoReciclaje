import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

import { getAllParticipation } from "../../database/participationService";
import { getAllUsers } from "../../database/userService"; // Importa función real para usuarios
const UserPanel = () => {
  const [usuario, setUsuario] = useState(null);
  const [participaciones, setParticipaciones] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const userName = await AsyncStorage.getItem("usuarioLogueado");
        if (!userName) return;

        // Obtener usuarios desde SQLite
        const usuariosData = await getAllUsers();

        // Buscar usuario
        const usuarioEncontrado = usuariosData.find(
          (u) => u.userName === userName
        );
        if (!usuarioEncontrado) {
          setUsuario(null);
          return;
        }
        setUsuario(usuarioEncontrado);

        // Obtener participaciones desde SQLite (función debe existir)
        const todasParticipaciones = await getAllParticipation();

        // Filtrar participaciones del usuario
        const misParticipaciones = todasParticipaciones.filter(
          (p) => p.usuario === userName
        );
        setParticipaciones(misParticipaciones);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    cargarDatos();
  }, []);

  // Resto igual...

  const calcularNivel = (puntos) => {
    if (puntos >= 600) return "🔴 Experto";
    if (puntos >= 300) return "🔵 Avanzado";
    if (puntos >= 100) return "🟡 Intermedio";
    return "🟢 Principiante";
  };

  const generarDatosGrafico = () => {
    const dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    const conteo = [0, 0, 0, 0, 0, 0, 0];

    participaciones.forEach((p) => {
      const dia = new Date(parseInt(p.id)).getDay();
      const index = dia === 0 ? 6 : dia - 1;
      conteo[index]++;
    });

    return {
      labels: dias,
      datasets: [{ data: conteo }],
    };
  };

  if (!usuario) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Panel de Usuario</Text>

        {usuario.profilePicture && (
          <Image
            source={{ uri: usuario.profilePicture }}
            style={styles.image}
          />
        )}

        <Text style={styles.label}>
          Usuario: <Text style={styles.value}>{usuario.userName}</Text>
        </Text>
        <Text style={styles.label}>
          Nombre: <Text style={styles.value}>{usuario.name}</Text>
        </Text>
        <Text style={styles.label}>
          Nivel:{" "}
          <Text style={styles.value}>{calcularNivel(usuario.puntaje)}</Text>
        </Text>
        <Text style={styles.label}>
          Puntos acumulados: <Text style={styles.value}>{usuario.puntaje}</Text>
        </Text>
        <Text style={styles.label}>
          Retos completados:{" "}
          <Text style={styles.value}>
            {usuario.retosParticipados?.length || 0}
          </Text>
        </Text>

        <Text style={[styles.label, { marginTop: 20 }]}>
          Participaciones esta semana:
        </Text>
        <LineChart
          data={generarDatosGrafico()}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#121212",
            backgroundGradientFrom: "#1E1E1E",
            backgroundGradientTo: "#1E1E1E",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(30, 215, 96, ${opacity})`,
            labelColor: () => "#fff",
            propsForDots: { r: "4", strokeWidth: "2", stroke: "#1DB954" },
          }}
          style={{ borderRadius: 12, marginTop: 10 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserPanel;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  content: { padding: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  image: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  label: { fontSize: 16, color: "#ccc", marginBottom: 5 },
  value: { color: "#fff", fontWeight: "bold" },
  loadingText: {
    marginTop: 40,
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
  },
});
