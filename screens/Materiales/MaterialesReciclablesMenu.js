import { Montserrat_400Regular, useFonts } from "@expo-google-fonts/montserrat";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AuthLoading from "../AuthLoading";

const MaterialMenu = ({ navigation }) => {
  let [fontsLoaded] = useFonts({ Montserrat_400Regular });

  if (!fontsLoaded) return <AuthLoading />;

  const MenuButton = ({ title, icon, onPress }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.buttonStyle,
        pressed && styles.buttonPressed,
      ]}
    >
      <FontAwesome5 name={icon} size={22} color="white" style={styles.icon} />
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Text style={[styles.title, { fontFamily: "Montserrat_400Regular" }]}>
          Materiales Reciclables
        </Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <MenuButton
            title="Registrar Material"
            icon="plus-circle"
            onPress={() => navigation.navigate("RegisterMaterialReciclable")}
          />
          <MenuButton
            title="Actualizar Material"
            icon="edit"
            onPress={() => navigation.navigate("UpdateMaterialReciclable")}
          />
          <MenuButton
            title="Ver Material"
            icon="search"
            onPress={() => navigation.navigate("ViewMaterialReciclable")}
          />
          <MenuButton
            title="Borrar Material"
            icon="trash"
            onPress={() => navigation.navigate("DeleteMaterialReciclable")}
          />
          <MenuButton
            title="Ver todos los Materiales"
            icon="recycle"
            onPress={() => navigation.navigate("ViewAllMateriales")}
          />
          <MenuButton
            title="Panel de Materiales"
            icon="boxes"
            onPress={() => navigation.navigate("MaterialPanel")}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MaterialMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  viewContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "white",
    textAlign: "center",
    marginBottom: 25,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  buttonStyle: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "transparent",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: "rgba(255,255,255,0.1)",
    shadowOpacity: 0.3,
  },
  icon: {
    marginRight: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
