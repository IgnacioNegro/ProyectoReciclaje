import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Button from "../components/Button.js";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <Button
                title="USUARIOS"
                btnColor="black"
                btnIcon="users"
                customPress={() => navigation.navigate("UserMenu")}
              />
              <Button
                title="RETOS"
                btnColor="black"
                btnIcon="trophy"
                customPress={() => navigation.navigate("RetosMenu")}
              />
              <Button
                title="MATERIABLES RECICLABLES"
                btnColor="black"
                btnIcon="recycle"
                customPress={() =>
                  navigation.navigate("MaterialesReciclablesMenu")
                }
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  generalView: {
    flex: 1,
    justifyContent: "center",
  },
});
