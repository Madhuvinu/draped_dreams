# Draped Dreams Frontend

This is the Vue.js frontend for the Draped Dreams Sari Store Management System.

## Features

- **Dashboard**: Overview of key metrics and quick actions
- **Products**: Manage sari inventory and product catalog
- **Customers**: Customer management and profiles
- **Orders**: Order processing and tracking
- **Inventory**: Stock management and alerts

## Tech Stack

- Vue 3 with Composition API
- Vite for build tooling
- Tailwind CSS for styling
- Frappe UI components
- Pinia for state management
- Vue Router for navigation

## Development

### Prerequisites

- Node.js 16+ 
- Yarn package manager

### Setup

1. Install dependencies:
```bash
cd frontend
yarn install
```

2. Start development server:
```bash
yarn dev
```

3. Build for production:
```bash
yarn build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable Vue components
│   ├── pages/         # Page components
│   ├── stores/        # Pinia stores
│   ├── utils/         # Utility functions
│   ├── App.vue        # Root component
│   ├── main.js        # Application entry point
│   └── router.js      # Vue Router configuration
├── public/            # Static assets
├── index.html         # HTML template
├── package.json       # Dependencies
├── vite.config.js     # Vite configuration
└── tailwind.config.js # Tailwind CSS configuration
```

## Integration with Frappe

The frontend integrates with the Frappe backend through:

- Frappe UI components for consistent styling
- Frappe Request for API calls
- Socket.IO for real-time updates
- Session management through Frappe authentication

## Build Process

The build process outputs files to `../draped_dreams/public/frontend/` and copies the HTML entry point to `../draped_dreams/www/draped_dreams.html` for Frappe to serve.
