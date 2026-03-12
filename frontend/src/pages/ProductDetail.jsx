import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService, enquiryService } from '../services/api';
import { Heart, Share2, ShieldCheck, Truck, RefreshCcw, ChevronDown, Star, CheckCircle } from 'lucide-react';

// Helper: calculate price from weight
function calcPrice(weight) {
    const goldRatePerGram = 7300; // example live rate (INR/gram)
    const makingChargePercent = 0.16;
    const taxPercent = 0.03;

    const weightNum = parseFloat(weight);
    if (isNaN(weightNum)) return null;

    const goldPrice = Math.round(goldRatePerGram * weightNum);
    const making = Math.round(goldPrice * makingChargePercent);
    const tax = Math.round((goldPrice + making) * taxPercent);
    const total = goldPrice + making + tax;
    const originalTotal = Math.round(total * 1.04); // fake MRP for strikethrough

    return { goldPrice, making, tax, total, originalTotal };
}

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wishlisted, setWishlisted] = useState(false);
    const [selectedSize, setSelectedSize] = useState('17 (57 mm)');
    const [selectedColor, setSelectedColor] = useState('Yellow');
    const [activeTab, setActiveTab] = useState('details');
    const [enquiryForm, setEnquiryForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productService.getProductById(id);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleEnquiry = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await enquiryService.createEnquiry({
                ...enquiryForm,
                message: `Product Enquiry for ${product.name} (Code: ${product.code}): ${enquiryForm.message}`
            });
            setSubmitted(true);
        } catch (error) {
            alert('Error sending enquiry. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="loading-spinner" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                <p>Loading product details...</p>
            </div>
        </div>
    );
    if (!product) return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>Product not found.</p>
                <Link to="/products" style={{ color: 'var(--color-accent)' }}>← Back to Products</Link>
            </div>
        </div>
    );

    const pricing = calcPrice(product.weight);
    const imgSrc = product.image ? `/${product.image}` : '/placeholder.jpg';
    const isGold = product.metalType === 'Gold';

    const sizes = ['15 (52 mm)', '16 (54 mm)', '17 (57 mm)', '18 (60 mm)', '19 (63 mm)'];
    const colors = isGold ? ['Yellow', 'Rose Gold', 'White Gold'] : ['White'];

    return (
        <div className="pd-page">
            {/* Breadcrumb */}
            <div className="pd-breadcrumb">
                <div className="container">
                    <Link to="/">Home</Link>
                    <span> / </span>
                    <Link to={`/${product.metalType?.toLowerCase()}`}>{product.metalType}</Link>
                    <span> / </span>
                    <span>{product.category}</span>
                    <span> / </span>
                    <span>{product.name}</span>
                </div>
            </div>

            <div className="container">
                <div className="pd-grid">

                    {/* ====== LEFT: Gallery ====== */}
                    <div className="pd-gallery">
                        <div className="pd-main-img-wrap">
                            <button
                                className={`pd-wishlist-btn ${wishlisted ? 'active' : ''}`}
                                onClick={() => setWishlisted(!wishlisted)}
                                aria-label="Add to wishlist"
                            >
                                <Heart size={20} fill={wishlisted ? '#c41e3a' : 'none'} color={wishlisted ? '#c41e3a' : '#999'} />
                            </button>
                            <img src={imgSrc} alt={product.name} className="pd-main-img" onError={e => { e.target.src = 'https://placehold.co/600x600?text=Image'; }} />
                        </div>
                        <div className="pd-thumbs">
                            {[imgSrc, imgSrc, imgSrc, imgSrc].map((src, i) => (
                                <div key={i} className={`pd-thumb ${i === 0 ? 'active' : ''}`}>
                                    <img src={src} alt={`view-${i}`} onError={e => { e.target.src = 'https://placehold.co/100x100?text=Img'; }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ====== RIGHT: Product Info ====== */}
                    <div className="pd-info">

                        {/* Name & Code */}
                        <h1 className="pd-name">{product.name}</h1>
                        <p className="pd-code">Product Code : <strong>{product.code}</strong></p>

                        {/* Taglines */}
                        <div className="pd-tagline">
                            <span>✈ Free Shipping</span>
                            <span className="pd-sep">|</span>
                            <span>🏅 Hallmarked Jewellery</span>
                        </div>

                        {/* Availability */}
                        <div className="pd-availability">
                            <CheckCircle size={16} color="#22c55e" />
                            <span>Availability: <strong>In stock</strong></span>
                        </div>

                        {/* Price */}
                        {pricing ? (
                            <div className="pd-price-block">
                                <div className="pd-price-row">
                                    <span className="pd-rupee">₹</span>
                                    <span className="pd-main-price">{pricing.total.toLocaleString('en-IN')}</span>
                                    <span className="pd-original-price">₹ {pricing.originalTotal.toLocaleString('en-IN')}</span>
                                </div>
                                <p className="pd-tax-note">(Inclusive of all taxes)</p>
                                <div className="pd-savings-badge">20% savings on making charges</div>
                            </div>
                        ) : (
                            <div className="pd-price-block">
                                <p className="pd-on-request">Price on Request</p>
                            </div>
                        )}

                        {/* Selectors */}
                        <div className="pd-selectors">
                            <div className="pd-select-group">
                                <label>Size:</label>
                                <div className="pd-select-wrap">
                                    <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
                                        {sizes.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                    <ChevronDown size={14} className="pd-chevron" />
                                </div>
                            </div>
                            <div className="pd-select-group">
                                <label>Gold Color:</label>
                                <div className="pd-select-wrap">
                                    <select value={selectedColor} onChange={e => setSelectedColor(e.target.value)}>
                                        {colors.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                    <ChevronDown size={14} className="pd-chevron" />
                                </div>
                            </div>
                        </div>
                        <p className="pd-size-note">Weight will increase as per the Size. <span className="pd-link">Check Sizing Comparison</span></p>

                        {/* Price Breakup */}
                        {pricing && (
                            <div className="pd-breakup">
                                <p className="pd-breakup-title">Price Breakup</p>
                                <div className="pd-breakup-cols">
                                    <div className="pd-breakup-item">
                                        <span>{isGold ? 'Gold' : 'Diamond'}</span>
                                        <strong>₹ {pricing.goldPrice.toLocaleString('en-IN')}</strong>
                                    </div>
                                    <div className="pd-breakup-item">
                                        <span>Making</span>
                                        <strong>₹ {pricing.making.toLocaleString('en-IN')}</strong>
                                        <span className="pd-strike">₹ {Math.round(pricing.making * 1.2).toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="pd-breakup-item">
                                        <span>Tax</span>
                                        <strong>₹ {pricing.tax.toLocaleString('en-IN')}</strong>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Weight Info */}
                        <div className="pd-weight-info">
                            <span>⚖ Gross Weight: <strong>{product.weight}</strong></span>
                        </div>

                        {/* Dispatch Info */}
                        <p className="pd-dispatch">
                            (Dispatch by: {new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric', year: '2-digit' })})
                        </p>

                        {/* Buy Now / Enquire */}
                        <div className="pd-actions">
                            <button className="pd-buy-btn" onClick={() => document.getElementById('enquiry-form').scrollIntoView({ behavior: 'smooth' })}>
                                Buy Now
                            </button>
                            <button className="pd-enquire-btn" onClick={() => document.getElementById('enquiry-form').scrollIntoView({ behavior: 'smooth' })}>
                                Enquire
                            </button>
                            <button className="pd-icon-btn" onClick={() => setWishlisted(!wishlisted)} aria-label="Wishlist">
                                <Heart size={18} fill={wishlisted ? '#c41e3a' : 'none'} color={wishlisted ? '#c41e3a' : '#555'} />
                            </button>
                            <button className="pd-icon-btn" aria-label="Share">
                                <Share2 size={18} color="#555" />
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="pd-trust">
                            <div className="pd-trust-item"><ShieldCheck size={18} /><span>Insured Shipping</span></div>
                            <div className="pd-trust-item"><RefreshCcw size={18} /><span>7 Day Returns</span></div>
                            <div className="pd-trust-item"><Truck size={18} /><span>Free Delivery</span></div>
                        </div>
                    </div>
                </div>

                {/* Tabs: Details / Certification */}
                <div className="pd-tabs">
                    <div className="pd-tab-nav">
                        {['details', 'certification', 'reviews'].map(tab => (
                            <button key={tab} className={`pd-tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                                {tab === 'details' ? 'Product Details' : tab === 'certification' ? 'Certification' : 'Reviews'}
                            </button>
                        ))}
                    </div>
                    <div className="pd-tab-content">
                        {activeTab === 'details' && (
                            <div className="pd-spec-table">
                                <div className="pd-spec-row"><span>Product Name</span><span>{product.name}</span></div>
                                <div className="pd-spec-row"><span>Product Code</span><span>{product.code}</span></div>
                                <div className="pd-spec-row"><span>Category</span><span>{product.category}</span></div>
                                <div className="pd-spec-row"><span>Metal Type</span><span>{product.metalType}</span></div>
                                <div className="pd-spec-row"><span>Gross Weight</span><span>{product.weight}</span></div>
                                <div className="pd-spec-row"><span>Purity</span><span>{isGold ? '22K BIS Hallmarked' : '18K White Gold - SI/VS Diamond'}</span></div>
                                <div className="pd-spec-row"><span>Description</span><span>{product.description}</span></div>
                            </div>
                        )}
                        {activeTab === 'certification' && (
                            <div className="pd-cert">
                                <p>🏅 All Emirates Gold jewellery is <strong>BIS Hallmarked</strong> and certified for purity.</p>
                                <p>♻ Comes with a <strong>lifetime exchange policy</strong> and quality assurance certificate.</p>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="pd-reviews">
                                {[5, 4, 5].map((r, i) => (
                                    <div key={i} className="pd-review-card">
                                        <div className="pd-stars">{Array.from({ length: r }).map((_, j) => <Star key={j} size={14} fill="#d4a017" color="#d4a017" />)}</div>
                                        <p>Beautiful piece! Exactly as shown. {i === 0 ? 'My wife loved it!' : i === 1 ? 'Excellent craftsmanship.' : 'Worth every penny.'}</p>
                                        <small>Verified Buyer – {['Priya M.', 'Rahul S.', 'Divya K.'][i]}</small>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Enquiry Form */}
                <section id="enquiry-form" className="pd-enquiry">
                    <h3>Interested? Send an Enquiry</h3>
                    <p>Our jewellery expert will contact you within 24 hours.</p>
                    {submitted ? (
                        <div className="pd-success">✅ Thank you! Your enquiry has been received. We'll contact you shortly.</div>
                    ) : (
                        <form onSubmit={handleEnquiry} className="pd-enquiry-form">
                            <div className="pd-form-grid">
                                <input type="text" placeholder="Your Name *" required value={enquiryForm.name} onChange={e => setEnquiryForm({ ...enquiryForm, name: e.target.value })} />
                                <input type="email" placeholder="Email Address *" required value={enquiryForm.email} onChange={e => setEnquiryForm({ ...enquiryForm, email: e.target.value })} />
                                <input type="tel" placeholder="Phone Number *" required value={enquiryForm.phone} onChange={e => setEnquiryForm({ ...enquiryForm, phone: e.target.value })} />
                            </div>
                            <textarea placeholder="Your Message" rows="4" value={enquiryForm.message} onChange={e => setEnquiryForm({ ...enquiryForm, message: e.target.value })} />
                            <button type="submit" className="pd-submit-btn" disabled={submitting}>
                                {submitting ? 'Sending...' : 'Send Enquiry →'}
                            </button>
                        </form>
                    )}
                </section>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .pd-page { background: #fff; padding-bottom: 6rem; }
                
                /* Breadcrumb */
                .pd-breadcrumb { background: #f8f5f0; padding: 0.8rem 0; font-size: 0.82rem; color: #888; margin-bottom: 2rem; }
                .pd-breadcrumb a { color: #888; text-decoration: none; }
                .pd-breadcrumb a:hover { color: var(--color-accent); }

                /* Grid */
                .pd-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 5rem; margin-bottom: 5rem; }

                /* Gallery */
                .pd-gallery {}
                .pd-main-img-wrap { position: relative; background: #f9f7f4; border-radius: 12px; display: flex; align-items: center; justify-content: center; min-height: 460px; margin-bottom: 1.2rem; overflow: hidden; }
                .pd-wishlist-btn { position: absolute; top: 1.2rem; right: 1.2rem; background: white; border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.12); transition: transform 0.2s; z-index: 2; }
                .pd-wishlist-btn:hover { transform: scale(1.1); }
                .pd-main-img { max-width: 100%; max-height: 460px; object-fit: contain; display: block; }
                .pd-thumbs { display: flex; gap: 0.8rem; flex-wrap: wrap; }
                .pd-thumb { width: 80px; height: 80px; border: 2px solid #e8e2d9; border-radius: 8px; overflow: hidden; cursor: pointer; transition: border-color 0.2s; }
                .pd-thumb.active, .pd-thumb:hover { border-color: var(--color-accent, #d4a017); }
                .pd-thumb img { width: 100%; height: 100%; object-fit: cover; }

                /* Info */
                .pd-info {}
                .pd-name { font-size: 1.7rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.4rem; line-height: 1.3; font-family: var(--font-heading, serif); }
                .pd-code { font-size: 0.9rem; color: #555; margin-bottom: 0.8rem; }
                .pd-tagline { font-size: 0.88rem; color: #555; margin-bottom: 0.8rem; }
                .pd-sep { margin: 0 0.5rem; color: #ccc; }
                .pd-availability { display: flex; align-items: center; gap: 0.4rem; font-size: 0.9rem; color: #333; margin-bottom: 1.2rem; }
                .pd-availability strong { color: #22c55e; }

                /* Price */
                .pd-price-block { margin-bottom: 1.5rem; padding-bottom: 1.2rem; border-bottom: 1px solid #f0ebe3; }
                .pd-price-row { display: flex; align-items: baseline; gap: 0.5rem; }
                .pd-rupee { font-size: 1.4rem; color: #b5451b; font-weight: 700; }
                .pd-main-price { font-size: 2.4rem; font-weight: 800; color: #b5451b; }
                .pd-original-price { font-size: 1.1rem; color: #999; text-decoration: line-through; }
                .pd-tax-note { font-size: 0.8rem; color: #888; margin: 0.2rem 0 0.6rem; }
                .pd-savings-badge { display: inline-block; border: 1.5px solid #b5451b; color: #b5451b; font-size: 0.78rem; padding: 0.25rem 0.8rem; border-radius: 20px; font-weight: 600; }
                .pd-on-request { font-size: 1.4rem; color: var(--color-accent, #d4a017); font-weight: 700; }

                /* Selectors */
                .pd-selectors { display: flex; gap: 2rem; margin-bottom: 0.5rem; }
                .pd-select-group { display: flex; align-items: center; gap: 0.5rem; }
                .pd-select-group label { font-size: 0.88rem; color: #333; font-weight: 600; white-space: nowrap; }
                .pd-select-wrap { position: relative; }
                .pd-select-wrap select { appearance: none; border: 1px solid #ccc; border-radius: 4px; padding: 0.45rem 2rem 0.45rem 0.8rem; font-size: 0.88rem; cursor: pointer; background: #fff; color: #333; }
                .pd-chevron { position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%); pointer-events: none; color: #666; }
                .pd-size-note { font-size: 0.82rem; color: #666; margin-bottom: 1.2rem; }
                .pd-link { color: #b5451b; cursor: pointer; text-decoration: underline; }

                /* Price Breakup */
                .pd-breakup { background: #faf7f2; border-radius: 8px; padding: 1rem 1.2rem; margin-bottom: 1rem; }
                .pd-breakup-title { font-weight: 700; font-size: 0.9rem; color: #333; margin-bottom: 0.8rem; }
                .pd-breakup-cols { display: flex; gap: 2rem; }
                .pd-breakup-item { display: flex; flex-direction: column; gap: 0.2rem; }
                .pd-breakup-item span { font-size: 0.82rem; color: #666; }
                .pd-breakup-item strong { font-size: 0.95rem; color: #1a1a1a; }
                .pd-strike { font-size: 0.78rem; color: #aaa; text-decoration: line-through; }

                /* Weight / Dispatch */
                .pd-weight-info { font-size: 0.88rem; color: #555; margin-bottom: 0.5rem; }
                .pd-dispatch { font-size: 0.85rem; color: #777; margin-bottom: 1.5rem; }

                /* Actions */
                .pd-actions { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.5rem; }
                .pd-buy-btn { flex: 1; background: #c41e3a; color: white; border: none; border-radius: 6px; padding: 0.95rem 1.5rem; font-size: 1.05rem; font-weight: 700; cursor: pointer; letter-spacing: 0.5px; transition: background 0.2s; }
                .pd-buy-btn:hover { background: #a3162f; }
                .pd-enquire-btn { flex: 0.6; background: white; color: #c41e3a; border: 2px solid #c41e3a; border-radius: 6px; padding: 0.95rem 1rem; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
                .pd-enquire-btn:hover { background: #c41e3a; color: white; }
                .pd-icon-btn { width: 46px; height: 46px; border: 1px solid #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; background: white; transition: all 0.2s; }
                .pd-icon-btn:hover { border-color: #c41e3a; background: #fff5f5; }

                /* Trust */
                .pd-trust { display: flex; gap: 2rem; padding-top: 1.2rem; border-top: 1px solid #f0ebe3; }
                .pd-trust-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: #555; }
                .pd-trust-item svg { color: var(--color-accent, #d4a017); }

                /* Tabs */
                .pd-tabs { border: 1px solid #ede8df; border-radius: 12px; overflow: hidden; margin-bottom: 4rem; }
                .pd-tab-nav { display: flex; border-bottom: 1px solid #ede8df; }
                .pd-tab-btn { padding: 1rem 2rem; background: none; border: none; cursor: pointer; font-size: 0.95rem; font-weight: 600; color: #888; border-bottom: 3px solid transparent; transition: all 0.2s; }
                .pd-tab-btn.active { color: #c41e3a; border-bottom-color: #c41e3a; background: #fff8f8; }
                .pd-tab-content { padding: 2rem; }

                /* Spec Table */
                .pd-spec-table { border: 1px solid #f0ebe3; border-radius: 8px; overflow: hidden; }
                .pd-spec-row { display: flex; padding: 0.9rem 1.2rem; border-bottom: 1px solid #f5f0ea; }
                .pd-spec-row:last-child { border-bottom: none; }
                .pd-spec-row:nth-child(even) { background: #faf7f2; }
                .pd-spec-row span:first-child { font-weight: 700; color: #333; width: 180px; flex-shrink: 0; }
                .pd-spec-row span:last-child { color: #555; }

                /* Cert & Reviews */
                .pd-cert { line-height: 2; color: #444; }
                .pd-reviews { display: flex; flex-direction: column; gap: 1.5rem; }
                .pd-review-card { background: #faf7f2; border-radius: 8px; padding: 1.2rem; }
                .pd-stars { display: flex; gap: 2px; margin-bottom: 0.5rem; }
                .pd-review-card p { color: #444; margin-bottom: 0.5rem; }
                .pd-review-card small { color: #999; font-size: 0.82rem; }

                /* Enquiry */
                .pd-enquiry { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; border-radius: 16px; padding: 4rem; text-align: center; }
                .pd-enquiry h3 { font-size: 2rem; color: var(--color-accent, #d4a017); margin-bottom: 0.5rem; font-family: var(--font-heading, serif); }
                .pd-enquiry > p { opacity: 0.75; margin-bottom: 2.5rem; }
                .pd-enquiry-form {}
                .pd-form-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1rem; }
                .pd-form-grid input { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 1rem; color: white; width: 100%; font-size: 0.9rem; }
                .pd-form-grid input::placeholder { color: rgba(255,255,255,0.5); }
                .pd-enquiry-form textarea { width: 100%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 1rem; color: white; font-size: 0.9rem; resize: vertical; margin-bottom: 1.5rem; }
                .pd-enquiry-form textarea::placeholder { color: rgba(255,255,255,0.5); }
                .pd-submit-btn { background: var(--color-accent, #d4a017); color: white; border: none; border-radius: 8px; padding: 1rem 3rem; font-size: 1.05rem; font-weight: 700; cursor: pointer; transition: background 0.2s; }
                .pd-submit-btn:hover { background: #b8880e; }
                .pd-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
                .pd-success { background: rgba(34, 197, 94, 0.2); border: 1px solid #22c55e; border-radius: 8px; padding: 1.5rem; color: #86efac; font-weight: 600; }

                /* Responsive */
                @media (max-width: 992px) {
                    .pd-grid { grid-template-columns: 1fr; gap: 2.5rem; }
                    .pd-form-grid { grid-template-columns: 1fr; }
                    .pd-selectors { flex-wrap: wrap; }
                    .pd-enquiry { padding: 2.5rem 1.5rem; }
                    .pd-tabs .pd-tab-btn { padding: 0.8rem 1rem; font-size: 0.85rem; }
                }
                @media (max-width: 576px) {
                    .pd-name { font-size: 1.35rem; }
                    .pd-main-price { font-size: 1.8rem; }
                    .pd-breakup-cols { gap: 1rem; }
                    .pd-actions { flex-wrap: wrap; }
                    .pd-buy-btn, .pd-enquire-btn { flex: 1 1 100%; }
                }
            `}} />
        </div>
    );
};

export default ProductDetail;
