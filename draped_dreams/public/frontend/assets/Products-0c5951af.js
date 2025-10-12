import {
	r as i,
	f as H,
	o as R,
	g as _,
	a as r,
	c as n,
	b as s,
	h as l,
	w as d,
	i as S,
	v as P,
	F as I,
	d as L,
	j,
	t as u,
	e as A,
	k as g,
	l as E,
	m as D,
	n as q,
} from "./index-1ed802c2.js";
import { a as z } from "./api-b634d5e6.js";
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
	ge = ["src", "alt"],
	pe = { class: "absolute top-2 right-2" },
	me = { class: "absolute top-2 left-2" },
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
				f = i([]),
				c = i(""),
				p = i(""),
				m = i(""),
				x = i("featured"),
				k = i(!1),
				y = i(""),
				V = i(["Silk", "Cotton", "Designer", "Wedding", "Casual", "Party"]),
				C = i([]),
				N = H(() => {
					let t = [...C.value];
					switch (
						(c.value &&
							(t = t.filter(
								(e) =>
									e.product_name.toLowerCase().includes(c.value.toLowerCase()) ||
									e.description.toLowerCase().includes(c.value.toLowerCase())
							)),
						p.value && (t = t.filter((e) => e.category === p.value)),
						m.value &&
							(t = t.filter((e) => {
								const a = e.price;
								switch (m.value) {
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
							t.sort((e, a) => e.price - a.price);
							break;
						case "price-high":
							t.sort((e, a) => a.price - e.price);
							break;
						case "newest":
							t.sort((e, a) => new Date(a.created_date) - new Date(e.created_date));
							break;
						case "popular":
							t.sort((e, a) => (a.rating || 0) - (e.rating || 0));
							break;
						case "featured":
							t.sort((e, a) =>
								e.featured && !a.featured
									? -1
									: !e.featured && a.featured
									? 1
									: (a.rating || 0) - (e.rating || 0)
							);
							break;
					}
					return t;
				}),
				T = (t) => (t === 0 ? "danger" : t <= 5 ? "warning" : "success"),
				U = (t) => {
					h.value.push(t),
						localStorage.setItem("cart", JSON.stringify(h.value)),
						console.log("Added to cart:", t.product_name);
				},
				J = (t) => {
					const e = f.value.findIndex((a) => a.name === t.name);
					e > -1 ? f.value.splice(e, 1) : f.value.push(t),
						localStorage.setItem("wishlist", JSON.stringify(f.value));
				},
				$ = (t) => f.value.some((e) => e.name === t),
				M = () => {
					(c.value = ""), (p.value = ""), (m.value = ""), (x.value = "featured");
				},
				b = () => {},
				B = async () => {
					(k.value = !0), (y.value = "");
					try {
						console.log("Loading products with filters:", {
							category: p.value,
							search: c.value,
							price_range: m.value,
							sort_by: x.value,
							limit: 50,
						});
						const t = await z.getProducts({
							category: p.value,
							search: c.value,
							price_range: m.value,
							sort_by: x.value,
							limit: 50,
						});
						console.log("API result:", t),
							t.success
								? (console.log("Raw products data:", t.data),
								  (C.value = t.data.map((e) => ({
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
								  }))),
								  console.log("Processed products:", C.value))
								: ((y.value = t.message), console.error("API error:", t.message));
					} catch (t) {
						(y.value = "Failed to load products"),
							console.error("Load products error:", t);
					} finally {
						k.value = !1;
					}
				},
				O = async () => {
					try {
						const t = await z.getCategories();
						t.success && (V.value = t.data);
					} catch (t) {
						console.error("Load categories error:", t);
					}
				};
			return (
				R(async () => {
					const t = localStorage.getItem("cart");
					t && (h.value = JSON.parse(t));
					const e = localStorage.getItem("wishlist");
					e && (f.value = JSON.parse(e)), await Promise.all([B(), O()]);
				}),
				(t, e) => {
					const a = _("FeatherIcon"),
						v = _("Button"),
						W = _("TextInput"),
						F = _("Badge");
					return (
						r(),
						n("div", Q, [
							s("header", G, [
								s("div", K, [
									s("div", X, [
										s("div", Y, [
											s("div", Z, [
												l(a, {
													name: "shopping-bag",
													class: "text-white",
												}),
											]),
											e[7] ||
												(e[7] = s(
													"h1",
													{ class: "text-2xl font-bold text-gray-900" },
													"Draped Dreams",
													-1
												)),
										]),
										s("div", ee, [
											l(
												v,
												{
													variant: "ghost",
													size: "sm",
													onClick:
														e[0] ||
														(e[0] = (o) => t.$router.push("/cart")),
												},
												{
													default: d(() => [
														l(a, {
															name: "shopping-cart",
															class: "w-5 h-5 mr-2",
														}),
														g(" Cart (" + u(h.value.length) + ") ", 1),
													]),
													_: 1,
												}
											),
											l(
												v,
												{
													variant: "ghost",
													size: "sm",
													onClick:
														e[1] ||
														(e[1] = (o) => t.$router.push("/login")),
												},
												{
													default: d(() => [
														l(a, {
															name: "user",
															class: "w-5 h-5 mr-2",
														}),
														e[8] || (e[8] = g(" Login ", -1)),
													]),
													_: 1,
												}
											),
										]),
									]),
								]),
							]),
							s("main", te, [
								s("nav", se, [
									l(
										v,
										{
											variant: "ghost",
											size: "sm",
											onClick: e[2] || (e[2] = (o) => t.$router.push("/")),
										},
										{
											default: d(() => [
												l(a, { name: "home", class: "w-4 h-4 mr-2" }),
												e[9] || (e[9] = g(" Home ", -1)),
											]),
											_: 1,
										}
									),
									e[10] ||
										(e[10] = s(
											"span",
											{ class: "mx-2 text-gray-400" },
											"/",
											-1
										)),
									e[11] ||
										(e[11] = s(
											"span",
											{ class: "text-gray-600" },
											"Products",
											-1
										)),
								]),
								s("div", oe, [
									s("div", ae, [
										s("div", null, [
											e[12] ||
												(e[12] = s(
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
													modelValue: c.value,
													"onUpdate:modelValue":
														e[3] || (e[3] = (o) => (c.value = o)),
													placeholder: "Search sarees...",
													onInput: b,
												},
												null,
												8,
												["modelValue"]
											),
										]),
										s("div", null, [
											e[14] ||
												(e[14] = s(
													"label",
													{
														class: "block text-sm font-medium text-gray-700 mb-2",
													},
													"Category",
													-1
												)),
											S(
												s(
													"select",
													{
														"onUpdate:modelValue":
															e[4] || (e[4] = (o) => (p.value = o)),
														onChange: b,
														class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500",
													},
													[
														e[13] ||
															(e[13] = s(
																"option",
																{ value: "" },
																"All Categories",
																-1
															)),
														(r(!0),
														n(
															I,
															null,
															L(
																V.value,
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
												[[P, p.value]]
											),
										]),
										s("div", null, [
											e[16] ||
												(e[16] = s(
													"label",
													{
														class: "block text-sm font-medium text-gray-700 mb-2",
													},
													"Price Range",
													-1
												)),
											S(
												s(
													"select",
													{
														"onUpdate:modelValue":
															e[5] || (e[5] = (o) => (m.value = o)),
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
												[[P, m.value]]
											),
										]),
										s("div", null, [
											e[18] ||
												(e[18] = s(
													"label",
													{
														class: "block text-sm font-medium text-gray-700 mb-2",
													},
													"Sort By",
													-1
												)),
											S(
												s(
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
												[[P, x.value]]
											),
										]),
									]),
								]),
								k.value
									? (r(),
									  n("div", re, [
											...(e[19] ||
												(e[19] = [
													s(
														"div",
														{
															class: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600",
														},
														null,
														-1
													),
													s(
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
												(e[21] = s(
													"h3",
													{
														class: "text-lg font-medium text-gray-900 mb-2",
													},
													"Error loading products",
													-1
												)),
											s("p", ie, u(y.value), 1),
											l(
												v,
												{ onClick: B },
												{
													default: d(() => [
														...(e[20] ||
															(e[20] = [g("Try Again", -1)])),
													]),
													_: 1,
												}
											),
									  ]))
									: (r(),
									  n("div", ue, [
											(r(!0),
											n(
												I,
												null,
												L(
													N.value,
													(o) => (
														r(),
														n(
															"div",
															{
																key: o.id,
																class: "bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer",
																onClick: (w) =>
																	t.$router.push(
																		`/product/${o.id}`
																	),
															},
															[
																s("div", ce, [
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
																				ge
																		  ))
																		: (r(),
																		  E(a, {
																				key: 1,
																				name: "image",
																				class: "w-16 h-16 text-purple-400",
																		  })),
																	s("div", pe, [
																		l(
																			F,
																			{
																				variant: T(
																					o.stock
																				),
																			},
																			{
																				default: d(() => [
																					g(
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
																	s("div", me, [
																		l(
																			F,
																			{
																				variant:
																					"secondary",
																				class: "text-xs",
																			},
																			{
																				default: d(() => [
																					g(
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
																s("div", ve, [
																	s("h3", fe, u(o.name), 1),
																	s(
																		"p",
																		xe,
																		u(o.description),
																		1
																	),
																	s("div", ye, [
																		s("div", null, [
																			s(
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
																				: A("", !0),
																		]),
																		s("div", we, [
																			s("div", _e, [
																				(r(),
																				n(
																					I,
																					null,
																					L(5, (w) =>
																						l(a, {
																							key: w,
																							name: "star",
																							class: "w-3 h-3 fill-current",
																						})
																					),
																					64
																				)),
																			]),
																			s(
																				"span",
																				ke,
																				"(" +
																					u(o.rating) +
																					")",
																				1
																			),
																		]),
																	]),
																	s("div", Ce, [
																		l(
																			v,
																			{
																				variant: "outline",
																				size: "sm",
																				onClick: D(
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
																						(e[22] = g(
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
																			v,
																			{
																				variant: "ghost",
																				size: "sm",
																				onClick: D(
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
												(e[24] = s(
													"h3",
													{
														class: "text-lg font-medium text-gray-900 mb-2",
													},
													"No sarees found",
													-1
												)),
											e[25] ||
												(e[25] = s(
													"p",
													{ class: "text-gray-600 mb-4" },
													"Try adjusting your search or filter criteria",
													-1
												)),
											l(
												v,
												{ onClick: M },
												{
													default: d(() => [
														...(e[23] ||
															(e[23] = [g("Clear Filters", -1)])),
													]),
													_: 1,
												}
											),
									  ]))
									: A("", !0),
							]),
						])
					);
				}
			);
		},
	};
export { Ve as default };
