import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../database/db";

const Product = () => {
  const [product, setProduct] = useState([]);
  const image = {
    uri: "https://cutewallpaper.org/21/vaporwave-mobile-wallpaper/Hypebeast-Wallpapers-nixxboi-in-2019-Vaporwave-.jpg",
  };
  useEffect(async () => {
    const ref = await db.collection("products");
    ref.onSnapshot((query) => {
      const objs = [];
      query.forEach((doc) => {
        objs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setProduct(objs);
    });
  }, []);

  const purchase = (id, name,img,version,cheatsite) => {
    const ref = db.collection("userhasproduct");
    const userid = auth.currentUser?.uid;
    ref
      .add({
        userid: userid,
        productid: id,
        productname: name,
        img: img,
        version: version,
        date: new Date().toString(),
        cheatsite : cheatsite,
        status : false,
      })
      .then(() => {
        alert("Purchace Successfully ! ");
      });
  };

  const purchasedecision = (id, name,img, version,cheatsite) => {
    Alert.alert("LOLIPOPZ", "You want to Purchase" + "\n" + name, [
      {
        text: "YES",
        onPress: () => purchase(id, name,img, version,cheatsite),
        style: "success",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Card>
            <Card.Title>PRODUCTS</Card.Title>

            {product.map((key) => (
              <Card id={key.id}>
                <Image
                  source={{
                    uri: key.img,
                  }}
                  style={{ width: "100%", height: 150 }}
                />
                <Text style={{ marginTop: 15 }}>Name : {key.name} </Text>
                <Text>Version : {key.version} </Text>
                <Text>Updated: {key.update}</Text>
                <Text>Price : {key.price}</Text>
                <Text>
                  Site :
                  <Text
                    style={{ color: "blue" }}
                    onPress={() => Linking.openURL(key.site)}
                  >
                    PlayStore
                  </Text>
                </Text>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    purchasedecision(key.id, key.name, key.img, key.version,key.cheatsite)
                  }
                >
                  <Text style={styles.textinbtn}>PURCHASE</Text>
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

export default Product;

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
});
