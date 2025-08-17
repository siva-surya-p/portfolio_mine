import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCode, FaHome, FaChevronRight } from 'react-icons/fa';
import { ThemeContext } from '../App';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper function to get page titles for breadcrumbs
  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/skills':
        return 'Skills & Learning';
      case '/projects':
        return 'Projects';
      case '/experience':
        return 'Experience';
      case '/coding-profile':
        return 'Coding Profile';
      default:
        return 'Page';
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme} shadow-sm`}>
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">Siva Surya P</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleMenu}
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div 
            className={`collapse navbar-collapse${isMenuOpen ? ' show' : ''}`} 
            id="navbarNav"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link 
                  className={`nav-link${location.pathname === '/' ? ' active' : ''}`} 
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link${location.pathname === '/skills' ? ' active' : ''}`} 
                  to="/skills"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Skills & Learning
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link${location.pathname === '/projects' ? ' active' : ''}`} 
                  to="/projects"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link${location.pathname === '/experience' ? ' active' : ''}`} 
                  to="/experience"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Experience
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link${location.pathname === '/coding-profile' ? ' active' : ''}`} 
                  to="/coding-profile"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Coding Profile
                </Link>
              </li>
              {/* Contact Me tab is hidden as requested */}
              {/* <li className="nav-item">
                <Link className={`nav-link${location.pathname === '/contact' ? ' active' : ''}`} to="/contact">Contact Me</Link>
              </li> */}
            </ul>
            <button 
              className="btn btn-outline-primary ms-2" 
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