import { defineStore } from "pinia";
import { API_CONFIG } from "@/constants.js";

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
					this.user = { 
						name: email, 
						full_name: email,
						email: email,
						first_name: email.split('@')[0],
						last_name: ''
					};
					this.isLoggedIn = true;
					
					// Store in localStorage for persistence
					localStorage.setItem("user", JSON.stringify(this.user));
					localStorage.setItem("isLoggedIn", "true");
					
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
				// Invoke Frappe logout to clear server session (works on any port/origin)
				const baseUrl = API_CONFIG.getDashboardBaseUrl();
				await fetch(`${baseUrl}/api/method/logout`, {
					method: "POST",
					credentials: "include",
					headers: { "Content-Type": "application/json" },
				}).catch(() => {});

				// Clear client session state
				this.user = null;
				this.isLoggedIn = false;
				localStorage.removeItem("user");
				localStorage.removeItem("isLoggedIn");
			} catch (error) {
				console.error("Logout error:", error);
			}
		},

		async checkSession() {
			try {
				// Check localStorage for existing session
				const user = localStorage.getItem("user");
				const isLoggedIn = localStorage.getItem("isLoggedIn");
				
				if (user && isLoggedIn === "true") {
					this.user = JSON.parse(user);
					this.isLoggedIn = true;
				} else {
					this.isLoggedIn = false;
					this.user = null;
				}
			} catch (error) {
				this.isLoggedIn = false;
				this.user = null;
			}
		},
	},
});
