const o = "http://dreams.localhost:8002/api/method/draped_dreams.api.auth",
	c = {
		async register(s) {
			var a;
			try {
				const r = await (
					await fetch(`${o}.register_user`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(s),
					})
				).json();
				return r.message && r.message.success
					? { success: !0, message: r.message.message }
					: {
							success: !1,
							message:
								((a = r.message) == null ? void 0 : a.message) ||
								"Registration failed",
					  };
			} catch (e) {
				return (
					console.error("Registration error:", e),
					{ success: !1, message: "Network error. Please try again." }
				);
			}
		},
		async login(s, a) {
			var e;
			try {
				const t = await (
					await fetch(`${o}.login_user`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email: s, password: a }),
					})
				).json();
				return t.message && t.message.success
					? { success: !0, message: t.message.message, data: t.message.data }
					: {
							success: !1,
							message:
								((e = t.message) == null ? void 0 : e.message) || "Login failed",
					  };
			} catch (r) {
				return (
					console.error("Login error:", r),
					{ success: !1, message: "Network error. Please try again." }
				);
			}
		},
		async getProducts(s = {}) {
			var a;
			try {
				const e = new URLSearchParams();
				s.category && e.append("category", s.category),
					s.search && e.append("search", s.search),
					s.price_range && e.append("price_range", s.price_range),
					s.sort_by && e.append("sort_by", s.sort_by),
					s.limit && e.append("limit", s.limit),
					s.offset && e.append("offset", s.offset);
				const t = await (await fetch(`${o}.get_products?${e}`)).json();
				return t.message && t.message.success
					? { success: !0, data: t.message.data }
					: {
							success: !1,
							message:
								((a = t.message) == null ? void 0 : a.message) ||
								"Failed to fetch products",
					  };
			} catch (e) {
				return (
					console.error("Get products error:", e),
					{ success: !1, message: "Network error. Please try again." }
				);
			}
		},
		async getProductDetails(s) {
			var a;
			try {
				const r = await (
					await fetch(`${o}.get_product_details`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ product_name: s }),
					})
				).json();
				return r.message && r.message.success
					? { success: !0, data: r.message.data }
					: {
							success: !1,
							message:
								((a = r.message) == null ? void 0 : a.message) ||
								"Failed to fetch product details",
					  };
			} catch (e) {
				return (
					console.error("Get product details error:", e),
					{ success: !1, message: "Network error. Please try again." }
				);
			}
		},
		async getCategories() {
			var s;
			try {
				const e = await (await fetch(`${o}.get_categories`)).json();
				return e.message && e.message.success
					? { success: !0, data: e.message.data }
					: {
							success: !1,
							message:
								((s = e.message) == null ? void 0 : s.message) ||
								"Failed to fetch categories",
					  };
			} catch (a) {
				return (
					console.error("Get categories error:", a),
					{ success: !1, message: "Network error. Please try again." }
				);
			}
		},
	};
export { c as a };
