/**
 * App.jsx
 * -------
 * Root application component.
 * Renders the Header and the Home page.
 */

import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Sticky navigation bar */}
      <Header />

      {/* Page content */}
      <Home />
    </div>
  );
}

export default App;
