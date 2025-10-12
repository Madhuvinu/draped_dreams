import { a as r, b as l, c as d, d as t, e as o, w as i, g as m } from "./index-cc0b157d.js";
const c = {
		class: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",
	},
	u = { class: "max-w-md w-full space-y-8 text-center" },
	x = { class: "mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100" },
	p = { class: "mt-8" },
	h = {
		__name: "InvalidPage",
		setup(f) {
			return (n, e) => {
				const s = r("FeatherIcon"),
					a = r("Button");
				return (
					l(),
					d("div", c, [
						t("div", u, [
							t("div", null, [
								t("div", x, [
									o(s, {
										name: "alert-triangle",
										class: "h-6 w-6 text-red-600",
									}),
								]),
								e[1] ||
									(e[1] = t(
										"h2",
										{
											class: "mt-6 text-center text-3xl font-extrabold text-gray-900",
										},
										" Page Not Found ",
										-1
									)),
								e[2] ||
									(e[2] = t(
										"p",
										{ class: "mt-2 text-center text-sm text-gray-600" },
										" The page you're looking for doesn't exist. ",
										-1
									)),
							]),
							t("div", p, [
								o(
									a,
									{
										onClick:
											e[0] || (e[0] = (g) => n.$router.push("/dashboard")),
										class: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
									},
									{
										default: i(() => [
											o(s, { name: "home", class: "h-5 w-5 mr-2" }),
											e[3] || (e[3] = m(" Go to Dashboard ", -1)),
										]),
										_: 1,
									}
								),
							]),
						]),
					])
				);
			};
		},
	};
export { h as default };
