import React, { useEffect, useState, useRef } from 'react';
import '../HeartTransition.css';
import { useLocation } from 'react-router';

const HeartTransition = ({ children }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const isInitialMount = useRef(true); 

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false; 
            const minTime = new Promise(res => setTimeout(res, 100));
            Promise.all([minTime]).then(() => setLoading(false));

            return;
        }

        setLoading(true);
        const minTime = new Promise(res => setTimeout(res, 1500));
        const loadDone = new Promise(res => window.requestIdleCallback(res, { timeout: 1500 }));

        Promise.all([minTime, loadDone]).then(() => setLoading(false));
    }, [location.pathname]);

    return (
        <>
            {loading && (
                <div className="route-loader flex items-center justify-center bg-[#0f172a]">
                    <div className="flex gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-400 animate-bounce"></div>
                        <div className="w-5 h-5 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-5 h-5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            )}

            <div style={{ opacity: loading ? 0.3 : 1, transition: "opacity 0.3s ease" }}>
                {children}
            </div>
        </>
    )
}

export default HeartTransition