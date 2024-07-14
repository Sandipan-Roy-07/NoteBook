import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddNewNote = () => {
  const route = useRoute()
  const user = route.params?.uid
  const token1 = route.params?.tok
  const navigation1 = useNavigation();
  const [errormsg, setErrorMsg] = useState(null)
  const [enteredText, setenteredText] = useState({
    title: "",
    body: "",
  });
  const navigation = useNavigation();
  const handleClick = () => {
    if (!enteredText.title || !enteredText.body) {
      setErrorMsg("All feilds required")
    }
    else {
      fetch('http://192.168.31.156:3000/note/create', {
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
              navigation.navigate('Home', { token: token1, userid: user });
            }
          }
        )
    }
  }
  return (
    <View>
      <View
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <Icon
              name="menu"
              onPress={() => navigation1.dispatch(DrawerActions.openDrawer())}
              size={30}
              color="#fff"
              style={{ marginTop: 20, marginLeft: 20 }}
            />
            <Text style={styles.text}>Add Notes</Text>
          </View>
          <View style={{ padding: 20 }}>
            <TextInput
              style={[styles.title1]}
              placeholder="Enter Title"
              onChangeText={(text) => setenteredText({ ...enteredText, title: text })}
            />
            <TextInput
              style={[styles.input]}
              placeholder='Type Here....'
              multiline={true}
              onChangeText={(text) => setenteredText({ ...enteredText, body: text })}
            />
            <TouchableOpacity style={styles.addBtn} onPress={() => { handleClick() }}>
              <Text style={styles.btnText}>Save & Exit</Text>
            </TouchableOpacity>

          </View>
        </TouchableWithoutFeedback>

      </View>
    </View>
  )
}

export default AddNewNote

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0163d2",
    height: 70,
    flexDirection: 'row'
  },
  title1: {
    marginTop: 20,
    paddingLeft: 20,
    width: '100%',
    color: 'black',
    fontWeight: '600',
    opacity: 0.8,
    shadowColor: 'blue',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderColor: '#0163d2',
    borderWidth: 2,
    borderRadius: 5,
    height: 50,
    fontSize: 16
  },
  text: {
    "color": "#fff",
    fontSize: 32,
    marginLeft: 80,
    marginTop: 15,
  },
  addNoteContainer: {
    paddingHorizontal: 20,
    marginTop: 50,
    justifyContent: 'center'
  },
  input: {
    marginTop: 20,
    padding: 20,
    width: '100%',
    color: 'black',
    fontWeight: '600',
    opacity: 0.8,
    shadowColor: 'blue',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderColor: '#0163d2',
    borderWidth: 2,
    borderRadius: 5,
    height: 400,
    fontSize: 18
  },
  addBtn: {
    width: "30%",
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginLeft: 250,
    backgroundColor: "#0163d2",
  },
  btnText: {
    fontSize: 16,
    "color": "#fff",
    fontWeight: "bold"
  }
})