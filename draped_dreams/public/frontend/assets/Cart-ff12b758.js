import {
	r as f,
	o as I,
	p as _,
	a as d,
	c as u,
	b as s,
	h as n,
	w as c,
	t as r,
	F as j,
	d as q,
	k as x,
	j as $,
	e as T,
} from "./index-2c5f8c84.js";
const N = { class: "min-h-screen bg-gray-50" },
	V = { class: "bg-white shadow-sm border-b" },
	B = { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
	L = { class: "flex justify-between items-center py-4" },
	z = { class: "flex items-center" },
	F = { class: "h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3" },
	M = { class: "flex items-center space-x-4" },
	P = { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" },
	D = { key: 0, class: "text-center py-12" },
	O = { key: 1, class: "grid grid-cols-1 lg:grid-cols-3 gap-8" },
	A = { class: "lg:col-span-2" },
	J = { class: "bg-white rounded-lg shadow" },
	E = { class: "p-6" },
	G = { class: "text-lg font-semibold text-gray-900 mb-4" },
	Q = { class: "space-y-4" },
	U = {
		class: "w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0",
	},
	Y = { class: "flex-1 min-w-0" },
	H = { class: "text-sm font-medium text-gray-900 truncate" },
	K = { class: "text-sm text-gray-500" },
	R = { class: "flex items-center mt-1" },
	W = { class: "text-sm font-medium text-purple-600" },
	X = { key: 0, class: "text-xs text-gray-500 line-through ml-2" },
	Z = { class: "flex items-center space-x-2" },
	tt = { class: "w-8 text-center text-sm font-medium" },
	st = { class: "text-right" },
	et = { class: "text-sm font-medium text-gray-900" },
	at = { class: "flex justify-between items-center mt-6 pt-6 border-t border-gray-200" },
	ot = { class: "text-sm text-gray-600" },
	nt = { class: "font-medium text-gray-900" },
	lt = { class: "lg:col-span-1" },
	rt = { class: "bg-white rounded-lg shadow p-6 sticky top-8" },
	it = { class: "space-y-3 mb-6" },
	ct = { class: "flex justify-between text-sm" },
	dt = { class: "text-gray-900" },
	ut = { class: "flex justify-between text-sm" },
	pt = { class: "text-gray-900" },
	xt = { class: "flex justify-between text-sm" },
	mt = { class: "text-gray-900" },
	gt = { class: "border-t border-gray-200 pt-3" },
	vt = { class: "flex justify-between text-base font-semibold" },
	ht = { class: "text-purple-600" },
	_t = {
		__name: "Cart",
		setup(yt) {
			const l = f([]),
				g = f(100),
				b = (e) => (parseInt(e.price.replace(/,/g, "")) * e.quantity).toLocaleString(),
				v = () =>
					l.value
						.reduce((e, t) => {
							const a = parseInt(t.price.replace(/,/g, ""));
							return e + a * t.quantity;
						}, 0)
						.toLocaleString(),
				w = () => {
					const e = l.value.reduce((t, a) => {
						const i = parseInt(a.price.replace(/,/g, ""));
						return t + i * a.quantity;
					}, 0);
					return Math.round(e * 0.18).toLocaleString();
				},
				C = () => {
					const e = l.value.reduce((i, o) => {
							const p = parseInt(o.price.replace(/,/g, ""));
							return i + p * o.quantity;
						}, 0),
						t = Math.round(e * 0.18);
					return (e + g.value + t).toLocaleString();
				},
				h = (e, t) => {
					(l.value[e].quantity += t),
						l.value[e].quantity <= 0 && l.value.splice(e, 1),
						m();
				},
				k = (e) => {
					l.value.splice(e, 1), m();
				},
				S = () => {
					(l.value = []), m();
				},
				m = () => {
					localStorage.setItem("cart", JSON.stringify(l.value));
				};
			return (
				I(() => {
					const e = localStorage.getItem("cart");
					if (e) {
						const t = JSON.parse(e);
						l.value = t.map((a) => ({ ...a, quantity: a.quantity || 1 }));
					}
				}),
				(e, t) => {
					const a = _("FeatherIcon"),
						i = _("Button");
					return (
						d(),
						u("div", N, [
							s("header", V, [
								s("div", B, [
									s("div", L, [
										s("div", z, [
											s("div", F, [
												n(a, {
													name: "shopping-bag",
													class: "text-white",
												}),
											]),
											t[3] ||
												(t[3] = s(
													"h1",
													{ class: "text-2xl font-bold text-gray-900" },
													"Draped Dreams",
													-1
												)),
										]),
										s("div", M, [
											n(
												i,
												{
													variant: "ghost",
													size: "sm",
													onClick:
														t[0] ||
														(t[0] = (o) =>
															e.$router.push("/products")),
												},
												{
													default: c(() => [
														n(a, {
															name: "arrow-left",
															class: "w-5 h-5 mr-2",
														}),
														t[4] ||
															(t[4] = x(" Continue Shopping ", -1)),
													]),
													_: 1,
												}
											),
										]),
									]),
								]),
							]),
							s("main", P, [
								t[17] ||
									(t[17] = s(
										"h2",
										{ class: "text-3xl font-bold text-gray-900 mb-8" },
										"Shopping Cart",
										-1
									)),
								l.value.length === 0
									? (d(),
									  u("div", D, [
											n(a, {
												name: "shopping-cart",
												class: "w-16 h-16 text-gray-400 mx-auto mb-4",
											}),
											t[6] ||
												(t[6] = s(
													"h3",
													{
														class: "text-lg font-medium text-gray-900 mb-2",
													},
													"Your cart is empty",
													-1
												)),
											t[7] ||
												(t[7] = s(
													"p",
													{ class: "text-gray-600 mb-4" },
													"Add some beautiful sarees to your cart",
													-1
												)),
											n(
												i,
												{
													onClick:
														t[1] ||
														(t[1] = (o) =>
															e.$router.push("/products")),
												},
												{
													default: c(() => [
														...(t[5] ||
															(t[5] = [x("Start Shopping", -1)])),
													]),
													_: 1,
												}
											),
									  ]))
									: (d(),
									  u("div", O, [
											s("div", A, [
												s("div", J, [
													s("div", E, [
														s(
															"h3",
															G,
															"Cart Items (" +
																r(l.value.length) +
																")",
															1
														),
														s("div", Q, [
															(d(!0),
															u(
																j,
																null,
																q(
																	l.value,
																	(o, p) => (
																		d(),
																		u(
																			"div",
																			{
																				key: o.id,
																				class: "flex items-center space-x-4 p-4 border border-gray-200 rounded-lg",
																			},
																			[
																				s("div", U, [
																					n(a, {
																						name: "image",
																						class: "w-8 h-8 text-purple-400",
																					}),
																				]),
																				s("div", Y, [
																					s(
																						"h4",
																						H,
																						r(o.name),
																						1
																					),
																					s(
																						"p",
																						K,
																						r(
																							o.category
																						),
																						1
																					),
																					s("div", R, [
																						s(
																							"span",
																							W,
																							"₹" +
																								r(
																									o.price
																								),
																							1
																						),
																						o.originalPrice
																							? (d(),
																							  u(
																									"span",
																									X,
																									" ₹" +
																										r(
																											o.originalPrice
																										),
																									1
																							  ))
																							: T(
																									"",
																									!0
																							  ),
																					]),
																				]),
																				s("div", Z, [
																					n(
																						i,
																						{
																							variant:
																								"outline",
																							size: "sm",
																							onClick:
																								(
																									y
																								) =>
																									h(
																										p,
																										-1
																									),
																							disabled:
																								o.quantity <=
																								1,
																						},
																						{
																							default:
																								c(
																									() => [
																										n(
																											a,
																											{
																												name: "minus",
																												class: "w-4 h-4",
																											}
																										),
																									]
																								),
																							_: 1,
																						},
																						8,
																						[
																							"onClick",
																							"disabled",
																						]
																					),
																					s(
																						"span",
																						tt,
																						r(
																							o.quantity
																						),
																						1
																					),
																					n(
																						i,
																						{
																							variant:
																								"outline",
																							size: "sm",
																							onClick:
																								(
																									y
																								) =>
																									h(
																										p,
																										1
																									),
																							disabled:
																								o.quantity >=
																								o.stock,
																						},
																						{
																							default:
																								c(
																									() => [
																										n(
																											a,
																											{
																												name: "plus",
																												class: "w-4 h-4",
																											}
																										),
																									]
																								),
																							_: 1,
																						},
																						8,
																						[
																							"onClick",
																							"disabled",
																						]
																					),
																				]),
																				s("div", st, [
																					s(
																						"div",
																						et,
																						" ₹" +
																							r(
																								b(
																									o
																								)
																							),
																						1
																					),
																					n(
																						i,
																						{
																							variant:
																								"ghost",
																							size: "sm",
																							onClick:
																								(
																									y
																								) =>
																									k(
																										p
																									),
																							class: "text-red-600 hover:text-red-700 mt-1",
																						},
																						{
																							default:
																								c(
																									() => [
																										n(
																											a,
																											{
																												name: "trash-2",
																												class: "w-4 h-4",
																											}
																										),
																									]
																								),
																							_: 1,
																						},
																						8,
																						["onClick"]
																					),
																				]),
																			]
																		)
																	)
																),
																128
															)),
														]),
														s("div", at, [
															n(
																i,
																{ variant: "outline", onClick: S },
																{
																	default: c(() => [
																		n(a, {
																			name: "trash-2",
																			class: "w-4 h-4 mr-2",
																		}),
																		t[8] ||
																			(t[8] = x(
																				" Clear Cart ",
																				-1
																			)),
																	]),
																	_: 1,
																}
															),
															s("div", ot, [
																t[9] || (t[9] = x(" Total: ", -1)),
																s("span", nt, "₹" + r(v()), 1),
															]),
														]),
													]),
												]),
											]),
											s("div", lt, [
												s("div", rt, [
													t[15] ||
														(t[15] = s(
															"h3",
															{
																class: "text-lg font-semibold text-gray-900 mb-4",
															},
															"Order Summary",
															-1
														)),
													s("div", it, [
														s("div", ct, [
															t[10] ||
																(t[10] = s(
																	"span",
																	{ class: "text-gray-600" },
																	"Subtotal",
																	-1
																)),
															s("span", dt, "₹" + r(v()), 1),
														]),
														s("div", ut, [
															t[11] ||
																(t[11] = s(
																	"span",
																	{ class: "text-gray-600" },
																	"Shipping",
																	-1
																)),
															s("span", pt, "₹" + r(g.value), 1),
														]),
														s("div", xt, [
															t[12] ||
																(t[12] = s(
																	"span",
																	{ class: "text-gray-600" },
																	"Tax (18%)",
																	-1
																)),
															s("span", mt, "₹" + r(w()), 1),
														]),
														s("div", gt, [
															s("div", vt, [
																t[13] ||
																	(t[13] = s(
																		"span",
																		{ class: "text-gray-900" },
																		"Total",
																		-1
																	)),
																s("span", ht, "₹" + r(C()), 1),
															]),
														]),
													]),
													n(
														i,
														{
															class: "w-full mb-4",
															onClick:
																t[2] ||
																(t[2] = (o) =>
																	e.$router.push("/checkout")),
															disabled: l.value.length === 0,
														},
														{
															default: c(() => [
																...(t[14] ||
																	(t[14] = [
																		x(
																			" Proceed to Checkout ",
																			-1
																		),
																	])),
															]),
															_: 1,
														},
														8,
														["disabled"]
													),
													t[16] ||
														(t[16] = $(
															'<div class="text-center"><p class="text-xs text-gray-500 mb-2">Secure checkout with</p><div class="flex justify-center space-x-2"><div class="w-8 h-5 bg-blue-100 rounded flex items-center justify-center"><span class="text-xs font-bold text-blue-600">VISA</span></div><div class="w-8 h-5 bg-red-100 rounded flex items-center justify-center"><span class="text-xs font-bold text-red-600">MC</span></div><div class="w-8 h-5 bg-green-100 rounded flex items-center justify-center"><span class="text-xs font-bold text-green-600">UPI</span></div></div></div>',
															1
														)),
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
export { _t as default };
