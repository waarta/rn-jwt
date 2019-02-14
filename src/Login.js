import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import t from "tcomb-form-native";
import PropTypes from "prop-types";

const Form = t.form.Form;
const axios = require("axios");

const LoginUser = t.struct({
	login: t.String,
	password: t.String
});

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: {
				login: "user",
				password: "user"
			}
		};
	}

	login(login, password) {
		const params = {
			login: login,
			password: password
		};

		axios
			.post("http://10.31.4.44:8000/auth/login", params)
			.catch(function(error) {
				console.log(error);
			})
			.then(res => {
				if (res != undefined)
					this.props.logged(res.data.refreshToken, res.data.jwt);
			});
	}

	handleSubmit = () => {
		var value = this.refs.form.getValue();
		if (value) {
			this.login(value.login, value.password);
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.essais}>
					<TouchableOpacity onPress={this.login.bind(this, "user", "user")}>
						<Text>user</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.login.bind(this, "essai", "essai")}>
						<Text>essai</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.login.bind(this, "admin", "admin")}>
						<Text>admin</Text>
					</TouchableOpacity>
				</View>
				<Form value={this.state.value} ref="form" type={LoginUser} />
				<Button title="Login" onPress={this.handleSubmit} />
				<View style={styles.register}>
					<Text>Don't have any anccount ? </Text>
						<Text>Register on auth server !</Text>
				</View>
			</View>
		);
	}
}

Login.propTypes = {
	logged: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-between",
		marginTop: 50,
		padding: 20
	},
	essais: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20
	},
	register: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 20
	}
});

export default Login;
