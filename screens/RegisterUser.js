import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import InputText from "../components/InputText.js";
import SingleButton from "../components/SingleButton.js";
const RegisterUser = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const clearData = () => {
    setUserName("");
    setPassword("");
    setEmail("");
    setName("");
    setAge("");
    setNeighborhood("");
  };

  const registerUser = async () => {
    if (!userName.trim()) {
      Alert.alert("Ingrese su nombre de usuario");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Ingrese su password");
      return;
    }
    if (!email.trim() && email.indexOf("@") === -1) {
      Alert.alert("Ingrese su email correctamente");
      return;
    }

    if (!name.trim()) {
      Alert.alert("Ingrese su nombre");
      return;
    }
    if (!age.trim()) {
      Alert.alert("Ingrese su edad");
      return;
    }
    if (!neighborhood.trim()) {
      Alert.alert("Ingrese su barrio");
      return;
    }
    if (!profilePicture.trim()) {
      Alert.alert("Ingrese su foto de perfil");
      return;
    }

    try {
      const user = {
        userName,
        password,
        email,
        name,
        age,
        neighborhood,
        profilePicture,
      };

      await AsyncStorage.setItem(userName, JSON.stringify(user));
      clearData();
      Alert.alert(
        "Exito",
        "Usuario registrado!",
        [
          {
            text: "Confirmar",
            onPress: () => navigation.navigate("HomeScreen"),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error(error);
      Alert.alert("Error al registrar usuario.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <InputText
                placeholder="Nombre de Usuario"
                onChangeText={setUserName}
                style={styles.nameInput}
                value={userName}
              />
              <InputText
                placeholder="Contraseña"
                minLength={8}
                maxLength={16}
                secureTextEntry={true}
                onChangeText={setPassword}
                style={styles.passwordInput}
                value={password}
              />
              <InputText
                placeholder="Correo Electrónico"
                keyboardType="email-address"
                onChangeText={setEmail}
                style={styles.emailInput}
                value={email}
              />

              <InputText
                placeholder="Nombre Completo"
                onChangeText={setName}
                style={styles.nameInput}
                value={name}
              />
              <InputText
                placeholder="Edad"
                keyboardType="numeric"
                onChangeText={setAge}
                style={styles.nameInput}
                value={age}
              />
              <InputText
                placeholder="Barrio"
                onChangeText={setNeighborhood}
                style={styles.nameInput}
                value={neighborhood}
              />
              <InputText
                placeholder="Foto de Perfil (URL)"
                onChangeText={setProfilePicture}
                style={styles.nameInput}
                value={profilePicture}
              />
              <SingleButton
                title="Guardar Usuario"
                customPress={registerUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  nameInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  passwordInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  emailInput: {
    padding: 15,
    textAlignVertical: "top",
  },
});
