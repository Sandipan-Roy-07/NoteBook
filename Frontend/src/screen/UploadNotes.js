import { StyleSheet, Text, View, Image, Platform, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute ,DrawerActions} from '@react-navigation/native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UploadNotes = () => {
  const route = useRoute()
  const navigation1 = useNavigation()
  const user = route.params?.uid
  const token1 = route.params?.tok
  const [errormsg, setErrorMsg] = useState(null)
  const [image, setImage] = useState(null);
  const [upload, setupload] = useState({
    title: "",
  })
  const [data, setdata] = useState(null)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 16],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri, "image")
    }
  };

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, "Stuff/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case 'paused':
            break;
          case 'running':
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          upload.avatar = downloadURL;
          setdata('true')
          setImage("")
        });
      },
    );
  }
  useEffect(() => {
    fetch('http://192.168.31.156:3000/upload/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token1
      },
      body: JSON.stringify(upload)
    })
      .then(res => res.json()).then(
        data => {
          if (data.error) {
            setErrorMsg(data.error);
          }
          else {
            alert('Notes uploaded')
          }
        }
      )
  }, [data])
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
            <Text style={styles.text}>Upload Notes</Text>
          </View>
          <View style={{ padding: 20 }}>
            <TextInput
              style={[styles.title]}
              placeholder="Enter Title"
              onChangeText={(text) => setupload({ ...upload, title: text })}
            />
            <View style={{ marginTop: 80, flexDirection: 'column' }}>
              <TouchableOpacity style={styles.addBtn} onPress={() => { pickImage() }}>
                <Text style={styles.btnText}>Pick an Image</Text>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={styles.image} />}
              <TouchableOpacity style={styles.addBtn} onPress={() => { navigation.navigate('Home', { userid: user, token: token1 }) }}>
                <Text style={styles.btnText}>Exit</Text>
              </TouchableOpacity>
            </View>

          </View>
        </TouchableWithoutFeedback>

      </View>
    </View>
  )
}

export default UploadNotes

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0163d2",
    height: 70,
    flexDirection: 'row'
  },
  title: {
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
    marginLeft: 60,
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
    width: "40%",
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginLeft: 110,
    backgroundColor: "#0163d2",
  },
  btnText: {
    fontSize: 16,
    "color": "#fff",
    fontWeight: "bold"
  },
  image: {
    width: 200,
    height: 200,
  },
})

