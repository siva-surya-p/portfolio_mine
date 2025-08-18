import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaCode, FaHome, FaChevronRight } from 'react-icons/fa';
import { ThemeContext } from '../App';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    if (isDropdownOpen) setIsDropdownOpen(false); // Close dropdown if menu is toggled
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
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
            <div className="d-flex align-items-center me-auto">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <button 
                    className="nav-link"
                    type="button"
                    id="portfolioDropdown"
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                    onClick={toggleDropdown}
                  >
                    <FaBars size={20} />
                  </button>
                  <ul className={`dropdown-menu${isDropdownOpen ? ' show' : ''}`} aria-labelledby="portfolioDropdown">
                    <li><Link className="dropdown-item" to="/" onClick={closeAllMenus}><i className="fas fa-home me-2"></i>Home</Link></li>
                    <li><Link className="dropdown-item" to="/skills" onClick={closeAllMenus}><i className="fas fa-code me-2"></i>Skills & Learning</Link></li>
                    <li><Link className="dropdown-item" to="/projects" onClick={closeAllMenus}><i className="fas fa-project-diagram me-2"></i>Projects</Link></li>
                    <li><Link className="dropdown-item" to="/experience" onClick={closeAllMenus}><i className="fas fa-briefcase me-2"></i>Experience</Link></li>
                    <li><Link className="dropdown-item" to="/coding-profile" onClick={closeAllMenus}><i className="fas fa-laptop-code me-2"></i>Coding Profile</Link></li>
                    <li><Link className="dropdown-item" to="/github" onClick={closeAllMenus}><i className="fab fa-github me-2"></i>GitHub Profile</Link></li>
                  </ul>
                </li>
              </ul>
              <span className="navbar-brand fw-bold ms-2">Siva Surya P</span>
            </div>
            
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