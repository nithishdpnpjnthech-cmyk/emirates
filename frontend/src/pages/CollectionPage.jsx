import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/api';

const collectionData = {
    'mahathi': {
        title: 'Mahathi Antique Collection',
        image: '/assets/collection_menu/mahathi.png',
        description: 'Exquisite antique designs inspired by timeless heritage.'
    },
    'amuliya': {
        title: 'Amuliya Diamonds & Gold',
        image: '/assets/collection_menu/amuliya-Menu2.png',
        description: 'A brilliant harmony of pristine diamonds and pure gold.'
    },
    'bridal': {
        title: 'Indian Bridal',
        image: '/assets/collection_menu/indian-bridal.png',
        description: 'Magnificent bridal sets crafted for your special day.'
    },
    'ethnic': {
        title: 'Indian Ethnic',
        image: '/assets/collection_menu/indian-Ethnic.png',
        description: 'Traditional artistry reflecting vibrant cultural roots.'
    },
    'ruby-emerald': {
        title: 'Ruby and Emerald',
        image: '/assets/collection_menu/ruby-and-Emerald-1.png',
        description: 'Majestic precious stones set in elegant gold frameworks.'
    },
    'apsara': {
        title: 'Apsara Rose Gold',
        image: '/assets/collection_menu/apsara.png',
        description: 'Modern elegance meets the soft warmth of rose gold.'
    }
};

const CollectionPage = () => {
    const { id } = useParams();
    const collection = collectionData[id];
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await productService.getAllProducts();
                const allData = response.data;
                // Filter for Gold or Diamond
                const filtered = allData.filter(p =>
                    p.metalType?.toLowerCase() === 'gold' ||
                    p.metalType?.toLowerCase() === 'diamond'
                );
                // Shuffle
                setProducts(shuffleArray(filtered));
            } catch (error) {
                console.error("Error fetching collection products:", error);
                if (error.response) {
                    console.error('Data:', error.response.data);
                    console.error('Status:', error.response.status);
                } else if (error.request) {
                    console.error('Request:', error.request);
                } else {
                    console.error('Message:', error.message);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [id]);

    if (!collection) {
        return (
            <div className="collection-not-found container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>Collection Not Found</h2>
                <Link to="/collections" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>View All Collections</Link>
            </div>
        );
    }

    const filteredProducts = products.filter(product => {
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            const pCats = Array.isArray(product.category) ? product.category : [product.category];
            if (!pCats.some(c => selectedCategories.includes(c))) return false;
        }
        if (selectedMetals.length > 0 && !selectedMetals.includes(product.metalType)) return false;

        const price = product.price || 0;
        if (minPrice && price < parseFloat(minPrice)) return false;
        if (maxPrice && price > parseFloat(maxPrice)) return false;
        return true;
    }).sort((a, b) => {
        if (sortBy === 'Price: Low to High') return (a.price || 0) - (b.price || 0);
        if (sortBy === 'Price: High to Low') return (b.price || 0) - (a.price || 0);
        return 0;
    });

    return (
        <div className="collection-page">
            {/* 1. Collection Banner Image */}
            <div className="collection-hero">
                <img src={collection.image} alt={collection.title} className="collection-hero-image" />
            </div>

            <div className="container">
                {/* 2. Collection Title */}
                <div className="collection-header text-center">
                    <h1 className="collection-title">{collection.title}</h1>
                    <p className="collection-description">{collection.description}</p>
                </div>

                <div className="main-content-wrapper" style={{ marginTop: '1rem' }}>
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
                            <div style={{ textAlign: 'center', padding: '3rem' }}>
                                <div className="loading-spinner" style={{ fontSize: '2rem' }}>⏳</div>
                                <p>Loading collection...</p>
                            </div>
                        ) : (
                            <div className="products-grid">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                                {filteredProducts.length === 0 && (
                                    <div className="no-products" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
                                        No products found matching your criteria.
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .collection-page {
            padding-bottom: 4rem;
            background-color: var(--color-background, #fdfbf7);
        }
        .collection-hero {
            width: 100%;
            height: auto;
            max-height: 400px;
            overflow: hidden;
            background-color: #000;
        }
        .collection-hero-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .collection-header {
            padding: 3rem 0 1rem;
            max-width: 800px;
            margin: 0 auto;
        }
        .collection-title {
            font-family: var(--font-heading);
            color: var(--color-primary);
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        .collection-description {
            color: #666;
            font-size: 1.1rem;
            line-height: 1.6;
        }
        .products-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }
        
        /* Sidebar layout matching ProductList.jsx */
        .main-content-wrapper {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3rem;
        }
        .filters-sidebar {
          background: white;
          padding: 1.5rem;
          border: 1px solid var(--color-border, #e5e7eb);
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
          color: var(--color-text-light, #6b7280);
          cursor: pointer;
        }
        .price-inputs {
          display: flex;
          gap: 1rem;
        }
        .price-inputs input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid var(--color-border, #e5e7eb);
          border-radius: 4px;
        }
        
        /* Main product section toolbar */
        .products-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding: 1rem 0;
          border-bottom: 1px solid var(--color-border, #e5e7eb);
        }
        .products-toolbar span {
          color: var(--color-accent);
          font-weight: 700;
        }
        .products-toolbar select {
          margin-left: 0.5rem;
          padding: 0.3rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        @media (max-width: 1200px) {
            .products-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 992px) {
            .main-content-wrapper { grid-template-columns: 1fr; }
            .filters-sidebar { display: none; }
            .products-grid { grid-template-columns: repeat(2, 1fr); }
            .collection-hero { max-height: 300px; }
            .collection-title { font-size: 2rem; }
        }
        @media (max-width: 576px) {
            .products-grid { grid-template-columns: 1fr; }
            .collection-hero { max-height: 200px; }
            .collection-title { font-size: 1.5rem; }
            .collection-header { padding: 2rem 1rem; }
        }
        `}} />
        </div>
    );
};

export default CollectionPage;
