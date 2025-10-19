import {
	r as i,
	o as f,
	a as c,
	b as n,
	c as d,
	d as t,
	e as r,
	w as m,
	t as s,
	F as x,
	f as h,
	g as _,
	n as b,
} from "./index-cc0b157d.js";
const S = { class: "space-y-6" },
	C = { class: "flex justify-between items-center" },
	D = { class: "flex gap-3" },
	k = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" },
	G = { class: "bg-white rounded-lg shadow p-6" },
	B = { class: "flex items-center" },
	O = { class: "p-3 rounded-full bg-green-100 text-green-600" },
	V = { class: "ml-4" },
	P = { class: "text-2xl font-bold text-gray-900" },
	T = { class: "text-xs text-green-600" },
	L = { class: "bg-white rounded-lg shadow p-6" },
	R = { class: "flex items-center" },
	j = { class: "p-3 rounded-full bg-blue-100 text-blue-600" },
	A = { class: "ml-4" },
	F = { class: "text-2xl font-bold text-gray-900" },
	N = { class: "text-xs text-green-600" },
	I = { class: "bg-white rounded-lg shadow p-6" },
	W = { class: "flex items-center" },
	E = { class: "p-3 rounded-full bg-purple-100 text-purple-600" },
	K = { class: "ml-4" },
	M = { class: "text-2xl font-bold text-gray-900" },
	z = { class: "text-xs text-green-600" },
	H = { class: "bg-white rounded-lg shadow p-6" },
	J = { class: "flex items-center" },
	q = { class: "p-3 rounded-full bg-orange-100 text-orange-600" },
	Q = { class: "ml-4" },
	U = { class: "text-2xl font-bold text-gray-900" },
	X = { class: "text-xs text-green-600" },
	Y = { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
	Z = { class: "bg-white rounded-lg shadow p-6" },
	$ = { class: "h-64 bg-gray-50 rounded-lg flex items-center justify-center" },
	tt = { class: "text-center" },
	et = { class: "bg-white rounded-lg shadow p-6" },
	st = { class: "space-y-4" },
	at = { class: "flex items-center space-x-3" },
	ot = { class: "text-sm font-medium text-gray-900" },
	rt = { class: "text-right" },
	lt = { class: "text-sm font-bold text-gray-900" },
	nt = { class: "text-xs text-gray-500" },
	dt = { class: "bg-white rounded-lg shadow" },
	it = { class: "overflow-x-auto" },
	ct = { class: "min-w-full divide-y divide-gray-200" },
	pt = { class: "bg-white divide-y divide-gray-200" },
	ut = { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" },
	gt = { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" },
	mt = { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" },
	xt = { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" },
	ht = { class: "px-6 py-4 whitespace-nowrap" },
	_t = { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" },
	yt = {
		__name: "Reports",
		setup(vt) {
			const o = i({
					totalSales: "0",
					salesGrowth: 0,
					ordersCompleted: 0,
					orderGrowth: 0,
					newCustomers: 0,
					customerGrowth: 0,
					avgOrderValue: "0",
					aovGrowth: 0,
				}),
				p = i([]),
				u = i([]),
				v = (g) => {
					switch (g) {
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
				f(() => {
					setTimeout(() => {
						(o.value = {
							totalSales: "2,45,000",
							salesGrowth: 18,
							ordersCompleted: 156,
							orderGrowth: 12,
							newCustomers: 89,
							customerGrowth: 8,
							avgOrderValue: "18,500",
							aovGrowth: 5,
						}),
							(p.value = [
								{
									name: "Silk Sarees",
									sales: "₹1,25,000",
									percentage: 51,
									color: "bg-purple-500",
								},
								{
									name: "Designer Sarees",
									sales: "₹65,000",
									percentage: 27,
									color: "bg-pink-500",
								},
								{
									name: "Cotton Sarees",
									sales: "₹35,000",
									percentage: 14,
									color: "bg-blue-500",
								},
								{
									name: "Wedding Sarees",
									sales: "₹20,000",
									percentage: 8,
									color: "bg-green-500",
								},
							]),
							(u.value = [
								{
									id: "DD-2024-001",
									customer: "Priya Sharma",
									saree: "Silk Banarasi Saree",
									amount: "25,000",
									status: "Completed",
									date: "2024-01-20",
								},
								{
									id: "DD-2024-002",
									customer: "Anita Patel",
									saree: "Designer Party Wear",
									amount: "18,000",
									status: "Completed",
									date: "2024-01-19",
								},
								{
									id: "DD-2024-003",
									customer: "Sunita Reddy",
									saree: "Cotton Handloom",
									amount: "3,500",
									status: "Processing",
									date: "2024-01-18",
								},
								{
									id: "DD-2024-004",
									customer: "Meera Singh",
									saree: "Wedding Silk Saree",
									amount: "45,000",
									status: "Completed",
									date: "2024-01-17",
								},
								{
									id: "DD-2024-005",
									customer: "Kavita Joshi",
									saree: "Traditional Kanjeevaram",
									amount: "35,000",
									status: "Pending",
									date: "2024-01-16",
								},
							]);
					}, 1e3);
				}),
				(g, e) => {
					const l = c("FeatherIcon"),
						w = c("Button"),
						y = c("Badge");
					return (
						n(),
						d("div", S, [
							t("div", C, [
								e[2] ||
									(e[2] = t(
										"div",
										null,
										[
											t(
												"h1",
												{ class: "text-2xl font-bold text-gray-900" },
												"Sales Reports & Analytics"
											),
											t(
												"p",
												{ class: "text-gray-600" },
												"Comprehensive insights into your saree business performance"
											),
										],
										-1
									)),
								t("div", D, [
									e[1] ||
										(e[1] = t(
											"select",
											{
												class: "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500",
											},
											[
												t("option", null, "Last 7 days"),
												t("option", null, "Last 30 days"),
												t("option", null, "Last 3 months"),
												t("option", null, "Last year"),
											],
											-1
										)),
									r(
										w,
										{ class: "bg-purple-600 hover:bg-purple-700" },
										{
											default: m(() => [
												r(l, { name: "download", class: "w-4 h-4 mr-2" }),
												e[0] || (e[0] = _(" Export Report ", -1)),
											]),
											_: 1,
										}
									),
								]),
							]),
							t("div", k, [
								t("div", G, [
									t("div", B, [
										t("div", O, [
											r(l, { name: "trending-up", class: "w-6 h-6" }),
										]),
										t("div", V, [
											e[3] ||
												(e[3] = t(
													"p",
													{ class: "text-sm font-medium text-gray-600" },
													"Total Sales",
													-1
												)),
											t("p", P, "₹" + s(o.value.totalSales), 1),
											t(
												"p",
												T,
												"+" +
													s(o.value.salesGrowth) +
													"% from last period",
												1
											),
										]),
									]),
								]),
								t("div", L, [
									t("div", R, [
										t("div", j, [
											r(l, { name: "shopping-cart", class: "w-6 h-6" }),
										]),
										t("div", A, [
											e[4] ||
												(e[4] = t(
													"p",
													{ class: "text-sm font-medium text-gray-600" },
													"Orders Completed",
													-1
												)),
											t("p", F, s(o.value.ordersCompleted), 1),
											t(
												"p",
												N,
												"+" +
													s(o.value.orderGrowth) +
													"% from last period",
												1
											),
										]),
									]),
								]),
								t("div", I, [
									t("div", W, [
										t("div", E, [r(l, { name: "users", class: "w-6 h-6" })]),
										t("div", K, [
											e[5] ||
												(e[5] = t(
													"p",
													{ class: "text-sm font-medium text-gray-600" },
													"New Customers",
													-1
												)),
											t("p", M, s(o.value.newCustomers), 1),
											t(
												"p",
												z,
												"+" +
													s(o.value.customerGrowth) +
													"% from last period",
												1
											),
										]),
									]),
								]),
								t("div", H, [
									t("div", J, [
										t("div", q, [
											r(l, { name: "dollar-sign", class: "w-6 h-6" }),
										]),
										t("div", Q, [
											e[6] ||
												(e[6] = t(
													"p",
													{ class: "text-sm font-medium text-gray-600" },
													"Average Order Value",
													-1
												)),
											t("p", U, "₹" + s(o.value.avgOrderValue), 1),
											t(
												"p",
												X,
												"+" + s(o.value.aovGrowth) + "% from last period",
												1
											),
										]),
									]),
								]),
							]),
							t("div", Y, [
								t("div", Z, [
									e[8] ||
										(e[8] = t(
											"h2",
											{ class: "text-lg font-semibold text-gray-900 mb-4" },
											"Sales Trend",
											-1
										)),
									t("div", $, [
										t("div", tt, [
											r(l, {
												name: "bar-chart-2",
												class: "w-12 h-12 text-gray-400 mx-auto mb-2",
											}),
											e[7] ||
												(e[7] = t(
													"p",
													{ class: "text-gray-500" },
													"Sales chart will be displayed here",
													-1
												)),
										]),
									]),
								]),
								t("div", et, [
									e[9] ||
										(e[9] = t(
											"h2",
											{ class: "text-lg font-semibold text-gray-900 mb-4" },
											"Top Selling Categories",
											-1
										)),
									t("div", st, [
										(n(!0),
										d(
											x,
											null,
											h(
												p.value,
												(a) => (
													n(),
													d(
														"div",
														{
															key: a.name,
															class: "flex items-center justify-between",
														},
														[
															t("div", at, [
																t(
																	"div",
																	{
																		class: b([
																			"w-3 h-3 rounded-full",
																			a.color,
																		]),
																	},
																	null,
																	2
																),
																t("span", ot, s(a.name), 1),
															]),
															t("div", rt, [
																t("p", lt, s(a.sales), 1),
																t(
																	"p",
																	nt,
																	s(a.percentage) + "%",
																	1
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
							]),
							t("div", dt, [
								e[11] ||
									(e[11] = t(
										"div",
										{ class: "px-6 py-4 border-b border-gray-200" },
										[
											t(
												"h2",
												{ class: "text-lg font-semibold text-gray-900" },
												"Recent Orders"
											),
										],
										-1
									)),
								t("div", it, [
									t("table", ct, [
										e[10] ||
											(e[10] = t(
												"thead",
												{ class: "bg-gray-50" },
												[
													t("tr", null, [
														t(
															"th",
															{
																class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
															},
															" Order ID "
														),
														t(
															"th",
															{
																class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
															},
															" Customer "
														),
														t(
															"th",
															{
																class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
															},
															" Saree "
														),
														t(
															"th",
															{
																class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
															},
															" Amount "
														),
														t(
															"th",
															{
																class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
															},
															" Status "
														),
														t(
															"th",
															{
																class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
															},
															" Date "
														),
													]),
												],
												-1
											)),
										t("tbody", pt, [
											(n(!0),
											d(
												x,
												null,
												h(
													u.value,
													(a) => (
														n(),
														d("tr", { key: a.id }, [
															t("td", ut, " #" + s(a.id), 1),
															t("td", gt, s(a.customer), 1),
															t("td", mt, s(a.saree), 1),
															t("td", xt, " ₹" + s(a.amount), 1),
															t("td", ht, [
																r(
																	y,
																	{ variant: v(a.status) },
																	{
																		default: m(() => [
																			_(s(a.status), 1),
																		]),
																		_: 2,
																	},
																	1032,
																	["variant"]
																),
															]),
															t("td", _t, s(a.date), 1),
														])
													)
												),
												128
											)),
										]),
									]),
								]),
							]),
						])
					);
				}
			);
		},
	};
export { yt as default };
