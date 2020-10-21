import { DROPDOWN_ITEMS } from '@/components/products/constants';
import PropTypes from 'prop-types';

const ProductSortingDropdown = ({ sort, callback }) => {
    return (
        <div className="dropdown">
            <div className="dropdown-trigger">
                <button
                    className="button is-light"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu">
                    {'Sort by: '}&nbsp;
                    <span className="has-text-weight-bold">
                        {sort || ' Choose a sorting criteria'}
                    </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    {DROPDOWN_ITEMS.map((name, id) => (
                        <button
                            key={id}
                            className={`button ${
                                sort === name ? 'is-link' : 'is-text'
                            } dropdown-item`}
                            onMouseDown={() => callback(name)}>
                            <span className="has-text-weight-bold">{name} </span>
                        </button>
                    ))}

                    <hr className="dropdown-divider" />
                    <button
                        className="button is-text dropdown-item"
                        onMouseDown={() => callback(null)}>
                        No sort
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductSortingDropdown.propTypes = {
    sort: PropTypes.string,
    callback: PropTypes.func
};

export default ProductSortingDropdown;
