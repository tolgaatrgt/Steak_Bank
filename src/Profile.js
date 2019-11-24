import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground, View, Button, Alert, ScrollView, Picker } from 'react-native';
import axios from 'axios'
import { CardThree } from "react-native-card-ui"

export class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false, visible2: false, visible3: false, visible4: false, visible5: false, visible6: false, visible7: false, accounts: [], accountWillDelete: "",
            accountWillDeposit: "", amount: 0, accountWillTransfer: "", gonderenHesapNo: "", toWho: [], Ad: "", Soyad: "",
            transactionType: "", history: []
        }
    }
    static navigationOptions = {
        title: 'Profile',
        headerStyle: {
            backgroundColor: 'green',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
            fontWeight: 'bold',
            marginLeft: 50
        }
    };

    componentDidMount = () => {

        this.getHistory()
        this.getAccounts()
    }

    render() {
        console.log(this.state.accounts)
        return (

            < ScrollView ref={ref => this.scrollView = ref}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    this.scrollView.scrollToEnd({ animated: true });
                }}>

                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 30, color: 'brown' }}>
                        Hoşgeldiniz{', '}{this.props.navigation.getParam('Ad')} {``}{this.props.navigation.getParam('Soyad')}</Text></View>
                <View style={{ margin: 10 }}>
                    <Button onPress={this.accountConfirmation} style={styles.loginButton} title='Yeni Hesap Aç ' />
                </View>
                <View style={{ margin: 10 }}>
                    <Button onPress={this.getAccounts} title='Hesaplarım' style={styles.loginButton} /></View>
                <View style={{ margin: 10 }}>
                    <Button onPress={this.depositMenuButton} title='Hesabima Para Yatir' style={styles.loginButton} /></View>
                <View style={{ margin: 10 }}>
                    <Button onPress={this.withdrawMenuButton} title='Hesabımdan Para Çek' style={styles.loginButton} /></View>
                <View style={{ margin: 10 }}>
                    <Button onPress={this.transferMenuButton} title='HAVALE' style={styles.loginButton} /></View>
                <View style={{ margin: 10 }}>
                    <Button onPress={this.eftMenuButton} title='VİRMAN' style={styles.loginButton} /></View>
                <View style={{ margin: 10 }}>
                    <Button onPress={this.navigateHistoryPage} title='GEÇMİŞ İŞLEMLER' style={styles.loginButton} /></View>
                <View style={{ margin: 10 }}>
                    <Button onPress={this.navigateGedizPage} title='FATURA ÖDE' style={styles.loginButton} /></View>

                {this.renderDeleteAccountButton()}
                {this.renderAccounts()}
                {this.renderDeletePicker()}
                {this.renderDepositPicker()}
                {this.renderTransferPicker()}
                {this.renderEftPicker()}
                {this.renderWithdrawPicker()}
            </ScrollView >
        )
    };

    accountConfirmation = () => {
        Alert.alert(
            'Hesap Açma Talebi',
            'Hesap açmak istediğinizden emin misin ?',
            [

                {
                    text: 'VAZGEÇ',
                    style: 'cancel',
                },
                { text: 'HESAP AÇ', onPress: () => this.newAccount() },
            ],
            { cancelable: false },
        );

    };

    newAccount = () => {

        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/newaccount',
            data: {
                MusteriID: this.props.navigation.getParam('Id')
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => { alert('Hesap Basariyla Olusturuldu !'), this.getAccounts() })
            .catch(function (error) {
                alert(error);
            });


    }

    getAccounts = () => {
        this.setState({ visible2: true })
        console.log('get accou')
        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/getaccounts',
            data: {
                MusteriID: this.props.navigation.getParam('Id')
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => this.setState({ accounts: data.data }))
            .catch(function (error) {
                alert('Mevcut Hesabınız Bulunmamaktadır !');
            }, this.setState({ accounts: [] }));

        if (this.state.accounts.length = 1)
            setTimeout(() => this.state.accounts.map(item => this.setState({
                accountWillDelete: item.HesapNo
            })), 500)

    }

    deleteAccount = () => {

        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/deleteaccounts',
            data: {
                HesapNo: this.state.accountWillDelete
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => alert('Hesap Silindi !'))
            .catch(function (error) {
                alert('OLMADI !');
            });

        setTimeout(() => this.getAccounts(), 300)

    }

    depositMoney = () => {
        this.setState({ transactionType: 'Para Yatırma' })

        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/depositmoney',
            data: {
                amount: this.state.amount,
                HesapNo: this.state.accountWillDeposit
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => alert('Para Yatirildi !'))
            .catch(function (error) {
                alert('OLMADI !');
            })

        setTimeout(() => this.getAccounts(), 300)
        this.depositTransaction()
        this.getHistory()
    }

    withdrawMoney = () => {
        this.setState({ transactionType: 'Para Çekme' })
        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/withdrawmoney',
            data: {
                amount: this.state.amount,
                HesapNo: this.state.accountWillTransfer,
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => alert('Para Çekildi !'))
            .catch(function (error) {
                alert(error);
            })

        setTimeout(() => this.getAccounts(), 300)

        this.withdrawTransaction()
        this.getHistory()
    }

    transferMoney = () => {

        this.setState({ transactionType: 'Havale' })

        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/transfermoney',
            data: {
                amount: this.state.amount,
                HesapNo: this.state.accountWillTransfer,
                gonderenHesapNo: this.state.gonderenHesapNo
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => alert('Para Yatirildi !'))
            .catch(function (error) {
                alert(error);
            })

        setTimeout(() => this.getAccounts(), 300)

        this.transferTransaction()
        this.getHistory()


    }

    eftMoney = () => {
        this.setState({ transactionType: 'Virman' })
        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/eftmoney',
            data: {
                amount: this.state.amount,
                HesapNo: this.state.accountWillTransfer,
                gonderenHesapNo: this.state.gonderenHesapNo
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => alert('Para Aktarıldı !'))
            .catch(function (error) {
                alert(error);
            })

        setTimeout(() => this.getAccounts(), 300)

        this.eftTransaction()
        this.getHistory()
    }

    whoIs = () => {
        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/whois',
            data: {
                HesapNo: this.state.accountWillTransfer,
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => this.setState({ toWho: data.data }))
            .catch(function (error) {
                alert("Geçerli bir hesap numarası giriniz");
            })
        setTimeout(() => this.getAccounts(), 300)
    }




    deleteAccountMenuButton = () => {

        this.setState({ visible: true, visible3: false, visible4: false, visible5: false, visible6: false })
        if (this.state.accounts.length > 0)
            this.setState({ accountWillDelete: this.state.accounts[0].HesapNo })
    }

    renderDeleteAccountButton = () => {
        if (this.state.visible2)
            return (
                <View style={{ margin: 10 }}>
                    <Button onPress={this.deleteAccountMenuButton} style={styles.loginButton} title='Hesabımı Sil' />
                </View>
            )
    }

    deleteAccountConfirmation = () => {
        const a = this.state.accountWillDelete
        Alert.alert(
            `${a}`,
            'Nolu hesabınızı silmek istediğinizden emin misiniz?',
            [

                {
                    text: 'VAZGEÇ',
                    style: 'cancel',
                },
                { text: 'HESABI SİL', onPress: () => this.deleteAccount() },
            ],
            { cancelable: false },
        );


    }

    depositMoneyConfirmation = () => {

        const a = this.state.accountWillDeposit
        const b = this.state.amount
        this.state.amount > 0 ?
            Alert.alert(
                `${a}`,
                `Nolu hesaba ${b} TL tutarinda para yatirmak istediginizden emin misiniz ?`,
                [

                    {
                        text: 'VAZGEÇ',
                        style: 'cancel',
                    },
                    { text: 'YATIR', onPress: () => this.depositMoney() },
                ],
                { cancelable: false },
            )
            : alert('Lutfen dogru tutar giriniz !')
    }

    withdrawMoneyConfirmation = () => {

        const a = this.state.accountWillTransfer
        const b = this.state.amount
        this.state.amount > 0 ?
            Alert.alert(
                `${a}`,
                `Nolu hesaptan ${b} TL tutarinda para çekmek istediginizden emin misiniz ?`,
                [

                    {
                        text: 'VAZGEÇ',
                        style: 'cancel',
                    },
                    { text: 'PARA ÇEK', onPress: () => this.withdrawMoney() },
                ],
                { cancelable: false },
            )
            : alert('Lutfen dogru tutar giriniz !')

    }

    transferMoneyConfirmation = () => {

        if (this.state.accounts.every(account => account.HesapNo !== this.state.accountWillTransfer)) {
            this.whoIs()
            setTimeout(() => this.transferAlert(), 1000)
        } else {
            alert("Kendi hesabina havale yapamazsin")

        }

    }

    transferAlert = () => {
        this.state.toWho.map(kisi => this.setState({ Ad: kisi.Ad, Soyad: kisi.Soyad }))
        const a = this.state.accountWillTransfer
        const b = this.state.amount
        const c = `${this.state.Ad} ${this.state.Soyad}`
        this.state.amount > 0 ?
            Alert.alert(
                `${c} adlı kişinin sahip olduğu`,
                `${a} Nolu hesaba ${b} TL tutarinda para göndermek istediginizden emin misiniz ?`,
                [

                    {
                        text: 'VAZGEÇ',
                        style: 'cancel',
                    },
                    { text: 'GÖNDER', onPress: () => this.transferMoney() },
                ],
                { cancelable: false },
            )
            : alert('Lutfen dogru tutar giriniz !')
    }


    eftMoneyConfirmation = () => {
        const a = this.state.accountWillTransfer
        const b = this.state.amount
        this.state.amount > 0 ?
            Alert.alert(
                `${a}`,
                `Nolu hesaba ${b} TL tutarinda para aktarmak istediginizden emin misiniz ?`,
                [

                    {
                        text: 'VAZGEÇ',
                        style: 'cancel',
                    },
                    { text: 'GÖNDER', onPress: () => this.eftMoney() },
                ],
                { cancelable: false },
            )
            : alert('Lutfen dogru tutar giriniz !')
    }


    renderDeletePicker = () => {
        if (this.state.visible & this.state.accounts.length > 0) {
            return (
                <>
                    <Picker selectedValue={this.state.accountWillDelete} onValueChange={(itemValue, itemPosition) =>
                        this.setState({ accountWillDelete: itemValue })
                    } >
                        {this.state.accounts.map(account => (
                            <Picker.Item key={account.HesapNo} label={account.HesapNo} value={account.HesapNo} />
                        ))}

                    </Picker>

                    <View style={{ margin: 10 }} >
                        <Button onPress={this.deleteAccountConfirmation} style={styles.loginButton} color='red' title='Seçili Hesabı Sil' />
                    </View>
                </>
            )
        }
    }


    renderDepositPicker = () => {
        if (this.state.visible3 == true) {
            return (
                <View>
                    <Text>Para yatırmak istediğiniz hesabı seçiniz.</Text>
                    <Picker selectedValue={this.state.accountWillDeposit} onValueChange={(itemValue, itemPosition) =>
                        this.setState({ accountWillDeposit: itemValue })
                    } >
                        {this.state.accounts.map(account => (
                            <Picker.Item key={account.HesapNo} label={account.HesapNo} value={account.HesapNo} />
                        ))}
                    </Picker>

                    <TextInput onChangeText={(amount) => this.setState({ amount })} placeholder='Yatirmak istediginiz tutari giriniz'
                        keyboardType='numeric'></TextInput>
                    <View style={{ margin: 10 }} >
                        <Button onPress={this.depositMoneyConfirmation} style={styles.loginButton} color='green' title='Para Yatir ' />
                    </View>
                </View>
            )
        }
    }

    renderWithdrawPicker = () => {
        if (this.state.visible7 == true) {
            return (
                <View>
                    <Text>Para çekmek istediğiniz hesabı seçiniz.</Text>
                    <Picker selectedValue={this.state.accountWillTransfer} onValueChange={(itemValue, itemPosition) =>
                        this.setState({ accountWillTransfer: itemValue })
                    } >
                        {this.state.accounts.map(account => (
                            <Picker.Item key={account.HesapNo} label={account.HesapNo} value={account.HesapNo} />
                        ))}
                    </Picker>

                    <TextInput onChangeText={(amount) => this.setState({ amount })} placeholder='Çekmek istediginiz tutari giriniz'
                        keyboardType='numeric'></TextInput>
                    <View style={{ margin: 10 }} >
                        <Button onPress={this.withdrawMoneyConfirmation} style={styles.loginButton} color='green' title='Para Çek' />
                    </View>
                </View>
            )
        }
    }

    renderTransferPicker = () => {

        if (this.state.visible4 == true) {
            return (
                <View>
                    <Text>Hangi hesabınızdan para göndermek istediğinizi seçiniz.</Text>
                    <Picker selectedValue={this.state.gonderenHesapNo} onValueChange={(itemValue, itemPosition) =>
                        this.setState({ gonderenHesapNo: itemValue })
                    } >
                        {this.state.accounts.map(account => (
                            <Picker.Item key={account.HesapNo} label={account.HesapNo} value={account.HesapNo} />
                        ))}
                    </Picker>
                    <TextInput onChangeText={(accountWillTransfer) => this.setState({ accountWillTransfer })} placeholder='Alıcı hesap numarasını giriniz.'
                        keyboardType='numeric'></TextInput>
                    <TextInput onChangeText={(amount) => this.setState({ amount })} placeholder='Yatirmak istediginiz tutari giriniz'
                        keyboardType='numeric'></TextInput>
                    <View style={{ margin: 10 }} >
                        <Button onPress={this.transferMoneyConfirmation} style={styles.loginButton} color='green' title='Para Gönder ' />
                    </View>
                </View>
            )
        }
    }

    renderEftPicker = () => {
        if (this.state.visible5 == true) {
            return (
                <View>
                    <Text>Hangi hesabınızdan para aktarmak istediğinizi seçiniz.</Text>
                    <Picker selectedValue={this.state.gonderenHesapNo} onValueChange={(itemValue, itemPosition) =>
                        this.setState({ gonderenHesapNo: itemValue })
                    } >
                        {this.state.accounts.map(account => (
                            <Picker.Item key={account.HesapNo} label={account.HesapNo} value={account.HesapNo} />
                        ))}
                    </Picker>
                    <Text>Hangi hesabınıza para aktarmak istediğinizi seçiniz.</Text>
                    <Picker selectedValue={this.state.accountWillTransfer} onValueChange={(itemValue, itemPosition) =>
                        this.setState({ accountWillTransfer: itemValue })
                    } >
                        {this.state.accounts.filter(account => account.HesapNo !== this.state.gonderenHesapNo).map(account => (
                            <Picker.Item key={account.HesapNo} label={account.HesapNo} value={account.HesapNo} />
                        ))}
                    </Picker>

                    <TextInput onChangeText={(amount) => this.setState({ amount })} placeholder='Aktarmak istediginiz tutari giriniz'
                        keyboardType='numeric'></TextInput>
                    <View style={{ margin: 10 }} >
                        <Button onPress={this.eftMoneyConfirmation} style={styles.loginButton} color='green' title='Para Aktar ' />
                    </View>
                </View>
            )
        }

    }


    navigateHistoryPage = () => {
        const history = this.state.history
        this.props.navigation.navigate('History', { history })
    }

    navigateGedizPage = () => {
        const accounts = this.state.accounts
        this.props.navigation.navigate('Gediz', { accounts, getAccounts: () => this.getAccounts() })
    }

    depositTransaction = () => {
        let date = new Date().toLocaleDateString().split(/\//)
        const trdate = `${date[1]}/${date[0]}/${date[2]}`
        const time = new Date().toLocaleTimeString()
        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/transaction',
            data: {
                type: this.state.transactionType,
                date: trdate,
                time: time,
                reciever: this.state.accountWillDeposit,
                id: this.props.navigation.getParam('Id'),
                amount: this.state.amount
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => data)
            .catch(function (error) {
                alert(error);
            })
    }

    withdrawTransaction = () => {
        let date = new Date().toLocaleDateString().split(/\//)
        const trdate = `${date[1]}/${date[0]}/${date[2]}`
        const time = new Date().toLocaleTimeString()
        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/transaction',
            data: {
                type: this.state.transactionType,
                date: trdate,
                time: time,
                reciever: this.state.accountWillTransfer,
                id: this.props.navigation.getParam('Id'),
                amount: this.state.amount
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => data)
            .catch(function (error) {
                alert(error);
            })
    }

    eftTransaction = () => {

        let date = new Date().toLocaleDateString().split(/\//)
        const trdate = `${date[1]}/${date[0]}/${date[2]}`
        const time = new Date().toLocaleTimeString()
        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/transaction',
            data: {
                type: this.state.transactionType,
                date: trdate,
                time: time,
                sender: this.state.gonderenHesapNo,
                reciever: this.state.accountWillTransfer,
                id: this.props.navigation.getParam('Id'),
                amount: this.state.amount
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => data)
            .catch(function (error) {
                alert(error);
            })
    }

    transferTransaction = () => {
        let date = new Date().toLocaleDateString().split(/\//)
        const trdate = `${date[1]}/${date[0]}/${date[2]}`
        const time = new Date().toLocaleTimeString().split(/:\:/)
        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/transaction',
            data: {
                type: this.state.transactionType,
                date: trdate,
                time: time,
                sender: this.state.gonderenHesapNo,
                reciever: this.state.accountWillTransfer,
                id: this.props.navigation.getParam('Id'),
                amount: this.state.amount
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => data)
            .catch(function (error) {
                alert(error);
            })

    }

    getHistory = () => {

        axios({
            method: "POST",
            url: 'http://10.0.2.2:4000/users/gethistory',
            data: {
                id: this.props.navigation.getParam('Id')
            },
            headers: {
                'Content Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
            .then(({ data }) => this.setState({ history: data.data }))
            .catch(function (error) { })



    }


    depositMenuButton = () => {
        this.setState({ visible3: !this.state.visible3 })
        this.getAccounts()
        this.setState({ visible: false, visible2: false, visible4: false, visible5: false, visible6: false })
    }

    withdrawMenuButton = () => {

        this.setState({ visible7: !this.state.visible7 })
        this.getAccounts()
        this.setState({ visible: false, visible2: false, visible3: false, visible4: false, visible5: false, visible6: false })

    }

    transferMenuButton = () => {
        this.setState({ visible4: !this.state.visible4 })
        this.getAccounts()
        this.setState({ visible: false, visible2: false, visible3: false, visible5: false, visible6: false })
    }

    eftMenuButton = () => {
        this.setState({ visible5: !this.state.visible5 })
        this.setState({ visible: false, visible2: false, visible3: false, visible4: false, visible6: false })
        this.getAccounts()
    }

    renderAccounts = () => {
        return (
            this.state.accounts.map(account => (
                <View key={account.HesapNo}>
                    <CardThree title={account.HesapNo}
                        subTitle={`${account.Bakiye} TL`}
                        profile={{
                            uri:
                                "https://cdn0.iconfinder.com/data/icons/payment-methods-9/154/visa-master-card-debet-bank-payment-512.png"
                        }}
                        icon={"check"}
                        iconColor={"green"}
                    />
                </View>

            )))

    }

}

const styles = StyleSheet.create({
    loginButton: {
        width: 200,
        backgroundColor: '#CFD0D1',
        padding: 5,
        borderRadius: 20,
        marginBottom: 20,
    }
});



