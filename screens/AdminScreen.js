import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors.js";
import TempData from "./TempData.js";
import TodoList from "./TodoList.js";
import AddPersonModal from "./AddPersonModal.js";

export default class AdminScreen extends React.Component {
  state = {
    addTodoVisible: false,
    lists: TempData,
  };

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  addList = (list) => {
    this.setState({
      lists: [
        ...this.state.lists,
        { ...lists, id: this.state.lists.length + 1, todos: [] },
      ],
    });
  };

  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddPersonModal
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>
        <View>
          <Text style={styles.welcome}>
            Welcome <Text style={{ color: colors.primary }}>USER</Text> to
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Eye
            <Text
              style={{
                fontWeight: "700",
                color: colors.primary,
                fontStyle: "italic",
              }}
            >
              C
            </Text>
          </Text>

          <View style={styles.divider} />
        </View>

        <View style={{ paddingVertical: 50 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}
          >
            <AntDesign name="user" size={40} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.profile}>Profile</Text>
        </View>

        <View style={{ height: 300 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 4,
    padding: 16,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
  welcome: {
    fontSize: 25,
    fontWeight: "600",
  },
});
