# Draped Dreams - E-commerce Platform

A modern e-commerce platform for sarees and traditional wear, built with Vue.js frontend and Frappe backend.

## Features

- **User Registration & Authentication**: Secure user registration and login system
- **Product Catalog**: Dynamic product listing with images, categories, and filters
- **Inventory Management**: Backend inventory management with stock tracking
- **Responsive Design**: Modern, mobile-friendly UI with Tailwind CSS
- **Real-time Updates**: Live product data from Frappe backend

## Tech Stack

### Frontend
- Vue.js 3 with Composition API
- Tailwind CSS for styling
- Vite for build tooling
- Vue Router for navigation

### Backend
- Frappe Framework
- Python
- MySQL/PostgreSQL database
- RESTful API endpoints

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- Frappe Bench installed
- MySQL/PostgreSQL database

### Backend Setup

1. **Install the app in your Frappe site:**
   ```bash
   cd /path/to/your/frappe/site
   bench get-app draped_dreams https://github.com/your-repo/draped_dreams
   bench install-app draped_dreams
   ```

2. **Run the setup script to install doctypes:**
   ```bash
   cd /path/to/draped_dreams
   python setup.py
   ```

3. **Start the Frappe server:**
   ```bash
   bench start
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   # or
   yarn build
   ```

## API Endpoints

The backend provides the following API endpoints:

- `POST /api/method/draped_dreams.api.auth.register_user` - User registration
- `POST /api/method/draped_dreams.api.auth.login_user` - User login
- `GET /api/method/draped_dreams.api.auth.get_products` - Get products with filters
- `POST /api/method/draped_dreams.api.auth.get_product_details` - Get product details
- `GET /api/method/draped_dreams.api.auth.get_categories` - Get product categories

## Doctypes

### Register
- Stores user registration information
- Fields: first_name, last_name, email, phone, password, status, registration_date

### Product
- Manages product inventory
- Fields: product_name, product_code, category, description, price, stock_quantity, product_image, rating, featured

### Product Image Gallery
- Child doctype for product images
- Fields: image_name, image_file, is_primary

## Development

### Adding New Features

1. **Backend**: Add new doctypes or API endpoints in the `draped_dreams/api/` directory
2. **Frontend**: Add new pages in `frontend/src/pages/` and update routes in `router.js`

### Database Migrations

When adding new fields to doctypes:
```bash
bench migrate
```

### Customization

- **Styling**: Modify Tailwind classes in Vue components
- **API**: Update API calls in `frontend/src/utils/api.js`
- **Doctypes**: Modify doctype definitions in the respective JSON files

## Deployment

### Production Build

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Frappe:**
   ```bash
   bench build --app draped_dreams
   bench restart
   ```

### Environment Variables

Set the following environment variables for production:
- `FRAPPE_SITE_URL`: Your Frappe site URL
- `API_BASE_URL`: Backend API base URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Email: admin@drapeddreams.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/draped_dreams/issues)

## Roadmap

- [ ] Payment integration
- [ ] Order management system
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Mobile app