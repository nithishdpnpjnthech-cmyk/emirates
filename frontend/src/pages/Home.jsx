import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const banners = [
    {
      image: '/assets/banner/jewellery/Brand-Ambassador-Slider.png',
      title: 'Exquisite Artistry',
      subtitle: 'Crafted for Perfection',
      description: 'Discover the brilliance of our gold and diamond creations.'
    },
    {
      image: '/assets/banner/jewellery/Gold-Slider.png',
      title: 'Pure Gold Collections',
      subtitle: 'The Standard of Luxury',
      description: 'Legacy of 22K and 24K gold ornaments that define traditions.'
    },
    {
      image: '/assets/banner/jewellery/Silveriya-Slider.png',
      title: 'Timeless Silver',
      subtitle: 'Elegance in Every Detail',
      description: 'Handcrafted silver jewelry for modern and classic styles.'
    },
    {
      image: '/assets/banner/jewellery/CVD-Diamond-Analyzer-Slider.png',
      title: 'Diamond Assurance',
      subtitle: 'Brilliance You Can Trust',
      description: 'Advanced analysis for the purest diamond selections.'
    }
  ];

  const promisesData = [
    { title: "Complete Transparency", desc: `At Malabar Gold and Diamonds online store, every piece of jewellery...`, img: "COMPLETE_TRANSPARENCY_plum.png" },
    { title: "Complimentary Insurance", desc: `Assured insurance for 1 year against any damage by burglary...`, img: "COMPLIMENTARY_INSURANCE_plum.png" },
    { title: "Assured Lifetime Maintenance", desc: `We assure lifetime maintenance for jewellery from all our 300...`, img: "ASSURED_LIFETIME_MAINTENANCE_plum.png" },
    { title: "100% HUID Compliant Gold", desc: `Since 2001, all our gold jewellery has held BIS hallmark...`, img: "100_BIS_HALLMARKED_GOLD_plum.png" },
    { title: "Fair Price Policy", desc: `Beautiful designs crafted in impeccable gold at reasonable making...`, img: "FAIR_PRICE_POLICY_plum.png" },
    { title: "Zero Deduction Gold Exchange", desc: `When you exchange "22KT" gold with us, we give 100% Value...`, img: "ZERO_DEDUCTION_GOLD_EXCHANGE_plum.png" },
    { title: "Responsibly Sourced Products", desc: `All our jewellery adheres to responsible acquisition standards...`, img: "FAIR_PRICE_POLICY_plum.png" },
    { title: "Guaranteed Buyback", desc: `At any point of time if you feel you need to change the jewellery collections...`, img: "GUARANTEED_BUYBACK_plum.png" },
    { title: "Tested & Certified Diamonds", desc: `Every diamond pass through 28 internal quality tests with IGI- GIA...`, img: "TESTED_&_CERTIFIED_DIAMONDS_plum.png" },
    { title: "Fair Labour Practices", desc: `This exclusive feature gives complete flexibility to our customers...`, img: "FAIR_LABOUR_PRACTICES_plum.png" },
    { title: "Easy Exchange", desc: `This exclusive feature gives complete flexibility to our customers...`, img: "easy-exchange_ne.png" },
    { title: "14 Days Return Policy", desc: `If you don’t like the jewellery and solitaire purchased from us...`, img: "14-days-return-policy_new.png" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBridalSlide, setCurrentBridalSlide] = useState(0);
  const [currentPromiseSlide, setCurrentPromiseSlide] = useState(0);

  const bridalImages = [
    '/assets/bridal/bridal_menu.jpg',
    '/assets/bridal/Diamond_mega.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBridalSlide((prev) => (prev + 1) % bridalImages.length);
    }, 4000); // 4 seconds for bridal slider
    return () => clearInterval(timer);
  }, [bridalImages.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromiseSlide((prev) => (prev + 1) % promisesData.length);
    }, 2000); // 2 seconds for promises slider
    return () => clearInterval(timer);
  }, [promisesData.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);


  const quickLinksData = [
    { title: "Fast Ships", img: "/assets/quicklinks/fast_ships.png", path: "/gold" },
    { title: "Best Sellers", img: "/assets/quicklinks/best_sellers.png", path: "/gold" },
    { title: "New Arrivals", img: "/assets/quicklinks/new_arrivals.png", path: "/gold" },
    { title: "Coins & Bars", img: "/assets/quicklinks/coins_bars.png", path: "/gold" },
    { title: "Coin Pendants", img: "/assets/quicklinks/coin_pendants.png", path: "/gold/pendants" },
    { title: "Silver Coins", img: "/assets/quicklinks/silver_coins.png", path: "/gold" },
    { title: "Gold Jhumka", img: "/assets/occasion/Earrings.png", path: "/gold/earrings" },
    { title: "Ring", img: "/assets/occasion/Rings.png", path: "/gold/rings" },
    { title: "Bangle", img: "/assets/occasion/Bangles.png", path: "/gold/bangles" },
    { title: "Earring", img: "/assets/diamond/diamond-earring.jpg", path: "/diamond/earrings" },
    { title: "Mangalsutra", img: "/assets/occasion/Mangalsutra.png", path: "/gold/mangalsutra" },
    { title: "Gold Chain", img: "/assets/gold/chains.png", path: "/gold/chain" }
  ];

  return (
    <div className="home-page">
      {/* Hero Slider */}
      <section className="hero-slider">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="slide"
            style={{ backgroundImage: `url(${banners[currentSlide].image})`, cursor: 'pointer' }}
            onClick={() => navigate('/gold')}
          />
        </AnimatePresence>

        {/* Slider Controls */}
        <div className="slider-controls">
          <button onClick={prevSlide} className="control-btn"><ArrowLeft size={24} /></button>
          <div className="dots">
            {banners.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              ></span>
            ))}
          </div>
          <button onClick={nextSlide} className="control-btn"><ArrowRight size={24} /></button>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links-section">
        <div className="container">
          <div className="quick-links-container">
            {quickLinksData.map((link, idx) => (
              <div className="quick-link-item" key={idx} onClick={() => navigate(link.path)}>
                <div className="quick-link-img-wrapper">
                  <img src={link.img} alt={link.title} className="quick-link-img" />
                </div>
                <p className="quick-link-title">{link.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diamond Collection Section */}
      <section className="diamond-collection">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <h2>Diamond Jewellery</h2>
            <p className="subtitle">Sparkle through the events with timeless diamonds</p>
          </div>
          <div className="diamond-grid">
            <div className="diamond-main" onClick={() => navigate('/diamond/necklaces')} style={{ cursor: 'pointer' }}>
              <img src="/assets/diamond/diamond-necklace.jpg" alt="Diamond Necklace" />
            </div>
            <div className="diamond-subgrid">
              <div className="diamond-item" onClick={() => navigate('/diamond/rings')} style={{ cursor: 'pointer' }}>
                <img src="/assets/diamond/diamond-ring.jpg" alt="Sleek Rings" />
              </div>
              <div className="diamond-item" onClick={() => navigate('/diamond/bangles')} style={{ cursor: 'pointer' }}>
                <img src="/assets/diamond/diamond-bangle.jpg" alt="Elegant Bangles" />
              </div>
              <div className="diamond-item" onClick={() => navigate('/diamond/earrings')} style={{ cursor: 'pointer' }}>
                <img src="/assets/diamond/diamond-earring.jpg" alt="Stunning Earrings" />
              </div>
              <div className="diamond-item" onClick={() => navigate('/diamond/mangalsutra')} style={{ cursor: 'pointer' }}>
                <img src="/assets/diamond/diamond-mangalsutra.jpg" alt="Stylish Mangalsutras" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Earring Collection */}
      <section className="earring-collection">
        <div className="container">
          <div className="section-header">
            <h2>Earring Collection</h2>
            <p className="subtitle">Our Exclusive Earring Collection</p>
          </div>
          <div className="earring-grid">
            <div className="earring-card" onClick={() => navigate('/products?category=Earrings')}>
              <img src="/assets/gold_menu/Earrings-Menu.png" alt="Studs Collection" className="earring-img" />
              <div className="earring-content">
                <h3>STUDS</h3>
                <p>Collection</p>
              </div>
            </div>
            <div className="earring-card" onClick={() => navigate('/products?category=Earrings')}>
              <img src="/assets/occasion/Earrings.png" alt="Jhumkas Collection" className="earring-img" />
              <div className="earring-content">
                <h3>Jhumkas</h3>
                <p>Collection</p>
              </div>
            </div>
            <div className="earring-card" onClick={() => navigate('/products?category=Earrings')}>
              <img src="/assets/gold/earrings.png" alt="Drops Collection" className="earring-img" />
              <div className="earring-content">
                <h3>Drops</h3>
                <p>Collection</p>
              </div>
            </div>
            <div className="earring-card" onClick={() => navigate('/products?category=Earrings')}>
              <img src="/assets/occasion/Earrings.png" alt="Hoops-Balis Collection" className="earring-img" />
              <div className="earring-content">
                <h3>Hoops-Balis</h3>
                <p>Collection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gemstone Jewellery Section */}
      <section className="gemstone-collection">
        <div className="container">
          <div className="section-header">
            <h2>Gemstone Jewellery</h2>
            <p className="subtitle">Capturing timeless grace in each precious stone</p>
          </div>
          <div className="gemstone-grid">
            <div className="gemstone-card" onClick={() => navigate('/products?category=Necklaces')}>
              <img src="/assets/quicklinks/gemstone_necklace.png" alt="Gemstone Necklaces" className="gemstone-img" />
              <div className="gemstone-overlay">
                <h3>Necklaces</h3>
              </div>
            </div>
            <div className="gemstone-card" onClick={() => navigate('/products?category=Rings')}>
              <img src="/assets/quicklinks/gemstone_rings.png" alt="Gemstone Rings" className="gemstone-img" />
              <div className="gemstone-overlay">
                <h3>Rings</h3>
              </div>
            </div>
            <div className="gemstone-card" onClick={() => navigate('/products?category=Earrings')}>
              <img src="/assets/quicklinks/gemstone_earrings.png" alt="Gemstone Earrings" className="gemstone-img" />
              <div className="gemstone-overlay">
                <h3>Earrings</h3>
              </div>
            </div>
            <div className="gemstone-card" onClick={() => navigate('/products?category=Bangles')}>
              <img src="/assets/quicklinks/gemstone_bangles.png" alt="Gemstone Bangles" className="gemstone-img" />
              <div className="gemstone-overlay">
                <h3>Bangles</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Occasion Section */}
      <section className="occasion-collection">
        <div className="container">
          <div className="section-header">
            <h2>Jewellery for every generation and every occasion</h2>
            <p className="subtitle">Explore elegant collections designed to match every milestone—from your first gift to your forever vows.</p>
          </div>
          <div className="occasion-grid">
            <div className="occasion-card" onClick={() => navigate('/gold/rings')}>
              <img src="/assets/occasion/Rings.png" alt="Rings" />
              <h4>Rings</h4>
            </div>
            <div className="occasion-card" onClick={() => navigate('/gold/necklaces')}>
              <img src="/assets/occasion/Necklaces.png" alt="Necklaces" />
              <h4>Necklaces</h4>
            </div>
            <div className="occasion-card" onClick={() => navigate('/gold/mangalsutra')}>
              <img src="/assets/occasion/Mangalsutra.png" alt="Mangalsutra" />
              <h4>Mangalsutra</h4>
            </div>
            <div className="occasion-card" onClick={() => navigate('/gold/earrings')}>
              <img src="/assets/occasion/Earrings.png" alt="Earrings" />
              <h4>Earrings</h4>
            </div>
            <div className="occasion-card" onClick={() => navigate('/gold/haarams')}>
              <img src="/assets/occasion/Home-Haarams.png" alt="Haarams" />
              <h4>Haarams</h4>
            </div>
            <div className="occasion-card" onClick={() => navigate('/gold/kadaas')}>
              <img src="/assets/occasion/Kadaas.png" alt="Kadaas" />
              <h4>Kadaas</h4>
            </div>
            <div className="occasion-card" onClick={() => navigate('/gold/bangles')}>
              <img src="/assets/occasion/Bangles.png" alt="Bangles" />
              <h4>Bangles</h4>
            </div>
            <div className="occasion-card" onClick={() => navigate('/gold/pendants')}>
              <img src="/assets/occasion/Pendants.png" alt="Pendants" />
              <h4>Pendants</h4>
            </div>
          </div>
          <div className="text-center mt-5">
            <button className="btn btn-primary" onClick={() => navigate('/gold')} style={{ backgroundColor: '#B28713', borderColor: '#B28713' }}>View All Collections</button>
          </div>
        </div>
      </section>

      {/* Bridal Destination Section */}
      <section className="bridal-destination">
        <div className="container">
          <div className="bridal-grid">
            <div className="bridal-content">
              <h2>The No. 1 destination for<br />wedding jewellery</h2>
              <p>Emirates Gold International is your trusted partner for exquisite bridal collections, specializing exclusively in gold and diamond products. Our curated selection features timeless designs and contemporary styles, crafted to make every bride shine on her special day.</p>
              <br />
              <p>With a commitment to quality, authenticity, and exceptional service, Emirates Gold International ensures that your wedding jewellery is as unique and memorable as your celebration.</p>
              <button className="btn btn-primary btn-bridal mt-4" onClick={() => navigate('/collections/bridal')}>Explore Bridal Collections</button>
            </div>
            <div className="bridal-image-wrapper">
              <div className="bridal-decor-frame">
                <div className="bridal-arch-slider" onClick={() => navigate('/collections/bridal')} style={{ cursor: 'pointer' }}>
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={currentBridalSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="bridal-slide"
                      style={{ backgroundImage: `url(${bridalImages[currentBridalSlide]})` }}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Jewellery Section */}
      <section className="gold-jewellery">
        <div className="container">
          <div className="section-header">
            <h2>Gold Jewellery</h2>
            <p className="subtitle">Fine jewellery for life's meaningful moments</p>
          </div>
          <div className="gold-grid">
            <div className="gold-card bg-blush" onClick={() => navigate('/gold/chain')}>
              <div className="gold-content">
                <h3>Elegant<br />Chains</h3>
              </div>
              <img src="/assets/gold/chains.png" alt="Elegant Chains" className="gold-img gold-multichain" />
            </div>
            <div className="gold-card bg-sand" onClick={() => navigate('/gold/rings')}>
              <div className="gold-content">
                <h3>Stunning<br />Ring</h3>
              </div>
              <img src="/assets/gold/ring.png" alt="Stunning Ring" className="gold-img gold-ring" />
            </div>
            <div className="gold-card bg-peach" onClick={() => navigate('/gold/mangalsutra')}>
              <div className="gold-content">
                <h3>Modern<br />Mangalsutras</h3>
              </div>
              <img src="/assets/gold/mangalsutra.png" alt="Modern Mangalsutras" className="gold-img gold-mangalsutra" />
            </div>
            <div className="gold-card bg-beige" onClick={() => navigate('/gold/pendants')}>
              <div className="gold-content">
                <h3>Trendy<br />Pendants</h3>
              </div>
              <img src="/assets/gold/pendant.png" alt="Trendy Pendants" className="gold-img gold-pendant" />
            </div>
            <div className="gold-card bg-taupe" onClick={() => navigate('/gold/bangles')}>
              <div className="gold-content">
                <h3>Gorgeous<br />Bangles</h3>
              </div>
              <img src="/assets/gold/bangles.png" alt="Gorgeous Bangles" className="gold-img gold-bangles" />
            </div>
            <div className="gold-card bg-warm-sand" onClick={() => navigate('/gold/earrings')}>
              <div className="gold-content">
                <h3>Stylish<br />Earrings</h3>
              </div>
              <img src="/assets/gold/earrings.png" alt="Stylish Earrings" className="gold-img gold-earrings" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Collection Section */}
      <section className="our-collection">
        <div className="container">
          <div className="section-header">
            <h2>Our Collection</h2>
            <p className="subtitle">Discover our latest jewellery collection!</p>
          </div>
          <div className="collection-grid">
            <div className="collection-card" onClick={() => navigate('/gold')} style={{ backgroundImage: "url('/assets/collections/mens.png')", cursor: 'pointer' }}>
              <div className="collection-card-overlay"></div>
              <div className="collection-card-content">
                <h3 className="collection-title-mens">LEGENDZ</h3>
                <p className="collection-subtitle">MEN'S COLLECTION</p>
                <div className="collection-btn-container">
                  <button className="btn-discover">DISCOVER</button>
                </div>
              </div>
            </div>

            <div className="collection-card" onClick={() => navigate('/gold')} style={{ backgroundImage: "url('/assets/collections/kids.png')", cursor: 'pointer' }}>
              <div className="collection-card-overlay"></div>
              <div className="collection-card-content">
                <h3 className="collection-title-kids">STARLET</h3>
                <p className="collection-subtitle">KIDS COLLECTION</p>
                <div className="collection-btn-container">
                  <button className="btn-discover">DISCOVER</button>
                </div>
              </div>
            </div>

            <div className="collection-card" onClick={() => navigate('/gold')} style={{ backgroundImage: "url('/assets/collections/traditional.png')", cursor: 'pointer' }}>
              <div className="collection-card-overlay"></div>
              <div className="collection-card-content">
                <h3 className="collection-title-sankha">Sankha Pola</h3>
                <p className="collection-subtitle">Collection</p>
                <div className="collection-btn-container">
                  <button className="btn-discover">DISCOVER</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="promises-carousel-section">
        <div className="container">
          <div className="promises-header">
            <h2>Emirates Promises</h2>
            <p className="subtitle">The promises that we'll never break</p>
          </div>
          <div className="promises-slider-wrapper">
            <div
              className="promises-track"
              style={{ '--slide-idx': currentPromiseSlide }}
            >
              {[...promisesData, ...promisesData].map((promise, idx) => (
                <div className="promise-card-item" key={idx}>
                  <div className="promise-card-inner">
                    <img src={`/assets/promises/${promise.img}`} alt={promise.title} className="promise-icon-img" />
                    <h4>{promise.title}</h4>
                    <p>{promise.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Videos Section */}
      <section className="experience-videos">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2>Experience us in seconds</h2>
          </div>
          <div className="video-grid">
            <div className="video-card" onClick={() => navigate('/diamond')} style={{ cursor: 'pointer' }}>
              <video
                src="/assets/video/diamond_size.mp4"
                className="experience-video-element"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <div className="video-card" onClick={() => navigate('/diamond')} style={{ cursor: 'pointer' }}>
              <video
                src="/assets/video/diamond1.mp4"
                className="experience-video-element"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <div className="video-card" onClick={() => navigate('/gold')} style={{ cursor: 'pointer' }}>
              <video
                src="/assets/video/gold.mp4"
                className="experience-video-element"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <div className="video-card" onClick={() => navigate('/diamond')} style={{ cursor: 'pointer' }}>
              <video
                src="/assets/video/diamond2.mp4"
                className="experience-video-element"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hero-slider {
          height: 85vh;
          position: relative;
          overflow: hidden;
          background: #000;
        }
        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          color: white;
        }
        .slide-content h1 {
          font-size: 4rem;
          color: white;
          margin: 1rem 0;
          line-height: 1.1;
          font-family: 'Playfair Display', serif;
        }
        .slide-subtitle {
          text-transform: uppercase;
          letter-spacing: 3px;
          font-size: 0.9rem;
          color: var(--color-accent);
          font-weight: 700;
        }
        .slide-content p {
          max-width: 600px;
          font-size: 1.2rem;
          margin-bottom: 2.5rem;
          opacity: 0.9;
        }
        .slide-btns {
          display: flex;
          gap: 1.5rem;
        }
        
        .slider-controls {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 2rem;
          z-index: 10;
        }
        .control-btn {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .control-btn:hover {
          background: var(--color-accent);
          border-color: var(--color-accent);
        }
        .dots {
          display: flex;
          gap: 0.8rem;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .dot.active {
          background: var(--color-accent);
          width: 30px;
          border-radius: 5px;
        }

        .diamond-collection {
          padding: 4rem 0 1rem 0;
          background-color: var(--color-bg);
        }
        .diamond-collection .section-header {
          margin-bottom: 2rem;
        }
        .diamond-collection .subtitle {
          color: var(--color-text-light);
          margin-top: 0.5rem;
          font-size: 1.1rem;
        }
        .diamond-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 1.5rem;
        }
        .diamond-main {
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }
        .diamond-main img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }
        .diamond-main:hover img {
          transform: scale(1.05);
        }
        .diamond-subgrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 1.5rem;
        }
        .diamond-item {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
        }
        .diamond-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }
        .diamond-item:hover img {
          transform: scale(1.05);
        }
        .diamond-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 80%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          padding: 2rem;
          color: white;
          text-align: right;
          pointer-events: none;
        }
        .diamond-content h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          line-height: 1.2;
          font-family: 'Playfair Display', serif;
        }
        .diamond-content p {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
        }

        .occasion-collection {
          padding: 3rem 0;
          background-color: white;
        }
        .occasion-collection .section-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .occasion-collection .section-header h2 {
          font-size: 2.2rem;
          color: #111;
          margin-bottom: 1rem;
        }
        .occasion-collection .subtitle {
          color: #555;
          font-size: 1rem;
        }
        .occasion-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .occasion-card {
          background: linear-gradient(145deg, #f8f1fa, #fff);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .occasion-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .occasion-card img {
          width: 85%;
          height: 160px;
          object-fit: contain;
          margin-bottom: 1rem;
        }
        .occasion-card h4 {
          color: #8c3b4a;
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0;
        }
        .mt-5 {
          margin-top: 3rem;
        }
        .text-center {
          text-align: center;
        }

        .bridal-destination {
          padding: 4rem 0;
          background-color: var(--color-bg);
          overflow: hidden;
        }
        .bridal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .bridal-content h2 {
          font-size: 3rem;
          color: #111;
          margin-bottom: 2rem;
          line-height: 1.2;
        }
        .bridal-content p {
          color: #555;
          font-size: 1.1rem;
          line-height: 1.6;
        }
        .btn-bridal {
          background-color: #B28713;
          border-color: #B28713;
          padding: 0.8rem 2rem;
          font-size: 1rem;
          border-radius: 6px;
          color: white;
          text-decoration: underline; text-decoration-color: white; /* Simulate reference button style */
        }
        .mt-4 {
          margin-top: 2rem;
        }
        .bridal-image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .bridal-decor-frame {
          position: relative;
          width: 400px;
          height: 600px;
        }
        /* Top Right Gold Border */
        .bridal-decor-frame::before {
          content: '';
          position: absolute;
          top: -20px;
          right: -20px;
          width: 150px;
          height: 150px;
          border-top: 2px solid #C89F5B;
          border-right: 2px solid #C89F5B;
          z-index: 1;
        }
        /* Bottom Left Gold Border */
        .bridal-decor-frame::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: -20px;
          width: 150px;
          height: 150px;
          border-bottom: 2px solid #C89F5B;
          border-left: 2px solid #C89F5B;
          z-index: 1;
        }
        .bridal-arch-slider {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 200px 200px 0 0;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          z-index: 2;
          background: white;
          padding: 10px;
        }
        /* Ensure bridal image fits */
        .bridal-arch-slider .bridal-slide {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          border-radius: 190px 190px 0 0;
          background-size: cover;
          background-position: center;
        }

        .promises-carousel-section {
          padding: 3rem 0;
          background-color: #fcfbfa; /* Slight off-white */
          overflow: hidden;
        }
        .promises-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .promises-header h2 {
          font-size: 2.5rem;
          color: #111;
          font-family: 'Playfair Display', serif;
          margin-bottom: 0.5rem;
        }
        .promises-header .subtitle {
          color: #111;
          font-size: 1.1rem;
        }
        .promises-slider-wrapper {
          width: 100%;
          overflow: hidden;
        }
        .promises-track {
          display: flex;
          transition: transform 0.8s ease-in-out;
          transform: translateX(calc(-1 * var(--slide-idx, 0) * 25%));
        }
        .promise-card-item {
          flex: 0 0 25%;
          padding: 0 10px;
        }
        .promise-card-inner {
          background: white;
          border: 1px solid #eaeaea;
          border-radius: 12px;
          padding: 2.5rem 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .promise-card-inner:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .promise-icon-img {
          width: 60px;
          height: 60px;
          object-fit: contain;
          margin-bottom: 1.5rem;
        }
        .promise-card-inner h4 {
          font-size: 1.25rem;
          color: #111;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .promise-card-inner p {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.5;
        }

        .our-collection {
          padding: 3rem 0;
          background-color: white;
        }
        .our-collection .section-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .our-collection .section-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          color: #111;
          margin-bottom: 0.5rem;
        }
        .our-collection .subtitle {
          color: #555;
          font-size: 1.1rem;
        }
        .collection-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .collection-card {
          position: relative;
          height: 480px;
          border-radius: 12px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 2rem;
          transition: transform 0.3s ease;
        }
        .collection-card:hover {
          transform: translateY(-5px);
        }
        .collection-card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60%;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
        }
        .collection-card-content {
          position: relative;
          z-index: 2;
          width: 100%;
          text-align: center;
          color: white;
          padding-bottom: 1rem;
        }
        .collection-title-mens {
          font-family: 'Times New Roman', Times, serif;
          letter-spacing: 4px;
          font-size: 2.2rem;
          margin-bottom: 0.2rem;
        }
        .collection-title-kids {
          font-family: 'Comic Sans MS', 'Chalkboard SE', cursive;
          letter-spacing: 2px;
          font-size: 2.2rem;
          margin-bottom: 0.2rem;
        }
        .collection-title-sankha {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 2.5rem;
          margin-bottom: 0.2rem;
        }
        .collection-subtitle {
          font-family: 'Arial', sans-serif;
          letter-spacing: 2px;
          font-size: 0.8rem;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }
        .collection-btn-container {
          display: flex;
          justify-content: center;
        }
        .btn-discover {
          background: transparent;
          border: 1px solid white;
          color: white;
          padding: 0.6rem 2rem;
          font-size: 0.85rem;
          font-weight: bold;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-discover:hover {
          background: white;
          color: black;
        }

        .gold-jewellery {
          padding: 3rem 0;
          background-color: white;
        }
        .gold-jewellery .section-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .gold-jewellery .section-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          color: #111;
          margin-bottom: 0.5rem;
        }
        .gold-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .gold-card {
          position: relative;
          height: 180px;
          border-radius: 90px;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 0 2rem;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .gold-card:hover {
          transform: translateY(-4px);
        }
        .gold-content {
          z-index: 2;
          width: 50%;
        }
        .gold-content h3 {
          font-family: 'Arial', sans-serif;
          font-size: 1.35rem;
          line-height: 1.2;
          font-weight: 600;
          color: #4a3b2c;
        }
        .gold-img {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 55%;
          object-fit: cover;
          z-index: 1;
          border-radius: 0 90px 90px 0;
        }
        /* Color matching reference */
        .bg-blush { background-color: #eeddd8; }
        .bg-sand { background-color: #dfcba4; }
        .bg-peach { background-color: #f1dbcd; }
        .bg-beige { background-color: #fcecd9; }
        .bg-taupe { background-color: #a48b71; }
        .bg-warm-sand { background-color: #dfcba4; }
        /* Font color overrides */
        .bg-taupe .gold-content h3, .bg-sand .gold-content h3, .bg-warm-sand .gold-content h3 { color: #fff; text-shadow: 1px 1px 3px rgba(0,0,0,0.2);}
        .bg-sand .gold-content h3 { color: #4a3b2c; text-shadow: none; }
        .bg-warm-sand .gold-content h3 { color: #4a3b2c; text-shadow: none; }

        .quick-links-section {
          padding: 2.5rem 0 1.5rem 0;
          background-color: white;
          overflow: hidden;
        }
        .quick-links-container {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 2rem;
          overflow-x: auto;
          scrollbar-width: none; /* Firefox */
          padding-bottom: 1rem;
        }
        .quick-links-container::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }
        .quick-link-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 85px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .quick-link-item:hover {
          transform: translateY(-3px);
        }
        .quick-link-img-wrapper {
          width: 85px;
          height: 85px;
          border-radius: 50%;
          border: 1px solid #eababa; /* soft outline like reference */
          padding: 3px;
          margin-bottom: 0.8rem;
          background: white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.03);
        }
        .quick-link-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 50%;
        }
        .quick-link-title {
          font-family: 'Arial', sans-serif;
          font-size: 0.9rem;
          color: #222;
          text-align: center;
          white-space: nowrap;
          font-weight: 500;
        }

        .earring-collection {
          padding: 3rem 0 1rem;
          background-color: white;
        }
        .earring-collection .section-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .earring-collection .section-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          color: #111;
          margin-bottom: 0.5rem;
        }
        .earring-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.2rem;
        }
        .earring-card {
          position: relative;
          height: 160px;
          border: 1px solid #f29c38; /* orange border from reference */
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          background: linear-gradient(135deg, #fdf4e8 0%, #fef8f4 100%); /* warm subtle pastel gradient */
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .earring-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(242, 156, 56, 0.15);
        }
        /* Specific subtle pastel backgrounds for each card matching reference */
        .earring-card:nth-child(1) { background: #fdf2e3; }
        .earring-card:nth-child(2) { background: #fbf5da; }
        .earring-card:nth-child(3) { background: #faeaf2; }
        .earring-card:nth-child(4) { background: #fbf5da; }
        
        .earring-img {
          width: 55%;
          height: 80%;
          object-fit: contain;
          mix-blend-mode: multiply; /* removes white background if any */
        }
        .earring-content {
          width: 45%;
          text-align: right;
        }
        .earring-content h3 {
          font-family: 'Times New Roman', Times, serif;
          font-size: 1.4rem;
          color: #4a3b2c; /* dark brown */
          margin-bottom: 0px;
          line-height: 1.1;
          font-weight: bold;
        }
        .earring-content p {
          font-family: 'Great Vibes', cursive, 'Brush Script MT'; /* Calligraphy font */
          font-size: 1.2rem;
          color: #4a3b2c;
          margin-top: -2px;
        }

        .gemstone-collection {
          padding: 3rem 0;
          background-color: white;
        }
        .gemstone-collection .section-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .gemstone-collection .section-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          color: #111;
          margin-bottom: 0.5rem;
        }
        .gemstone-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.2rem;
        }
        .gemstone-card {
          position: relative;
          height: 320px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .gemstone-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .gemstone-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .gemstone-card:hover .gemstone-img {
          transform: scale(1.05);
        }
        .gemstone-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30%;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 1.5rem;
        }
        .gemstone-overlay h3 {
          font-family: 'Arial', sans-serif;
          font-size: 1.4rem;
          color: white;
          margin: 0;
          font-weight: 500;
        }

        .experience-videos {
          padding: 4rem 0 6rem;
          background-color: white;
        }
        .experience-videos .section-header h2 {
          font-family: 'Arial', sans-serif;
          font-size: 2rem;
          color: #111;
          margin-bottom: 3rem;
          font-weight: 500;
        }
        .video-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .video-card {
          position: relative;
          width: 100%;
          padding-top: 177.77%; /* 16:9 vertical aspect ratio (9/16 = 56.25, but video is maybe 9:16 taller) Let's just use fixed height instead or standard vertical ratio */
          border-radius: 12px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          transform: translateZ(0); /* Force hardware accel for border radius on video */
        }
        .experience-video-element {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        @media (max-width: 992px) {
          .earring-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .gemstone-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .gold-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .collection-grid {
            grid-template-columns: 1fr 1fr;
          }
          .video-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .promise-card-item {
            flex: 0 0 50%;
          }
          .promises-track {
            transform: translateX(calc(-1 * var(--slide-idx, 0) * 50%)) !important;
          }
          .slide-content h1 {
            font-size: 3rem;
          }
          .diamond-grid {
            grid-template-columns: 1fr;
          }
          .occasion-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .bridal-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .bridal-image-wrapper {
            margin-top: 3rem;
          }
        }
        @media (max-width: 576px) {
          .hero-slider {
            height: 45vw;
            min-height: 180px;
          }
          .slide {
            background-size: 100% 100%;
          }
          .slider-controls {
            bottom: 0.5rem;
          }
          .control-btn {
            width: 30px;
            height: 30px;
          }
          .dot {
            width: 6px;
            height: 6px;
          }
          .dot.active {
            width: 15px;
          }
          .quick-links-container {
            gap: 0.8rem;
          }
          .quick-link-item {
            min-width: 65px;
          }
          .quick-link-img-wrapper {
            width: 55px;
            height: 55px;
            padding: 2px;
            margin-bottom: 0.4rem;
          }
          .quick-link-title {
            font-size: 0.65rem;
          }
          .earring-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          .earring-card {
            height: 110px;
            padding: 0 1rem;
            border-radius: 8px;
          }
          .earring-img {
            width: 45%;
            height: 85%;
            transform: scale(1.1);
          }
          .earring-content {
            width: 55%;
          }
          .earring-content h3 {
            font-size: 1.15rem;
          }
          .earring-content p {
            font-size: 1rem;
          }
          .gemstone-grid {
            grid-template-columns: 1fr;
          }
          .gold-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
          .gold-card {
            height: 150px;
            border-radius: 12px;
            padding: 0 1.5rem;
          }
          .gold-content {
            width: 50%;
          }
          .gold-content h3 {
            font-size: 1.35rem;
          }
          .gold-img {
            width: 50%;
            border-radius: 0 12px 12px 0;
          }
          .collection-grid {
            grid-template-columns: 1fr;
          }
          .video-grid {
            grid-template-columns: 1fr;
          }
          .promise-card-item {
            flex: 0 0 100%;
          }
          .promises-track {
            transform: translateX(calc(-1 * var(--slide-idx, 0) * 100%)) !important;
          }
          .slide-content h1 {
            font-size: 2.5rem;
          }
          .slide-btns {
            flex-direction: column;
            gap: 1rem;
          }
          .diamond-subgrid {
            grid-template-columns: 1fr;
          }
          .occasion-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .occasion-card {
            padding: 1rem 0.5rem;
            background: #f4ebf8; /* Soft pastel purple from reference */
            border-radius: 16px;
          }
          .occasion-card img {
            height: 90px;
            width: 90%;
            margin-bottom: 0.8rem;
          }
          .occasion-card h4 {
            font-size: 0.9rem;
          }
          .bridal-content h2 {
            font-size: 2.2rem;
          }
          .bridal-decor-frame {
            width: 300px;
            height: 450px;
          }
          .bridal-arch-slider {
            border-radius: 150px 150px 0 0;
          }
          .bridal-arch-slider .bridal-slide {
            border-radius: 140px 140px 0 0;
          }
        }
      `}} />
    </div>
  );
};

export default Home;
