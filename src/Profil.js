import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const axios = require("axios");

class Profil extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			email: "",
			name: "",
			age: ""
		};
	}

	getInfos(id) {
		axios
			.post("http://10.31.4.44:8000/api/users/", { id: id })
			.catch(function(error) {
				this.props.onError(error);
			})
			.then(res => {
				console.log(res.data);
				this.props.logged(res.data.refreshToken, res.data.jwt);
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.titre}>Profil</Text>
				<Text style={styles.info}>id</Text>
				<Text style={styles.info}>email</Text>
				<Text style={styles.info}>name</Text>
				<Text style={styles.info}>age</Text>
			</View>
		);
	}
}

Profil.propTypes = {};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		marginTop: 50,
		padding: 20
	},
	titre: {
		fontSize: 15,
		color: "black"
	},
	info: {
		fontSize: 12,
		color: "black"
	}
});

export default Profil;
