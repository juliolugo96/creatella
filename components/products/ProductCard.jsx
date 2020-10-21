import PropTypes from 'prop-types';
import { timeSince } from '@/components/products/functions';

const ProductCard = ({ size, face, date, price, id }) => (
    <div className="card scale-in-left">
        <div className="image-container card-image has-text-centered">
            <p className="image-face" style={{ fontSize: size }}>
                {face}
            </p>
        </div>
        <div className="card-content">
            <div className="media has-text-centered">
                <div className="media-content">
                    <p className="title is-4">Size {size}</p>
                    <p className="subtitle is-6 has-text-grey-light">
                        {timeSince(new Date(date).getTime())}
                    </p>
                </div>
            </div>

            <h2 className="title is-2 has-text-centered">${price}</h2>

            <div className="content has-text-centered">
                <hr />
                <p className="is-italic">{id}</p>
            </div>
        </div>
    </div>
);

ProductCard.propTypes = {
    size: PropTypes.number,
    face: PropTypes.string,
    date: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string
};

export default ProductCard;
