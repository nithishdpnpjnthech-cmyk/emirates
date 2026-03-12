import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="hero-content">
            <h1>Contact Us</h1>
            <p>Get in touch with our luxury jewelry experts</p>
          </motion.div>
        </div>
      </div>

      <div className="container contact-content-section">
        <div className="contact-grid">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="contact-info">
            <h2>Get In Touch</h2>
            <p className="intro-text">
              Whether you have a question about our collections, need assistance with an order, or wish to schedule a private viewing, our dedicated team is here to assist you.
            </p>

            <div className="info-list">
              <div className="info-item">
                <div className="icon-wrapper"><MapPin size={24} /></div>
                <div>
                  <h3>Kasaragod Store</h3>
                  <p>Chandragiri School Rd<br />Kasaragod, Kerala 671121</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-wrapper"><MapPin size={24} /></div>
                <div>
                  <h3>Mangaluru Store</h3>
                  <p>1st Floor, Center Point Commercial Building<br />Ozone Authorised Service Center<br />Bendoorwell, Kankanady, Mangaluru, Karnataka 575002</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-wrapper"><Phone size={24} /></div>
                <div>
                  <h3>Call Us</h3>
                  <p>+971 4 123 4567<br />Toll Free: 800-EMIRATES</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-wrapper"><Mail size={24} /></div>
                <div>
                  <h3>Email Us</h3>
                  <p>support@emiratesgold.ae<br />sales@emiratesgold.ae</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-wrapper"><Clock size={24} /></div>
                <div>
                  <h3>Opening Hours</h3>
                  <p>Mon - Sat: 10:00 AM - 10:00 PM<br />Sun: 4:00 PM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="contact-form-wrapper">
            <h2>Send a Message</h2>
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
              <div className="form-group grid-2">
                <div>
                  <label>First Name</label>
                  <input type="text" placeholder="First Name" required />
                </div>
                <div>
                  <label>Last Name</label>
                  <input type="text" placeholder="Last Name" required />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Email Address" required />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="Phone Number" />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select required>
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Product Information">Product Information</option>
                  <option value="Order Status">Order Status</option>
                  <option value="Book an Appointment">Book an Appointment</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="How can we help you?" required></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .contact-page {
          background-color: #fcfcfc;
          padding-bottom: 80px;
        }

        .contact-hero {
          background: linear-gradient(rgba(11, 26, 43, 0.9), rgba(11, 26, 43, 0.9)), url('/assets/banners/contact-banner.jpg') center/cover;
          color: white;
          padding: 100px 0;
          text-align: center;
          margin-bottom: 60px;
        }

        .contact-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: 3.5rem;
          margin-bottom: 10px;
          color: #d4af37;
        }

        .contact-hero p {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .contact-content-section {
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .contact-info h2, .contact-form-wrapper h2 {
          font-family: 'Playfair Display', serif;
          color: #0b1a2b;
          font-size: 2.2rem;
          margin-bottom: 20px;
          border-bottom: 2px solid #d4af37;
          display: inline-block;
          padding-bottom: 8px;
        }

        .intro-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #4a5568;
          margin-bottom: 40px;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .icon-wrapper {
          background: #f0f4f8;
          color: #d4af37;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-item h3 {
          color: #0b1a2b;
          font-size: 1.2rem;
          margin-bottom: 5px;
        }

        .info-item p {
          color: #4a5568;
          line-height: 1.6;
        }

        .contact-form-wrapper {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.05);
          border: 1px solid #edf2f7;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group.grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          color: #0b1a2b;
          margin-bottom: 8px;
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
          background: #f8fafc;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #d4af37;
          background: white;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }

        .submit-btn {
          background: #d4af37;
          color: white;
          padding: 15px 30px;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
          width: 100%;
        }

        .submit-btn:hover {
          background: #bfa035;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .form-group.grid-2 {
            grid-template-columns: 1fr;
          }
          .contact-hero h1 { font-size: 2.5rem; }
        }
        `
      }} />
    </div>
  );
};

export default Contact;
