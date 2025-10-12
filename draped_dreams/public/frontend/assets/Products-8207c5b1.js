import {
	r as i,
	f as H,
	o as E,
	g as _,
	a as r,
	c as n,
	b as t,
	h as l,
	w as d,
	i as C,
	v as S,
	F as P,
	d as I,
	j,
	t as u,
	e as D,
	k as c,
	l as R,
	m as z,
	n as q,
} from "./index-288c392a.js";
import { a as A } from "./api-b634d5e6.js";
const Q = { class: "min-h-screen bg-gray-50" },
	G = { class: "bg-white shadow-sm border-b" },
	K = { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
	X = { class: "flex justify-between items-center py-4" },
	Y = { class: "flex items-center" },
	Z = { class: "h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3" },
	ee = { class: "flex items-center space-x-4" },
	te = { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" },
	se = { class: "flex mb-8" },
	oe = { class: "bg-white rounded-lg shadow p-6 mb-8" },
	ae = { class: "grid grid-cols-1 md:grid-cols-4 gap-4" },
	le = ["value"],
	re = { key: 0, class: "text-center py-12" },
	ne = { key: 1, class: "text-center py-12" },
	ie = { class: "text-gray-600 mb-4" },
	ue = { key: 2, class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" },
	de = ["onClick"],
	ce = {
		class: "aspect-w-16 aspect-h-12 bg-gradient-to-br from-purple-100 to-pink-100 h-64 flex items-center justify-center relative",
	},
	me = ["src", "alt"],
	pe = { class: "absolute top-2 right-2" },
	ge = { class: "absolute top-2 left-2" },
	ve = { class: "p-4" },
	fe = { class: "font-semibold text-gray-900 mb-2" },
	xe = { class: "text-sm text-gray-600 mb-3 line-clamp-2" },
	ye = { class: "flex items-center justify-between mb-3" },
	he = { class: "text-lg font-bold text-purple-600" },
	be = { key: 0, class: "text-sm text-gray-500 line-through ml-2" },
	we = { class: "flex items-center" },
	_e = { class: "flex text-yellow-400" },
	ke = { class: "text-xs text-gray-500 ml-1" },
	Ce = { class: "flex justify-between items-center" },
	Se = { key: 3, class: "text-center py-12" },
	Ve = {
		__name: "Products",
		setup(Pe) {
			const h = i([]),
				g = i([]),
				m = i(""),
				v = i(""),
				f = i(""),
				x = i("featured"),
				k = i(!1),
				y = i(""),
				L = i(["Silk", "Cotton", "Designer", "Wedding", "Casual", "Party"]),
				V = i([]),
				N = H(() => {
					let s = [...V.value];
					switch (
						(m.value &&
							(s = s.filter(
								(e) =>
									e.product_name.toLowerCase().includes(m.value.toLowerCase()) ||
									e.description.toLowerCase().includes(m.value.toLowerCase())
							)),
						v.value && (s = s.filter((e) => e.category === v.value)),
						f.value &&
							(s = s.filter((e) => {
								const a = e.price;
								switch (f.value) {
									case "0-5000":
										return a < 5e3;
									case "5000-15000":
										return a >= 5e3 && a <= 15e3;
									case "15000-30000":
										return a >= 15e3 && a <= 3e4;
									case "30000+":
										return a > 3e4;
									default:
										return !0;
								}
							})),
						x.value)
					) {
						case "price-low":
							s.sort((e, a) => e.price - a.price);
							break;
						case "price-high":
							s.sort((e, a) => a.price - e.price);
							break;
						case "newest":
							s.sort((e, a) => new Date(a.created_date) - new Date(e.created_date));
							break;
						case "popular":
							s.sort((e, a) => (a.rating || 0) - (e.rating || 0));
							break;
						case "featured":
							s.sort((e, a) =>
								e.featured && !a.featured
									? -1
									: !e.featured && a.featured
									? 1
									: (a.rating || 0) - (e.rating || 0)
							);
							break;
					}
					return s;
				}),
				T = (s) => (s === 0 ? "danger" : s <= 5 ? "warning" : "success"),
				U = (s) => {
					h.value.push(s),
						localStorage.setItem("cart", JSON.stringify(h.value)),
						console.log("Added to cart:", s.product_name);
				},
				J = (s) => {
					const e = g.value.findIndex((a) => a.name === s.name);
					e > -1 ? g.value.splice(e, 1) : g.value.push(s),
						localStorage.setItem("wishlist", JSON.stringify(g.value));
				},
				$ = (s) => g.value.some((e) => e.name === s),
				M = () => {
					(m.value = ""), (v.value = ""), (f.value = ""), (x.value = "featured");
				},
				b = () => {},
				B = async () => {
					(k.value = !0), (y.value = "");
					try {
						const s = await A.getProducts({
							category: v.value,
							search: m.value,
							price_range: f.value,
							sort_by: x.value,
							limit: 50,
						});
						s.success
							? (V.value = s.data.map((e) => ({
									id: e.name,
									name: e.product_name,
									product_name: e.product_name,
									description: e.description,
									price: e.price,
									originalPrice: e.original_price,
									category: e.category,
									stock: e.stock_quantity,
									rating: e.rating || 0,
									featured: e.featured,
									image: e.product_image,
									gallery_images: e.gallery_images || [],
							  })))
							: (y.value = s.message);
					} catch (s) {
						(y.value = "Failed to load products"),
							console.error("Load products error:", s);
					} finally {
						k.value = !1;
					}
				},
				O = async () => {
					try {
						const s = await A.getCategories();
						s.success && (L.value = s.data);
					} catch (s) {
						console.error("Load categories error:", s);
					}
				};
			return (
				E(async () => {
					const s = localStorage.getItem("cart");
					s && (h.value = JSON.parse(s));
					const e = localStorage.getItem("wishlist");
					e && (g.value = JSON.parse(e)), await Promise.all([B(), O()]);
				}),
				(s, e) => {
					const a = _("FeatherIcon"),
						p = _("Button"),
						W = _("TextInput"),
						F = _("Badge");
					return (
						r(),
						n("div", Q, [
							t("header", G, [
								t("div", K, [
									t("div", X, [
										t("div", Y, [
											t("div", Z, [
												l(a, {
													name: "shopping-bag",
													class: "text-white",
												}),
											]),
											e[7] ||
												(e[7] = t(
													"h1",
													{ class: "text-2xl font-bold text-gray-900" },
													"Draped Dreams",
													-1
												)),
										]),
										t("div", ee, [
											l(
												p,
												{
													variant: "ghost",
													size: "sm",
													onClick:
														e[0] ||
														(e[0] = (o) => s.$router.push("/cart")),
												},
												{
													default: d(() => [
														l(a, {
															name: "shopping-cart",
															class: "w-5 h-5 mr-2",
														}),
														c(" Cart (" + u(h.value.length) + ") ", 1),
													]),
													_: 1,
												}
											),
											l(
												p,
												{
													variant: "ghost",
													size: "sm",
													onClick:
														e[1] ||
														(e[1] = (o) => s.$router.push("/login")),
												},
												{
													default: d(() => [
														l(a, {
															name: "user",
															class: "w-5 h-5 mr-2",
														}),
														e[8] || (e[8] = c(" Login ", -1)),
													]),
													_: 1,
												}
											),
										]),
									]),
								]),
							]),
							t("main", te, [
								t("nav", se, [
									l(
										p,
										{
											variant: "ghost",
											size: "sm",
											onClick: e[2] || (e[2] = (o) => s.$router.push("/")),
										},
										{
											default: d(() => [
												l(a, { name: "home", class: "w-4 h-4 mr-2" }),
												e[9] || (e[9] = c(" Home ", -1)),
											]),
											_: 1,
										}
									),
									e[10] ||
										(e[10] = t(
											"span",
											{ class: "mx-2 text-gray-400" },
											"/",
											-1
										)),
									e[11] ||
										(e[11] = t(
											"span",
											{ class: "text-gray-600" },
											"Products",
											-1
										)),
								]),
								t("div", oe, [
									t("div", ae, [
										t("div", null, [
											e[12] ||
												(e[12] = t(
													"label",
													{
														class: "block text-sm font-medium text-gray-700 mb-2",
													},
													"Search",
													-1
												)),
											l(
												W,
												{
													modelValue: m.value,
													"onUpdate:modelValue":
														e[3] || (e[3] = (o) => (m.value = o)),
													placeholder: "Search sarees...",
													onInput: b,
												},
												null,
												8,
												["modelValue"]
											),
										]),
										t("div", null, [
											e[14] ||
												(e[14] = t(
													"label",
													{
														class: "block text-sm font-medium text-gray-700 mb-2",
													},
													"Category",
													-1
												)),
											C(
												t(
													"select",
													{
														"onUpdate:modelValue":
															e[4] || (e[4] = (o) => (v.value = o)),
														onChange: b,
														class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500",
													},
													[
														e[13] ||
															(e[13] = t(
																"option",
																{ value: "" },
																"All Categories",
																-1
															)),
														(r(!0),
														n(
															P,
															null,
															I(
																L.value,
																(o) => (
																	r(),
																	n(
																		"option",
																		{ key: o, value: o },
																		u(o),
																		9,
																		le
																	)
																)
															),
															128
														)),
													],
													544
												),
												[[S, v.value]]
											),
										]),
										t("div", null, [
											e[16] ||
												(e[16] = t(
													"label",
													{
														class: "block text-sm font-medium text-gray-700 mb-2",
													},
													"Price Range",
													-1
												)),
											C(
												t(
													"select",
													{
														"onUpdate:modelValue":
															e[5] || (e[5] = (o) => (f.value = o)),
														onChange: b,
														class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500",
													},
													[
														...(e[15] ||
															(e[15] = [
																j(
																	'<option value="">All Prices</option><option value="0-5000">Under ₹5,000</option><option value="5000-15000">₹5,000 - ₹15,000</option><option value="15000-30000">₹15,000 - ₹30,000</option><option value="30000+">Above ₹30,000</option>',
																	5
																),
															])),
													],
													544
												),
												[[S, f.value]]
											),
										]),
										t("div", null, [
											e[18] ||
												(e[18] = t(
													"label",
													{
														class: "block text-sm font-medium text-gray-700 mb-2",
													},
													"Sort By",
													-1
												)),
											C(
												t(
													"select",
													{
														"onUpdate:modelValue":
															e[6] || (e[6] = (o) => (x.value = o)),
														onChange: b,
														class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500",
													},
													[
														...(e[17] ||
															(e[17] = [
																j(
																	'<option value="featured">Featured</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="newest">Newest First</option><option value="popular">Most Popular</option>',
																	5
																),
															])),
													],
													544
												),
												[[S, x.value]]
											),
										]),
									]),
								]),
								k.value
									? (r(),
									  n("div", re, [
											...(e[19] ||
												(e[19] = [
													t(
														"div",
														{
															class: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600",
														},
														null,
														-1
													),
													t(
														"p",
														{ class: "mt-2 text-gray-600" },
														"Loading products...",
														-1
													),
												])),
									  ]))
									: y.value
									? (r(),
									  n("div", ne, [
											l(a, {
												name: "alert-circle",
												class: "w-16 h-16 text-red-400 mx-auto mb-4",
											}),
											e[21] ||
												(e[21] = t(
													"h3",
													{
														class: "text-lg font-medium text-gray-900 mb-2",
													},
													"Error loading products",
													-1
												)),
											t("p", ie, u(y.value), 1),
											l(
												p,
												{ onClick: B },
												{
													default: d(() => [
														...(e[20] ||
															(e[20] = [c("Try Again", -1)])),
													]),
													_: 1,
												}
											),
									  ]))
									: (r(),
									  n("div", ue, [
											(r(!0),
											n(
												P,
												null,
												I(
													N.value,
													(o) => (
														r(),
														n(
															"div",
															{
																key: o.id,
																class: "bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer",
																onClick: (w) =>
																	s.$router.push(
																		`/product/${o.id}`
																	),
															},
															[
																t("div", ce, [
																	o.image
																		? (r(),
																		  n(
																				"img",
																				{
																					key: 0,
																					src: o.image,
																					alt: o.product_name,
																					class: "w-full h-full object-cover",
																				},
																				null,
																				8,
																				me
																		  ))
																		: (r(),
																		  R(a, {
																				key: 1,
																				name: "image",
																				class: "w-16 h-16 text-purple-400",
																		  })),
																	t("div", pe, [
																		l(
																			F,
																			{
																				variant: T(
																					o.stock
																				),
																			},
																			{
																				default: d(() => [
																					c(
																						u(
																							o.stock
																						) +
																							" left ",
																						1
																					),
																				]),
																				_: 2,
																			},
																			1032,
																			["variant"]
																		),
																	]),
																	t("div", ge, [
																		l(
																			F,
																			{
																				variant:
																					"secondary",
																				class: "text-xs",
																			},
																			{
																				default: d(() => [
																					c(
																						u(
																							o.category
																						),
																						1
																					),
																				]),
																				_: 2,
																			},
																			1024
																		),
																	]),
																]),
																t("div", ve, [
																	t("h3", fe, u(o.name), 1),
																	t(
																		"p",
																		xe,
																		u(o.description),
																		1
																	),
																	t("div", ye, [
																		t("div", null, [
																			t(
																				"span",
																				he,
																				"₹" +
																					u(
																						o.price.toLocaleString()
																					),
																				1
																			),
																			o.originalPrice
																				? (r(),
																				  n(
																						"span",
																						be,
																						" ₹" +
																							u(
																								o.originalPrice.toLocaleString()
																							),
																						1
																				  ))
																				: D("", !0),
																		]),
																		t("div", we, [
																			t("div", _e, [
																				(r(),
																				n(
																					P,
																					null,
																					I(5, (w) =>
																						l(a, {
																							key: w,
																							name: "star",
																							class: "w-3 h-3 fill-current",
																						})
																					),
																					64
																				)),
																			]),
																			t(
																				"span",
																				ke,
																				"(" +
																					u(o.rating) +
																					")",
																				1
																			),
																		]),
																	]),
																	t("div", Ce, [
																		l(
																			p,
																			{
																				variant: "outline",
																				size: "sm",
																				onClick: z(
																					(w) => U(o),
																					["stop"]
																				),
																				disabled:
																					o.stock === 0,
																			},
																			{
																				default: d(() => [
																					l(a, {
																						name: "plus",
																						class: "w-4 h-4 mr-1",
																					}),
																					e[22] ||
																						(e[22] = c(
																							" Add to Cart ",
																							-1
																						)),
																				]),
																				_: 1,
																			},
																			8,
																			["onClick", "disabled"]
																		),
																		l(
																			p,
																			{
																				variant: "ghost",
																				size: "sm",
																				onClick: z(
																					(w) => J(o),
																					["stop"]
																				),
																			},
																			{
																				default: d(() => [
																					l(
																						a,
																						{
																							name:
																								($(
																									o.id
																								),
																								"heart"),
																							class: q(
																								$(
																									o.id
																								)
																									? "text-red-500 fill-current"
																									: "text-gray-400"
																							),
																						},
																						null,
																						8,
																						[
																							"name",
																							"class",
																						]
																					),
																				]),
																				_: 2,
																			},
																			1032,
																			["onClick"]
																		),
																	]),
																]),
															],
															8,
															de
														)
													)
												),
												128
											)),
									  ])),
								N.value.length === 0
									? (r(),
									  n("div", Se, [
											l(a, {
												name: "search",
												class: "w-16 h-16 text-gray-400 mx-auto mb-4",
											}),
											e[24] ||
												(e[24] = t(
													"h3",
													{
														class: "text-lg font-medium text-gray-900 mb-2",
													},
													"No sarees found",
													-1
												)),
											e[25] ||
												(e[25] = t(
													"p",
													{ class: "text-gray-600 mb-4" },
													"Try adjusting your search or filter criteria",
													-1
												)),
											l(
												p,
												{ onClick: M },
												{
													default: d(() => [
														...(e[23] ||
															(e[23] = [c("Clear Filters", -1)])),
													]),
													_: 1,
												}
											),
									  ]))
									: D("", !0),
							]),
						])
					);
				}
			);
		},
	};
export { Ve as default };
