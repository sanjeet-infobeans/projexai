# Common Components

This directory contains reusable React components that were converted from the PHP common components in `/var/www/html/projexai/agentic/common`.

## Components

### Header Components

#### `Header.js`
- **Purpose**: Main header for authenticated users
- **Features**: 
  - Navigation links (Dashboard, Projects, Clients, Team)
  - User profile display
  - Logout functionality
  - Active link highlighting
- **Usage**: Automatically used by `Layout` component for authenticated users

#### `GuestHeader.js`
- **Purpose**: Header for non-authenticated users (guests)
- **Features**:
  - Public navigation links (Home, About, Resources, Teams)
  - Login button
  - Different styling for guest users
- **Usage**: Automatically used by `Layout` component for non-authenticated users

### Footer Components

#### `Footer.js`
- **Purpose**: Main footer for authenticated users
- **Features**:
  - Navigation links
  - Copyright information
  - Clean, minimal design

#### `GuestFooter.js`
- **Purpose**: Footer for non-authenticated users
- **Features**:
  - Navigation links
  - Login button in footer
  - Copyright information

### Layout Component

#### `Layout.js`
- **Purpose**: Main layout wrapper that combines header, content, and footer
- **Features**:
  - Automatically shows appropriate header based on authentication status
  - Responsive design
  - Proper page structure
- **Props**:
  - `children`: Content to render in the main area
  - `showFooter`: Boolean to control footer visibility (default: true)

## Usage Examples

### Basic Layout Usage
```jsx
import { Layout } from '../components/common';

function MyPage() {
  return (
    <Layout>
      <div>Your page content here</div>
    </Layout>
  );
}
```

### Layout without Footer
```jsx
import { Layout } from '../components/common';

function LoginPage() {
  return (
    <Layout showFooter={false}>
      <div>Login form content</div>
    </Layout>
  );
}
```

### Individual Component Usage
```jsx
import { Header, Footer } from '../components/common';

function CustomPage() {
  return (
    <div>
      <Header />
      <main>Your content</main>
      <Footer />
    </div>
  );
}
```

## Styling

All components use Tailwind CSS classes and maintain the same visual design as the original PHP components:

- **Colors**: Consistent with the original design system
- **Typography**: Inter and Noto Sans fonts
- **Spacing**: Tailwind utility classes
- **Responsive**: Mobile-first responsive design

## Authentication Integration

The components automatically adapt based on the authentication state using the `useAuth` hook:

- **Authenticated users**: See `Header` and `Footer`
- **Guest users**: See `GuestHeader` and `GuestFooter`

## File Structure

```
src/components/common/
├── Header.js          # Authenticated user header
├── GuestHeader.js     # Guest user header
├── Footer.js          # Authenticated user footer
├── GuestFooter.js     # Guest user footer
├── Layout.js          # Main layout wrapper
├── index.js           # Export file
└── README.md          # This documentation
```

## Migration from PHP

These React components are direct equivalents of the PHP components:

- `header.php` → `Header.js`
- `guestheader.php` → `GuestHeader.js`
- `footer.php` → `Footer.js`
- `guestfooter.php` → `GuestFooter.js`

The main differences are:
- React Router navigation instead of PHP links
- React state management instead of PHP sessions
- Component-based architecture
- TypeScript-ready structure 