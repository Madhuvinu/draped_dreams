import {
	u as b,
	r as m,
	a as p,
	c as f,
	b as s,
	h as t,
	m as V,
	t as c,
	e as x,
	w as g,
	k as v,
} from "./index-2c5f8c84.js";
import { a as n, _ as w, c as u, b as N } from "./FeatherIcon-d8a70ae2.js";
const _ = {
		class: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",
	},
	k = { class: "max-w-md w-full space-y-8" },
	P = { class: "mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-purple-100" },
	C = { class: "space-y-4" },
	q = { class: "grid grid-cols-2 gap-4" },
	A = { key: 0, class: "rounded-md bg-red-50 p-4" },
	U = { class: "flex" },
	R = { class: "flex-shrink-0" },
	$ = { class: "ml-3" },
	D = { class: "text-sm font-medium text-red-800" },
	j = { key: 1, class: "rounded-md bg-green-50 p-4" },
	B = { class: "flex" },
	E = { class: "flex-shrink-0" },
	S = { class: "ml-3" },
	F = { class: "text-sm font-medium text-green-800" },
	L = { class: "absolute left-0 inset-y-0 flex items-center pl-3" },
	T = { class: "text-center" },
	z = { class: "text-sm text-gray-600" },
	H = {
		__name: "Register",
		setup(J) {
			const y = b(),
				a = m({
					firstName: "",
					lastName: "",
					email: "",
					phone: "",
					password: "",
					confirmPassword: "",
				}),
				d = m(!1),
				o = m(""),
				i = m(""),
				h = async () => {
					(d.value = !0), (o.value = ""), (i.value = "");
					try {
						if (a.value.password !== a.value.confirmPassword) {
							o.value = "Passwords do not match";
							return;
						}
						if (
							!a.value.firstName ||
							!a.value.lastName ||
							!a.value.email ||
							!a.value.phone ||
							!a.value.password
						) {
							o.value = "All fields are required";
							return;
						}
						const r = await N.register({
							first_name: a.value.firstName,
							last_name: a.value.lastName,
							email: a.value.email,
							phone: a.value.phone,
							password: a.value.password,
							confirm_password: a.value.confirmPassword,
						});
						r.success
							? ((i.value = r.message),
							  (a.value = {
									firstName: "",
									lastName: "",
									email: "",
									phone: "",
									password: "",
									confirmPassword: "",
							  }),
							  setTimeout(() => {
									y.push("/login");
							  }, 2e3))
							: (o.value = r.message);
					} catch (r) {
						(o.value = "Registration failed. Please try again."),
							console.error("Registration error:", r);
					} finally {
						d.value = !1;
					}
				};
			return (r, e) => (
				p(),
				f("div", _, [
					s("div", k, [
						s("div", null, [
							s("div", P, [
								t(u, { name: "user-plus", class: "h-6 w-6 text-purple-600" }),
							]),
							e[7] ||
								(e[7] = s(
									"h2",
									{
										class: "mt-6 text-center text-3xl font-extrabold text-gray-900",
									},
									" Create Account ",
									-1
								)),
							e[8] ||
								(e[8] = s(
									"p",
									{ class: "mt-2 text-center text-sm text-gray-600" },
									" Join Draped Dreams today ",
									-1
								)),
						]),
						s(
							"form",
							{ class: "mt-8 space-y-6", onSubmit: V(h, ["prevent"]) },
							[
								s("div", C, [
									s("div", q, [
										s("div", null, [
											e[9] ||
												(e[9] = s(
													"label",
													{
														for: "first-name",
														class: "block text-sm font-medium text-gray-700",
													},
													"First Name",
													-1
												)),
											t(
												n,
												{
													id: "first-name",
													name: "firstName",
													type: "text",
													required: "",
													class: "mt-1",
													placeholder: "First name",
													modelValue: a.value.firstName,
													"onUpdate:modelValue":
														e[0] ||
														(e[0] = (l) => (a.value.firstName = l)),
												},
												null,
												8,
												["modelValue"]
											),
										]),
										s("div", null, [
											e[10] ||
												(e[10] = s(
													"label",
													{
														for: "last-name",
														class: "block text-sm font-medium text-gray-700",
													},
													"Last Name",
													-1
												)),
											t(
												n,
												{
													id: "last-name",
													name: "lastName",
													type: "text",
													required: "",
													class: "mt-1",
													placeholder: "Last name",
													modelValue: a.value.lastName,
													"onUpdate:modelValue":
														e[1] ||
														(e[1] = (l) => (a.value.lastName = l)),
												},
												null,
												8,
												["modelValue"]
											),
										]),
									]),
									s("div", null, [
										e[11] ||
											(e[11] = s(
												"label",
												{
													for: "email",
													class: "block text-sm font-medium text-gray-700",
												},
												"Email Address",
												-1
											)),
										t(
											n,
											{
												id: "email",
												name: "email",
												type: "email",
												autocomplete: "email",
												required: "",
												class: "mt-1",
												placeholder: "Email address",
												modelValue: a.value.email,
												"onUpdate:modelValue":
													e[2] || (e[2] = (l) => (a.value.email = l)),
											},
											null,
											8,
											["modelValue"]
										),
									]),
									s("div", null, [
										e[12] ||
											(e[12] = s(
												"label",
												{
													for: "phone",
													class: "block text-sm font-medium text-gray-700",
												},
												"Phone Number",
												-1
											)),
										t(
											n,
											{
												id: "phone",
												name: "phone",
												type: "tel",
												required: "",
												class: "mt-1",
												placeholder: "Phone number",
												modelValue: a.value.phone,
												"onUpdate:modelValue":
													e[3] || (e[3] = (l) => (a.value.phone = l)),
											},
											null,
											8,
											["modelValue"]
										),
									]),
									s("div", null, [
										e[13] ||
											(e[13] = s(
												"label",
												{
													for: "password",
													class: "block text-sm font-medium text-gray-700",
												},
												"Password",
												-1
											)),
										t(
											n,
											{
												id: "password",
												name: "password",
												type: "password",
												autocomplete: "new-password",
												required: "",
												class: "mt-1",
												placeholder: "Password",
												modelValue: a.value.password,
												"onUpdate:modelValue":
													e[4] || (e[4] = (l) => (a.value.password = l)),
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
													for: "confirm-password",
													class: "block text-sm font-medium text-gray-700",
												},
												"Confirm Password",
												-1
											)),
										t(
											n,
											{
												id: "confirm-password",
												name: "confirmPassword",
												type: "password",
												required: "",
												class: "mt-1",
												placeholder: "Confirm password",
												modelValue: a.value.confirmPassword,
												"onUpdate:modelValue":
													e[5] ||
													(e[5] = (l) => (a.value.confirmPassword = l)),
											},
											null,
											8,
											["modelValue"]
										),
									]),
								]),
								o.value
									? (p(),
									  f("div", A, [
											s("div", U, [
												s("div", R, [
													t(u, {
														name: "alert-circle",
														class: "h-5 w-5 text-red-400",
													}),
												]),
												s("div", $, [s("h3", D, c(o.value), 1)]),
											]),
									  ]))
									: x("", !0),
								i.value
									? (p(),
									  f("div", j, [
											s("div", B, [
												s("div", E, [
													t(u, {
														name: "check-circle",
														class: "h-5 w-5 text-green-400",
													}),
												]),
												s("div", S, [s("h3", F, c(i.value), 1)]),
											]),
									  ]))
									: x("", !0),
								s("div", null, [
									t(
										w,
										{
											type: "submit",
											class: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
											loading: d.value,
										},
										{
											default: g(() => [
												s("span", L, [
													t(u, {
														name: "user-plus",
														class: "h-5 w-5 text-purple-500 group-hover:text-purple-400",
													}),
												]),
												v(
													" " +
														c(
															d.value
																? "Creating Account..."
																: "Create Account"
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
								s("div", T, [
									s("p", z, [
										e[16] || (e[16] = v(" Already have an account? ", -1)),
										t(
											w,
											{
												variant: "ghost",
												size: "sm",
												onClick:
													e[6] ||
													(e[6] = (l) => r.$router.push("/login")),
												class: "text-purple-600 hover:text-purple-500",
											},
											{
												default: g(() => [
													...(e[15] ||
														(e[15] = [v(" Sign in here ", -1)])),
												]),
												_: 1,
											}
										),
									]),
								]),
							],
							32
						),
					]),
				])
			);
		},
	};
export { H as default };
