import { useState, useEffect } from 'react';

const generateRandomImageUrl = () => {
    let random = Math.floor(Math.random() * 1000);
    let lastAdSeen = sessionStorage.getItem('lastRandom');
    while (random == lastAdSeen) {
        random = Math.floor(Math.random() * 1000);
    }

    sessionStorage.setItem('lastRandom', random);
    return `${process.env.NEXT_PUBLIC_API_URL}/ads?r=${random}`;
};

const ProductAd = () => {
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('');
    const imageLoaded = () => setLoading(false);

    useEffect(() => {
        setUrl(generateRandomImageUrl());
    }, []);
    return (
        <>
            <div
                className="image-container"
                style={{ display: loading ? 'block' : 'none', paddingTop: 50 }}>
                <h3 className="title has-text-centered is-3">Loading AD, please wait...</h3>
            </div>
            <div className="image-ad-container" style={{ display: loading ? 'none' : 'block' }}>
                <img
                    className="image-face"
                    onLoad={imageLoaded}
                    style={{ display: !loading ? 'block' : 'none' }}
                    src={url}
                    alt="ad"></img>
            </div>
        </>
    );
};

export default ProductAd;
