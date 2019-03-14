import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import * as KJUR from "jsrsasign";
import Register from "./Register";

const axios = require("axios");

class Profil extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			name: "",
			age: "",
			users: []
		};
	}
	componentDidMount() {
		this.getInfos();
	}

	getInfos() {
		let jwt = this.props.jwt;
		var payloadObj = KJUR.jws.JWS.readSafeJSONString(
			KJUR.b64utoutf8(jwt.split(".")[1])
		);
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
					if (response != undefined) {
						this.setInfos(
							response.data.age,
							response.data.email,
							response.data.name
						);
					}
				}.bind(this)
			);
	}

	setInfos(age, email, name) {
		this.setState({
			age: age,
			email: email,
			name: name
		});
	}

	showUsers() {
		let jwt = this.props.jwt;
		axios({
			method: "get",
			url: "http://10.31.4.44:3000/api/users/",
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
					if (response != undefined) {
						this.setUsers(response.data);
					}
				}.bind(this)
			);
	}

	reloadData() {
		this.getInfos();
	}

	setUsers(users) {
		this.setState({ users: users });
	}

	getUserRole() {
		var payloadObj = KJUR.jws.JWS.readSafeJSONString(
			KJUR.b64utoutf8(this.props.jwt.split(".")[1])
		);
		return payloadObj.role;
	}

	render() {
		var btn = <View />;
		if (this.getUserRole() == "admin") {
			btn = (
				<View>
					<TouchableOpacity onPress={this.showUsers.bind(this)}>
						<Text style={styles.btnUsers}>show users</Text>
					</TouchableOpacity>
					{this.state.users.map((user, i) => (
						<Text key={i}>
							{user.id}: {user.name}, {user.email} ({user.age} ans)
						</Text>
					))}
				</View>
			);
		} else if (this.getUserRole() == "user") {
			btn = (
				<View>
					<TouchableOpacity onPress={this.reloadData.bind(this)}>
						<Text style={styles.btnUsers}>reload Data</Text>
					</TouchableOpacity>
				</View>
			);
		}
		if (this.state.email == "")
			return (
				<Register setInfos={this.setInfos.bind(this)} jwt={this.props.jwt} />
			);
		else
			return (
				<View style={styles.container}>
					<Text style={styles.titre}>Profil</Text>
					<Text style={styles.info}>email : {this.state.email}</Text>
					<Text style={styles.info}>name : {this.state.name}</Text>
					<Text style={styles.info}>age : {this.state.age}</Text>
					{btn}
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
	},
	btnUsers: {
		fontSize: 15,
		color: "green"
	}
});

export default Profil;
