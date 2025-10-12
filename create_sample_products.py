# Create sample products
sample_products = [
    {
        "product_name": "Elegant Silk Banarasi Saree",
        "description": "Beautiful silk saree with intricate Banarasi work and golden zari borders",
        "category": "Silk",
        "price": 25000,
        "original_price": 30000,
        "stock_quantity": 8,
        "rating": 4.8,
        "featured": 1
    },
    {
        "product_name": "Comfortable Cotton Handloom Saree",
        "description": "Light and breathable cotton saree perfect for daily wear",
        "category": "Cotton",
        "price": 3500,
        "stock_quantity": 25,
        "rating": 4.5
    },
    {
        "product_name": "Modern Designer Party Saree",
        "description": "Contemporary designer saree with unique patterns",
        "category": "Designer",
        "price": 18000,
        "original_price": 22000,
        "stock_quantity": 4,
        "rating": 4.9,
        "featured": 1
    },
    {
        "product_name": "Wedding Silk Saree",
        "description": "Heavy silk saree with extensive embroidery perfect for weddings",
        "category": "Wedding",
        "price": 45000,
        "stock_quantity": 3,
        "rating": 4.7
    },
    {
        "product_name": "Casual Cotton Saree",
        "description": "Light and comfortable cotton saree for casual occasions",
        "category": "Casual",
        "price": 2500,
        "stock_quantity": 60,
        "rating": 4.3
    },
    {
        "product_name": "Printed Silk Saree",
        "description": "Beautiful printed silk saree with floral patterns",
        "category": "Silk",
        "price": 12000,
        "stock_quantity": 0,
        "rating": 4.6
    }
]

for product_data in sample_products:
    try:
        frappe.get_doc({
            "doctype": "Product",
            **product_data
        }).insert(ignore_permissions=True)
        print(f"✓ Created product: {product_data['product_name']}")
    except Exception as e:
        print(f"✗ Error creating product {product_data['product_name']}: {e}")

print("🎉 Sample products created successfully!")
