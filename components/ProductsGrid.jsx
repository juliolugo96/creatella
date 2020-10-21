import { useEffect, useState, useRef, Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import ProductCard from '@/components/products/ProductCard';
import ProductAd from '@/components/products/ProductAd';
import ProductSortingDropdown from '@/components/products/ProductSortingDropdown';
import { getProducts } from '@/api/index';
import {
    infiniteScroll,
    dropdownOpenEvent,
    willShowAd,
    handleScroll
} from '@/components/products/functions.js';
import { FETCH_LIMIT } from '@/components/products/constants';

const ProductsGrid = () => {
    /// State
    const [{ productsList, loading, page, limit, isFinal, preFetchPage }, setState] = useState({
        productsList: [],
        loading: true,
        page: 1,
        preFetchPage: 1,
        limit: FETCH_LIMIT,
        isFinal: false
    });
    const [sort, setSort] = useState(null);
    const [isBottom, setIsBottom] = useState(false);

    /// Refs
    const mounted = useRef();

    /// Main fetching function
    const fetch = async (sortOrMounted = false) => {
        const newPage = sortOrMounted ? 1 : page + 1;
        setState({
            productsList: sortOrMounted ? [] : productsList,
            page: newPage,
            limit,
            isFinal: sortOrMounted ? false : preFetchPage * limit > productsList.length,
            loading: true,
            preFetchPage: newPage
        });
        const data = await getProducts({ page: newPage, limit, sort });
        setState((prevState) => ({
            productsList: sortOrMounted ? [...data] : prevState.productsList.concat(data),
            page: newPage,
            limit,
            isFinal: sortOrMounted ? false : preFetchPage * limit > productsList.length,
            loading: false,
            preFetchPage: newPage
        }));
        !mounted.current &&
            window.addEventListener('scroll', () =>
                infiniteScroll(() => handleScroll(setIsBottom))
            );
        mounted.current = true;
        setIsBottom(
            sortOrMounted ? false : preFetchPage * limit > productsList.length ? true : false
        );
    };
    /// Effects
    useEffect(() => {
        fetch(true);
    }, [sort]);

    useEffect(() => {
        isBottom && fetch(false);
    }, [isBottom]);

    useEffect(dropdownOpenEvent, []);
    return (
        <div className="container">
            <h1 className="title has-text-centered is-spaced text-focus-in is-capitalized is-size-1">
                Products Grid
            </h1>

            <h3 className="subtitle is-3 has-text-centered slide-in-fwd-center has-text-weight-light">
                Here you&apos;re sure to find a bargain on some of the finest ascii available to
                purchase. Be sure to peruse our selection of ascii faces in an exciting range of
                sizes and prices.
            </h3>

            <div className="has-text-centered">
                <ProductSortingDropdown sort={sort} callback={setSort} />
            </div>

            <div className="columns is-multiline is-vcentered mt-6">
                {productsList?.slice(0, limit * preFetchPage).map((product, id) => {
                    return (
                        <Fragment key={id}>
                            {willShowAd(id) ? (
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
                <h1 className="title is-one has-text-centered">~ end of catalogue ~</h1>
            )}
        </div>
    );
};

export default ProductsGrid;
