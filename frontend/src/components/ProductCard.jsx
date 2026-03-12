import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="product-card"
    >
      <Link to={`/products/${product.id}`}>
        <div className="product-image">
          <img
            src={product.image.startsWith('/') ? product.image : `/${product.image}`}
            alt={product.name}
            onError={e => { e.target.src = 'https://placehold.co/300x300?text=Jewellery'; }}
          />
          <div className="product-overlay">
            <button className="btn btn-primary">View Details</button>
          </div>
        </div>
        <div className="product-info">
          <span className="metal-type">{product.metalType}</span>
          <h3>{product.name}</h3>
          <p className="product-code">SKU: {product.code}</p>
          <p className="product-weight">Weight: {product.weight}</p>
        </div>
      </Link>

      <style dangerouslySetInnerHTML={{
        __html: `
        .product-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          transition: var(--transition-smooth);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          text-align: center;
        }
        .product-image {
          position: relative;
          height: 300px;
          overflow: hidden;
          background-color: #f9f9f9;
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: var(--transition-smooth);
        }
        .product-card:hover .product-image img {
          transform: scale(1.1);
        }
        .product-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition-smooth);
        }
        .product-card:hover .product-overlay {
          opacity: 1;
        }
        .product-info {
          padding: 1.5rem;
        }
        .metal-type {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--color-accent);
          font-weight: 700;
          display: block;
          margin-bottom: 0.5rem;
        }
        .product-info h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .product-code, .product-weight {
          font-size: 0.85rem;
          color: var(--color-text-light);
          margin-bottom: 0.2rem;
        }
      `}} />
    </motion.div>
  );
};

export default ProductCard;
