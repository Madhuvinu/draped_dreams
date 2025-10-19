import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: "/",
		redirect: "/products",
		name: "Home",
	},
	// E-commerce Pages
	{
		path: "/home",
		name: "HomePage",
		component: () => import("@/pages/Home.vue"),
	},
	{
		path: "/products",
		name: "Products",
		component: () => import("@/pages/Products.vue"),
	},
	{
		path: "/cart",
		name: "Cart",
		component: () => import("@/pages/Cart.vue"),
	},
	{
		path: "/checkout",
		name: "Checkout",
		component: () => import("@/pages/Checkout.vue"),
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("@/pages/Login.vue"),
	},
	{
		path: "/register",
		name: "Register",
		component: () => import("@/pages/Register.vue"),
	},
	{
		path: "/orders",
		name: "OrderHistory",
		component: () => import("@/pages/OrderHistory.vue"),
	},
	// Admin Pages
	{
		path: "/admin",
		redirect: "/admin/dashboard",
		name: "Admin",
	},
	{
		path: "/admin/dashboard",
		name: "AdminDashboard",
		component: () => import("@/pages/Dashboard.vue"),
	},
	{
		path: "/admin/products",
		name: "AdminProducts",
		component: () => import("@/pages/AdminProducts.vue"),
	},
	{
		path: "/admin/customers",
		name: "AdminCustomers",
		component: () => import("@/pages/Customers.vue"),
	},
	{
		path: "/admin/orders",
		name: "AdminOrders",
		component: () => import("@/pages/Orders.vue"),
	},
	{
		path: "/admin/inventory",
		name: "AdminInventory",
		component: () => import("@/pages/Inventory.vue"),
	},
	{
		path: "/admin/reports",
		name: "AdminReports",
		component: () => import("@/pages/Reports.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: () => import("@/pages/Home.vue"),
	},
];

let router = createRouter({
	history: createWebHashHistory(),
	routes,
});

// Authentication check for admin routes
router.beforeEach(async (to, from, next) => {
	// Admin routes require authentication
	if (to.path.startsWith("/admin")) {
		try {
			const response = await fetch("/api/method/frappe.auth.get_logged_user", {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const data = await response.json();
				if (data.message && data.message !== "Guest") {
					// User is authenticated, proceed
					next();
				} else {
					// User is not authenticated, redirect to Frappe login
					window.location.href =
						"/login?redirect-to=" + encodeURIComponent(window.location.pathname);
				}
			} else {
				// Request failed, redirect to Frappe login
				window.location.href =
					"/login?redirect-to=" + encodeURIComponent(window.location.pathname);
			}
		} catch (error) {
			console.error("Authentication check failed:", error);
			// On error, redirect to Frappe login
			window.location.href =
				"/login?redirect-to=" + encodeURIComponent(window.location.pathname);
		}
	} else {
		// Public routes, no authentication required
		next();
	}
});

export default router;
