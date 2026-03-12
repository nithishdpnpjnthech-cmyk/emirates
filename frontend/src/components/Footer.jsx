import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/assets/emirates_logo.png" alt="Emirates Gold" className="footer-logo" />
            <p>Luxury and elegance redefined. Emirates Gold International brings you the finest craftsmanship in gold and diamonds.</p>
            <div className="social-links">
              <Facebook size={20} />
              <Instagram size={20} />
              <Twitter size={20} />
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/collections">Collections</a></li>
              <li><a href="/blogs">Our Blog</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/shipping">Shipping Policy</a></li>
              <li><a href="/returns">Returns & Exchanges</a></li>
              <li><a href="/faq">FAQs</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Contact Us</h3>
            <div className="contact-item">
              <MapPin size={18} />
              <span>Chandragiri School Rd, Kasaragod, Kerala 671121</span>
            </div>
            <div className="contact-item">
              <MapPin size={18} />
              <span>1st Floor, Center Point Commercial Building, Bendoorwell, Kankanady, Mangaluru, Karnataka 575002</span>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <span>+971 4 123 4567</span>
            </div>
            <div className="contact-item">
              <Mail size={18} />
              <span>info@emiratesgold.com</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Emirates Gold International. All Rights Reserved.</p>
          <p className="developer-tag">Developed by <a href="https://pjntech.com/" target="_blank" rel="noopener noreferrer">PJN Technologies</a></p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .footer {
          background-color: var(--color-primary);
          color: var(--color-white);
          padding: 4rem 0 2rem;
          margin-top: 5rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 4rem;
        }
        .footer-logo {
          height: 60px;
          width: auto;
          margin-bottom: 1.5rem;
          object-fit: contain;
          background: #fff;
          padding: 5px;
          border-radius: 8px;
        }
        .footer-brand p {
          opacity: 0.8;
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }
        .social-links {
          display: flex;
          gap: 1.5rem;
        }
        .social-links svg {
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .social-links svg:hover {
          color: var(--color-accent);
        }
        .footer h3 {
          color: var(--color-accent);
          font-family: var(--font-heading);
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
        }
        .footer-links ul li {
          margin-bottom: 0.8rem;
        }
        .footer-links ul li a {
          opacity: 0.8;
          font-size: 0.95rem;
        }
        .footer-links ul li a:hover {
          opacity: 1;
          color: var(--color-accent);
          padding-left: 5px;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          opacity: 0.8;
          font-size: 0.95rem;
        }
        .footer-bottom {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          text-align: center;
          font-size: 0.9rem;
          opacity: 0.8;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .developer-tag a {
          color: var(--color-accent);
          text-decoration: none;
          font-weight: 600;
          transition: var(--transition-smooth);
        }
        .developer-tag a:hover {
          color: #fff;
        }
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }
        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </footer>
  );
};

export default Footer;
