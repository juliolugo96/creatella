import ProductAd from '@/components/products/ProductAd';

const AdCard = () => (
    <div className="card scale-in-left">
        <div className="image-container card-image has-text-centered">
            <figure className="image">
                <ProductAd />
            </figure>
        </div>
        <div className="card-content">
            <div className="media has-text-centered">
                <div className="media-content">
                    <p className="title is-4">Ad</p>
                    <p className="subtitle is-6 has-text-grey-light">Sponsored by: Creatella</p>
                </div>
            </div>

            <h2 className="title is-2 has-text-centered">AD</h2>

            <div className="content has-text-centered">
                <hr />
                <p className="is-italic">@ Creatella, 2020</p>
            </div>
        </div>
    </div>
);

export default AdCard;
