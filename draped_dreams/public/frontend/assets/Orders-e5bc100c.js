import {
	r as g,
	o as h,
	a as r,
	b as i,
	c as n,
	d as t,
	e as o,
	w as c,
	F as _,
	f as w,
	g as d,
	t as a,
} from "./index-e7356369.js";
const f = { class: "space-y-6" },
	v = { class: "flex justify-between items-center" },
	C = { class: "bg-white rounded-lg shadow" },
	k = { class: "overflow-x-auto" },
	b = { class: "min-w-full divide-y divide-gray-200" },
	B = { class: "bg-white divide-y divide-gray-200" },
	E = { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" },
	P = { class: "px-6 py-4 whitespace-nowrap" },
	S = { class: "text-sm font-medium text-gray-900" },
	V = { class: "text-sm text-gray-500" },
	F = { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" },
	N = { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" },
	O = { class: "px-6 py-4 whitespace-nowrap" },
	A = { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" },
	D = { class: "px-6 py-4 whitespace-nowrap text-sm font-medium" },
	M = {
		__name: "Orders",
		setup(I) {
			const m = g([]),
				l = (u) => {
					switch (u) {
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
				h(() => {
					setTimeout(() => {
						m.value = [
							{
								id: "1234",
								customer: "Priya Sharma",
								customerEmail: "priya.sharma@email.com",
								productCount: 2,
								amount: "18,500",
								status: "Completed",
								date: "2024-01-15",
							},
							{
								id: "1235",
								customer: "Anita Patel",
								customerEmail: "anita.patel@email.com",
								productCount: 1,
								amount: "12,000",
								status: "Processing",
								date: "2024-01-16",
							},
							{
								id: "1236",
								customer: "Sunita Reddy",
								customerEmail: "sunita.reddy@email.com",
								productCount: 3,
								amount: "45,000",
								status: "Pending",
								date: "2024-01-17",
							},
							{
								id: "1237",
								customer: "Meera Singh",
								customerEmail: "meera.singh@email.com",
								productCount: 1,
								amount: "8,500",
								status: "Completed",
								date: "2024-01-18",
							},
							{
								id: "1238",
								customer: "Kavita Joshi",
								customerEmail: "kavita.joshi@email.com",
								productCount: 2,
								amount: "22,000",
								status: "Cancelled",
								date: "2024-01-19",
							},
						];
					}, 1e3);
				}),
				(u, s) => {
					const x = r("FeatherIcon"),
						p = r("Button"),
						y = r("Badge");
					return (
						i(),
						n("div", f, [
							t("div", v, [
								s[1] ||
									(s[1] = t(
										"h1",
										{ class: "text-2xl font-bold text-gray-900" },
										"Orders",
										-1
									)),
								o(
									p,
									{ class: "draped-dreams-primary" },
									{
										default: c(() => [
											o(x, { name: "shopping-cart", class: "w-4 h-4 mr-2" }),
											s[0] || (s[0] = d(" New Order ", -1)),
										]),
										_: 1,
									}
								),
							]),
							t("div", C, [
								t("div", k, [
									t("table", b, [
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
															" Products "
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
										t("tbody", B, [
											(i(!0),
											n(
												_,
												null,
												w(
													m.value,
													(e) => (
														i(),
														n("tr", { key: e.id }, [
															t("td", E, " #" + a(e.id), 1),
															t("td", P, [
																t("div", S, a(e.customer), 1),
																t("div", V, a(e.customerEmail), 1),
															]),
															t(
																"td",
																F,
																a(e.productCount) + " items ",
																1
															),
															t("td", N, " ₹" + a(e.amount), 1),
															t("td", O, [
																o(
																	y,
																	{ variant: l(e.status) },
																	{
																		default: c(() => [
																			d(a(e.status), 1),
																		]),
																		_: 2,
																	},
																	1032,
																	["variant"]
																),
															]),
															t("td", A, a(e.date), 1),
															t("td", D, [
																o(
																	p,
																	{
																		variant: "ghost",
																		size: "sm",
																		class: "text-primary-600 hover:text-primary-900",
																	},
																	{
																		default: c(() => [
																			...(s[2] ||
																				(s[2] = [
																					d(
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
export { M as default };
