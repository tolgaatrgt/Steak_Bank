import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground, View, ScrollView } from 'react-native';
import axios from 'axios'


export class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = { Tc: '', Sifre: '', SifreTekrar: '', Ad: '', Soyad: '', Cep: '', Adres: '' }
    }
    static navigationOptions = {
        title: 'Üye Ol',
        headerStyle: {
            backgroundColor: 'green',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
            fontWeight: 'bold',
            marginLeft: 110

        },
    };
    register = () => {

        if (this.state.Ad.length === 0 || this.state.Soyad.length == 0 || this.state.Tc.length == 0
            || this.state.SifreTekrar.length == 0 || this.state.Sifre.length == 0 || this.state.Cep.length == 0
            || this.state.Adres.length == 0) {
            alert('Lütfen tüm alanları doldurunuz !')

        }

        else if (this.state.Sifre != this.state.SifreTekrar) {
            alert('Şifreler Uyuşmuyor !')
        }
        else if (this.state.Sifre.length < 6) {
            alert('Şifre en az 6 haneli olmalıdır !')
        }

        else if (this.state.Tc.length < 11 || this.state.Tc.length > 11) {
            alert("Hatalı Tc Kimlik numarası girdiniz !")
        }

        else if (this.state.Cep.length < 11 || this.state.Cep.length > 11) {
            alert('Şifre en az 6 haneli olmalıdır !')
        }


        else {
            axios({
                method: "POST",
                url: 'http://10.0.2.2:4000/users/register',
                data: {
                    Tc: this.state.Tc,
                    Sifre: this.state.Sifre,
                    Ad: this.state.Ad,
                    Soyad: this.state.Soyad,
                    Cep: this.state.Cep,
                    Adres: this.state.Adres,
                },
                headers: {
                    'Content Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
            )
                .then(({ data }) => {
                    console.log(data);
                    this.props.navigation.navigate('Login')
                })
                .catch(function (error) {
                    console.log(error);
                    alert('Lutfen Giris Yapiniz');
                });

        }
    }
    render() {
        return (
            <ScrollView>
                <ImageBackground style={styles.container} source={require('./img/dollar.png')}>
                    <View style={styles.emailContainer}>
                        <TextInput placeholder={'Adınız'} onChangeText={(Ad) => this.setState({ Ad })} />
                    </View>
                    <View style={styles.emailContainer}>
                        <TextInput placeholder={'Soyadınız'} onChangeText={(Soyad) => this.setState({ Soyad })} />
                    </View>
                    <View style={styles.emailContainer}>
                        <TextInput keyboardType='numeric' placeholder={'TC Numaranız'} onChangeText={(Tc) => this.setState({ Tc })} />
                    </View>
                    <View style={styles.passwordContainer}>
                        <TextInput style={styles.textInput} placeholder="Şifreniz(en az 6 haneli)"
                            secureTextEntry={true} onChangeText={(Sifre) => this.setState({ Sifre })} />
                    </View>
                    <View style={styles.passwordContainer}>
                        <TextInput style={styles.textInput} placeholder="Şifrenizi tekrar giriniz"
                            secureTextEntry={true} onChangeText={(SifreTekrar) => this.setState({ SifreTekrar })} />
                    </View>
                    <View style={styles.emailContainer}>
                        <TextInput keyboardType='numeric' placeholder={'Cep telefonunu numaranız'} onChangeText={(Cep) => this.setState({ Cep })} />
                    </View>
                    <View style={styles.emailContainer}>
                        <TextInput placeholder={'Adresiniz'} onChangeText={(Adres) => this.setState({ Adres })} />
                    </View>

                    <TouchableOpacity style={styles.loginButton}>

                        <Text style={styles.buttonText} onPress={this.register}>ÜYE OL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.loginButton}>

                        <Text style={styles.buttonText}>Zaten hesabın var mı ?</Text>
                    </TouchableOpacity>

                </ImageBackground>
            </ScrollView>
        )
    };


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    header: {
        fontSize: 30,
        color: 'rgba(45, 0, 126, 1))',
        fontWeight: 'bold',
        fontFamily: 'fantasy',
        marginBottom: 5
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
        marginTop: 15
    },
    passwordContainer: {
        width: 325,
        borderColor: '#CFD0D1',
        borderWidth: 2,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F6F7',
        zIndex: 2,
        marginBottom: 20,
    },

    loginButton: {
        backgroundColor: '#CFD0D1',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,

    },
    buttonText: {

        fontWeight: 'bold',
        fontSize: 15


    }
});