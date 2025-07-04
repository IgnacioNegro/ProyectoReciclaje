import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Button = (props) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: props.btnColor }, props.style]}
      onPress={props.customPress}
    >
      <View style={styles.view}>
        <Icon
          style={styles.icon}
          name={props.btnIcon}
          size={40}
          color="white"
        />
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    // quitamos flex: 1 para que no llene todo el contenedor
    padding: 10,
    marginTop: 15,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 5,
  },
  text: {
    color: "white",
  },
  icon: {
    paddingBottom: 5,
    flexDirection: "column",
    alignItems: "center",
  },
});
