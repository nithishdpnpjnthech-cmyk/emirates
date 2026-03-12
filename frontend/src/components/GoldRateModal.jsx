import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const GoldRateModal = ({ isOpen, onClose }) => {
    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchRates();
        }
    }, [isOpen]);

    const fetchRates = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetching from the new Spring Boot API
            const response = await fetch('/api/gold-rate', { cache: 'no-store' });
            if (!response.ok) throw new Error('Failed to fetch rates');
            const data = await response.json();

            if (data.error) throw new Error(data.error);

            setRates(data);
        } catch (err) {
            console.error('Error fetching gold rates:', err);
            setError('Unable to fetch live rates. Showing last available values.');
            // Fallback to cache or mock if necessary, but here we just show error message as per original implementation
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const formatINR = (n) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(n);
    };

    const g22 = rates ? Number(rates.gold_22k_per_gram || rates.gold) : null;
    const g24 = rates ? Number(rates.gold_24k_per_gram || (g22 ? g22 * (24 / 22) : null)) : null;

    return (
        <div className="grm-overlay" onClick={(e) => e.target.classList.contains('grm-overlay') && onClose()}>
            <div className="grm-card" role="dialog" aria-modal="true">
                <div className="grm-header">
                    <div className="grm-header-left">
                        <img src="/assets/emirates_logo.png" alt="Emirates Gold" className="grm-logo" />
                        <div>
                            <h3>Today's Gold Rate</h3>
                            <p className="grm-status">
                                {loading ? 'Updating...' : (rates ? `Last updated: ${rates.updatedAt_ist || new Date(rates.updatedAt * 1000).toLocaleString('en-IN')}` : 'Unable to fetch live data')}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="grm-close-btn" aria-label="Close">
                        <X size={24} />
                    </button>
                </div>

                <div className="grm-body">
                    {error && <div className="grm-error-alert">{error}</div>}

                    <div className="grm-rates-grid">
                        <div className="grm-rate-item">
                            <span className="grm-label">GOLD 22K</span>
                            <div className="grm-value-wrapper">
                                <span className="grm-value">{loading ? '—' : (g22 ? formatINR(g22) : '—')}</span>
                                <span className="grm-unit">per gram</span>
                            </div>
                            <p className="grm-ten-gram">{loading ? '—' : (g22 ? `${formatINR(g22 * 10)} per 10g` : '— per 10g')}</p>
                        </div>

                        <div className="grm-rate-item">
                            <span className="grm-label">GOLD 24K</span>
                            <div className="grm-value-wrapper">
                                <span className="grm-value">{loading ? '—' : (g24 ? formatINR(g24) : '—')}</span>
                                <span className="grm-unit">per gram</span>
                            </div>
                            <p className="grm-ten-gram">{loading ? '—' : (g24 ? `${formatINR(g24 * 10)} per 10g` : '— per 10g')}</p>
                        </div>
                    </div>
                </div>

                <div className="grm-footer">
                    <a href="/gold" className="grm-btn-explore" onClick={onClose}>Explore Gold</a>
                    <button onClick={onClose} className="grm-btn-close">Close</button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .grm-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }
                .grm-card {
                    background: #fff;
                    width: min(560px, 92vw);
                    border-radius: 20px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    overflow: hidden;
                    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .grm-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20px 24px;
                    background: #0b1a2b;
                    color: #fff;
                }
                .grm-header-left {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .grm-logo {
                    width: 44px;
                    height: 44px;
                    border-radius: 10px;
                    object-fit: cover;
                    background: #fff;
                    padding: 2px;
                }
                .grm-header h3 {
                    margin: 0;
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #fff;
                    font-family: 'Playfair Display', serif;
                }
                .grm-status {
                    margin: 2px 0 0;
                    font-size: 0.75rem;
                    opacity: 0.8;
                }
                .grm-close-btn {
                    background: transparent;
                    border: none;
                    color: #fff;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 50%;
                    transition: background 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .grm-close-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
                .grm-body {
                    padding: 24px;
                }
                .grm-error-alert {
                    background: #fff3f3;
                    color: #b00020;
                    border: 1px solid #ffd7d7;
                    padding: 12px 16px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    font-size: 0.9rem;
                }
                .grm-rates-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }
                .grm-rate-item {
                    background: #f8fafc;
                    border: 1px solid #eef2f7;
                    border-radius: 16px;
                    padding: 20px;
                    transition: transform 0.2s;
                }
                .grm-rate-item:hover {
                    transform: translateY(-2px);
                    border-color: #d4af37;
                }
                .grm-label {
                    display: block;
                    font-size: 0.7rem;
                    color: #64748b;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 8px;
                }
                .grm-value-wrapper {
                    display: flex;
                    align-items: baseline;
                    gap: 8px;
                }
                .grm-value {
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: #0f172a;
                }
                .grm-unit {
                    font-size: 0.85rem;
                    color: #64748b;
                }
                .grm-ten-gram {
                    margin: 8px 0 0;
                    font-size: 0.9rem;
                    color: #475569;
                    font-weight: 500;
                }
                .grm-footer {
                    padding: 0 24px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 12px;
                }
                .grm-btn-explore {
                    background: #d4af37;
                    color: #fff !important;
                    text-decoration: none;
                    font-weight: 700;
                    padding: 12px 24px;
                    border-radius: 12px;
                    font-size: 0.95rem;
                    transition: filter 0.2s;
                }
                .grm-btn-explore:hover {
                    filter: brightness(1.1);
                }
                .grm-btn-close {
                    background: #0b1a2b;
                    color: #fff;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 12px;
                    font-size: 0.95rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .grm-btn-close:hover {
                    background: #162a3f;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                @media (max-width: 480px) {
                    .grm-rates-grid {
                        grid-template-columns: 1fr;
                        gap: 12px;
                    }
                    .grm-footer {
                        flex-direction: column;
                    }
                    .grm-btn-explore, .grm-btn-close {
                        width: 100%;
                        text-align: center;
                    }
                    .grm-header h3 {
                        font-size: 1.1rem;
                    }
                }
            ` }} />
        </div>
    );
};

export default GoldRateModal;
