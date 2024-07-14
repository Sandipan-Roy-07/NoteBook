import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useRoute, useNavigation, DrawerActions } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';


const ViewNotes = () => {
  const route = useRoute()
  const allnotes = route.params?.notes
  const token = route.params?.token
  const id = route.params?.user
  const navigation1 = useNavigation()
  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No data found</Text>
      </View>
    );
  }
  return (
    <View>
      <View style={styles.container1}>
        <Icon
          name="menu"
          onPress={() => navigation1.dispatch(DrawerActions.openDrawer())}
          size={30}
          color="#fff"
          style={{ marginTop: 20, marginLeft: 20 }}
        />
        <Text style={styles.text}>All Notes</Text>
      </View>
      <View>
        <SafeAreaView style={styles.container}>
          <FlatList style={{ height: '94%' }} data={allnotes}
            renderItem={({ item }) =>
              <View>
                <TouchableOpacity onPress={() => { navigation1.navigate('Notes', { userid: id, notetitle: item.title, notebody: item.body, noteid: item._id, token1: token }) }}>
                  <Text style={styles.item}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            }
            keyExtractor={(item) => item._id}
            ListEmptyComponent={myListEmpty}

          />
        </SafeAreaView>
      </View>
    </View>

  )
}

export default ViewNotes

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    flex: 1,
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#c9c9c9',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 18,
    marginTop: 30,
    height: 100,
    color: "white",
    backgroundColor: "#0163d2"
  },
  container1: {
    backgroundColor: "#0163d2",
    height: 70,
    flexDirection: 'row'
  },
  btncontainer:
  {
    backgroundColor: "#0163d2",
    height: 35,
    flexDirection: 'row'
  },
  text: {
    color: "#fff",
    fontSize: 32,
    marginLeft: 80,
    marginTop: 15,
  },
  btnTxt: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 80,
    marginTop: 5,
  }
})
