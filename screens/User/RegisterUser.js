import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import InputText from "../../components/InputText";
import SingleButton from "../../components/SingleButton.js";

const RegisterUser = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Función para pedir permisos y elegir imagen de galería
  const pickFromGallery = async () => {
    const cam = await ImagePicker.requestCameraPermissionsAsync();
    const gal = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!cam.granted || !gal.granted) {
      Alert.alert(
        "Permisos requeridos",
        "Habilitá acceso a la cámara y la galería."
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  // Función para tomar foto con cámara
  const takePhoto = async () => {
    const cam = await ImagePicker.requestCameraPermissionsAsync();
    if (!cam.granted) {
      Alert.alert("Permisos requeridos", "Habilitá acceso a la cámara.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const clearData = () => {
    setUserName("");
    setPassword("");
    setEmail("");
    setName("");
    setAge("");
    setNeighborhood("");
    setProfilePicture("");
  };

  const registerUser = async () => {
  const userNameTrim = userName.trim();
  const passwordTrim = password.trim();
  const emailTrim = email.trim();
  const nameTrim = name.trim();
  const ageTrim = age.trim();
  const neighborhoodTrim = neighborhood.trim();
  const profilePictureTrim = profilePicture.trim();

  if (!userNameTrim) {
    Alert.alert("Error", "Por favor ingrese un nombre de usuario");
    return;
  }

  if (!passwordTrim) {
    Alert.alert("Error", "Por favor ingrese una contraseña");
    return;
  }

  if (!emailTrim || !emailTrim.includes("@")) {
    Alert.alert("Error", "Por favor ingrese un email válido");
    return;
  }

  if (!nameTrim) {
    Alert.alert("Error", "Por favor ingrese su nombre");
    return;
  }

  if (!ageTrim) {
    Alert.alert("Error", "Por favor ingrese su edad");
    return;
  }

  if (!neighborhoodTrim) {
    Alert.alert("Error", "Por favor ingrese su barrio");
    return;
  }

  if (!profilePictureTrim) {
    Alert.alert("Error", "Por favor seleccione una foto de perfil");
    return;
  }

  try {
    const nuevoUsuario = {
      userName: userNameTrim,
      password: passwordTrim,
      email: emailTrim,
      name: nameTrim,
      age: ageTrim,
      neighborhood: neighborhoodTrim,
      profilePicture: profilePictureTrim,
      retosParticipados: [],
      puntaje: 0,
    };

    const data = await AsyncStorage.getItem("usuarios");
    const usuarios = data ? JSON.parse(data) : [];

    const yaExiste = usuarios.some(
      (usuario) => usuario.userName.toLowerCase() === userNameTrim.toLowerCase()
    );

    if (yaExiste) {
      Alert.alert("Error", "Ese nombre de usuario ya está registrado");
      return;
    }

    usuarios.push(nuevoUsuario);
    await AsyncStorage.setItem("usuarios", JSON.stringify(usuarios));

    clearData();
    Alert.alert("Éxito", "Usuario registrado correctamente", [
      {
        text: "Confirmar",
        onPress: () => navigation.navigate("Login"),
      },
    ]);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    Alert.alert("Error", "No se pudo registrar el usuario");
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
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

              {/* Mostrar imagen seleccionada */}
              <View style={styles.imagePreview}>
                {profilePicture ? (
                  <Image
                    source={{ uri: profilePicture }}
                    style={styles.image}
                  />
                ) : (
                  <Text style={styles.placeholder}>
                    Ninguna imagen seleccionada
                  </Text>
                )}
              </View>

              {/* Botones para subir imagen */}
              <View style={styles.buttonRow}>
                <Button title="Elegir de galería" onPress={pickFromGallery} />
                <View style={{ width: 10 }} />
                <Button title="Tomar foto" onPress={takePhoto} />
              </View>

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
  imagePreview: {
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  placeholder: {
    color: "#777",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
});
