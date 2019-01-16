import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Profil from "./Profil";

const axios = require("axios");

class Logged extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: {
				login: "user",
				password: "user"
			}
		};
	}

	logout() {
		console.log("logout");
	}

	render() {
		return (
			<View style={styles.container}>
				<Profil jwt={this.props.jwt} />
				<TouchableOpacity onPress={this.props.logout}>
					<Text style={styles.btnLogout}>Logout</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

Logged.propTypes = {
	logout: PropTypes.func.isRequired,
	jwt: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-between",
		marginTop: 50,
		padding: 20
	},
	btnLogout: {
		fontSize: 15,
		color: "red"
	}
});

export default Logged;
