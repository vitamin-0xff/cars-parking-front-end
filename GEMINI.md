This project is a comprehensive **Parking Management System**.

From the code, it appears to be a web application with a dashboard for managing and monitoring parking facilities. The system seems to handle:

*   **Geographic data:** Managing countries, cities, and specific places where parking lots are located.
*   **Parking infrastructure:** Defining parking lots, individual spots (including type like EV or handicap), and entry/exit gates.
*   **Real-time occupancy:** Tracking which parking spots are occupied and the overall capacity of a parking facility.
*   **Client and payment:** Managing clients, their access cards, and credit balances for payment.
*   **Event tracking:** Logging events like vehicles entering or exiting a parking area.

In essence, it's a full-stack application for overseeing a network of parking lots.

***

## Building and Running

### Prerequisites

*   Node.js (version 22.x or higher)
*   npm (or pnpm/yarn)

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

This will start the development server, typically on [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
```

This will create a production-ready build in the `.next` directory.

### Starting the Production Server

```bash
npm run start
```

This will start the production server.

***

## Development Conventions

### Linting

The project uses ESLint for code linting. You can run the linter with:

```bash
npm run lint
```

### Testing

There are no testing frameworks configured in this project. 

***

## Components

The `components` directory contains higher-level, application-specific components, while the `components/ui` directory houses a set of reusable, foundational UI components.

**`components/`:**
This directory includes components that provide specific functionality or context to the application:

*   `local-provider.tsx`: Likely for managing locale and internationalization.
*   `page-header.tsx`: A common header component for pages.
*   `theme-provider.tsx`: Handles theme management (e.g., light/dark mode).
*   `countries/`: Components specific to the countries section.
*   `dashboard/`: Components for various dashboard elements (e.g., activity feed, charts, data tables, navigation).
*   `parking/`: Components related to parking functionalities (e.g., `parking-table.tsx`).

**`components/ui/`:**
This directory is a collection of generic, reusable UI components, suggesting the use of a component library or design system:

*   **Core UI Elements:** `alert-dialog.tsx`, `avatar.tsx`, `badge.tsx`, `button.tsx`, `card.tsx`, `chart.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, `input.tsx`, `main-container.tsx`, `pagination.tsx`, `scroll-area.tsx`, `search-dialog.tsx`, `separator.tsx`, `sheet.tsx`, `sidebar.tsx`, `skeleton.tsx`, `table.tsx`, `tabs.tsx`, `tooltip.tsx`.
*   `defined-components/`: Contains more specialized or composite components built from the basic UI elements (e.g., `language-switcher.tsx`, `table-wrapper.tsx`).
*   `use-example/`: This sub-directory likely holds examples or documentation for how to use the UI components, mostly in Markdown format.
