import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Notes = () => {
    const route = useRoute()
    const navigation1 = useNavigation()
    const notestitle = route.params?.notetitle
    const notesbody = route.params?.notebody
    const notesid = route.params?.noteid
    const token = route.params?.token1
    const user = route.params?.userid
    const [errormsg, setErrorMsg] = useState(null);

    const [isEditable, setIsEditable] = useState(false);
    const [enteredText1, setenteredText1] = useState({
        id: user
    });
    const [enteredText2, setenteredText2] = useState({
        id: notesid
    });
    const [enteredText, setenteredText] = useState({
        title: "",
        body: "",
        id: notesid
    });
    const notesFetch = () => {
        console.log(enteredText1)
        fetch('http://192.168.31.156:3000/note/getnotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(enteredText1)
        })
            .then(res => res.json()).then(
                data => {
                    if (data.error) {
                        setErrorMsg(data.error);
                    }
                    else {
                        allnotes = data.saved_user
                        navigation1.navigate('ViewNotes', { notes: allnotes, token: token, user: user })
                    }
                }
            )
    }
    const updateDoc = () => {
        fetch('http://192.168.31.156:3000/note/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(enteredText)
        })
            .then(res => res.json()).then(
                data => {
                    if (data.error) {
                        setErrorMsg(data.error);
                    }
                    else {
                        notesFetch()
                    }
                }
            )
    }
    const deleteDoc = () => {
        fetch('http://192.168.31.156:3000/note/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(enteredText2)
        })
            .then(res => res.json()).then(
                data => {
                    if (data.error) {
                        setErrorMsg(data.error);
                    }
                    else {
                        notesFetch()
                    }
                }
            )
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
                        <Text style={styles.text}>View Notes</Text>
                    </View>
                    <View style={{ padding: 20 }}>
                        <TextInput
                            style={[styles.title]}
                            placeholder="Enter Title"
                            editable={isEditable}
                            selectTextOnFocus={isEditable}
                            onChangeText={(text) => setenteredText({ ...enteredText, title: text })}>
                            <Text> {notestitle}</Text>
                        </TextInput>

                        <TextInput
                            style={[styles.input]}
                            placeholder='Type Here....'
                            multiline={true}
                            editable={isEditable}
                            selectTextOnFocus={isEditable}
                            onChangeText={(text) => setenteredText({ ...enteredText, body: text })}>
                            <Text>{notesbody}</Text>
                        </TextInput>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={styles.updateBtn} onPress={() => { setIsEditable(!isEditable) }}>
                                <Text style={styles.btnText}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addBtn} onPress={() => { updateDoc() }}>
                                <Text style={styles.btnText}>Save & Exit</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.updateBtn} onPress={() => { deleteDoc() }}>
                            <Text style={styles.btnText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {
                            errormsg ? <Text style={{ "color": "red" }}>{errormsg}</Text> : null
                        }
                    </View>
                </TouchableWithoutFeedback>

            </View>
        </View>
    )
}

export default Notes

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
        marginLeft: 70,
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
        marginLeft: 140,
        backgroundColor: "#0163d2",
    },
    updateBtn: {
        width: "30%",
        height: 45,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#0163d2",
    },
    btnText: {
        fontSize: 16,
        "color": "#fff",
        fontWeight: "bold"
    }

})