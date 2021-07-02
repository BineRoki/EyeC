import React from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import colors from '../config/colors';

import color from '../config/colors';


export default function WelcomeScreen({navigation}) {

  const onContinuePress = () => {
    navigation.navigate('Login')
}

    return (
        <View style={styles.container}>
      <View style={styles.container2}>
        <Image style={styles.logo} source={require('../assets/logo_transparent.png')} />
      </View>
      <View style={styles.container3}>
        <Text style={styles.title}>Welcome to EyeC!</Text>
        <Text style={styles.info}>Place were we see all!</Text>
        <TouchableOpacity 
          style={styles.button_design}  
          onPress= {onContinuePress} ><Text style={styles.button_text}>Continue</Text></TouchableOpacity>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      container2:{
        height: "60%",
        alignItems: 'center',
        justifyContent: 'center',
      },
    container3:{
        height: "40%",
        backgroundColor: color.primary,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        
        justifyContent: 'center',
        //alignSelf: 'stretch'
      },
      
      button_design:{
        height: 30,
        padding: 20,
        borderColor: colors.white,
        backgroundColor: colors.white,
        borderRadius: 5,
        borderWidth: 3,
        marginBottom: 10,
        width: '70%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      },
      logo: {
        width: 300,
        height: 300, 
      },
      title:{
        fontSize: 24,
        color: color.white,
        textAlign: 'center',
        fontWeight: 'bold'
      },
      info:{
        fontSize: 15,
        color: color.white,
        marginBottom: 20,
        textAlign: 'center',
       
      },
      button_text:{
        textAlign: 'center',
        fontSize: 24,
        color: colors.primary,
        fontWeight: 'bold'
      }
      
})
