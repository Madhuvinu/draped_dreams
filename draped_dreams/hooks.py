# Copyright (c) 2024, Draped Dreams and contributors
# For license information, please see license.txt

from . import __version__ as app_version

app_name = "draped_dreams"
app_title = "Draped Dreams"
app_publisher = "Draped Dreams"
app_description = "E-commerce platform for sarees and traditional wear"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "admin@drapeddreams.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/draped_dreams/css/draped_dreams.css"
# app_include_js = "/assets/draped_dreams/js/draped_dreams.js"

# include js, css files in header of web template
# web_include_css = "/assets/draped_dreams/css/draped_dreams.css"
# web_include_js = "/assets/draped_dreams/js/draped_dreams.js"

# Static files
# ------------
# Serve static files from the app's public directory
website_route_rules = [
	{"from_route": "/assets/draped_dreams/<path:file_path>", "to_route": "draped_dreams.public.<file_path>"}
]

# Static files configuration
app_include_css = "/assets/draped_dreams/frontend/assets/index-052b211c.css"
app_include_js = "/assets/draped_dreams/frontend/assets/index-c95f719d.js"

# Website pages
# ------------
website_route_rules.extend([
	{"from_route": "/dashboard", "to_route": "dashboard"},
	{"from_route": "/admin", "to_route": "dashboard"},
	{"from_route": "/store", "to_route": "draped_dreams"},
])

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "draped_dreams/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# "Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "draped_dreams.install.before_install"
after_install = "draped_dreams.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "draped_dreams.uninstall.before_uninstall"
# after_uninstall = "draped_dreams.uninstall.after_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "draped_dreams.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in script files and in Python standard way

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes (or any other class)

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# }
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"draped_dreams.tasks.all"
# 	],
# 	"daily": [
# 		"draped_dreams.tasks.daily"
# 	],
# 	"hourly": [
# 		"draped_dreams.tasks.hourly"
# 	],
# 	"weekly": [
# 		"draped_dreams.tasks.weekly"
# 	]
# 	"monthly": [
# 		"draped_dreams.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "draped_dreams.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "draped_dreams.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in the Frappe Query Builder. See
# the override_whitelisted_methods and override_doctype_class variables
# above for the usage of the `data` variable.

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]


# User Data Protection
# --------------------

user_data_fields = [
	{
		"doctype": "{doctype_1}",
		"filter_by": "{filter_by}",
		"redact_fields": ["{field_1}", "{field_2}"],
		"partial": 1,
	},
	{
		"doctype": "{doctype_2}",
		"filter_by": "{filter_by}",
		"partial": 1,
	},
	{
		"doctype": "{doctype_3}",
		"strict": False,
	},
	{"doctype": "{doctype_4}"},
]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"draped_dreams.auth.validate"
# ]

# CORS Configuration
# ------------------
# CORS is configured at the site level using bench commands or site_config.json
# This is cleaner and more maintainable than adding headers to each API function
#
# To configure CORS, run these commands in your Frappe bench directory:
# bench --site dreams.localhost set-config cors_allow_origins "*"
# bench --site dreams.localhost set-config cors_allow_methods "GET,POST,PUT,DELETE,OPTIONS"
# bench --site dreams.localhost set-config cors_allow_headers "Content-Type,Authorization,X-Requested-With,Accept,Origin"
# bench --site dreams.localhost set-config cors_allow_credentials true
# bench --site dreams.localhost set-config cors_max_age 86400
#
# For production, replace "*" with specific domains for security

# Translation
# --------------------------------

# Make link fields search translated document names for these DocTypes
# Recommended only for DocTypes which have limited documents with untranslated names
# For example: Role, Gender, etc.
# translated_search_doctypes = []
