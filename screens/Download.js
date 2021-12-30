import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Card } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../database/db";

const Download = () => {
  const [program, setProgram] = useState([]);
  const image = {
    uri: "https://cutewallpaper.org/21/vaporwave-mobile-wallpaper/Hypebeast-Wallpapers-nixxboi-in-2019-Vaporwave-.jpg",
  };

  useEffect(async () => {
    const ref = await db
      .collection("userhasproduct")
      .where("userid", "==", auth.currentUser?.uid);
    ref.onSnapshot((query) => {
      const objs = [];
      query.forEach((doc) => {
        if (doc.data().userid === auth.currentUser?.uid) {
          objs.push({
            id: doc.id,
            ...doc.data(),
          });
        }
      });
      setProgram(objs);
    });
  }, []);

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Card style={styles.card}>
              <Card.Title>Owner Cheat</Card.Title>

              {program.map((obj) => (
                <Card id={obj.id} style={styles.card}>
                  <Image
                    source={{ uri: obj.img }}
                    style={{ width: "100%", height: 150 }}
                  />
                  <Text style={{ marginTop: 15 }}>
                    Name : {obj.productname}{" "}
                  </Text>
                  <Text>Version : {obj.version} </Text>
                  <Text>Date : {obj.date} </Text>
                  <Text>In use Cheat : {String(obj.status)} </Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={
                      () => Linking.openURL(obj.cheatsite) // link cheat ดึงจาก Product
                    }
                  >
                    <Text style={styles.textinbtn}>Download</Text>
                  </TouchableOpacity>
                </Card>
              ))}
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Download;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#333",
    padding: 10,
    width: 200,
    marginLeft: 35,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  textinbtn: {
    color: "#fff",
    fontSize: 18,
  },
  card: {
    backgroundColor: "#333",
    opacity: 90,
  },
});
