import {
	u as h,
	r as c,
	o as b,
	a as n,
	c as l,
	b as e,
	t as r,
	F as y,
	d as f,
	e as v,
} from "./index-c552bc1d.js";
const _ = { class: "min-h-screen bg-gray-50" },
	w = { class: "bg-yellow-100 p-4 text-center" },
	k = { class: "text-yellow-800" },
	C = { class: "bg-white shadow-sm border-b" },
	S = { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
	D = { class: "flex justify-between items-center py-4" },
	j = { class: "flex items-center space-x-4" },
	N = { class: "py-12 bg-white" },
	P = { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
	T = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" },
	B = { class: "p-4" },
	E = { class: "font-semibold text-gray-900 mb-2" },
	L = { class: "text-sm text-gray-600 mb-3" },
	F = { class: "flex items-center justify-between" },
	I = { class: "text-lg font-bold text-purple-600" },
	O = { key: 0, class: "text-sm text-gray-500 line-through ml-2" },
	R = ["onClick"],
	J = {
		__name: "Home",
		setup(V) {
			const a = h(),
				i = c([]),
				d = c([
					{
						id: 1,
						name: "Elegant Silk Saree",
						description: "Beautiful silk saree with intricate work",
						price: "15,000",
						originalPrice: "18,000",
						category: "Silk",
					},
					{
						id: 2,
						name: "Comfortable Cotton Saree",
						description: "Light and breathable cotton saree",
						price: "3,500",
						category: "Cotton",
					},
					{
						id: 3,
						name: "Modern Designer Saree",
						description: "Contemporary designer saree",
						price: "8,000",
						originalPrice: "10,000",
						category: "Designer",
					},
					{
						id: 4,
						name: "Wedding Silk Saree",
						description: "Heavy silk saree for special occasions",
						price: "25,000",
						category: "Wedding",
					},
				]),
				p = (o) => {
					i.value.push(o),
						localStorage.setItem("cart", JSON.stringify(i.value)),
						alert(`Added "${o.name}" to cart!`);
				},
				g = () => {
					a.push("/cart");
				},
				m = () => {
					a.push("/register");
				},
				u = () => {
					a.push("/login");
				},
				x = () => {
					a.push("/products");
				};
			return (
				b(() => {
					const o = localStorage.getItem("cart");
					o && (i.value = JSON.parse(o));
				}),
				(o, t) => (
					n(),
					l("div", _, [
						e("div", w, [
							e("p", k, "Vue.js is working! Cart items: " + r(i.value.length), 1),
						]),
						e("header", C, [
							e("div", S, [
								e("div", D, [
									t[0] ||
										(t[0] = e(
											"div",
											{ class: "flex items-center" },
											[
												e(
													"div",
													{
														class: "h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3",
													},
													[
														e(
															"span",
															{ class: "text-white text-lg" },
															"🛍️"
														),
													]
												),
												e(
													"h1",
													{ class: "text-2xl font-bold text-gray-900" },
													"Draped Dreams"
												),
											],
											-1
										)),
									e("div", j, [
										e(
											"button",
											{
												onClick: g,
												class: "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200",
											},
											" 🛒 Cart (" + r(i.value.length) + ") ",
											1
										),
										e(
											"button",
											{
												onClick: m,
												class: "px-4 py-2 text-sm font-medium text-purple-600 bg-white border border-purple-600 rounded-md hover:bg-purple-50",
											},
											" 👤 Register "
										),
										e(
											"button",
											{
												onClick: u,
												class: "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200",
											},
											" 🔑 Login "
										),
									]),
								]),
							]),
						]),
						e(
							"section",
							{
								class: "bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16",
							},
							[
								e(
									"div",
									{
										class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
									},
									[
										t[1] ||
											(t[1] = e(
												"h2",
												{ class: "text-4xl font-bold mb-4" },
												"Elegant Sarees for Every Occasion",
												-1
											)),
										t[2] ||
											(t[2] = e(
												"p",
												{ class: "text-xl mb-8" },
												"Discover our exquisite collection of traditional and contemporary sarees",
												-1
											)),
										e(
											"button",
											{
												onClick: x,
												class: "px-6 py-3 bg-white text-purple-600 rounded-md font-medium hover:bg-gray-100",
											},
											" Shop Now "
										),
									]
								),
							]
						),
						e("section", N, [
							e("div", P, [
								t[4] ||
									(t[4] = e(
										"h3",
										{ class: "text-2xl font-bold text-gray-900 mb-8" },
										"Featured Sarees",
										-1
									)),
								e("div", T, [
									(n(!0),
									l(
										y,
										null,
										f(
											d.value,
											(s) => (
												n(),
												l(
													"div",
													{
														key: s.id,
														class: "bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer",
													},
													[
														t[3] ||
															(t[3] = e(
																"div",
																{
																	class: "aspect-w-16 aspect-h-12 bg-gradient-to-br from-purple-100 to-pink-100 h-64 flex items-center justify-center",
																},
																[
																	e(
																		"span",
																		{ class: "text-6xl" },
																		"👗"
																	),
																],
																-1
															)),
														e("div", B, [
															e("h4", E, r(s.name), 1),
															e("p", L, r(s.description), 1),
															e("div", F, [
																e("div", null, [
																	e(
																		"span",
																		I,
																		"₹" + r(s.price),
																		1
																	),
																	s.originalPrice
																		? (n(),
																		  l(
																				"span",
																				O,
																				" ₹" +
																					r(
																						s.originalPrice
																					),
																				1
																		  ))
																		: v("", !0),
																]),
																e(
																	"button",
																	{
																		onClick: (A) => p(s),
																		class: "px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700",
																	},
																	" Add to Cart ",
																	8,
																	R
																),
															]),
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
					])
				)
			);
		},
	};
export { J as default };
