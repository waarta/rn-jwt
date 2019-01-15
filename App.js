import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Accueil from "./src/Accueil";

export default class App extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Accueil />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
