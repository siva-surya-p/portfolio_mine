import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { ThemeContext } from '../App';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper function to get page titles for breadcrumbs and document title
  const getPageTitle = (pathname) => {
    // Remove any query parameters or hashes
    const cleanPath = pathname.split('?')[0].split('#')[0];
    
    switch (cleanPath) {
      case '/':
      case '/home':
        return 'Home';
      case '/skills':
      case '/skills/':
        return 'Skills & Learning';
      case '/projects':
      case '/projects/':
        return 'Projects';
      case '/experience':
      case '/experience/':
        return 'Experience';
      case '/coding-profile':
      case '/coding-profile/':
        return 'Coding Profile';
      case '/github':
      case '/github/':
        return 'GitHub Profile';
      case '/contact':
      case '/contact/':
        return 'Contact';
      default:
        // Handle dynamic routes or return a default
        if (cleanPath.startsWith('/')) {
          // Capitalize first letter and replace hyphens with spaces
          return cleanPath.split('/')[1]
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
        return 'Portfolio';
    }
  };

  // Update document title and close mobile menu when route changes
  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname);
    if (pageTitle !== 'Page') {
      document.title = `${pageTitle} | Siva Surya P`;
    } else {
      document.title = 'Siva Surya P | Portfolio';
    }
    closeAllMenus();
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme} shadow-sm`}>
        <div className="container-fluid">
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse${isMenuOpen ? ' show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={closeAllMenus}><i className="fas fa-home me-1"></i>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/skills" onClick={closeAllMenus}><i className="fas fa-code me-1"></i>Skills</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/projects" onClick={closeAllMenus}><i className="fas fa-project-diagram me-1"></i>Projects</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/experience" onClick={closeAllMenus}><i className="fas fa-briefcase me-1"></i>Experience</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/coding-profile" onClick={closeAllMenus}><i className="fas fa-laptop-code me-1"></i>Coding</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/github" onClick={closeAllMenus}><i className="fab fa-github me-1"></i>GitHub</Link>
              </li>
            </ul>
            
            <button 
              className="btn btn-outline-primary" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Breadcrumb Navigation */}
      {location.pathname !== '/' && (
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <div className="container-fluid">
            <ol className="breadcrumb mb-0 py-2">
              <li className="breadcrumb-item">
                <Link to="/" className="breadcrumb-link">
                  <FaHome className="me-1" />
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {getPageTitle(location.pathname)}
              </li>
            </ol>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar 