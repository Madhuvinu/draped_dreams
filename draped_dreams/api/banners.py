import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)
def get_banners():
	"""Get all active banners"""
	try:
		banners = frappe.get_all(
			"Banner",
			filters={"is_active": 1},
			fields=["name", "title", "image", "display_order"],
			order_by="display_order asc"
		)
		
		return {
			"success": True,
			"data": banners
		}
	except Exception as e:
		frappe.log_error(f"Error getting banners: {str(e)}")
		return {
			"success": False,
			"message": "Failed to fetch banners"
		}

@frappe.whitelist(allow_guest=True)
def get_banner(banner_id):
	"""Get a specific banner by ID"""
	try:
		banner = frappe.get_doc("Banner", banner_id)
		
		if not banner.is_active:
			return {
				"success": False,
				"message": "Banner is not active"
			}
		
		return {
			"success": True,
			"data": {
				"id": banner.name,
				"title": banner.title,
				"image": banner.image,
				"display_order": banner.display_order
			}
		}
	except frappe.DoesNotExistError:
		return {
			"success": False,
			"message": "Banner not found"
		}
	except Exception as e:
		frappe.log_error(f"Error getting banner: {str(e)}")
		return {
			"success": False,
			"message": "Failed to fetch banner"
		}
