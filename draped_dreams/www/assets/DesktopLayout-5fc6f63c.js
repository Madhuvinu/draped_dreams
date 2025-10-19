import {
	l as y,
	u as v,
	s as w,
	a as r,
	b as c,
	c as i,
	d as e,
	F as k,
	f as D,
	e as a,
	w as d,
	g as m,
	t as h,
	n as C,
	k as S,
} from "./index-86bbcb6e.js";
const B = { class: "min-h-screen bg-gray-50" },
	F = { class: "flex h-screen" },
	I = { class: "w-64 bg-white shadow-lg" },
	N = { class: "mt-8" },
	R = { class: "flex-1 flex flex-col overflow-hidden" },
	L = { class: "bg-white shadow-sm border-b" },
	V = { class: "flex items-center justify-between px-6 py-4" },
	z = { class: "text-xl font-semibold text-gray-900" },
	O = { class: "flex items-center space-x-4" },
	P = { class: "flex-1 overflow-auto p-6" },
	j = {
		__name: "DesktopLayout",
		setup(T) {
			const u = y(),
				p = v(),
				_ = w(),
				n = [
					{ name: "Dashboard", href: "/dashboard", icon: "home", label: "Dashboard" },
					{
						name: "Products",
						href: "/products",
						icon: "shopping-bag",
						label: "Saree Collection",
					},
					{ name: "Customers", href: "/customers", icon: "users", label: "Customers" },
					{ name: "Orders", href: "/orders", icon: "shopping-cart", label: "Orders" },
					{ name: "Inventory", href: "/inventory", icon: "archive", label: "Inventory" },
					{ name: "Reports", href: "/reports", icon: "bar-chart-2", label: "Reports" },
				],
				f = () => {
					const t = n.find((s) => s.name === u.name);
					return t ? t.label : "Draped Dreams";
				},
				g = async () => {
					await _.logout(), p.push("/login");
				};
			return (t, s) => {
				const l = r("FeatherIcon"),
					b = r("router-link"),
					x = r("Button");
				return (
					c(),
					i("div", B, [
						e("div", F, [
							e("div", I, [
								s[0] ||
									(s[0] = e(
										"div",
										{ class: "p-6" },
										[
											e(
												"h1",
												{ class: "text-2xl font-bold text-primary-600" },
												"Draped Dreams"
											),
											e(
												"p",
												{ class: "text-sm text-gray-600 mt-1" },
												"Sari Store Management"
											),
										],
										-1
									)),
								e("nav", N, [
									(c(),
									i(
										k,
										null,
										D(n, (o) =>
											a(
												b,
												{
													key: o.name,
													to: o.href,
													class: C([
														"flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors",
														{
															"bg-primary-50 text-primary-600 border-r-2 border-primary-600":
																t.$route.name === o.name,
														},
													]),
												},
												{
													default: d(() => [
														a(
															l,
															{
																name: o.icon,
																class: "w-5 h-5 mr-3",
															},
															null,
															8,
															["name"]
														),
														m(" " + h(o.label), 1),
													]),
													_: 2,
												},
												1032,
												["to", "class"]
											)
										),
										64
									)),
								]),
							]),
							e("div", R, [
								e("header", L, [
									e("div", V, [
										e("h2", z, h(f()), 1),
										e("div", O, [
											a(
												x,
												{
													variant: "ghost",
													size: "sm",
													onClick: g,
													class: "text-gray-600 hover:text-gray-900",
												},
												{
													default: d(() => [
														a(l, {
															name: "log-out",
															class: "w-4 h-4 mr-2",
														}),
														s[1] || (s[1] = m(" Logout ", -1)),
													]),
													_: 1,
												}
											),
										]),
									]),
								]),
								e("main", P, [S(t.$slots, "default")]),
							]),
						]),
					])
				);
			};
		},
	};
export { j as default };
