import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import { useRoute,useNavigation,DrawerActions } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewUploadNotes = () => {
  const route = useRoute()
  const allnotes = route.params?.mynotes
  const navigation1=useNavigation()
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
        <Text style={styles.text}>Uploaded Notes</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList style={{ height: '90%' }} data={allnotes}
          renderItem={({ item }) =>
            <View>
              <Image style={styles.item} source={{ uri: item.avatar }} />
            </View>
          }
          keyExtractor={(item) => item._id}
          ListEmptyComponent={myListEmpty}

        />
      </SafeAreaView>
    </View>
  )
}

export default ViewUploadNotes

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  container1: {
    backgroundColor: "#0163d2",
    height: 70,
    flexDirection: 'row'
  },
  item: {
    flex: 1,
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#c9c9c9',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    height: 410,
    backgroundColor: "#0163d2"
  },
  text: {
    color: "#fff",
    fontSize: 32,
    marginLeft: 40,
    marginTop: 15,
  },
  image: {
    height: 20,
    width: 200,
    flex: 1
  }
})