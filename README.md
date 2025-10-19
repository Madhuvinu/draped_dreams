# Draped Dreams

E-commerce application for saree store built with Frappe Framework.

## Features

- Product catalog management
- User registration and authentication
- Shopping cart functionality
- Order management
- Inventory tracking
- Admin dashboard

## Installation

1. Install the app in your Frappe bench:
```bash
bench get-app draped_dreams
bench install-app draped_dreams
```

2. Run migrations:
```bash
bench migrate
```

3. Start the development server:
```bash
bench start
```

## Usage

Access the application at `http://your-site:8000/draped_dreams`

- Admin dashboard: `http://your-site:8000/draped_dreams#/admin/dashboard`
- User products: `http://your-site:8000/draped_dreams#/products`
- Cart: `http://your-site:8000/draped_dreams#/cart`
- Orders: `http://your-site:8000/draped_dreams#/orders`

## Development

The frontend is built with Vue.js and Vite. To develop:

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
yarn install
```

3. Start development server:
```bash
yarn dev
```

4. Build for production:
```bash
yarn build
```

## License

MIT
