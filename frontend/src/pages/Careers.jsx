import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Careers = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        experience: '',
        message: '',
        resume: null,
        agreement: false
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.agreement) {
            alert("Please agree to the contact terms.");
            return;
        }
        console.log("Form submitted:", formData);
        // Handle form submission logic here
        alert("Application submitted successfully!");
        setFormData({ name: '', email: '', experience: '', message: '', resume: null, agreement: false });
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="careers-page">
            <div className="careers-hero">
                <div className="container">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="hero-content">
                        <h1>Careers</h1>
                        <p>Join the Team Behind UAE’s Premier Luxury Jewelry Destination</p>
                    </motion.div>
                </div>
            </div>

            <div className="container careers-content-section">
                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="careers-text-block">
                    <h2>Who We Are</h2>
                    <p>
                        At Emirates Gold Internationals, we don’t just craft jewellery — we create moments of elegance, trust, and memories that shine for a lifetime.
                    </p>
                    <p>
                        Founded with a vision to bring unmatched quality and craftsmanship to the world, we have grown into a symbol of luxury and reliability across the UAE and beyond. Our mission is to blend rich tradition with modern innovation.
                    </p>
                    <p>
                        We’re building a team of passionate professionals — across design, retail, marketing, operations, and more — who want to grow with a brand that values integrity, creativity, and excellence.
                    </p>
                    <p>
                        Whether you’re a fresher ready to explore or an experienced professional looking for your next milestone, your journey can begin here.
                    </p>
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="careers-perks-section">
                    <h2>Why work with us?</h2>
                    <p className="perks-intro">
                        At Emirates Gold Internationals, we invest not just in skills — but in happiness, purpose, and long-term success. Here’s what makes a career with us truly rewarding:
                    </p>

                    <div className="perks-grid">
                        <div className="perk-card">
                            <h3>Growth & Development</h3>
                            <ul>
                                <li>Continuous training and skill enhancement programs</li>
                                <li>Leadership-building and promotion opportunities</li>
                                <li>Mentorship from industry leaders and master craftsmen</li>
                            </ul>
                        </div>
                        <div className="perk-card">
                            <h3>Rewards & Recognition</h3>
                            <ul>
                                <li>Competitive salary packages and benefits</li>
                                <li>Performance-based incentives</li>
                                <li>Excellence awards and loyalty recognition programs</li>
                            </ul>
                        </div>
                        <div className="perk-card">
                            <h3>Employee Welfare</h3>
                            <ul>
                                <li>Accommodation support for eligible staff</li>
                                <li>Family benefits and childcare assistance at select locations</li>
                                <li>Safe, respectful, and inclusive workplace culture</li>
                            </ul>
                        </div>
                        <div className="perk-card">
                            <h3>Culture & Engagement</h3>
                            <ul>
                                <li>Employee celebrations, cultural festivals, and team-bonding events</li>
                                <li>Open-door leadership and family-like team culture</li>
                                <li>Strong brand values rooted in trust, respect, and innovation</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="diverse-careers-section">
                    <h2>Diverse Career Opportunities</h2>
                    <p>The Emirates Gold Group operates across multiple industries, giving you the chance to explore diverse roles and grow beyond boundaries:</p>
                    <ul className="opportunities-list">
                        <li>Luxury Jewellery Retail</li>
                        <li>Gold Refining & Manufacturing</li>
                        <li>Real Estate & Property Development</li>
                        <li>Hospitality & Lifestyle</li>
                        <li>Philanthropy & Heritage Initiatives</li>
                    </ul>
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="application-form-section">
                    <div className="form-wrapper">
                        <h2>Drop your resume here</h2>
                        <form onSubmit={handleSubmit} className="career-form">
                            <div className="form-group">
                                <label>Name <span className="required">*</span></label>
                                <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Email <span className="required">*</span></label>
                                <input type="email" name="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Experience <span className="required">*</span></label>
                                <div className="radio-group">
                                    <label>
                                        <input type="radio" name="experience" value="Experienced in Retail Sector" checked={formData.experience === 'Experienced in Retail Sector'} onChange={handleChange} required />
                                        Experienced in Retail Sector
                                    </label>
                                    <label>
                                        <input type="radio" name="experience" value="Experienced in Service or Manufacturing" checked={formData.experience === 'Experienced in Service or Manufacturing'} onChange={handleChange} />
                                        Experienced in Service or Manufacturing
                                    </label>
                                    <label>
                                        <input type="radio" name="experience" value="Fresher" checked={formData.experience === 'Fresher'} onChange={handleChange} />
                                        Fresher
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea name="message" placeholder="Enter your Message" rows="4" value={formData.message} onChange={handleChange}></textarea>
                            </div>

                            <div className="form-group">
                                <label>Resume <span className="required">*</span></label>
                                <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} required />
                            </div>

                            <div className="form-group agreement-group">
                                <label className="checkbox-label">
                                    <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleChange} required />
                                    I agree to be contacted by representatives of Emirates Gold Internationals, overriding any DND request from this number.
                                </label>
                            </div>

                            <button type="submit" className="submit-btn" disabled={!formData.agreement}>Submit Application</button>
                        </form>
                    </div>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .careers-page {
          background-color: #fcfcfc;
          padding-bottom: 80px;
        }

        .careers-hero {
          background: linear-gradient(to right, #0b1a2b, #1a365d);
          color: white;
          padding: 80px 0;
          text-align: center;
          margin-bottom: 60px;
        }

        .careers-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          margin-bottom: 10px;
          color: #d4af37;
        }

        .careers-hero p {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .careers-content-section {
          max-width: 900px;
          margin: 0 auto;
        }

        .careers-text-block h2, .careers-perks-section h2, .diverse-careers-section h2 {
          font-family: 'Playfair Display', serif;
          color: #0b1a2b;
          font-size: 2.2rem;
          margin-bottom: 20px;
          border-bottom: 2px solid #d4af37;
          display: inline-block;
          padding-bottom: 8px;
        }

        .careers-text-block p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #4a5568;
          margin-bottom: 15px;
        }

        .careers-perks-section {
          margin-top: 60px;
        }

        .perks-intro {
          font-size: 1.1rem;
          color: #4a5568;
          margin-bottom: 30px;
        }

        .perks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .perk-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          border-top: 4px solid #d4af37;
          transition: transform 0.3s ease;
        }

        .perk-card:hover {
          transform: translateY(-5px);
        }

        .perk-card h3 {
          color: #0b1a2b;
          font-size: 1.3rem;
          margin-bottom: 15px;
        }

        .perk-card ul {
          list-style-type: none;
          padding: 0;
        }

        .perk-card li {
          color: #4a5568;
          margin-bottom: 10px;
          position: relative;
          padding-left: 20px;
        }

        .perk-card li::before {
          content: '•';
          color: #d4af37;
          font-size: 1.5rem;
          position: absolute;
          left: 0;
          top: -4px;
        }

        .diverse-careers-section {
          margin-top: 60px;
          background: #f0f4f8;
          padding: 40px;
          border-radius: 12px;
        }

        .opportunities-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 20px;
        }

        .opportunities-list li {
          background: white;
          padding: 10px 20px;
          border-radius: 30px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          color: #0b1a2b;
          font-weight: 500;
          border: 1px solid #e2e8f0;
        }

        /* Form Styles */
        .application-form-section {
          margin-top: 80px;
        }

        .form-wrapper {
          background: white;
          padding: 50px;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          border: 1px solid #edf2f7;
        }

        .form-wrapper h2 {
          text-align: center;
          margin-bottom: 40px;
        }

        .career-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          color: #0b1a2b;
          margin-bottom: 8px;
        }

        .required {
          color: #e53e3e;
        }

        .form-group input[type="text"],
        .form-group input[type="email"],
        .form-group textarea,
        .form-group input[type="file"] {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
          background: #f8fafc;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #d4af37;
          background: white;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }

        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .radio-group label {
          display: flex;
          align-items: center;
          font-weight: normal;
          cursor: pointer;
        }

        .radio-group input[type="radio"] {
          margin-right: 10px;
          accent-color: #d4af37;
          width: 18px;
          height: 18px;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-weight: normal;
          cursor: pointer;
          font-size: 0.95rem;
          color: #4a5568;
        }

        .checkbox-label input[type="checkbox"] {
          margin-top: 4px;
          accent-color: #d4af37;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
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
        }

        .submit-btn:hover:not(:disabled) {
          background: #bfa035;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
        }

        .submit-btn:disabled {
          background: #e2e8f0;
          color: #a0aec0;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .careers-hero h1 { font-size: 2.5rem; }
          .form-wrapper { padding: 30px 20px; }
        }
        `
            }} />
        </div>
    );
};

export default Careers;
