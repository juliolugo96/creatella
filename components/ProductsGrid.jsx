import { useEffect, useState, useRef, Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import ProductCard from '@/components/products/ProductCard';
import ProductAd from '@/components/products/ProductAd';
import ProductSortingDropdown from '@/components/products/ProductSortingDropdown';
import { getProducts } from '@/api/index';
import { infiniteScroll, dropdownOpenEvent } from '@/components/products/functions.js';

const ProductsGrid = () => {
    /// State
    const [{ productsList, loading, page, limit, isFinal }, setState] = useState({
        productsList: [],
        loading: false,
        page: 1,
        limit: 10,
        isFinal: false
    });
    const [sort, setSort] = useState(null);
    const [isBottom, setIsBottom] = useState(false);

    /// Handle scroll

    const handleScroll = () => {
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
        const scrollHeight =
            (document.documentElement && document.documentElement.scrollHeight) ||
            document.body.scrollHeight;
        if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
            setIsBottom(true);
        }
    };

    /// Refs
    const mounted = useRef();

    /// Effects
    useEffect(() => {
        const fetchProducts = async () => {
            setState({ productsList, page, limit, isFinal, loading: true });
            getProducts({ page: 1, limit, sort }).then((data) => {
                setState({
                    loading: false,
                    productsList: [...data],
                    page: 1,
                    limit,
                    isFinal
                });
                !mounted.current &&
                    window.addEventListener('scroll', () => infiniteScroll(handleScroll));
                mounted.current = true;
            });
        };
        fetchProducts();
        return () => window.removeEventListener('scroll', () => infiniteScroll(handleScroll));
    }, [sort]);

    useEffect(() => {
        const appendProducts = async () => {
            if (productsList.length !== 0) {
                setState({ productsList, page, limit, isFinal, loading: true });
                getProducts({ page: page + 1, limit, sort }).then((data) => {
                    setState((prevState) => ({
                        loading: false,
                        productsList: prevState.productsList.concat(data),
                        page: page + 1,
                        limit,
                        isFinal: data.length < limit
                    }));
                    setIsBottom(data.length < limit ? true : false);
                });
            }
        };
        isBottom && appendProducts();
    }, [isBottom]);

    useEffect(dropdownOpenEvent, []);

    return (
        <div className="container">
            <h1 className="title is-1 has-text-centered is-spaced slide-in-fwd-center">
                Products Grid
            </h1>

            <h3 className="subtitle is-3 has-text-centered slide-in-fwd-center">
                Here you&apos;re sure to find a bargain on some of the finest ascii available to
                purchase. Be sure to peruse our selection of ascii faces in an exciting range of
                sizes and prices.
            </h3>

            <div className="has-text-centered">
                <ProductSortingDropdown sort={sort} callback={setSort} />
            </div>

            <div className="columns is-multiline is-vcentered mt-6">
                {productsList?.slice(0, page * limit).map((product, id) => {
                    return (
                        <Fragment key={id}>
                            {id % 20 === 0 ? (
                                <div className="column is-one-quarter">
                                    <div className="card scale-in-left">
                                        <div className="card-image has-text-centered">
                                            <figure className="image">
                                                <ProductAd />
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            <div className="column is-one-quarter" key={product.id}>
                                <ProductCard {...product} />
                            </div>
                        </Fragment>
                    );
                })}
            </div>

            {loading && !isFinal && <Skeleton count={5} />}
            {isFinal && !loading && (
                <h1 className="title is-one has-text-centered">End of the catalogue!</h1>
            )}
        </div>
    );
};

export default ProductsGrid;
