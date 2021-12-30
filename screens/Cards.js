import React, { useEffect, useState } from "react";
import { db, auth } from "../database/db";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  NativeModules,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Card, CardTitle, CardImage } from "react-native-cards-custom";

const Cards = () => {
  const image = {
    uri: "https://cutewallpaper.org/21/vaporwave-mobile-wallpaper/Hypebeast-Wallpapers-nixxboi-in-2019-Vaporwave-.jpg",
  };
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");

  const userid = auth.currentUser?.uid;
  const [check, setCheck] = useState(0);

  useEffect(async () => {
    if ((await db.collection("card").doc(userid).get()).exists) {
      const ref = db.collection("card").doc(userid);
      ref
        .get()
        .then((res) => {
          if (res.exists) {
            const data = res.data();
            console.log(data);
            setName(data.name);
            setCardNumber(data.cardNumber);
            setExpiration(data.expiration);
            setCvv(data.cvv);
          }
        })
        .then(() => {
          setCheck(1); // pass
        });
    } else {
      setCheck(0); // not pass
    }
    console.log(check);
  }, []);

  const handleUpdate = async () => {
    try {
      Alert.alert("Are You Sure ?", "Are You Sure U Want To Update ? ", [
        {
          text: "Update",
          onPress: async () => update(),
        },
        {
          text: "Cancel",
          onPress: () => null,
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };
  const update = async () => {
    const ref = db.collection("card").doc(userid);
    ref
      .set({
        userid: userid,
        name: name,
        cardNumber: cardNumber,
        expiration: expiration,
        cvv: cvv,
      })
      .then(() => {
        alert("Updated Card Successfully !!");
      })
      .then(() => setCheck(1));
  };
  const handleDelete = async () => {
    const ref = db.collection("card").doc(userid);
    try {
      Alert.alert("Are You Sure ?", "Are You Sure U Want To Delete ? ", [
        {
          text: "Delete",
          onPress: async () =>
            await ref
              .delete()
              .then(() => alert("Delete Successfully !"))
              .then(() => setCheck(0)),
        },
        {
          text: "Cancel",
          onPress: () => null,
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };
  const addcard = () => {
    Alert.alert("LOLIPOPZ", "You want to Add Card ?", [
      {
        text: "YES",
        onPress: () => add(),
        style: "success",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
    const add = () => {
      const ref = db.collection("card");
      db.collection("card")
        .doc(userid)
        .get()
        .then((snap) => {
          if (!snap.exists) {
            ref
              .doc(userid)
              .set({
                userid: userid,
                name: name,
                cardNumber: cardNumber,
                expiration: expiration,
                cvv: cvv,
              })
              .then(() => {
                alert("Add Card Successfully ! ");
              })
              .then(() => setCheck(1));
          } else {
            alert(" Your Card has already been added !!");
          }
        });
    };
  };

  if (check == 1) {
    return (
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <SafeAreaView>
          <ScrollView>
            <View>
              <Card style={styles.cardheader}>
                <CardImage
                  source={{
                    uri: "https://www.fungjaizine.com/wp-content/uploads/2017/05/wtf_is_vaporwave.png",
                  }}
                  title="CREDIT CARD"
                />
                <CardTitle subtitle="Name : " />
                <TextInput
                  style={styles.textbox}
                  placeholder="Name"
                  onChangeText={(text) => setName(text)}
                  value={name}
                  required
                />
                <CardTitle subtitle="Card Number : " />
                <TextInput
                  style={styles.textbox}
                  placeholder="Cardnumber"
                  onChangeText={(text) => setCardNumber(text)}
                  value={cardNumber}
                  required
                />
                <Card style={styles.cardbottom}>
                  <CardTitle
                    subtitle="Expiration: "
                    style={{ flexDirection: "column", flexWrap: "wrap" }}
                  />
                  <TextInput
                    style={styles.exp}
                    placeholder="Exp"
                    onChangeText={(text) => setExpiration(text)}
                    value={expiration}
                    required
                  />
                  <CardTitle
                    subtitle="Cvv : "
                    style={{ flexDirection: "column", flexWrap: "wrap" }}
                  />
                  <TextInput
                    style={styles.exp}
                    placeholder="cvv"
                    onChangeText={(text) => setCvv(text)}
                    value={cvv}
                    required
                  />
                </Card>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => handleUpdate()}
                >
                  <Text style={styles.textinbtn}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => handleDelete()}
                >
                  <Text style={styles.textinbtn}>Delete</Text>
                </TouchableOpacity>
              </Card>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <SafeAreaView>
          <ScrollView>
            <View>
              <Card style={styles.cardheader}>
                <CardImage
                  source={{
                    uri: "https://www.fungjaizine.com/wp-content/uploads/2017/05/wtf_is_vaporwave.png",
                  }}
                  title="CREDIT CARD"
                />
                <CardTitle subtitle="Name : " />
                <TextInput
                  style={styles.textbox}
                  placeholder="Name"
                  onChangeText={(text) => setName(text)}
                  required
                />
                <CardTitle subtitle="Card Number : " />
                <TextInput
                  style={styles.textbox}
                  placeholder="Cardnumber"
                  onChangeText={(text) => setCardNumber(text)}
                  required
                />
                <Card style={styles.cardbottom}>
                  <CardTitle
                    subtitle="Expiration: "
                    style={{ flexDirection: "column", flexWrap: "wrap" }}
                  />
                  <TextInput
                    style={styles.exp}
                    placeholder="Exp"
                    onChangeText={(text) => setExpiration(text)}
                    required
                  />
                  <CardTitle
                    subtitle="Cvv : "
                    style={{ flexDirection: "column", flexWrap: "wrap" }}
                  />
                  <TextInput
                    style={styles.exp}
                    placeholder="cvv"
                    onChangeText={(text) => setCvv(text)}
                    required
                  />
                </Card>
                <TouchableOpacity style={styles.btn} onPress={() => addcard()}>
                  <Text style={styles.textinbtn}>ADD</Text>
                </TouchableOpacity>
              </Card>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
  return <></>;
};

export default Cards;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  cardheader: {
    width: "95%",
    marginLeft: "3%",
    marginRight: "30%",
    marginTop: "10%",
    borderRadius: 25,
  },
  textbox: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#000",
    textAlign: "center",
    marginBottom: 6,
    marginLeft: 30,
    height: 35,
    width: "80%",
  },
  cardbottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    width: "90%",
  },
  exp: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#000",
    textAlign: "center",
    height: 35,
    width: "30%",
  },
  btn: {
    backgroundColor: "#333",
    padding: 10,
    width: 200,
    marginLeft: 90,
    marginBottom: 5,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  textinbtn: {
    color: "#fff",
    fontSize: 18,
  },
});
