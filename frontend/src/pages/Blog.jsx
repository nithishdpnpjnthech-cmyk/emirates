import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Dummy blog data
  const blogPosts = [
    {
      id: 1,
      title: "The Timeless Appeal of Antique Gold Jewelry",
      excerpt: "Discover why antique gold jewelry continues to capture hearts across generations and how to style these heritage pieces.",
      image: "/assets/blog_antique.png",
      category: "Jewelry Trends",
      author: "Emma White",
      date: "Oct 15, 2026"
    },
    {
      id: 2,
      title: "Understanding Diamond Cuts: A Buyer's Guide",
      excerpt: "Before making your next big purchase, learn the intricacies of diamond cuts and how they affect brilliance and value.",
      image: "/assets/blog_diamond.png",
      category: "Education",
      author: "David Chen",
      date: "Oct 22, 2026"
    },
    {
      id: 3,
      title: "Bridal Jewelry Sets for the Modern Bride",
      excerpt: "Explore our latest curated bridal collections designed to complement contemporary wedding styles while honoring tradition.",
      image: "/assets/blog_bridal.png",
      category: "Bridal",
      author: "Sarah Ahmed",
      date: "Nov 05, 2026"
    },
    {
      id: 4,
      title: "Caring for Your Precious Gemstones",
      excerpt: "Essential tips and techniques to keep your rubies, emeralds, and sapphires sparkling for a lifetime.",
      image: "/assets/blog_diamond.png",
      category: "Care Guide",
      author: "Michael Brown",
      date: "Nov 12, 2026"
    },
    {
      id: 5,
      title: "The Rise of Rose Gold in Men's Accessories",
      excerpt: "Why rose gold is becoming the metal of choice for modern men's watches, bands, and subtle accessories.",
      image: "/assets/blog_antique.png",
      category: "Trends",
      author: "Alex Morgan",
      date: "Nov 19, 2026"
    },
    {
      id: 6,
      title: "Investing in 24K Gold: What You Need to Know",
      excerpt: "A comprehensive guide on purchasing 24K gold coins and bars as a stable investment strategy in today's market.",
      image: "/assets/blog_bridal.png",
      category: "Investment",
      author: "Robert King",
      date: "Dec 01, 2026"
    }
  ];

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="hero-content">
            <h1>Emirates Gold Journal</h1>
            <p>Insights, trends, and inspiration from the world of luxury jewelry.</p>
          </motion.div>
        </div>
      </div>

      <div className="container blog-content-section">

        {/* Featured Post */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="featured-post">
          <div className="featured-image">
            <img src={blogPosts[0].image} alt={blogPosts[0].title} />
            <span className="category-badge">{blogPosts[0].category}</span>
          </div>
          <div className="featured-content">
            <div className="post-meta">
              <span><Calendar size={14} /> {blogPosts[0].date}</span>
              <span><User size={14} /> {blogPosts[0].author}</span>
            </div>
            <h2>{blogPosts[0].title}</h2>
            <p>{blogPosts[0].excerpt}</p>
            <Link to="#" className="read-more-btn">Read Article <ArrowRight size={16} /></Link>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {blogPosts.slice(1).map((post, index) => (
            <motion.div
              key={post.id}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="blog-card"
            >
              <div className="card-image">
                <img src={post.image} alt={post.title} />
                <span className="category-badge">{post.category}</span>
              </div>
              <div className="card-content">
                <div className="post-meta">
                  <span><Calendar size={14} /> {post.date}</span>
                  <span><User size={14} /> {post.author}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link to="#" className="read-more-link">Read More</Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination placeholder */}
        <div className="pagination">
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn next">Next &raquo;</button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .blog-page {
          background-color: #f9fbfd;
          padding-bottom: 80px;
        }

        .blog-hero {
          background: #0b1a2b;
          color: white;
          padding: 80px 0;
          text-align: center;
          margin-bottom: 60px;
        }

        .blog-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: 3.5rem;
          margin-bottom: 10px;
          color: #d4af37;
        }

        .blog-hero p {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .blog-content-section {
          max-width: 1200px;
          margin: 0 auto;
        }

        .category-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: #d4af37;
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          z-index: 2;
        }

        .post-meta {
          display: flex;
          align-items: center;
          gap: 20px;
          color: #718096;
          font-size: 0.9rem;
          margin-bottom: 15px;
        }

        .post-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Featured Post */
        .featured-post {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.06);
          margin-bottom: 60px;
        }

        .featured-image {
          position: relative;
          height: 100%;
          min-height: 400px;
        }

        .featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
        }

        .featured-content {
          padding: 60px 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .featured-content h2 {
          font-family: 'Playfair Display', serif;
          color: #0b1a2b;
          font-size: 2.5rem;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .featured-content p {
          color: #4a5568;
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .read-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #0b1a2b;
          color: white;
          padding: 14px 28px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          align-self: flex-start;
          transition: all 0.3s ease;
        }

        .read-more-btn:hover {
          background: #d4af37;
          transform: translateY(-2px);
        }

        /* Blog Grid */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 40px;
          margin-bottom: 60px;
        }

        .blog-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
        }

        .card-image {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .blog-card:hover .card-image img {
          transform: scale(1.05);
        }

        .card-content {
          padding: 30px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .card-content h3 {
          font-family: 'Playfair Display', serif;
          color: #0b1a2b;
          font-size: 1.5rem;
          line-height: 1.3;
          margin-bottom: 15px;
        }

        .card-content p {
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 25px;
          flex-grow: 1;
        }

        .read-more-link {
          color: #d4af37;
          font-weight: 700;
          text-decoration: none;
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          display: inline-block;
          transition: color 0.2s;
        }

        .read-more-link:hover {
          color: #0b1a2b;
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .page-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          color: #4a5568;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .page-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e0;
        }

        .page-btn.active {
          background: #0b1a2b;
          color: white;
          border-color: #0b1a2b;
        }

        .page-btn.next {
          width: auto;
          padding: 0 20px;
        }

        @media (max-width: 992px) {
          .featured-post {
            grid-template-columns: 1fr;
          }
          .featured-image {
            min-height: 300px;
          }
        }

        @media (max-width: 768px) {
          .blog-hero h1 { font-size: 2.5rem; }
          .featured-content { padding: 40px 30px; }
          .featured-content h2 { font-size: 2rem; }
        }
        `
      }} />
    </div>
  );
};

export default Blog;
