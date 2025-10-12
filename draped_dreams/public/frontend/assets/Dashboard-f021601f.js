import {
	r as m,
	o as w,
	a as p,
	b as u,
	c,
	d as t,
	e as r,
	t as s,
	w as d,
	F as _,
	f,
	g as x,
} from "./index-cc0b157d.js";
const k = { class: "space-y-6" },
	S = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" },
	C = { class: "bg-white rounded-lg shadow p-6" },
	D = { class: "flex items-center" },
	O = { class: "p-3 rounded-full bg-blue-100 text-blue-600" },
	G = { class: "ml-4" },
	$ = { class: "text-2xl font-bold text-gray-900" },
	R = { class: "text-xs text-green-600" },
	V = { class: "bg-white rounded-lg shadow p-6" },
	A = { class: "flex items-center" },
	B = { class: "p-3 rounded-full bg-green-100 text-green-600" },
	P = { class: "ml-4" },
	j = { class: "text-2xl font-bold text-gray-900" },
	T = { class: "text-xs text-green-600" },
	M = { class: "bg-white rounded-lg shadow p-6" },
	N = { class: "flex items-center" },
	F = { class: "p-3 rounded-full bg-yellow-100 text-yellow-600" },
	I = { class: "ml-4" },
	L = { class: "text-2xl font-bold text-gray-900" },
	E = { class: "text-xs text-green-600" },
	z = { class: "bg-white rounded-lg shadow p-6" },
	H = { class: "flex items-center" },
	K = { class: "p-3 rounded-full bg-purple-100 text-purple-600" },
	W = { class: "ml-4" },
	Q = { class: "text-2xl font-bold text-gray-900" },
	U = { class: "text-xs text-green-600" },
	q = { class: "bg-white rounded-lg shadow p-6" },
	J = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" },
	X = { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
	Y = { class: "bg-white rounded-lg shadow p-6" },
	Z = { class: "flex items-center justify-between mb-4" },
	tt = { class: "space-y-3" },
	et = { class: "flex items-center space-x-3" },
	st = { class: "p-2 rounded-full bg-purple-100" },
	ot = { class: "text-sm font-medium text-gray-900" },
	rt = { class: "text-xs text-gray-500" },
	lt = { class: "text-right" },
	at = { class: "text-sm font-medium text-gray-900" },
	nt = { class: "bg-white rounded-lg shadow p-6" },
	dt = { class: "flex items-center justify-between mb-4" },
	it = { class: "space-y-3" },
	ut = { class: "flex items-center space-x-3" },
	ct = { class: "p-2 rounded-full bg-red-100" },
	gt = { class: "text-sm font-medium text-gray-900" },
	mt = { class: "text-xs text-gray-500" },
	pt = { class: "text-right" },
	xt = { class: "text-sm font-medium text-red-600" },
	vt = { class: "text-xs text-gray-500" },
	ht = { class: "bg-white rounded-lg shadow p-6" },
	_t = { class: "grid grid-cols-1 md:grid-cols-3 gap-6" },
	ft = { class: "text-center" },
	bt = { class: "text-3xl font-bold text-purple-600 mb-2" },
	yt = { class: "text-center" },
	wt = { class: "text-3xl font-bold text-green-600 mb-2" },
	kt = { class: "text-center" },
	St = { class: "text-3xl font-bold text-blue-600 mb-2" },
	Ot = {
		__name: "Dashboard",
		setup(Ct) {
			const a = m({
					totalSarees: 0,
					totalCustomers: 0,
					totalOrders: 0,
					totalRevenue: 0,
					sareeGrowth: 0,
					customerGrowth: 0,
					orderGrowth: 0,
					revenueGrowth: 0,
				}),
				v = m([]),
				h = m([]),
				g = m({ topCategory: "", avgOrderValue: "", conversionRate: 0 }),
				b = (n) => {
					switch (n) {
						case "Completed":
							return "success";
						case "Pending":
							return "warning";
						case "Processing":
							return "info";
						case "Cancelled":
							return "danger";
						default:
							return "secondary";
					}
				};
			return (
				w(() => {
					setTimeout(() => {
						(a.value = {
							totalSarees: 1247,
							totalCustomers: 892,
							totalOrders: 2156,
							totalRevenue: "45,67,890",
							sareeGrowth: 12,
							customerGrowth: 8,
							orderGrowth: 15,
							revenueGrowth: 18,
						}),
							(v.value = [
								{
									id: "DD-2024-001",
									customer: "Priya Sharma",
									amount: "18,500",
									status: "Processing",
									time: "2 hours ago",
								},
								{
									id: "DD-2024-002",
									customer: "Anita Patel",
									amount: "25,000",
									status: "Completed",
									time: "4 hours ago",
								},
								{
									id: "DD-2024-003",
									customer: "Sunita Reddy",
									amount: "12,000",
									status: "Pending",
									time: "6 hours ago",
								},
								{
									id: "DD-2024-004",
									customer: "Meera Singh",
									amount: "35,000",
									status: "Completed",
									time: "1 day ago",
								},
							]),
							(h.value = [
								{
									id: 1,
									name: "Silk Banarasi Saree",
									category: "Silk",
									stock: 3,
									sku: "SILK-BAN-001",
								},
								{
									id: 2,
									name: "Cotton Handloom Saree",
									category: "Cotton",
									stock: 5,
									sku: "COT-HL-002",
								},
								{
									id: 3,
									name: "Designer Party Wear",
									category: "Designer",
									stock: 2,
									sku: "DES-PW-003",
								},
							]),
							(g.value = {
								topCategory: "Silk",
								avgOrderValue: "₹18,500",
								conversionRate: 12.5,
							});
					}, 1e3);
				}),
				(n, e) => {
					const l = p("FeatherIcon"),
						i = p("Button"),
						y = p("Badge");
					return (
						u(),
						c("div", k, [
							e[23] ||
								(e[23] = t(
									"div",
									{
										class: "bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white",
									},
									[
										t(
											"h1",
											{ class: "text-3xl font-bold mb-2" },
											"Draped Dreams Admin Panel"
										),
										t(
											"p",
											{ class: "text-lg opacity-90" },
											"Saree E-commerce Management System"
										),
									],
									-1
								)),
							t("div", S, [
								t("div", C, [
									t("div", D, [
										t("div", O, [
											r(l, { name: "shopping-bag", class: "w-6 h-6" }),
										]),
										t("div", G, [
											e[6] ||
												(e[6] = t(
													"p",
													{ class: "text-sm font-medium text-gray-600" },
													"Total Sarees",
													-1
												)),
											t("p", $, s(a.value.totalSarees), 1),
											t(
												"p",
												R,
												"+" + s(a.value.sareeGrowth) + "% from last month",
												1
											),
										]),
									]),
								]),
								t("div", V, [
									t("div", A, [
										t("div", B, [r(l, { name: "users", class: "w-6 h-6" })]),
										t("div", P, [
											e[7] ||
												(e[7] = t(
													"p",
													{ class: "text-sm font-medium text-gray-600" },
													"Total Customers",
													-1
												)),
											t("p", j, s(a.value.totalCustomers), 1),
											t(
												"p",
												T,
												"+" +
													s(a.value.customerGrowth) +
													"% from last month",
												1
											),
										]),
									]),
								]),
								t("div", M, [
									t("div", N, [
										t("div", F, [
											r(l, { name: "shopping-cart", class: "w-6 h-6" }),
										]),
										t("div", I, [
											e[8] ||
												(e[8] = t(
													"p",
													{ class: "text-sm font-medium text-gray-600" },
													"Total Orders",
													-1
												)),
											t("p", L, s(a.value.totalOrders), 1),
											t(
												"p",
												E,
												"+" + s(a.value.orderGrowth) + "% from last month",
												1
											),
										]),
									]),
								]),
								t("div", z, [
									t("div", H, [
										t("div", K, [
											r(l, { name: "dollar-sign", class: "w-6 h-6" }),
										]),
										t("div", W, [
											e[9] ||
												(e[9] = t(
													"p",
													{ class: "text-sm font-medium text-gray-600" },
													"Total Revenue",
													-1
												)),
											t("p", Q, "₹" + s(a.value.totalRevenue), 1),
											t(
												"p",
												U,
												"+" +
													s(a.value.revenueGrowth) +
													"% from last month",
												1
											),
										]),
									]),
								]),
							]),
							t("div", q, [
								e[14] ||
									(e[14] = t(
										"h2",
										{ class: "text-xl font-semibold text-gray-900 mb-4" },
										"Quick Actions",
										-1
									)),
								t("div", J, [
									r(
										i,
										{
											variant: "outline",
											class: "h-20 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-300",
											onClick:
												e[0] ||
												(e[0] = (o) => n.$router.push("/products")),
										},
										{
											default: d(() => [
												r(l, {
													name: "plus",
													class: "w-6 h-6 text-purple-600",
												}),
												e[10] ||
													(e[10] = t(
														"span",
														{ class: "text-purple-600 font-medium" },
														"Add New Saree",
														-1
													)),
											]),
											_: 1,
										}
									),
									r(
										i,
										{
											variant: "outline",
											class: "h-20 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-300",
											onClick:
												e[1] || (e[1] = (o) => n.$router.push("/orders")),
										},
										{
											default: d(() => [
												r(l, {
													name: "shopping-cart",
													class: "w-6 h-6 text-green-600",
												}),
												e[11] ||
													(e[11] = t(
														"span",
														{ class: "text-green-600 font-medium" },
														"Manage Orders",
														-1
													)),
											]),
											_: 1,
										}
									),
									r(
										i,
										{
											variant: "outline",
											class: "h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-300",
											onClick:
												e[2] ||
												(e[2] = (o) => n.$router.push("/customers")),
										},
										{
											default: d(() => [
												r(l, {
													name: "users",
													class: "w-6 h-6 text-blue-600",
												}),
												e[12] ||
													(e[12] = t(
														"span",
														{ class: "text-blue-600 font-medium" },
														"View Customers",
														-1
													)),
											]),
											_: 1,
										}
									),
									r(
										i,
										{
											variant: "outline",
											class: "h-20 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-300",
											onClick:
												e[3] || (e[3] = (o) => n.$router.push("/reports")),
										},
										{
											default: d(() => [
												r(l, {
													name: "bar-chart-2",
													class: "w-6 h-6 text-orange-600",
												}),
												e[13] ||
													(e[13] = t(
														"span",
														{ class: "text-orange-600 font-medium" },
														"Sales Reports",
														-1
													)),
											]),
											_: 1,
										}
									),
								]),
							]),
							t("div", X, [
								t("div", Y, [
									t("div", Z, [
										e[16] ||
											(e[16] = t(
												"h2",
												{ class: "text-lg font-semibold text-gray-900" },
												"Recent Orders",
												-1
											)),
										r(
											i,
											{
												variant: "ghost",
												size: "sm",
												onClick:
													e[4] ||
													(e[4] = (o) => n.$router.push("/orders")),
												class: "text-purple-600",
											},
											{
												default: d(() => [
													...(e[15] || (e[15] = [x(" View All ", -1)])),
												]),
												_: 1,
											}
										),
									]),
									t("div", tt, [
										(u(!0),
										c(
											_,
											null,
											f(
												v.value,
												(o) => (
													u(),
													c(
														"div",
														{
															key: o.id,
															class: "flex items-center justify-between p-3 bg-gray-50 rounded-lg",
														},
														[
															t("div", et, [
																t("div", st, [
																	r(l, {
																		name: "shopping-cart",
																		class: "w-4 h-4 text-purple-600",
																	}),
																]),
																t("div", null, [
																	t(
																		"p",
																		ot,
																		"Order #" + s(o.id),
																		1
																	),
																	t(
																		"p",
																		rt,
																		s(o.customer) +
																			" • " +
																			s(o.time),
																		1
																	),
																]),
															]),
															t("div", lt, [
																t("p", at, "₹" + s(o.amount), 1),
																r(
																	y,
																	{ variant: b(o.status) },
																	{
																		default: d(() => [
																			x(s(o.status), 1),
																		]),
																		_: 2,
																	},
																	1032,
																	["variant"]
																),
															]),
														]
													)
												)
											),
											128
										)),
									]),
								]),
								t("div", nt, [
									t("div", dt, [
										e[18] ||
											(e[18] = t(
												"h2",
												{ class: "text-lg font-semibold text-gray-900" },
												"Low Stock Alerts",
												-1
											)),
										r(
											i,
											{
												variant: "ghost",
												size: "sm",
												onClick:
													e[5] ||
													(e[5] = (o) => n.$router.push("/inventory")),
												class: "text-red-600",
											},
											{
												default: d(() => [
													...(e[17] ||
														(e[17] = [x(" Manage Stock ", -1)])),
												]),
												_: 1,
											}
										),
									]),
									t("div", it, [
										(u(!0),
										c(
											_,
											null,
											f(
												h.value,
												(o) => (
													u(),
													c(
														"div",
														{
															key: o.id,
															class: "flex items-center justify-between p-3 bg-red-50 rounded-lg",
														},
														[
															t("div", ut, [
																t("div", ct, [
																	r(l, {
																		name: "alert-triangle",
																		class: "w-4 h-4 text-red-600",
																	}),
																]),
																t("div", null, [
																	t("p", gt, s(o.name), 1),
																	t("p", mt, s(o.category), 1),
																]),
															]),
															t("div", pt, [
																t(
																	"p",
																	xt,
																	s(o.stock) + " left",
																	1
																),
																t("p", vt, "SKU: " + s(o.sku), 1),
															]),
														]
													)
												)
											),
											128
										)),
									]),
								]),
							]),
							t("div", ht, [
								e[22] ||
									(e[22] = t(
										"h2",
										{ class: "text-xl font-semibold text-gray-900 mb-4" },
										"Sales Analytics",
										-1
									)),
								t("div", _t, [
									t("div", ft, [
										t("div", bt, s(g.value.topCategory), 1),
										e[19] ||
											(e[19] = t(
												"p",
												{ class: "text-sm text-gray-600" },
												"Top Selling Category",
												-1
											)),
									]),
									t("div", yt, [
										t("div", wt, s(g.value.avgOrderValue), 1),
										e[20] ||
											(e[20] = t(
												"p",
												{ class: "text-sm text-gray-600" },
												"Average Order Value",
												-1
											)),
									]),
									t("div", kt, [
										t("div", St, s(g.value.conversionRate) + "%", 1),
										e[21] ||
											(e[21] = t(
												"p",
												{ class: "text-sm text-gray-600" },
												"Conversion Rate",
												-1
											)),
									]),
								]),
							]),
						])
					);
				}
			);
		},
	};
export { Ot as default };
