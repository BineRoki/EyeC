import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import colors from "../config/colors";
import { AntDesign } from "@expo/vector-icons";
import TempData from "./TempData";

export default class AddPersonModal extends React.Component {
  backgroundColors = [
    "#F43C15",
    "#F4E315",
    "#5CE915",
    "#15E981",
    "#3AD087",
    "#263BB8",
  ];
  state = {
    name: "",
    color: this.backgroundColors[0],
  };

  createTodo = () => {
    const { name, color } = this.state;

    const list = { name, color };

    this.props.addList(list);

    this.setState({ name: "" });
    this.props.closeModal();
  };

  renderColors() {
    return this.backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        />
      );
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behaviour="padding">
        <TouchableOpacity
          style={{ position: "absolute", top: 25, right: 25 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={21} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.headercontainer}>
          <View style={styles.userlogo}>
            <AntDesign name="user" size={100} color={colors.primary} />
          </View>
          <View style={styles.username}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                color: colors.primary,
                paddingVertical: 20,
              }}
            >
              User Name
            </Text>
          </View>
          <View style={styles.userinfo}>
            <Text style={styles.textinfo}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              auctor vel turpis ut aliquet. Nullam elit elit, imperdiet vitae
              ultrices sed, porttitor in erat. In porta massa at tempus
              consectetur. In vehicula, sapien in blandit tincidunt, metus
              libero fringilla risus, in vehicula leo sem in ex.
            </Text>
          </View>
        </View>
        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}> Add Child </Text>
          <TextInput
            style={[styles.input, { marginBottom: 10 }]}
            placeholder="e-mail"
            onChange={(text) => this.setState({ name: text })}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            {this.renderColors()}
          </View>

          <TouchableOpacity
            style={[styles.create, { backgroundColor: this.state.color }]}
            onPress={this.createTodo}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>ADD</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.black,
    alignSelf: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "silver",
    borderRadius: 6,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 18,
    backgroundColor: "white",
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  headercontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  userlogo: {
    borderColor: colors.black,
    borderWidth: 2,
    borderRadius: 150,
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "silver",
  },
  textinfo: {
    fontSize: 15,
    paddingHorizontal: 25,
    backgroundColor: "white",
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "silver",
  },
});
