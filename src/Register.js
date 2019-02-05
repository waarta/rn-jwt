import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import t from "tcomb-form-native";
import PropTypes from "prop-types";
import * as KJUR from "jsrsasign";

const Form = t.form.Form;
const axios = require("axios");

const RegisterUser = t.struct({
	name: t.String,
	email: t.String,
	age: t.Integer
});

class Register extends Component {
	constructor(props) {
		super(props);
	}

	register(name, email, age) {
		let jwt = this.props.jwt;
		var payloadObj = KJUR.jws.JWS.readSafeJSONString(
			KJUR.b64utoutf8(this.props.jwt.split(".")[1])
		);
		const params = {
			id: payloadObj.sub,
			name: name,
			email: email,
			age: age
		};
		axios({
			method: "post",
			url: "http://10.31.4.44:3000/api/users/",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer " + jwt
			},
			data: params
		})
			.catch(function(error) {
				console.log(error);
			})
			.then(
				function(response) {
					if (response != undefined) {
						this.props.setInfos(
							response.data.age,
							response.data.email,
							response.data.name
						);
					}
				}.bind(this)
			);
	}

	handleSubmit = () => {
		var value = this.refs.form.getValue();
		if (value) {
			this.register(value.name, value.email, value.age);
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<Form ref="form" type={RegisterUser} />
				<Button title="Register" onPress={this.handleSubmit} />
			</View>
		);
	}
}

Register.propTypes = {
	jwt: PropTypes.string.isRequired,
	setInfos: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-between",
		marginTop: 50,
		padding: 20
	}
});

export default Register;
