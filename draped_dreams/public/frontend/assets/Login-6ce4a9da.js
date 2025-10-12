import {
	u as b,
	r as d,
	g as p,
	a as m,
	c as f,
	b as e,
	h as a,
	m as h,
	t as g,
	e as w,
	w as _,
	k as V,
} from "./index-3c02768a.js";
import { a as k } from "./api-b634d5e6.js";
const S = {
		class: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",
	},
	I = { class: "max-w-md w-full space-y-8" },
	B = { class: "mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-purple-100" },
	L = { class: "rounded-md shadow-sm -space-y-px" },
	N = { key: 0, class: "rounded-md bg-red-50 p-4" },
	P = { class: "flex" },
	j = { class: "flex-shrink-0" },
	C = { class: "ml-3" },
	D = { class: "text-sm font-medium text-red-800" },
	E = { class: "absolute left-0 inset-y-0 flex items-center pl-3" },
	F = {
		__name: "Login",
		setup(T) {
			const x = b(),
				l = d(""),
				r = d(""),
				n = d(!1),
				t = d(""),
				v = async () => {
					(n.value = !0), (t.value = "");
					try {
						if (!l.value || !r.value) {
							t.value = "Please enter email and password";
							return;
						}
						const o = await k.login(l.value, r.value);
						o.success
							? (localStorage.setItem("user", JSON.stringify(o.data)),
							  localStorage.setItem("isLoggedIn", "true"),
							  x.push("/dashboard"))
							: (t.value = o.message);
					} catch (o) {
						(t.value = "Login failed. Please try again."),
							console.error("Login error:", o);
					} finally {
						n.value = !1;
					}
				};
			return (o, s) => {
				const u = p("FeatherIcon"),
					c = p("TextInput"),
					y = p("Button");
				return (
					m(),
					f("div", S, [
						e("div", I, [
							e("div", null, [
								e("div", B, [
									a(u, {
										name: "shopping-bag",
										class: "h-6 w-6 text-purple-600",
									}),
								]),
								s[2] ||
									(s[2] = e(
										"h2",
										{
											class: "mt-6 text-center text-3xl font-extrabold text-gray-900",
										},
										" Draped Dreams ",
										-1
									)),
								s[3] ||
									(s[3] = e(
										"p",
										{ class: "mt-2 text-center text-sm text-gray-600" },
										" Sign in to your account ",
										-1
									)),
							]),
							e(
								"form",
								{ class: "mt-8 space-y-6", onSubmit: h(v, ["prevent"]) },
								[
									e("div", L, [
										e("div", null, [
											s[4] ||
												(s[4] = e(
													"label",
													{ for: "email-address", class: "sr-only" },
													"Email address",
													-1
												)),
											a(
												c,
												{
													id: "email-address",
													name: "email",
													type: "email",
													autocomplete: "email",
													required: "",
													class: "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm",
													placeholder: "Email address",
													modelValue: l.value,
													"onUpdate:modelValue":
														s[0] || (s[0] = (i) => (l.value = i)),
												},
												null,
												8,
												["modelValue"]
											),
										]),
										e("div", null, [
											s[5] ||
												(s[5] = e(
													"label",
													{ for: "password", class: "sr-only" },
													"Password",
													-1
												)),
											a(
												c,
												{
													id: "password",
													name: "password",
													type: "password",
													autocomplete: "current-password",
													required: "",
													class: "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm",
													placeholder: "Password",
													modelValue: r.value,
													"onUpdate:modelValue":
														s[1] || (s[1] = (i) => (r.value = i)),
												},
												null,
												8,
												["modelValue"]
											),
										]),
									]),
									t.value
										? (m(),
										  f("div", N, [
												e("div", P, [
													e("div", j, [
														a(u, {
															name: "alert-circle",
															class: "h-5 w-5 text-red-400",
														}),
													]),
													e("div", C, [e("h3", D, g(t.value), 1)]),
												]),
										  ]))
										: w("", !0),
									e("div", null, [
										a(
											y,
											{
												type: "submit",
												class: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
												loading: n.value,
											},
											{
												default: _(() => [
													e("span", E, [
														a(u, {
															name: "lock",
															class: "h-5 w-5 text-purple-500 group-hover:text-purple-400",
														}),
													]),
													V(
														" " +
															g(
																n.value
																	? "Signing in..."
																	: "Sign in"
															),
														1
													),
												]),
												_: 1,
											},
											8,
											["loading"]
										),
									]),
								],
								32
							),
						]),
					])
				);
			};
		},
	};
export { F as default };
