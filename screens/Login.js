import { Montserrat_400Regular, useFonts } from "@expo-google-fonts/montserrat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  Image,
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
import { getAllUsers } from "../database/userService";
import AuthLoading from "./AuthLoading";

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // Cargar la fuente Montserrat pra el titulo
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    return <AuthLoading />;
  }

  const handleLogin = async () => {
    if (!userName.trim() || !password.trim()) {
      Alert.alert("Complete usuario y contraseña");
      return;
    }

    try {
      const usuarios = await getAllUsers();

      const encontrado = usuarios.find(
        (u) =>
          u.userName.toLowerCase() === userName.trim().toLowerCase() &&
          u.password.trim() === password.trim()
      );

      if (encontrado) {
        await AsyncStorage.setItem("usuarioLogueado", encontrado.userName);

        if (encontrado.userName.toLowerCase() === "superadmin") {
          await AsyncStorage.setItem("tipoUsuario", "superadmin");
        } else {
          await AsyncStorage.setItem("tipoUsuario", "usuario");
        }
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
          <Image
            source={{
              uri: "https://i.postimg.cc/9MdV61yg/3f19797d-b70f-4177-adc3-48735ccd6c9f-removebg-preview.png",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.title, { fontFamily: "Montserrat_400Regular" }]}>
            Planeta Vivo
          </Text>

          <InputText
            placeholder="Nombre de Usuario"
            value={userName}
            onChangeText={setUserName}
            style={{ color: "white" }}
          />

          <InputText
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{ color: "white" }}
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
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
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
