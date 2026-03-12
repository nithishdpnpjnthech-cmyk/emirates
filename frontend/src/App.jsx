import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CollectionPage from './pages/CollectionPage';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

function App() {
    return (
        <Router>
            <div className="app-wrapper">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/collections/:id" element={<CollectionPage />} />
                        <Route path="/gold" element={<ProductList metalType="Gold" />} />
                        <Route path="/gold/:category" element={<ProductList metalType="Gold" />} />
                        <Route path="/diamond" element={<ProductList metalType="Diamond" />} />
                        <Route path="/diamond/:category" element={<ProductList metalType="Diamond" />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/blog" element={<Blog />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
