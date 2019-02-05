import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Profil from "./Profil";

class Logged extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this.props.logout}>
					<Text style={styles.btnLogout}>Logout</Text>
				</TouchableOpacity>
				<Profil jwt={this.props.jwt} />
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
		color: "red",
		backgroundColor: "black",
		width: 60,
		padding: 5,
		borderRadius: 5
	}
});

export default Logged;
