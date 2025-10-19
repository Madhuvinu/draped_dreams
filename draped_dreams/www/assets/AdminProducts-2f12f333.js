import {
	r as g,
	f as w,
	o as q,
	p as h,
	a as d,
	c,
	b as e,
	h as l,
	w as u,
	t as a,
	i as C,
	v as S,
	F as _,
	d as b,
	m as $,
	e as V,
	k as x,
} from "./index-7e68fe30.js";
const z = { class: "min-h-screen bg-gray-50" },
	F = { class: "bg-white shadow-sm border-b" },
	O = { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
	T = { class: "flex justify-between items-center py-4" },
	W = { class: "flex items-center" },
	H = { class: "h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3" },
	Q = { class: "flex items-center space-x-4" },
	G = { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" },
	J = { class: "flex justify-between items-center mb-8" },
	K = { class: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" },
	R = { class: "bg-white rounded-lg shadow p-6" },
	X = { class: "flex items-center" },
	Y = { class: "p-3 rounded-full bg-blue-100 text-blue-600" },
	Z = { class: "ml-4" },
	ee = { class: "text-2xl font-bold text-gray-900" },
	te = { class: "bg-white rounded-lg shadow p-6" },
	se = { class: "flex items-center" },
	oe = { class: "p-3 rounded-full bg-green-100 text-green-600" },
	le = { class: "ml-4" },
	ie = { class: "text-2xl font-bold text-gray-900" },
	ae = { class: "bg-white rounded-lg shadow p-6" },
	ne = { class: "flex items-center" },
	re = { class: "p-3 rounded-full bg-yellow-100 text-yellow-600" },
	de = { class: "ml-4" },
	ce = { class: "text-2xl font-bold text-gray-900" },
	ue = { class: "bg-white rounded-lg shadow p-6" },
	me = { class: "flex items-center" },
	pe = { class: "p-3 rounded-full bg-red-100 text-red-600" },
	ge = { class: "ml-4" },
	xe = { class: "text-2xl font-bold text-gray-900" },
	ve = { class: "bg-white rounded-lg shadow" },
	fe = { class: "p-6" },
	ye = { class: "flex justify-between items-center mb-4" },
	we = { class: "flex items-center space-x-4" },
	he = ["value"],
	_e = { class: "overflow-x-auto" },
	be = { class: "min-w-full divide-y divide-gray-200" },
	ke = { class: "bg-white divide-y divide-gray-200" },
	Pe = { class: "px-6 py-4 whitespace-nowrap" },
	Ce = { class: "flex items-center" },
	Se = {
		class: "w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0",
	},
	Ve = { class: "ml-4" },
	Ae = { class: "text-sm font-medium text-gray-900" },
	Be = { class: "text-sm text-gray-500" },
	De = { class: "px-6 py-4 whitespace-nowrap" },
	Ee = { class: "px-6 py-4 whitespace-nowrap" },
	Ie = { class: "text-sm text-gray-900" },
	Le = { key: 0, class: "text-xs text-gray-500 line-through" },
	Ue = { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" },
	je = { class: "px-6 py-4 whitespace-nowrap" },
	Me = { class: "px-6 py-4 whitespace-nowrap text-sm font-medium" },
	Ne = { class: "flex items-center space-x-2" },
	qe = {
		key: 0,
		class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50",
	},
	$e = { class: "relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" },
	ze = { class: "mt-3" },
	Fe = { class: "grid grid-cols-2 gap-4" },
	Oe = { class: "grid grid-cols-2 gap-4" },
	Te = ["value"],
	We = { class: "flex justify-end space-x-3 pt-4" },
	Ge = {
		__name: "AdminProducts",
		setup(He) {
			const r = g([]),
				v = g(""),
				f = g(""),
				y = g(!1),
				k = g(["Silk", "Cotton", "Designer", "Wedding", "Casual", "Party"]),
				i = g({
					name: "",
					description: "",
					price: "",
					originalPrice: "",
					category: "",
					stock: "",
				}),
				A = w(() => {
					let o = [...r.value];
					return (
						v.value &&
							(o = o.filter(
								(t) =>
									t.name.toLowerCase().includes(v.value.toLowerCase()) ||
									t.description.toLowerCase().includes(v.value.toLowerCase())
							)),
						f.value && (o = o.filter((t) => t.category === f.value)),
						o
					);
				}),
				B = w(() => r.value.filter((o) => o.stock > 10).length),
				D = w(() => r.value.filter((o) => o.stock > 0 && o.stock <= 10).length),
				E = w(() => r.value.filter((o) => o.stock === 0).length),
				I = (o) => (o === 0 ? "danger" : o <= 10 ? "warning" : "success"),
				L = (o) => (o === 0 ? "Out of Stock" : o <= 10 ? "Low Stock" : "In Stock"),
				U = () => {
					const o = {
						id: Date.now(),
						name: i.value.name,
						description: i.value.description,
						price: i.value.price,
						originalPrice: i.value.originalPrice,
						category: i.value.category,
						stock: parseInt(i.value.stock),
						rating: 4.5,
					};
					r.value.push(o),
						(i.value = {
							name: "",
							description: "",
							price: "",
							originalPrice: "",
							category: "",
							stock: "",
						}),
						(y.value = !1);
				},
				j = (o) => {
					console.log("Edit product:", o.name);
				},
				M = (o) => {
					if (confirm("Are you sure you want to delete this product?")) {
						const t = r.value.findIndex((n) => n.id === o);
						t > -1 && r.value.splice(t, 1);
					}
				};
			return (
				q(() => {
					r.value = [
						{
							id: 1,
							name: "Elegant Silk Banarasi Saree",
							description: "Beautiful silk saree with intricate Banarasi work",
							price: "25,000",
							originalPrice: "30,000",
							category: "Silk",
							stock: 8,
							rating: 4.8,
						},
						{
							id: 2,
							name: "Comfortable Cotton Handloom Saree",
							description: "Light and breathable cotton saree",
							price: "3,500",
							category: "Cotton",
							stock: 25,
							rating: 4.5,
						},
						{
							id: 3,
							name: "Modern Designer Party Saree",
							description: "Contemporary designer saree",
							price: "18,000",
							originalPrice: "22,000",
							category: "Designer",
							stock: 4,
							rating: 4.9,
						},
						{
							id: 4,
							name: "Wedding Silk Saree",
							description: "Heavy silk saree for weddings",
							price: "45,000",
							category: "Wedding",
							stock: 0,
							rating: 4.7,
						},
					];
				}),
				(o, t) => {
					const n = h("FeatherIcon"),
						m = h("Button"),
						p = h("TextInput"),
						P = h("Badge");
					return (
						d(),
						c("div", z, [
							e("header", F, [
								e("div", O, [
									e("div", T, [
										e("div", W, [
											e("div", H, [
												l(n, {
													name: "shopping-bag",
													class: "text-white",
												}),
											]),
											t[11] ||
												(t[11] = e(
													"h1",
													{ class: "text-2xl font-bold text-gray-900" },
													"Draped Dreams Admin",
													-1
												)),
										]),
										e("div", Q, [
											l(
												m,
												{
													variant: "ghost",
													size: "sm",
													onClick:
														t[0] ||
														(t[0] = (s) => o.$router.push("/home")),
												},
												{
													default: u(() => [
														l(n, {
															name: "home",
															class: "w-5 h-5 mr-2",
														}),
														t[12] || (t[12] = x(" View Store ", -1)),
													]),
													_: 1,
												}
											),
											t[13] ||
												(t[13] = e(
													"div",
													{ class: "flex items-center space-x-2" },
													[
														e(
															"div",
															{
																class: "w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-purple-800 font-medium",
															},
															" A "
														),
														e(
															"span",
															{ class: "text-gray-700" },
															"Admin"
														),
													],
													-1
												)),
										]),
									]),
								]),
							]),
							e("main", G, [
								e("div", J, [
									t[15] ||
										(t[15] = e(
											"div",
											null,
											[
												e(
													"h2",
													{ class: "text-3xl font-bold text-gray-900" },
													"Product Management"
												),
												e(
													"p",
													{ class: "text-gray-600" },
													"Manage your saree inventory"
												),
											],
											-1
										)),
									l(
										m,
										{ onClick: t[1] || (t[1] = (s) => (y.value = !0)) },
										{
											default: u(() => [
												l(n, { name: "plus", class: "w-5 h-5 mr-2" }),
												t[14] || (t[14] = x(" Add New Product ", -1)),
											]),
											_: 1,
										}
									),
								]),
								e("div", K, [
									e("div", R, [
										e("div", X, [
											e("div", Y, [
												l(n, { name: "shopping-bag", class: "w-6 h-6" }),
											]),
											e("div", Z, [
												t[16] ||
													(t[16] = e(
														"p",
														{
															class: "text-sm font-medium text-gray-600",
														},
														"Total Products",
														-1
													)),
												e("p", ee, a(r.value.length), 1),
											]),
										]),
									]),
									e("div", te, [
										e("div", se, [
											e("div", oe, [
												l(n, { name: "check-circle", class: "w-6 h-6" }),
											]),
											e("div", le, [
												t[17] ||
													(t[17] = e(
														"p",
														{
															class: "text-sm font-medium text-gray-600",
														},
														"In Stock",
														-1
													)),
												e("p", ie, a(B.value), 1),
											]),
										]),
									]),
									e("div", ae, [
										e("div", ne, [
											e("div", re, [
												l(n, { name: "alert-triangle", class: "w-6 h-6" }),
											]),
											e("div", de, [
												t[18] ||
													(t[18] = e(
														"p",
														{
															class: "text-sm font-medium text-gray-600",
														},
														"Low Stock",
														-1
													)),
												e("p", ce, a(D.value), 1),
											]),
										]),
									]),
									e("div", ue, [
										e("div", me, [
											e("div", pe, [
												l(n, { name: "x-circle", class: "w-6 h-6" }),
											]),
											e("div", ge, [
												t[19] ||
													(t[19] = e(
														"p",
														{
															class: "text-sm font-medium text-gray-600",
														},
														"Out of Stock",
														-1
													)),
												e("p", xe, a(E.value), 1),
											]),
										]),
									]),
								]),
								e("div", ve, [
									e("div", fe, [
										e("div", ye, [
											t[21] ||
												(t[21] = e(
													"h3",
													{
														class: "text-lg font-semibold text-gray-900",
													},
													"All Products",
													-1
												)),
											e("div", we, [
												l(
													p,
													{
														modelValue: v.value,
														"onUpdate:modelValue":
															t[2] || (t[2] = (s) => (v.value = s)),
														placeholder: "Search products...",
														class: "w-64",
													},
													null,
													8,
													["modelValue"]
												),
												C(
													e(
														"select",
														{
															"onUpdate:modelValue":
																t[3] ||
																(t[3] = (s) => (f.value = s)),
															class: "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500",
														},
														[
															t[20] ||
																(t[20] = e(
																	"option",
																	{ value: "" },
																	"All Categories",
																	-1
																)),
															(d(!0),
															c(
																_,
																null,
																b(
																	k.value,
																	(s) => (
																		d(),
																		c(
																			"option",
																			{ key: s, value: s },
																			a(s),
																			9,
																			he
																		)
																	)
																),
																128
															)),
														],
														512
													),
													[[S, f.value]]
												),
											]),
										]),
										e("div", _e, [
											e("table", be, [
												t[22] ||
													(t[22] = e(
														"thead",
														{ class: "bg-gray-50" },
														[
															e("tr", null, [
																e(
																	"th",
																	{
																		class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
																	},
																	"Product"
																),
																e(
																	"th",
																	{
																		class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
																	},
																	"Category"
																),
																e(
																	"th",
																	{
																		class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
																	},
																	"Price"
																),
																e(
																	"th",
																	{
																		class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
																	},
																	"Stock"
																),
																e(
																	"th",
																	{
																		class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
																	},
																	"Status"
																),
																e(
																	"th",
																	{
																		class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
																	},
																	"Actions"
																),
															]),
														],
														-1
													)),
												e("tbody", ke, [
													(d(!0),
													c(
														_,
														null,
														b(
															A.value,
															(s) => (
																d(),
																c("tr", { key: s.id }, [
																	e("td", Pe, [
																		e("div", Ce, [
																			e("div", Se, [
																				l(n, {
																					name: "image",
																					class: "w-6 h-6 text-purple-400",
																				}),
																			]),
																			e("div", Ve, [
																				e(
																					"div",
																					Ae,
																					a(s.name),
																					1
																				),
																				e(
																					"div",
																					Be,
																					a(
																						s.description
																					),
																					1
																				),
																			]),
																		]),
																	]),
																	e("td", De, [
																		l(
																			P,
																			{
																				variant:
																					"secondary",
																			},
																			{
																				default: u(() => [
																					x(
																						a(
																							s.category
																						),
																						1
																					),
																				]),
																				_: 2,
																			},
																			1024
																		),
																	]),
																	e("td", Ee, [
																		e(
																			"div",
																			Ie,
																			"₹" + a(s.price),
																			1
																		),
																		s.originalPrice
																			? (d(),
																			  c(
																					"div",
																					Le,
																					" ₹" +
																						a(
																							s.originalPrice
																						),
																					1
																			  ))
																			: V("", !0),
																	]),
																	e("td", Ue, a(s.stock), 1),
																	e("td", je, [
																		l(
																			P,
																			{
																				variant: I(
																					s.stock
																				),
																			},
																			{
																				default: u(() => [
																					x(
																						a(
																							L(
																								s.stock
																							)
																						),
																						1
																					),
																				]),
																				_: 2,
																			},
																			1032,
																			["variant"]
																		),
																	]),
																	e("td", Me, [
																		e("div", Ne, [
																			l(
																				m,
																				{
																					variant:
																						"ghost",
																					size: "sm",
																					onClick: (N) =>
																						j(s),
																				},
																				{
																					default: u(
																						() => [
																							l(n, {
																								name: "edit",
																								class: "w-4 h-4",
																							}),
																						]
																					),
																					_: 1,
																				},
																				8,
																				["onClick"]
																			),
																			l(
																				m,
																				{
																					variant:
																						"ghost",
																					size: "sm",
																					onClick: (N) =>
																						M(s.id),
																				},
																				{
																					default: u(
																						() => [
																							l(n, {
																								name: "trash-2",
																								class: "w-4 h-4 text-red-600",
																							}),
																						]
																					),
																					_: 1,
																				},
																				8,
																				["onClick"]
																			),
																		]),
																	]),
																])
															)
														),
														128
													)),
												]),
											]),
										]),
									]),
								]),
							]),
							y.value
								? (d(),
								  c("div", qe, [
										e("div", $e, [
											e("div", ze, [
												t[32] ||
													(t[32] = e(
														"h3",
														{
															class: "text-lg font-medium text-gray-900 mb-4",
														},
														"Add New Product",
														-1
													)),
												e(
													"form",
													{
														onSubmit: $(U, ["prevent"]),
														class: "space-y-4",
													},
													[
														e("div", null, [
															t[23] ||
																(t[23] = e(
																	"label",
																	{
																		class: "block text-sm font-medium text-gray-700 mb-2",
																	},
																	"Product Name *",
																	-1
																)),
															l(
																p,
																{
																	modelValue: i.value.name,
																	"onUpdate:modelValue":
																		t[4] ||
																		(t[4] = (s) =>
																			(i.value.name = s)),
																	placeholder:
																		"Enter product name",
																	required: "",
																},
																null,
																8,
																["modelValue"]
															),
														]),
														e("div", null, [
															t[24] ||
																(t[24] = e(
																	"label",
																	{
																		class: "block text-sm font-medium text-gray-700 mb-2",
																	},
																	"Description *",
																	-1
																)),
															l(
																p,
																{
																	modelValue:
																		i.value.description,
																	"onUpdate:modelValue":
																		t[5] ||
																		(t[5] = (s) =>
																			(i.value.description =
																				s)),
																	placeholder:
																		"Enter product description",
																	required: "",
																},
																null,
																8,
																["modelValue"]
															),
														]),
														e("div", Fe, [
															e("div", null, [
																t[25] ||
																	(t[25] = e(
																		"label",
																		{
																			class: "block text-sm font-medium text-gray-700 mb-2",
																		},
																		"Price *",
																		-1
																	)),
																l(
																	p,
																	{
																		modelValue: i.value.price,
																		"onUpdate:modelValue":
																			t[6] ||
																			(t[6] = (s) =>
																				(i.value.price =
																					s)),
																		placeholder: "Enter price",
																		required: "",
																	},
																	null,
																	8,
																	["modelValue"]
																),
															]),
															e("div", null, [
																t[26] ||
																	(t[26] = e(
																		"label",
																		{
																			class: "block text-sm font-medium text-gray-700 mb-2",
																		},
																		"Original Price",
																		-1
																	)),
																l(
																	p,
																	{
																		modelValue:
																			i.value.originalPrice,
																		"onUpdate:modelValue":
																			t[7] ||
																			(t[7] = (s) =>
																				(i.value.originalPrice =
																					s)),
																		placeholder:
																			"Enter original price",
																	},
																	null,
																	8,
																	["modelValue"]
																),
															]),
														]),
														e("div", Oe, [
															e("div", null, [
																t[28] ||
																	(t[28] = e(
																		"label",
																		{
																			class: "block text-sm font-medium text-gray-700 mb-2",
																		},
																		"Category *",
																		-1
																	)),
																C(
																	e(
																		"select",
																		{
																			"onUpdate:modelValue":
																				t[8] ||
																				(t[8] = (s) =>
																					(i.value.category =
																						s)),
																			class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500",
																			required: "",
																		},
																		[
																			t[27] ||
																				(t[27] = e(
																					"option",
																					{ value: "" },
																					"Select Category",
																					-1
																				)),
																			(d(!0),
																			c(
																				_,
																				null,
																				b(
																					k.value,
																					(s) => (
																						d(),
																						c(
																							"option",
																							{
																								key: s,
																								value: s,
																							},
																							a(s),
																							9,
																							Te
																						)
																					)
																				),
																				128
																			)),
																		],
																		512
																	),
																	[[S, i.value.category]]
																),
															]),
															e("div", null, [
																t[29] ||
																	(t[29] = e(
																		"label",
																		{
																			class: "block text-sm font-medium text-gray-700 mb-2",
																		},
																		"Stock *",
																		-1
																	)),
																l(
																	p,
																	{
																		modelValue: i.value.stock,
																		"onUpdate:modelValue":
																			t[9] ||
																			(t[9] = (s) =>
																				(i.value.stock =
																					s)),
																		type: "number",
																		placeholder:
																			"Enter stock quantity",
																		required: "",
																	},
																	null,
																	8,
																	["modelValue"]
																),
															]),
														]),
														e("div", We, [
															l(
																m,
																{
																	variant: "outline",
																	onClick:
																		t[10] ||
																		(t[10] = (s) =>
																			(y.value = !1)),
																},
																{
																	default: u(() => [
																		...(t[30] ||
																			(t[30] = [
																				x(" Cancel ", -1),
																			])),
																	]),
																	_: 1,
																}
															),
															l(
																m,
																{ type: "submit" },
																{
																	default: u(() => [
																		...(t[31] ||
																			(t[31] = [
																				x(
																					" Add Product ",
																					-1
																				),
																			])),
																	]),
																	_: 1,
																}
															),
														]),
													],
													32
												),
											]),
										]),
								  ]))
								: V("", !0),
						])
					);
				}
			);
		},
	};
export { Ge as default };
