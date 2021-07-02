import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  InteractionManager,
} from "react-native";

import colors from "../config/colors";

import { firebase } from "../src/firebase/config";

export default function HomeScreen(props) {
  const [entityText, setEntityText] = useState("");
  const [entities, setEntities] = useState([]);

  const entityRef = firebase.firestore().collection("entities");
  const userID = props.extraData.id;

  useEffect(() => {
    entityRef
      //   .where("authorID", "==", userID)
      //   .orderBy('text', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const newEntities = [];
          querySnapshot.forEach((doc) => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          setEntities(newEntities);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        text: entityText,
        authorID: userID,
        createdAt: timestamp,
      };
      entityRef
        .add(data)
        .then((_doc) => {
          setEntityText("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>
          {index + 1}. {item.text}
        </Text>
      </View>
    );
  };
  // const userName = () =>{
  //     const user = firebase.auth().currentUser;
  //     const name = "";
  //     user.providerData.forEach((userInfo) => {
  //         name = userInfo;
  //     });
  //     return name
  // }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeTitle}>Welcome</Text>
        <TouchableOpacity style={styles.logOutButton}>
          <Text
            style={{ color: colors.primary, fontWeight: "bold", fontSize: 15 }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new entity"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEntityText(text)}
          value={entityText}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
  },
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginTop: 40,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerContainer: {
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  welcomeTitle: {
    fontSize: 25,
    color: colors.primary,
    fontWeight: "bold",
    marginLeft: 20,
  },
  logOutButton: {
    padding: 10,
    marginRight: 20,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  listContainer: {
    marginTop: 20,
    padding: 20,
    alignSelf: "stretch",
  },
  entityContainer: {
    marginTop: 16,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  entityText: {
    fontSize: 20,
    color: "#333333",
  },
});
