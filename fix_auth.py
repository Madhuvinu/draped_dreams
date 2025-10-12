import hashlib
import frappe
from frappe import _
from frappe.utils import today

@frappe.whitelist(allow_guest=True)
def register_user(first_name, last_name, email, phone, password, confirm_password):
    try:
        if not all([first_name, last_name, email, phone, password, confirm_password]):
            return {"success": False, "message": "All fields are required"}
        
        if not email or "@" not in email or "." not in email:
            return {"success": False, "message": "Invalid email format"}
        
        if len(password) < 8:
            return {"success": False, "message": "Password must be at least 8 characters"}
        
        if password != confirm_password:
            return {"success": False, "message": "Passwords do not match"}
        
        if frappe.db.exists("Register", {"email": email}):
            return {"success": False, "message": "Email already registered"}
        
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        try:
            frappe.db.sql("""
                INSERT INTO `tabRegister` 
                (name, first_name, last_name, email, phone, password, confirm_password, status, registration_date, creation, modified, owner, modified_by)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 'Administrator', 'Administrator')
            """, (email, first_name, last_name, email, phone, hashed_password, hashed_password, "Active", today()))
        except Exception as e:
            if "Unknown column 'password'" in str(e):
                frappe.db.sql("""
                    INSERT INTO `tabRegister` 
                    (name, first_name, last_name, email, phone, user_password, confirm_password, status, registration_date, creation, modified, owner, modified_by)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 'Administrator', 'Administrator')
                """, (email, first_name, last_name, email, phone, hashed_password, hashed_password, "Active", today()))
            else:
                raise e
        
        frappe.db.commit()
        
        return {
            "success": True,
            "message": "Registration successful! Please login.",
            "data": {"name": email, "email": email},
        }
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Registration Error")
        return {"success": False, "message": str(e)}

@frappe.whitelist(allow_guest=True)
def login_user(email, password):
    try:
        if not email or not password:
            return {"success": False, "message": "Email and password are required"}
        
        if not email or "@" not in email or "." not in email:
            return {"success": False, "message": "Invalid email format"}
        
        if len(password) < 8:
            return {"success": False, "message": "Password must be at least 8 characters"}
        
        try:
            user = frappe.db.get_value(
                "Register", {"email": email}, ["name", "password", "status"], as_dict=True
            )
            password_field = "password"
        except Exception as e:
            if "Unknown column 'password'" in str(e):
                user = frappe.db.get_value(
                    "Register", {"email": email}, ["name", "user_password", "status"], as_dict=True
                )
                password_field = "user_password"
            else:
                raise e
        
        if not user:
            return {"success": False, "message": "Invalid email or password"}
        
        if user.status != "Active":
            return {"success": False, "message": "Account is not active"}
        
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        stored_password = user[password_field]
        
        if hashed_password != stored_password:
            return {"success": False, "message": "Invalid email or password"}
        
        user_details = frappe.db.get_value(
            "Register", {"email": email}, ["first_name", "last_name", "email", "phone"], as_dict=True
        )
        
        return {
            "success": True,
            "message": "Login successful",
            "data": {
                "user": email,
                "name": user.name,
                "first_name": user_details.first_name,
                "last_name": user_details.last_name,
                "email": user_details.email,
                "phone": user_details.phone,
            },
        }
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Login Error")
        return {"success": False, "message": str(e)}
