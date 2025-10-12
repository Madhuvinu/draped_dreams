import { defineStore } from "pinia";

export const sessionStore = defineStore("session", {
	state: () => ({
		user: null,
		isLoggedIn: false,
	}),
	actions: {
		async login(email, password) {
			try {
				// Mock login for now - replace with actual API call
				if (email && password) {
					this.user = { name: email, full_name: email };
					this.isLoggedIn = true;
					return true;
				}
				return false;
			} catch (error) {
				console.error("Login error:", error);
				return false;
			}
		},

		async logout() {
			try {
				// Mock logout for now
				this.user = null;
				this.isLoggedIn = false;
			} catch (error) {
				console.error("Logout error:", error);
			}
		},

		async checkSession() {
			try {
				// Mock session check for now
				this.isLoggedIn = false;
			} catch (error) {
				this.isLoggedIn = false;
			}
		},
	},
});
