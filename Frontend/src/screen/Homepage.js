import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons'
import { Text, View, ScrollView, Dimensions } from "react-native";
import { StyleSheet } from "react-native";

export default function Homepage({ navigation }) {
  const route = useRoute()
  const id1 = route.params?.userid
  const token1 = route.params?.token
  const [errormsg, setErrorMsg] = useState(null)
  const [enteredText, setenteredText] = useState({
    id: id1
  });
  const viewUpload = () => {
    fetch('http://192.168.31.156:3000/upload/getuploads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token1
      },
      body: JSON.stringify(enteredText)
    })
      .then(res => res.json()).then(
        data => {
          if (data.error) {
            setErrorMsg(data.error);
          }
          else {
            notes = data.saved_user
            navigation.navigate('ViewUploadNotes', { mynotes: notes });
          }
        }
      )
  }
  const viewNotes = () => {
    fetch('http://192.168.31.156:3000/note/getnotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token1
      },
      body: JSON.stringify(enteredText)
    })
      .then(res => res.json()).then(
        data => {
          if (data.error) {
            setErrorMsg(data.error);
          }
          else {
            allnotes = data.saved_user
            navigation.navigate('ViewNotes', { notes: allnotes, token: token1, user: id1 })
          }
        }
      )
  }
  return (
    <View style={styles.container1}>
      <View style={styles.container}>
        <Icon
          name="menu"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          size={30}
          color="#fff"
          style={{ marginTop: 20, marginLeft: 20 }}
        /> 
        <Text style={styles.text}>Welcome</Text>
      </View>

      <ScrollView style={StyleSheet.container2}>
        <View style={styles.itemBtn}>
          <Text style={styles.btnTxt}>ADD NEW NOTE</Text>
          <Icon1 style={styles.icon} name="arrow-forward-outline" onPress={() => navigation.navigate('AddNewNote', { tok: token1, uid: id1 })} />
        </View>
        <View style={styles.itemBtn}>
          <Text style={styles.btnTxt}>UPLOAD NOTES</Text>
          <Icon1 style={styles.icon} name="arrow-forward-outline" onPress={() => navigation.navigate('UploadNotes', { tok: token1, uid: id1 })} />
        </View>
        <View style={styles.itemBtn}>
          <Text style={styles.btnTxt}>VIEW ALL NOTES</Text>
          <Icon1 style={styles.icon} name="arrow-forward-outline" onPress={() => viewNotes()} />
        </View>
        <View style={styles.itemBtn}>
          <Text style={styles.btnTxt}>VIEW UPLOADED NOTES</Text>
          <Icon1 style={styles.icon} name="arrow-forward-outline" onPress={() => viewUpload()} />
        </View>
      </ScrollView>
    </View>
  );

}
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    flexDirection: 'column'
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 40
  },
  container: {
    backgroundColor: "#0163d2",
    height: 70,
    flexDirection: 'row'
  },
  itemBtn: {
    width: Dimensions.get("window").width - 100,
    height: 250,
    backgroundColor: "#312e81",
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50,
    marginTop: 40,
    marginBottom: 40,
    elevation: 10,
    shadowOffset: { width: 3, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 10
  },
  text: {
    "color": "#fff",
    fontSize: 32,
    marginLeft: 80,
    marginTop: 15,
  },
  btnTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    "color": "#fff"
  },
  icon: {
    fontSize: 24,
    paddingTop: 20,
    "color": "#fff"
  }
});