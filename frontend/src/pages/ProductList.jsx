import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronDown } from 'lucide-react';

const ProductList = ({ metalType: propMetalType }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { category: urlCategory } = useParams();

  const category = urlCategory || searchParams.get('category');
  const queryMetalType = searchParams.get('metalType');
  const metalType = propMetalType || queryMetalType;

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMetals, setSelectedMetals] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('New Arrivals');

  const handleCategoryChange = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleMetalChange = (metal) => {
    setSelectedMetals(prev =>
      prev.includes(metal) ? prev.filter(m => m !== metal) : [...prev, metal]
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let response;
        if (metalType && category) {
          response = await productService.getProductsByPath(metalType, category);
        } else {
          response = await productService.getAllProducts({ category, metalType });
        }
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Data:', error.response.data);
          console.error('Status:', error.response.status);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Message:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, metalType]);

  // Apply filters and sorting
  const filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      // check if category array exists, if so check if any match
      const pCats = Array.isArray(product.category) ? product.category : [product.category];
      if (!pCats.some(c => selectedCategories.includes(c))) {
        return false;
      }
    }

    // Metal filter
    if (selectedMetals.length > 0 && !selectedMetals.includes(product.metalType)) {
      return false;
    }

    // Price filter
    const price = product.price || 0;
    if (minPrice && price < parseFloat(minPrice)) return false;
    if (maxPrice && price > parseFloat(maxPrice)) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'Price: Low to High') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'Price: High to Low') return (b.price || 0) - (a.price || 0);
    return 0; // New Arrivals could be based on ID or date, skipping for now
  });

  return (
    <div className="product-list-page">
      <div className="category-banner">
        <div className="container">
          <h1>{metalType ? `${metalType} ${category || 'Jewelry'}` : (category || 'Our Collection')}</h1>
          <p>Discover perfection in every detail with our exclusive range.</p>
        </div>
      </div>

      <div className="container main-content-wrapper">
        <aside className="filters-sidebar">
          <div className="filter-section">
            <div className="filter-header">
              <Filter size={18} />
              <h4>Filters</h4>
            </div>

            <div className="filter-group">
              <div className="group-label">Category <ChevronDown size={14} /></div>
              <div className="group-options">
                {['Bangles', 'Necklaces', 'Rings', 'Earrings'].map(cat => (
                  <label key={cat}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    /> {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="group-label">Metal <ChevronDown size={14} /></div>
              <div className="group-options">
                {['Gold', 'Diamond'].map(metal => (
                  <label key={metal}>
                    <input
                      type="checkbox"
                      checked={selectedMetals.includes(metal)}
                      onChange={() => handleMetalChange(metal)}
                    /> {metal}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="group-label">Price Range <ChevronDown size={14} /></div>
              <div className="price-inputs">
                <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
              </div>
            </div>
          </div>
        </aside>

        <main className="products-main">
          <div className="products-toolbar">
            <p>Showing <span>{filteredProducts.length}</span> products</p>
            <div className="sort-by">
              Sort by:
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option>New Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-spinner">Loading exquisite pieces...</div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
              {filteredProducts.length === 0 && (
                <div className="no-products">No products found matching your criteria.</div>
              )}
            </div>
          )}
        </main>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .product-list-page {
          padding-bottom: 5rem;
        }
        .category-banner {
          background-color: var(--color-ivory);
          padding: 4rem 0;
          text-align: center;
          margin-bottom: 3rem;
          border-bottom: 1px solid var(--color-border);
        }
        .category-banner h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          text-transform: capitalize;
        }
        .main-content-wrapper {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3rem;
        }
        .filters-sidebar {
          background: white;
          padding: 1.5rem;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          height: fit-content;
          position: sticky;
          top: 100px;
        }
        .filter-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--color-accent);
        }
        .filter-group {
          margin-bottom: 2rem;
        }
        .group-label {
          font-weight: 700;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-heading);
          color: var(--color-primary);
        }
        .group-options label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--color-text-light);
          cursor: pointer;
        }
        .price-inputs {
          display: flex;
          gap: 1rem;
        }
        .price-inputs input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid var(--color-border);
          border-radius: 4px;
        }
        .products-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding: 1rem 0;
          border-bottom: 1px solid var(--color-border);
        }
        .products-toolbar span {
          color: var(--color-accent);
          font-weight: 700;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .loading-spinner, .no-products {
          grid-column: 1 / -1;
          text-align: center;
          padding: 5rem;
          font-style: italic;
          color: var(--color-text-light);
        }
        @media (max-width: 992px) {
          .main-content-wrapper {
            grid-template-columns: 1fr;
          }
          .filters-sidebar {
            display: none; /* In real app, we'd make this a drawer */
          }
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 576px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </div>
  );
};

export default ProductList;
