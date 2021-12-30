import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Card, Image } from "react-native-elements";
import { auth } from "../database/db";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";

const Profile = () => {
  const navigation = useNavigation();

  const uid = auth.currentUser?.uid;
  const email = auth.currentUser?.email;
  const image = {
    uri: "https://cutewallpaper.org/21/vaporwave-mobile-wallpaper/Hypebeast-Wallpapers-nixxboi-in-2019-Vaporwave-.jpg",
  };
  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        alert("Logout Successfully ! ");
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Card bg="dark" text="white">
            <Card.Title> PROFILE </Card.Title>
            <TouchableOpacity style={styles.profilepic}>
              <Avatar
                rounded
                source={{
                  uri: "https://d3ui957tjb5bqd.cloudfront.net/uploads/2021/04/27234719/03-qWSM03EX.gif",
                }}
                size="xlarge"
              />
            </TouchableOpacity>
              <Text> Email : {email}</Text>
              <Text> UID : {uid} </Text>
            <TouchableOpacity style={styles.btn} onPress={handleSignout}>
              <Text style={styles.textinbtn}>LOGOUT</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 50,
    textAlign: "center",
  },
  logotext: {
    fontSize: 25,
    color: "#000",
    fontWeight: "bold",
  },
  logoimg: {
    width: "100%",
    height: 200,
  },
  profilepic: {
    flex: 1,
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#333",
    borderRadius: 75,
    marginBottom: 30,
  },
  textbox: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#333",
    textAlign: "center",
    marginBottom: 6,
    flexDirection: "row",
    height: 45,
  },
  errmsg: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "black",
    padding: 10,
    width: 200,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 30,
    marginLeft: 80,
    marginRight: 80,
  },
  textinbtn: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
