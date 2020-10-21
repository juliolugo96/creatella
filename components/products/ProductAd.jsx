import { useState } from 'react';

const generateRandomImageUrl = () => {
    const random = Math.floor(Math.random() * 1000);
    return `${process.env.NEXT_PUBLIC_API_URL}/ads?r=${random}`;
};

const ProductAd = () => {
    const [loading, setLoading] = useState(true);
    const imageLoaded = () => setLoading(false);
    const url = generateRandomImageUrl();
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
