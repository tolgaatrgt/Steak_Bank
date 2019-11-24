import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Button, ImageBackground, View, Alert, ScrollView, Picker } from 'react-native';
import { CardEcomThree } from "react-native-card-ui"
import ActionSheet from 'react-native-actionsheet';
import axios from 'axios'


export class Gediz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            aboneNo: "", faturalar: [], visible: false, HesapNo: "", FaturaID: 0
        }
    }
    static navigationOptions = {
        title: 'FATURA ÖDEME',
        headerStyle: {
            backgroundColor: 'green',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
            fontWeight: 'bold',
            marginLeft: 50
        }
    };



    showActionSheet = () => {
        this.ActionSheet.show();
    };




    render() {

        const options = this.props.navigation.getParam('accounts').map((account) => `${account.HesapNo}`)

        return (
            <ScrollView style={{ margin: 5 }}>
                <TextInput onChangeText={(aboneNo) => this.setState({ aboneNo })} value={this.state.aboneNo} placeholder={'Abone Numaranızı giriniz'} />
                <Button onPress={this.getBill} title='Fatura Sorgula' />
                {this.renderBill()}
                <ActionSheet
                    ref={o => (this.ActionSheet = o)}
                    title={'Faturayı ödemek istediğiniz hesabı seçiniz.'}
                    options={options}
                    onPress={index => {
                        this.payBill(this.state.FaturaID, options[index])
                    }}
                />
            </ScrollView>

        )


    }



    getBill = () => {

        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/getbill',
            data: {
                AboneNo: this.state.aboneNo
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => {

                this.setState({ faturalar: data && data.data ? data.data : [] })

            })
            .catch((error) => {
                alert("Abone numarasına ait fatura bulunamadı")
            }
            )
    }

    renderBill = () => {
        if (this.state.faturalar.length > 0)
            return (
                this.state.faturalar.map(fatura => (
                    <View key={fatura.Borç} style={{ margin: 10 }}>
                        <CardEcomThree
                            title={`${fatura.AboneNo}`}
                            subTitle={"nolu aboneliğe ait ödenmemiş faturanız bulunmaktadır."}
                            price={`${fatura.Borç} TL`}
                            image={require("./img/gediz.png")}
                            buttonText={"Faturayı Öde"}
                            buttonColor={"#f88020"}
                            onClickButton={() => this.payBillButtonAction(fatura.FaturaID)}
                        />
                    </View>
                )))



    }

    payBillButtonAction = (id) => {
        this.setState({ FaturaID: id })
        this.showActionSheet()

    }

    payBill = (FaturaID, HesapNo) => {

        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/paybill',
            data: {
                FaturaID: FaturaID,
                HesapNo: HesapNo
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => data).then(
                () => {
                    this.getBill(), alert("Faturanız Başarıyla Ödendi")
                    this.props.navigation.getParam('getAccounts')();
                }

            )
            .catch(function (error) {
                alert(error);
            })

    }




}





    // renderPicker = () => {
    //     if (this.state.visible == true)
    //         return (
    //             <View>
    //                 <Text>Fatura ödeme işlemi için kullanılacak hesabı seçiniz.</Text>
    //                 <Picker selectedValue={this.state.HesapNo} onValueChange={(itemValue, itemPosition) =>
    //                     this.setState({ HesapNo: itemValue })
    //                 } >
    //                     {this.props.navigation.getParam('accounts').map(account => (
    //                         <Picker.Item key={account.HesapNo} label={account.HesapNo} value={account.HesapNo} />
    //                     ))}
    //                 </Picker>
    //             </View>

    //         )
    // }