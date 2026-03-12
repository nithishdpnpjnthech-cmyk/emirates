import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import GoldRateModal from './GoldRateModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGoldRateOpen, setIsGoldRateOpen] = useState(false);

  return (
    <header className="header">
      <div className="top-bar">
        <div className="container top-bar-container">
          <div className="top-bar-text">
            Exquisite Jewelry Designed for Perfection
          </div>
          <button
            className="gold-rate-trigger"
            onClick={() => setIsGoldRateOpen(true)}
          >
            <TrendingUp size={16} className="gr-icon" />
            <span className="gr-text">TODAY'S GOLD RATE</span>
          </button>
          <div className="top-links">
            <Link to="/contact">Support</Link>
          </div>
        </div>
      </div>

      <nav className="main-nav">
        <div className="container nav-container">
          <div className="mobile-nav-left">
            <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </div>
          </div>

          <div className="logo">
            <Link to="/">
              <img src="/assets/emirates_logo.png" alt="Emirates Gold" />
            </Link>
          </div>

          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <div className="nav-item has-dropdown">
              <Link to="/gold">Gold <span className="dropdown-arrow">▼</span></Link>
              <div className="mega-menu">
                <div className="mega-menu-content">
                  <div className="mega-menu-grid">
                    <Link to="/gold/rings" className="mega-menu-item">
                      <img src="/assets/gold_menu/Rings-Menu.png" alt="Rings" />
                      <span>Rings</span>
                    </Link>
                    <Link to="/gold/earrings" className="mega-menu-item">
                      <img src="/assets/gold_menu/Earrings-Menu.png" alt="Earrings" />
                      <span>Earrings</span>
                    </Link>
                    <Link to="/gold/pendants" className="mega-menu-item">
                      <img src="/assets/gold_menu/Pendants-menu-1.png" alt="Pendants" />
                      <span>Pendants</span>
                    </Link>
                    <Link to="/gold/necklaces" className="mega-menu-item">
                      <img src="/assets/gold_menu/Necklaces-Menu.png" alt="Necklaces" />
                      <span>Necklaces</span>
                    </Link>
                    <Link to="/gold/haarams" className="mega-menu-item">
                      <img src="/assets/gold_menu/Haarams.png" alt="Haarams" />
                      <span>Haarams</span>
                    </Link>
                    <Link to="/gold/kadaas" className="mega-menu-item">
                      <img src="/assets/gold_menu/Kadaas-menu.png" alt="Kadaas" />
                      <span>Kadaas</span>
                    </Link>
                    <Link to="/gold/mangalsutra" className="mega-menu-item">
                      <img src="/assets/gold_menu/Mangalsutra-menu.png" alt="Mangalsutra" />
                      <span>Mangalsutra</span>
                    </Link>
                    <Link to="/gold/bangles" className="mega-menu-item">
                      <img src="/assets/gold_menu/Bangles-Menu-1.png" alt="Bangles" />
                      <span>Bangles</span>
                    </Link>
                    <Link to="/gold/chain" className="mega-menu-item">
                      <img src="/assets/gold_menu/chain.png" alt="Chain" />
                      <span>Chain</span>
                    </Link>
                    <Link to="/gold/bracelets" className="mega-menu-item" style={{ borderBottom: 'none' }}>
                      <img src="/assets/gold_menu/Bracelets.png" alt="Bracelets" />
                      <span>Bracelets</span>
                    </Link>
                    {/* Empty blocks for border alignment */}
                    <div className="mega-menu-item empty-item" style={{ borderBottom: 'none' }}></div>
                    <div className="mega-menu-item empty-item" style={{ borderBottom: 'none', borderRight: 'none' }}></div>
                  </div>
                  <div className="mega-menu-featured">
                    <img src="/assets/gold_menu/Gold-Mega-Menu.png" alt="Featured Gold Collection" />
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-item has-dropdown">
              <Link to="/diamond">Diamond <span className="dropdown-arrow">▼</span></Link>
              <div className="mega-menu">
                <div className="mega-menu-content">
                  <div className="mega-menu-grid">
                    <Link to="/diamond/rings" className="mega-menu-item">
                      <img src="/assets/diamond_menu/Rings-diamond.png" alt="Rings" />
                      <span>Rings</span>
                    </Link>
                    <Link to="/diamond/earrings" className="mega-menu-item">
                      <img src="/assets/diamond_menu/Earrings-diamond.png" alt="Earrings" />
                      <span>Earrings</span>
                    </Link>
                    <Link to="/diamond/pendants" className="mega-menu-item">
                      <img src="/assets/diamond_menu/Pendants-diamond.png" alt="Pendants" />
                      <span>Pendants</span>
                    </Link>
                    <Link to="/diamond/necklaces" className="mega-menu-item" style={{ borderBottom: 'none' }}>
                      <img src="/assets/diamond_menu/Necklaces-diamond.png" alt="Necklaces" />
                      <span>Necklaces</span>
                    </Link>
                    <Link to="/diamond/bangles" className="mega-menu-item" style={{ borderBottom: 'none' }}>
                      <img src="/assets/diamond_menu/Bangles-Diamond.png" alt="Bangles" />
                      <span>Bangles</span>
                    </Link>
                    <Link to="/diamond/bracelets" className="mega-menu-item" style={{ borderBottom: 'none' }}>
                      <img src="/assets/diamond_menu/brace.png" alt="Bracelets" />
                      <span>Bracelets</span>
                    </Link>
                  </div>
                  <div className="mega-menu-featured">
                    <img src="/assets/diamond_menu/Diamond-Mega-Menu.png" alt="Featured Diamond Collection" />
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-item has-dropdown">
              <Link to="/collections">Collections <span className="dropdown-arrow">▼</span></Link>
              <div className="mega-menu">
                <div className="mega-menu-content">
                  <div className="mega-menu-grid collections-grid">
                    <Link to="/collections/mahathi" className="collection-mega-menu-item">
                      <img src="/assets/collection_menu/mahathi.png" alt="Mahathi Antique Collection" />
                    </Link>
                    <Link to="/collections/amuliya" className="collection-mega-menu-item">
                      <img src="/assets/collection_menu/amuliya-Menu2.png" alt="Amuliya Diamonds & Gold" />
                    </Link>
                    <Link to="/collections/bridal" className="collection-mega-menu-item">
                      <img src="/assets/collection_menu/indian-bridal.png" alt="Indian Bridal" />
                    </Link>
                    <Link to="/collections/ethnic" className="collection-mega-menu-item">
                      <img src="/assets/collection_menu/indian-Ethnic.png" alt="Indian Ethnic" />
                    </Link>
                    <Link to="/collections/ruby-emerald" className="collection-mega-menu-item">
                      <img src="/assets/collection_menu/ruby-and-Emerald-1.png" alt="Ruby and Emerald" />
                    </Link>
                    <Link to="/collections/apsara" className="collection-mega-menu-item">
                      <img src="/assets/collection_menu/apsara.png" alt="Apsara Rose Gold" />
                    </Link>
                  </div>
                  <div className="mega-menu-featured">
                    <img src="/assets/collection_menu/collections-Mega-Menu.png" alt="Featured Collections" />
                  </div>
                </div>
              </div>
            </div>

            <div className="nav-item has-simple-dropdown">
              <span className="nav-link-style" style={{ cursor: 'pointer' }}>More <span className="dropdown-arrow">▼</span></span>
              <div className="simple-dropdown">
                <Link to="/collections/bridal" className="dropdown-item">Bridal Collection</Link>
                <Link to="/blog" className="dropdown-item">Blog</Link>
                <Link to="/careers" className="dropdown-item">Careers</Link>
                <Link to="/contact" className="dropdown-item">Contact Us</Link>
              </div>
            </div>
          </div>

          <button
            className="gold-rate-trigger mobile-gold-rate"
            onClick={() => setIsGoldRateOpen(true)}
          >
            <TrendingUp size={12} className="gr-icon" />
            <span className="gr-text">TODAY'S<br />GOLD RATE</span>
          </button>

          <div className="nav-actions">
            {/* Nav actions removed as per user request */}
          </div>
        </div>
      </nav>

      <GoldRateModal
        isOpen={isGoldRateOpen}
        onClose={() => setIsGoldRateOpen(false)}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        .header {
          width: 100%;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .top-bar {
          background-color: var(--color-primary);
          color: var(--color-white);
          padding: 0.5rem 0;
          font-size: 0.8rem;
          text-align: center;
        }
        .top-bar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .top-bar-text {
          font-size: 0.8rem;
          color: var(--color-white);
        }
        .top-links {
          display: flex;
          gap: 1.5rem;
        }
        .top-links a {
          color: var(--color-white);
          text-decoration: none;
          opacity: 0.8;
          font-size: 0.8rem;
          transition: opacity 0.2s;
        }
        .top-links a:hover {
          opacity: 1;
        }
        .main-nav {
          background-color: var(--color-white);
          padding: 1rem 0;
        }
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo img {
          height: 60px;
          width: auto;
          object-fit: contain;
        }
        .nav-links {
          display: flex;
          gap: 2.5rem;
        }
        .nav-links a, .nav-link-style {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--color-primary);
          position: relative;
          text-decoration: none;
        }
        .nav-links a::after, .nav-link-style::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--color-accent);
          transition: var(--transition-smooth, all 0.3s ease);
        }
        .nav-links a:hover::after, .nav-link-style:hover::after {
          width: 100%;
        }
        
        /* Mega Menu Styles */
        .nav-item.has-dropdown {
          position: static;
        }
        .main-nav {
          position: relative;
        }
        .dropdown-arrow {
          font-size: 0.6rem;
          margin-left: 2px;
          vertical-align: middle;
        }
        .mega-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: #fff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
          border-top: 1px solid #f0f0f0;
          padding: 2.5rem 0;
          z-index: 100;
        }
        .nav-item.has-dropdown:hover .mega-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .mega-menu-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          gap: 3rem;
          padding: 0 1.5rem;
        }
        
        /* Simple Dropdown for 'More' Menu */
        .nav-item.has-simple-dropdown {
          position: relative;
        }
        .simple-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 220px;
          background: #fff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
          border-top: 2px solid #d4af37;
          border-radius: 0 0 8px 8px;
          padding: 10px 0;
          z-index: 100;
        }
        .nav-item.has-simple-dropdown:hover .simple-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .dropdown-item {
          display: block;
          padding: 12px 24px;
          color: #6a4439 !important;
          font-family: var(--font-body, 'Arial', sans-serif);
          font-size: 1.05rem !important;
          font-weight: 500 !important;
          transition: background 0.2s, color 0.2s;
        }
        .dropdown-item::after { display: none !important; }
        .dropdown-item:hover {
          background: #f8fafc;
          color: #d4af37 !important;
        }

        .mega-menu-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .mega-menu-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid #f0f0f0;
          border-right: 1px solid #f0f0f0;
          text-decoration: none !important;
        }
        .mega-menu-item::after {
          display: none; /* remove hover line */
        }
        .mega-menu-item:nth-child(3n) {
          border-right: none;
        }
        .mega-menu-item.empty-item {
          cursor: default;
        }
        .mega-menu-item img {
          width: 40px;
          height: 40px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        .mega-menu-item:hover img {
          transform: scale(1.1);
        }
        .mega-menu-item span {
          font-family: var(--font-body, 'Arial', sans-serif);
          font-size: 1.1rem;
          color: #6a4439; /* reddish brown matching reference */
          font-weight: 500;
        }
        .mega-menu-featured {
          width: 380px;
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
        }
        .mega-menu-featured img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 12px;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          color: var(--color-primary);
        }
        .action-icon {
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .action-icon:hover {
          color: var(--color-accent);
          transform: translateY(-2px);
        }
        .menu-toggle {
          display: none;
          cursor: pointer;
        }
        
        /* Collections Banner Styles */
        .collections-grid {
          gap: 1.5rem;
          padding: 1rem 0;
          align-items: center;
        }
        .collection-mega-menu-item {
          display: block;
          overflow: hidden;
          border-radius: 4px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .collection-mega-menu-item img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .collection-mega-menu-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .collection-mega-menu-item:hover img {
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .nav-links.open {
            display: block;
          }
        }

        .gold-rate-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #d4ae36;
          color: #fff;
          border: none;
          padding: 8px 24px;
          border-radius: 25px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
        }

        .mobile-gold-rate {
          display: none;
        }

        .gold-rate-trigger:hover {
          background: #c19b2e;
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
        }

        .gold-rate-trigger .gr-text {
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        @media (max-width: 992px) {
          .top-bar {
            display: none !important;
          }
          .mobile-gold-rate {
            display: flex;
            padding: 4px 10px;
            border-radius: 12px;
            gap: 4px;
            margin-left: auto;
            box-shadow: 0 2px 5px rgba(212, 175, 55, 0.2);
            z-index: 10;
          }
          .mobile-gold-rate .gr-text {
            font-size: 0.65rem;
            line-height: 1.1;
            text-align: left;
            white-space: pre-wrap;
          }
          .mobile-nav-left {
            display: flex;
            align-items: center;
          }
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            padding: 2rem;
            gap: 1rem;
            box-shadow: 0 10px 10px rgba(0,0,0,0.1);
          }
          .nav-links.open {
            display: flex;
          }
          .nav-container {
            position: relative;
            justify-content: space-between;
          }
          .menu-toggle {
            display: block;
            margin-right: 0;
          }
          .logo {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin-left: 0;
            z-index: 5;
          }
          .logo img {
            height: 40px;
          }
        }
      `}} />
    </header >
  );
};

export default Header;
