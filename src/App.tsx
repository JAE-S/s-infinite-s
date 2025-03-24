/**
 * App Component
 *
 * Root component that serves as the entry point for the application.
 * Currently renders the home view directly.
 *
 * Future Enhancements:
 * - Add React Router for navigation between multiple views
 * - Implement protected routes with authentication guards
 * - Set up global theme provider (e.g., using ThemeProvider from styled-components)
 * - Add global error boundary to catch and display unhandled errors
 * - Add global state providers (e.g., user context, authentication)
 * - Set up analytics tracking
 */

// Layout Imports
import MainLayout from './layouts/main_layout';
// Views Imports
import HomeDashboardView from './views/home/home-dashboard_view';
// Styling Imports
import './App.css';

function App() {
  return (
    <MainLayout>
      <HomeDashboardView />
    </MainLayout>
  );
}

export default App;
