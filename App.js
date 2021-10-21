import React from 'react';
import { View, Text, Linking, Share, TouchableOpacity, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import firebase from 'firebase';
import Modal from 'react-native-modal';

var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {url_id: "", redirect_url: "", url: "", isModalVisible: false};
  }

  random_key = () => {
    var random_string = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5);
    this.state.url_id = random_string
    return (this.state.url_id)
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message: this.state.redirect_url
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }  

  push_data = () => {
    firebase.database().ref('urls/').child(this.random_key()).set(this.state.url);
    this.state.redirect_url = process.env.MY_APP_NAME + ".vercel.app/" + this.state.url_id;
    this.textInput.clear()
    this.toggleModal()
  }

  render() {

    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <View style={{ marginBottom: 100 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>MityURL - A tinyURL shortener</Text>
        </View>
        <View>
          <Text style={{ textAlign: "center", fontSize: 15 }}>'https://'</Text>
        <Input
                placeholder='e.g. www.example.com'
                inputContainerStyle={{ width: '80%', justifyContent: "center", alignSelf: "center" }}
                onChangeText={(data) => {this.state.url = data}}
                ref={input => { this.textInput = input }}
            />
        <Button title="Shorten Link" type="outline" onPress={() => this.push_data()} raised buttonStyle={{ borderColor: "#f0750f" }} titleStyle={{ color: "#f0750f" }} />
        </View>
        <View>
        <Modal isVisible={this.state.isModalVisible} animationIn="slideInUp" animationOut="slideOutDown" >
          <View style={{flex: 1, alignItems: "center", alignSelf: "center", justifyContent: "center", backgroundColor: 'white', borderRadius: 15, width: "80%", height: "60%"}}>
            <Text style={{ color: "#f0750f", fontSize: 25, fontWeight: "bold", textAlign: "center", marginBottom: 50 }}>Hurray ! Here is your shortened URL...</Text>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>{this.state.redirect_url}</Text>
            <View
        style={{ flexDirection: 'row', justifyContent: "center", alignSelf: "center", marginTop: 10 }}
      >
        <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => Linking.openURL(this.state.redirect_url)}>
          <Image
          source={require('./assets/images/openlink.png')}
          style={styles.ImageStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={this.onShare}>
          <Image
          source={require('./assets/images/sharelink.png')}
          style={styles.ImageStyle}
          />
        </TouchableOpacity>
        </View>
          <View style={{ marginTop: 70 }}>
          <Button title="Close" type="outline" onPress={this.toggleModal} raised buttonStyle={{ borderColor: "#f0750f" }} titleStyle={{ color: "#f0750f" }} />
          </View>
        </View>
        </Modal>
        </View>
      </View>
    )
  }
}

const styles = {
  ImageStyle: {
    padding: 10,
    margin: 10,
    height: 25,
    width: 25,
    resizeMode: 'contain',
    tintColor: '#f0750f'
  }
}
