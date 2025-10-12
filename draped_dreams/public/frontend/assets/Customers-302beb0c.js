import {
	r as h,
	o as u,
	a as o,
	b as n,
	c as r,
	d as t,
	e as i,
	w as d,
	F as _,
	f as y,
	g as l,
	t as a,
} from "./index-86bbcb6e.js";
const g = { class: "space-y-6" },
	f = { class: "flex justify-between items-center" },
	w = { class: "bg-white rounded-lg shadow" },
	v = { class: "overflow-x-auto" },
	k = { class: "min-w-full divide-y divide-gray-200" },
	b = { class: "bg-white divide-y divide-gray-200" },
	A = { class: "px-6 py-4 whitespace-nowrap" },
	B = { class: "flex items-center" },
	C = { class: "flex-shrink-0 h-10 w-10" },
	O = { class: "h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center" },
	S = { class: "text-sm font-medium text-primary-600" },
	F = { class: "ml-4" },
	P = { class: "text-sm font-medium text-gray-900" },
	V = { class: "text-sm text-gray-500" },
	j = { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" },
	I = { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" },
	M = { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" },
	N = { class: "px-6 py-4 whitespace-nowrap" },
	T = { class: "px-6 py-4 whitespace-nowrap text-sm font-medium" },
	J = {
		__name: "Customers",
		setup(D) {
			const c = h([]);
			return (
				u(() => {
					setTimeout(() => {
						c.value = [
							{
								id: 1,
								name: "Priya Sharma",
								email: "priya.sharma@email.com",
								phone: "+91 98765 43210",
								location: "Mumbai",
								totalOrders: 12,
								status: "Active",
							},
							{
								id: 2,
								name: "Anita Patel",
								email: "anita.patel@email.com",
								phone: "+91 87654 32109",
								location: "Delhi",
								totalOrders: 8,
								status: "Active",
							},
							{
								id: 3,
								name: "Sunita Reddy",
								email: "sunita.reddy@email.com",
								phone: "+91 76543 21098",
								location: "Bangalore",
								totalOrders: 15,
								status: "Active",
							},
							{
								id: 4,
								name: "Meera Singh",
								email: "meera.singh@email.com",
								phone: "+91 65432 10987",
								location: "Chennai",
								totalOrders: 5,
								status: "Inactive",
							},
							{
								id: 5,
								name: "Kavita Joshi",
								email: "kavita.joshi@email.com",
								phone: "+91 54321 09876",
								location: "Pune",
								totalOrders: 20,
								status: "Active",
							},
						];
					}, 1e3);
				}),
				(E, s) => {
					const m = o("FeatherIcon"),
						p = o("Button"),
						x = o("Badge");
					return (
						n(),
						r("div", g, [
							t("div", f, [
								s[1] ||
									(s[1] = t(
										"h1",
										{ class: "text-2xl font-bold text-gray-900" },
										"Customers",
										-1
									)),
								i(
									p,
									{ class: "draped-dreams-primary" },
									{
										default: d(() => [
											i(m, { name: "user-plus", class: "w-4 h-4 mr-2" }),
											s[0] || (s[0] = l(" Add Customer ", -1)),
										]),
										_: 1,
									}
								),
							]),
							t("div", w, [
								t("div", v, [
									t("table", k, [
										s[3] ||
											(s[3] = t(
												"thead",
												{ class: "bg-gray-50" },
												[
													t("tr", null, [
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
															" Email "
														),
														t(
															"th",
															{
																class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
															},
															" Phone "
														),
														t(
															"th",
															{
																class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
															},
															" Total Orders "
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
															" Actions "
														),
													]),
												],
												-1
											)),
										t("tbody", b, [
											(n(!0),
											r(
												_,
												null,
												y(
													c.value,
													(e) => (
														n(),
														r("tr", { key: e.id }, [
															t("td", A, [
																t("div", B, [
																	t("div", C, [
																		t("div", O, [
																			t(
																				"span",
																				S,
																				a(
																					e.name.charAt(
																						0
																					)
																				),
																				1
																			),
																		]),
																	]),
																	t("div", F, [
																		t("div", P, a(e.name), 1),
																		t(
																			"div",
																			V,
																			a(e.location),
																			1
																		),
																	]),
																]),
															]),
															t("td", j, a(e.email), 1),
															t("td", I, a(e.phone), 1),
															t("td", M, a(e.totalOrders), 1),
															t("td", N, [
																i(
																	x,
																	{
																		variant:
																			e.status === "Active"
																				? "success"
																				: "warning",
																	},
																	{
																		default: d(() => [
																			l(a(e.status), 1),
																		]),
																		_: 2,
																	},
																	1032,
																	["variant"]
																),
															]),
															t("td", T, [
																i(
																	p,
																	{
																		variant: "ghost",
																		size: "sm",
																		class: "text-primary-600 hover:text-primary-900",
																	},
																	{
																		default: d(() => [
																			...(s[2] ||
																				(s[2] = [
																					l(
																						" View ",
																						-1
																					),
																				])),
																		]),
																		_: 1,
																	}
																),
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
						])
					);
				}
			);
		},
	};
export { J as default };
