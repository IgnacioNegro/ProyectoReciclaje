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

const UserPanel = () => {
  const [usuario, setUsuario] = useState(null);
  const [participaciones, setParticipaciones] = useState([]);

  // Cargar datos del usuario y participaciones
  useEffect(() => {
    const cargarDatos = async () => {
      const userName = await AsyncStorage.getItem("usuarioLogueado");
      const usuariosData = await AsyncStorage.getItem("usuarios");
      const participacionesData = await AsyncStorage.getItem("participaciones");

      const usuarios = usuariosData ? JSON.parse(usuariosData) : [];
      const todasParticipaciones = participacionesData
        ? JSON.parse(participacionesData)
        : [];

      const usuarioEncontrado = usuarios.find((u) => u.userName === userName);
      const misParticipaciones = todasParticipaciones.filter(
        (p) => p.usuario === userName
      );

      setUsuario(usuarioEncontrado);
      setParticipaciones(misParticipaciones);
    };

    cargarDatos();
  }, []);

  // Calcular nivel en base a puntaje
  const calcularNivel = (puntos) => {
    if (puntos >= 600) return "🔴 Experto";
    if (puntos >= 300) return "🔵 Avanzado";
    if (puntos >= 100) return "🟡 Intermedio";
    return "🟢 Principiante";
  };

  // Generar datos para el gráfico
  const generarDatosGrafico = () => {
    const dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    const conteo = [0, 0, 0, 0, 0, 0, 0];

    participaciones.forEach((p) => {
      const dia = new Date(parseInt(p.id)).getDay(); //  obtenemos el día de la semana (0 a 6)
      const index = dia === 0 ? 6 : dia - 1; // // convertimos: domingo (0) → índice 6, lunes (1) → índice 0, etc.
      conteo[index]++; // sumamos una participación en ese día
    });

    return {
      labels: dias,
      datasets: [{ data: conteo }],
    };
  };

  // Si no cargó el usuario todavía
  if (!usuario) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </SafeAreaView>
    );
  }

  // Renderizar vista del panel
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
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#1DB954",
            },
          }}
          style={{ borderRadius: 12, marginTop: 10 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 5,
  },
  value: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingText: {
    marginTop: 40,
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
  },
});
