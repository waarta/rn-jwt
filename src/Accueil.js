import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Login from "./Login";
import Logged from "./Logged";
import * as Keychain from "react-native-keychain";

class Accueil extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logged: false,
			refreshToken: "",
			jwt: ""
		};
	}

	logged(refreshToken, jwt) {
		this.setState({
			logged: true,
			refreshToken: refreshToken,
			jwt: jwt
		});
		this.saveRefreshToken(refreshToken);
	}

	logout() {
		this.setState({
			logged: false,
			refreshToken: "",
			jwt: ""
		});
		this.removeRefreshToken();
	}

	async saveRefreshToken(refreshToken) {
		await Keychain.setGenericPassword("refreshToken", refreshToken);
	}

	async getRefreshToken() {
		try {
			const credentials = await Keychain.getGenericPassword();
			if (credentials) {
				this.setState({ refreshToken: credentials.password });
				return credentials.password;
			} else {
				this.setState({ refreshToken: "" });
				return null;
			}
		} catch (error) {
			console.log("Keychain couldn't be accessed!", error);
			return null;
		}
	}

	async removeRefreshToken() {
		await Keychain.resetGenericPassword();
	}

	render() {
		var res = "";
		if (this.state.logged) {
			res = (
				<View style={styles.container}>
					<Logged logout={this.logout.bind(this)} jwt={this.state.jwt} />
				</View>
			);
		} else
			res = (
				<View style={styles.container}>
					<Login
						logged={this.logged.bind(this)}
						refreshToken={this.getRefreshToken.bind(this)}
					/>
				</View>
			);
		return res;
	}
}
const styles = StyleSheet.create({
	container: {
		justifyContent: "space-between"
	},
	essais: {
		flexDirection: "row",
		justifyContent: "space-between"
	}
});

export default Accueil;
