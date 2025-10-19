import {
	u as U,
	r as p,
	f as j,
	o as M,
	p as b,
	a as m,
	c,
	b as t,
	h as r,
	w as f,
	i as h,
	v as E,
	j as B,
	F as S,
	d as I,
	q as L,
	t as n,
	k as v,
	n as w,
	s as F,
} from "./index-0f847bbd.js";
const $ = { class: "min-h-screen bg-gray-50" },
	A = { class: "bg-white shadow-sm border-b" },
	G = { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
	R = { class: "flex justify-between items-center py-4" },
	J = { class: "flex items-center" },
	z = { class: "h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3" },
	K = { class: "flex items-center space-x-4" },
	W = { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" },
	Y = { key: 0, class: "text-center py-12" },
	Q = { key: 1, class: "grid grid-cols-1 lg:grid-cols-3 gap-8" },
	H = { class: "lg:col-span-2 space-y-8" },
	X = { class: "bg-white rounded-lg shadow p-6" },
	Z = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" },
	ee = { class: "md:col-span-2" },
	te = { class: "md:col-span-2" },
	se = { class: "md:col-span-2" },
	oe = { class: "bg-white rounded-lg shadow p-6" },
	le = { class: "space-y-4" },
	ae = ["onClick"],
	re = ["id", "value"],
	ne = ["for"],
	ie = { class: "font-medium text-gray-900" },
	de = { class: "text-sm text-gray-500" },
	ue = { class: "bg-white rounded-lg shadow p-6" },
	pe = { class: "lg:col-span-1" },
	me = { class: "bg-white rounded-lg shadow p-6 sticky top-8" },
	ce = { class: "space-y-3 mb-6" },
	ge = {
		class: "w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0",
	},
	xe = { class: "flex-1 min-w-0" },
	ve = { class: "text-sm font-medium text-gray-900 truncate" },
	ye = { class: "text-xs text-gray-500" },
	be = { class: "text-sm font-medium text-gray-900" },
	fe = { class: "space-y-3 mb-6" },
	he = { class: "flex justify-between text-sm" },
	we = { class: "text-gray-900" },
	ke = { class: "flex justify-between text-sm" },
	Ce = { class: "text-gray-900" },
	Ne = { class: "flex justify-between text-sm" },
	Ve = { class: "text-gray-900" },
	_e = { class: "border-t border-gray-200 pt-3" },
	Se = { class: "flex justify-between text-base font-semibold" },
	Ie = { class: "text-purple-600" },
	Pe = { class: "text-center" },
	qe = { class: "flex items-center justify-center text-xs text-gray-500 mb-2" },
	Oe = {
		__name: "Checkout",
		setup(De) {
			const k = U(),
				d = p([]),
				C = p(100),
				x = p(!1),
				y = p(""),
				o = p({
					firstName: "",
					lastName: "",
					email: "",
					phone: "",
					address: "",
					city: "",
					pincode: "",
					state: "",
				}),
				g = p(""),
				P = p([
					{
						id: "upi",
						name: "UPI Payment",
						description: "Pay using UPI apps like GPay, PhonePe",
						shortName: "UPI",
						bgColor: "bg-green-100",
						textColor: "text-green-600",
					},
					{
						id: "card",
						name: "Credit/Debit Card",
						description: "Visa, Mastercard, RuPay",
						shortName: "CARD",
						bgColor: "bg-blue-100",
						textColor: "text-blue-600",
					},
					{
						id: "netbanking",
						name: "Net Banking",
						description: "Pay using your bank account",
						shortName: "NET",
						bgColor: "bg-purple-100",
						textColor: "text-purple-600",
					},
					{
						id: "cod",
						name: "Cash on Delivery",
						description: "Pay when you receive the order",
						shortName: "COD",
						bgColor: "bg-orange-100",
						textColor: "text-orange-600",
					},
				]),
				N = j(
					() =>
						o.value.firstName &&
						o.value.lastName &&
						o.value.email &&
						o.value.phone &&
						o.value.address &&
						o.value.city &&
						o.value.pincode &&
						o.value.state &&
						g.value
				),
				q = (l) => (parseInt(l.price.replace(/,/g, "")) * l.quantity).toLocaleString(),
				D = () =>
					d.value
						.reduce((l, e) => {
							const a = parseInt(e.price.replace(/,/g, ""));
							return l + a * e.quantity;
						}, 0)
						.toLocaleString(),
				T = () => {
					const l = d.value.reduce((e, a) => {
						const u = parseInt(a.price.replace(/,/g, ""));
						return e + u * a.quantity;
					}, 0);
					return Math.round(l * 0.18).toLocaleString();
				},
				V = () => {
					const l = d.value.reduce((u, i) => {
							const s = parseInt(i.price.replace(/,/g, ""));
							return u + s * i.quantity;
						}, 0),
						e = Math.round(l * 0.18);
					return (l + C.value + e).toLocaleString();
				},
				O = async () => {
					if (N.value) {
						x.value = !0;
						try {
							await new Promise((a) => setTimeout(a, 2e3));
							const l = {
									id: "DD-" + Date.now(),
									items: d.value,
									shippingInfo: o.value,
									paymentMethod: g.value,
									orderNotes: y.value,
									total: V(),
									status: "confirmed",
									date: new Date().toISOString(),
								},
								e = JSON.parse(localStorage.getItem("orders") || "[]");
							e.push(l),
								localStorage.setItem("orders", JSON.stringify(e)),
								localStorage.removeItem("cart"),
								(d.value = []),
								k.push(`/order-confirmation/${l.id}`);
						} catch (l) {
							console.error("Order placement failed:", l);
						} finally {
							x.value = !1;
						}
					}
				};
			return (
				M(() => {
					const l = localStorage.getItem("cart");
					if (l) {
						const e = JSON.parse(l);
						d.value = e.map((a) => ({ ...a, quantity: a.quantity || 1 }));
					}
					d.value.length === 0 && k.push("/cart");
				}),
				(l, e) => {
					const a = b("FeatherIcon"),
						u = b("Button"),
						i = b("TextInput");
					return (
						m(),
						c("div", $, [
							t("header", A, [
								t("div", G, [
									t("div", R, [
										t("div", J, [
											t("div", z, [
												r(a, {
													name: "shopping-bag",
													class: "text-white",
												}),
											]),
											e[12] ||
												(e[12] = t(
													"h1",
													{ class: "text-2xl font-bold text-gray-900" },
													"Draped Dreams",
													-1
												)),
										]),
										t("div", K, [
											r(
												u,
												{
													variant: "ghost",
													size: "sm",
													onClick:
														e[0] ||
														(e[0] = (s) => l.$router.push("/cart")),
												},
												{
													default: f(() => [
														r(a, {
															name: "arrow-left",
															class: "w-5 h-5 mr-2",
														}),
														e[13] || (e[13] = v(" Back to Cart ", -1)),
													]),
													_: 1,
												}
											),
										]),
									]),
								]),
							]),
							t("main", W, [
								e[36] ||
									(e[36] = t(
										"h2",
										{ class: "text-3xl font-bold text-gray-900 mb-8" },
										"Checkout",
										-1
									)),
								d.value.length === 0
									? (m(),
									  c("div", Y, [
											r(a, {
												name: "shopping-cart",
												class: "w-16 h-16 text-gray-400 mx-auto mb-4",
											}),
											e[15] ||
												(e[15] = t(
													"h3",
													{
														class: "text-lg font-medium text-gray-900 mb-2",
													},
													"Your cart is empty",
													-1
												)),
											e[16] ||
												(e[16] = t(
													"p",
													{ class: "text-gray-600 mb-4" },
													"Add some items to your cart first",
													-1
												)),
											r(
												u,
												{
													onClick:
														e[1] ||
														(e[1] = (s) =>
															l.$router.push("/products")),
												},
												{
													default: f(() => [
														...(e[14] ||
															(e[14] = [v("Start Shopping", -1)])),
													]),
													_: 1,
												}
											),
									  ]))
									: (m(),
									  c("div", Q, [
											t("div", H, [
												t("div", X, [
													e[26] ||
														(e[26] = t(
															"h3",
															{
																class: "text-lg font-semibold text-gray-900 mb-4",
															},
															"Shipping Information",
															-1
														)),
													t("div", Z, [
														t("div", null, [
															e[17] ||
																(e[17] = t(
																	"label",
																	{
																		class: "block text-sm font-medium text-gray-700 mb-2",
																	},
																	"First Name *",
																	-1
																)),
															r(
																i,
																{
																	modelValue: o.value.firstName,
																	"onUpdate:modelValue":
																		e[2] ||
																		(e[2] = (s) =>
																			(o.value.firstName =
																				s)),
																	placeholder:
																		"Enter first name",
																	required: "",
																},
																null,
																8,
																["modelValue"]
															),
														]),
														t("div", null, [
															e[18] ||
																(e[18] = t(
																	"label",
																	{
																		class: "block text-sm font-medium text-gray-700 mb-2",
																	},
																	"Last Name *",
																	-1
																)),
															r(
																i,
																{
																	modelValue: o.value.lastName,
																	"onUpdate:modelValue":
																		e[3] ||
																		(e[3] = (s) =>
																			(o.value.lastName =
																				s)),
																	placeholder: "Enter last name",
																	required: "",
																},
																null,
																8,
																["modelValue"]
															),
														]),
														t("div", ee, [
															e[19] ||
																(e[19] = t(
																	"label",
																	{
																		class: "block text-sm font-medium text-gray-700 mb-2",
																	},
																	"Email *",
																	-1
																)),
															r(
																i,
																{
																	modelValue: o.value.email,
																	"onUpdate:modelValue":
																		e[4] ||
																		(e[4] = (s) =>
																			(o.value.email = s)),
																	type: "email",
																	placeholder:
																		"Enter email address",
																	required: "",
																},
																null,
																8,
																["modelValue"]
															),
														]),
														t("div", te, [
															e[20] ||
																(e[20] = t(
																	"label",
																	{
																		class: "block text-sm font-medium text-gray-700 mb-2",
																	},
																	"Phone Number *",
																	-1
																)),
															r(
																i,
																{
																	modelValue: o.value.phone,
																	"onUpdate:modelValue":
																		e[5] ||
																		(e[5] = (s) =>
																			(o.value.phone = s)),
																	placeholder:
																		"Enter phone number",
																	required: "",
																},
																null,
																8,
																["modelValue"]
															),
														]),
														t("div", se, [
															e[21] ||
																(e[21] = t(
																	"label",
																	{
																		class: "block text-sm font-medium text-gray-700 mb-2",
																	},
																	"Address *",
																	-1
																)),
															r(
																i,
																{
																	modelValue: o.value.address,
																	"onUpdate:modelValue":
																		e[6] ||
																		(e[6] = (s) =>
																			(o.value.address = s)),
																	placeholder:
																		"Enter full address",
																	required: "",
																},
																null,
																8,
																["modelValue"]
															),
														]),
														t("div", null, [
															e[22] ||
																(e[22] = t(
																	"label",
																	{
																		class: "block text-sm font-medium text-gray-700 mb-2",
																	},
																	"City *",
																	-1
																)),
															r(
																i,
																{
																	modelValue: o.value.city,
																	"onUpdate:modelValue":
																		e[7] ||
																		(e[7] = (s) =>
																			(o.value.city = s)),
																	placeholder: "Enter city",
																	required: "",
																},
																null,
																8,
																["modelValue"]
															),
														]),
														t("div", null, [
															e[23] ||
																(e[23] = t(
																	"label",
																	{
																		class: "block text-sm font-medium text-gray-700 mb-2",
																	},
																	"Pincode *",
																	-1
																)),
															r(
																i,
																{
																	modelValue: o.value.pincode,
																	"onUpdate:modelValue":
																		e[8] ||
																		(e[8] = (s) =>
																			(o.value.pincode = s)),
																	placeholder: "Enter pincode",
																	required: "",
																},
																null,
																8,
																["modelValue"]
															),
														]),
														t("div", null, [
															e[25] ||
																(e[25] = t(
																	"label",
																	{
																		class: "block text-sm font-medium text-gray-700 mb-2",
																	},
																	"State *",
																	-1
																)),
															h(
																t(
																	"select",
																	{
																		"onUpdate:modelValue":
																			e[9] ||
																			(e[9] = (s) =>
																				(o.value.state =
																					s)),
																		class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500",
																	},
																	[
																		...(e[24] ||
																			(e[24] = [
																				B(
																					'<option value="">Select State</option><option value="Maharashtra">Maharashtra</option><option value="Delhi">Delhi</option><option value="Karnataka">Karnataka</option><option value="Tamil Nadu">Tamil Nadu</option><option value="Gujarat">Gujarat</option><option value="West Bengal">West Bengal</option>',
																					7
																				),
																			])),
																	],
																	512
																),
																[[E, o.value.state]]
															),
														]),
													]),
												]),
												t("div", oe, [
													e[27] ||
														(e[27] = t(
															"h3",
															{
																class: "text-lg font-semibold text-gray-900 mb-4",
															},
															"Payment Method",
															-1
														)),
													t("div", le, [
														(m(!0),
														c(
															S,
															null,
															I(
																P.value,
																(s) => (
																	m(),
																	c(
																		"div",
																		{
																			key: s.id,
																			class: w([
																				"flex items-center p-4 border rounded-lg cursor-pointer hover:border-purple-300",
																				{
																					"border-purple-500 bg-purple-50":
																						g.value ===
																						s.id,
																				},
																			]),
																			onClick: (_) =>
																				(g.value = s.id),
																		},
																		[
																			h(
																				t(
																					"input",
																					{
																						type: "radio",
																						id: s.id,
																						value: s.id,
																						"onUpdate:modelValue":
																							e[10] ||
																							(e[10] =
																								(
																									_
																								) =>
																									(g.value =
																										_)),
																						class: "mr-3",
																					},
																					null,
																					8,
																					re
																				),
																				[[F, g.value]]
																			),
																			t(
																				"label",
																				{
																					for: s.id,
																					class: "flex items-center cursor-pointer",
																				},
																				[
																					t(
																						"div",
																						{
																							class: w(
																								[
																									"w-8 h-8 mr-3 flex items-center justify-center rounded",
																									s.bgColor,
																								]
																							),
																						},
																						[
																							t(
																								"span",
																								{
																									class: w(
																										[
																											"text-xs font-bold",
																											s.textColor,
																										]
																									),
																								},
																								n(
																									s.shortName
																								),
																								3
																							),
																						],
																						2
																					),
																					t(
																						"div",
																						null,
																						[
																							t(
																								"div",
																								ie,
																								n(
																									s.name
																								),
																								1
																							),
																							t(
																								"div",
																								de,
																								n(
																									s.description
																								),
																								1
																							),
																						]
																					),
																				],
																				8,
																				ne
																			),
																		],
																		10,
																		ae
																	)
																)
															),
															128
														)),
													]),
												]),
												t("div", ue, [
													e[28] ||
														(e[28] = t(
															"h3",
															{
																class: "text-lg font-semibold text-gray-900 mb-4",
															},
															"Order Notes (Optional)",
															-1
														)),
													h(
														t(
															"textarea",
															{
																"onUpdate:modelValue":
																	e[11] ||
																	(e[11] = (s) => (y.value = s)),
																rows: "3",
																class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500",
																placeholder:
																	"Any special instructions for your order...",
															},
															null,
															512
														),
														[[L, y.value]]
													),
												]),
											]),
											t("div", pe, [
												t("div", me, [
													e[35] ||
														(e[35] = t(
															"h3",
															{
																class: "text-lg font-semibold text-gray-900 mb-4",
															},
															"Order Summary",
															-1
														)),
													t("div", ce, [
														(m(!0),
														c(
															S,
															null,
															I(
																d.value,
																(s) => (
																	m(),
																	c(
																		"div",
																		{
																			key: s.id,
																			class: "flex items-center space-x-3",
																		},
																		[
																			t("div", ge, [
																				r(a, {
																					name: "image",
																					class: "w-6 h-6 text-purple-400",
																				}),
																			]),
																			t("div", xe, [
																				t(
																					"p",
																					ve,
																					n(s.name),
																					1
																				),
																				t(
																					"p",
																					ye,
																					"Qty: " +
																						n(
																							s.quantity
																						),
																					1
																				),
																			]),
																			t(
																				"div",
																				be,
																				" ₹" + n(q(s)),
																				1
																			),
																		]
																	)
																)
															),
															128
														)),
													]),
													t("div", fe, [
														t("div", he, [
															e[29] ||
																(e[29] = t(
																	"span",
																	{ class: "text-gray-600" },
																	"Subtotal",
																	-1
																)),
															t("span", we, "₹" + n(D()), 1),
														]),
														t("div", ke, [
															e[30] ||
																(e[30] = t(
																	"span",
																	{ class: "text-gray-600" },
																	"Shipping",
																	-1
																)),
															t("span", Ce, "₹" + n(C.value), 1),
														]),
														t("div", Ne, [
															e[31] ||
																(e[31] = t(
																	"span",
																	{ class: "text-gray-600" },
																	"Tax (18%)",
																	-1
																)),
															t("span", Ve, "₹" + n(T()), 1),
														]),
														t("div", _e, [
															t("div", Se, [
																e[32] ||
																	(e[32] = t(
																		"span",
																		{ class: "text-gray-900" },
																		"Total",
																		-1
																	)),
																t("span", Ie, "₹" + n(V()), 1),
															]),
														]),
													]),
													r(
														u,
														{
															class: "w-full mb-4",
															onClick: O,
															loading: x.value,
															disabled: !N.value,
														},
														{
															default: f(() => [
																v(
																	n(
																		x.value
																			? "Placing Order..."
																			: "Place Order"
																	),
																	1
																),
															]),
															_: 1,
														},
														8,
														["loading", "disabled"]
													),
													t("div", Pe, [
														t("div", qe, [
															r(a, {
																name: "shield",
																class: "w-4 h-4 mr-1",
															}),
															e[33] ||
																(e[33] = v(
																	" Secure SSL Encrypted ",
																	-1
																)),
														]),
														e[34] ||
															(e[34] = t(
																"p",
																{ class: "text-xs text-gray-500" },
																" Your payment information is secure and encrypted ",
																-1
															)),
													]),
												]),
											]),
									  ])),
							]),
						])
					);
				}
			);
		},
	};
export { Oe as default };
