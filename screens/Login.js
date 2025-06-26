import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import InputText from "../components/InputText";
import SingleButton from "../components/SingleButton";

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!userName.trim() || !password.trim()) {
      Alert.alert("Complete usuario y contraseña");
      return;
    }

    try {
      const data = await AsyncStorage.getItem("usuarios");
      const usuarios = data ? JSON.parse(data) : [];

      const usuario = usuarios.find(
        (u) =>
          u.userName.toLowerCase() === userName.trim().toLowerCase() &&
          u.password === password.trim()
      );

      if (usuario) {
        await AsyncStorage.setItem("usuarioLogueado", usuario.userName);
        Alert.alert("Login exitoso", "", [
          { text: "Ok", onPress: () => navigation.navigate("HomeScreen") },
        ]);
      } else {
        Alert.alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error al iniciar sesión");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inner}
        >
          <Text style={styles.title}>Iniciar Sesión</Text>
          <InputText
            placeholder="Nombre de Usuario"
            value={userName}
            onChangeText={setUserName}
            style={{ color: "white" }} // Aquí cambiamos el color de la letra
          />

          <InputText
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{ color: "white" }} // Aquí también
          />
          <SingleButton title="Iniciar Sesión" customPress={handleLogin} />
          <View style={{ marginTop: 20 }}>
            <SingleButton
              title="Registrarse"
              customPress={() => navigation.navigate("RegisterUser")}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inner: {
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    color: "white",
    marginBottom: 20,
  },
});
