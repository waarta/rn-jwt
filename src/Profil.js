import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import * as KJUR from "jsrsasign";

const axios = require("axios");

class Profil extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			name: "",
			age: ""
		};
	}
	componentDidMount() {
		this.getInfos();
	}

	getInfos() {
		let jwt = this.props.jwt;
		console.log("jwt", jwt);
		var payloadObj = KJUR.jws.JWS.readSafeJSONString(
			KJUR.b64utoutf8(this.props.jwt.split(".")[1])
		);
		console.log("payload", payloadObj);
		axios({
			method: "get",
			url: "http://10.31.4.44:3000/api/users/" + payloadObj.sub,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer " + jwt
			}
		})
			.catch(function(error) {
				console.log(error);
			})
			.then(
				function(response) {
					console.log(response.data);
					this.setInfos(
						response.data.age,
						response.data.email,
						response.data.name
					);
				}.bind(this)
			);
	}

	setInfos(age, email, name) {
		console.log("setInfos");
		this.setState({
			age: age,
			email: email,
			name: name
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.titre}>Profil</Text>
				<Text style={styles.info}>email : {this.state.email}</Text>
				<Text style={styles.info}>name : {this.state.name}</Text>
				<Text style={styles.info}>age : {this.state.name}</Text>
			</View>
		);
	}
}

Profil.propTypes = {
	jwt: PropTypes.string.isRequired
};

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
