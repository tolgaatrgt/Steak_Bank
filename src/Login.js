import React, { Component } from 'react';
import axios from 'axios'
import { StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { Tc: '', Sifre: '' }
    }
    static navigationOptions = {
        title: 'Steak Bank`a Hoşgeldiniz',
        headerStyle: {
            backgroundColor: 'green',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
            fontWeight: 'bold',
            marginLeft: 50
        }
    };
    render() {
        return (
            <ScrollView>
                <ImageBackground style={styles.container} source={require('./img/dollar.png')}>
                    <Text style={styles.header}></Text>
                    <View style={styles.emailContainer}>
                        <TextInput keyboardType="numeric" onChangeText={(Tc) => this.setState({ Tc })} value={this.state.Tc} placeholder={'TC No'} />
                    </View>

                    <View style={styles.passwordContainer}>
                        <TextInput onChangeText={(Sifre) => this.setState({ Sifre })} value={this.state.Sifre} style={styles.textInput} placeholder="Şifre"
                            secureTextEntry={true} />
                    </View>
                    <TouchableOpacity onPress={this.login} style={styles.loginButton}>

                        <Text style={{ marginLeft: 65, fontSize: 20 }}>GİRİŞ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.loginButton}>

                        <Text style={{ marginLeft: 40 }}>Hesabın yok mu ?</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </ScrollView>
        )
    };

    login = () => {
        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/login',
            data: {
                Tc: this.state.Tc,
                Sifre: this.state.Sifre
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => this.props.navigation.navigate('Profile', data.data))
            .catch(function (error) {
                alert('Kullanici Bulunamadi');
            });


    }

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'fantasy',
        marginBottom: 0
    },
    header: {
        marginBottom: 300,
        fontSize: 60,
        color: 'rgba(45, 0, 126, 1)',
        fontWeight: 'bold',
    },
    emailContainer: {
        width: 325,
        borderColor: '#CFD0D1',
        borderWidth: 2,
        height: 40,
        padding: 0,
        borderRadius: 20,
        backgroundColor: '#F5F6F7',
        marginBottom: 20,
    },
    passwordContainer: {
        width: 325,
        borderColor: '#CFD0D1',
        borderWidth: 2,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F6F7',
        zIndex: 2,
        marginBottom: 40,
    },

    loginButton: {

        width: 200,
        backgroundColor: '#CFD0D1',
        padding: 5,
        borderRadius: 20,
        marginBottom: 10,

    },
    buttonText: {

        fontWeight: 'bold',


    }


});