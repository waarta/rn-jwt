import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Login from "./Login";
import Logged from "./Logged";

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
	}

	logout() {
		this.setState({
			logged: false,
			refreshToken: "",
			jwt: ""
		});
	}

	render() {
		console.log("logged : ", this.state.logged);
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
					<Login logged={this.logged.bind(this)} />
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
