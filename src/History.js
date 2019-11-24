import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground, View, Alert, ScrollView, Picker } from 'react-native';
import { CardThree } from "react-native-card-ui"


export class History extends React.Component {

    static navigationOptions = {
        title: 'GEÇMİŞ İŞLEMLERİM',
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
        console.log(this.props.navigation.getParam('history'))
        return (
            <ScrollView>
                {this.props.navigation.getParam('history').map(history => {
                    if (history.Type == "Para Yatırma") {
                        return (
                            <View key={history.Time}>
                                <CardThree title={`${history.Date} ${history.Time}`}
                                    subTitle={`${history.Reciever} nolu hesaba ${history.Amount} TL tutarında ${history.Type} işlemi gerçekleştirilmiştir.`}
                                    profile={{
                                        uri:
                                            "https://cdn2.iconfinder.com/data/icons/wallet-6/1000/Wallet-04-256.png"
                                    }}
                                />
                            </View>
                        )
                    }


                    else if (history.Type == "Para Çekme") {
                        return (
                            <View key={history.Time}>
                                <CardThree title={`${history.Date} ${history.Time}`}
                                    subTitle={`${history.Reciever} nolu hesaptan ${history.Amount} TL tutarında ${history.Type} işlemi gerçekleştirilmiştir.`}
                                    profile={{
                                        uri:
                                            "https://cdn4.iconfinder.com/data/icons/banking-60/64/atm-withdraw-bank-mone-512.png"
                                    }}
                                />
                            </View>
                        )
                    }

                    else return (
                        <View key={history.Time}>
                            <CardThree title={`${history.Date} ${history.Time}`}
                                subTitle={`${history.Sender} nolu hesaptan ${history.Reciever} nolu hesaba ${history.Amount} TL tutarında ${history.Type} işlemi gerçekleştirilmiştir.`}
                                profile={{
                                    uri:
                                        "https://cdn4.iconfinder.com/data/icons/blue-line-business/64/investment-512.png"
                                }}
                            />
                        </View>
                    )
                })}
            </ScrollView>
        )


    }
}






