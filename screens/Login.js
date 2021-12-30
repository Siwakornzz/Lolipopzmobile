import React , {useState,useEffect} from "react";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Image } from "react-native";
import { auth } from "../database/db";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logoimg = {
    uri: 'https://64.media.tumblr.com/81617091e2fba176f3674e252ffd3c1b/64199ebe0ea1d478-d0/s1280x1920/4c26dc01e177a4bc80994317bf4518543347e50c.png',
  };
  
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if(user){
        navigation.replace('Home')
      }
    })
    return unsubscribe
  }, [])

  const handleLogin = () =>{
    auth
      .signInWithEmailAndPassword(email,password)
      .then(userCredentials =>{
        const user = userCredentials.user;
        console.log("Logged in with ", user.email)
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logoimg} source={logoimg} resizeMode="contain" />
      <Text style={styles.logotext}> LOLIPOPZ CHEAT</Text>
      <View
        style={{ flexDirection: "column", margin: 20, paddingVertical: 20 }}
      >
        <TextInput
          style={styles.textbox}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.textbox}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.textinbtn}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.textinbtn}> REGISTER </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 10,
  },
  textinbtn: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
