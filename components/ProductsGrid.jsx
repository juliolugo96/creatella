import { useEffect, useState, useRef, Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import ProductCard from '@/components/products/ProductCard';
import AdCard from '@/components/products/AdCard';
import ProductSortingDropdown from '@/components/products/ProductSortingDropdown';
import { getProducts } from '@/api/index';
import { infiniteScroll, willShowAd, handleScroll } from '@/components/products/functions.js';
import { FETCH_LIMIT, ERROR_MESSAGE } from '@/components/products/constants';

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
    const [finalMessage, setFinalMessage] = useState('~ end of catalogue ~');

    /// Refs
    const mounted = useRef();

    /// Main fetching function
    const fetch = async (sortOrMounted = false) => {
        const newPage = sortOrMounted ? 1 : page + 1;
        const isFetchingBottom = newPage * limit > productsList.length;
        /// Loading state
        setState({
            productsList: sortOrMounted ? [] : productsList,
            page: newPage,
            limit,
            isFinal: !sortOrMounted ? isFetchingBottom : false,
            loading: true,
            preFetchPage: newPage
        });
        try {
            /// Fetch
            const data = await getProducts({ page: newPage, limit, sort });
            setState((prevState) => ({
                productsList: sortOrMounted ? [...data] : prevState.productsList.concat(data),
                page: newPage,
                limit,
                isFinal: !sortOrMounted ? isFetchingBottom : data.length < limit,
                loading: false,
                preFetchPage: newPage
            }));
            !mounted.current &&
                window.addEventListener('scroll', () =>
                    infiniteScroll(() => handleScroll(setIsBottom))
                );
            mounted.current = true;
            setIsBottom(!sortOrMounted ? isFetchingBottom : data.length < limit);
        } catch ({ message }) {
            setFinalMessage(message);
            setState((prevState) => ({
                productsList: prevState.productsList,
                page,
                limit,
                isFinal: true,
                loading: false,
                preFetchPage
            }));
            setIsBottom(!sortOrMounted ? isFetchingBottom : false);
        }
    };
    /// Effects
    useEffect(() => {
        fetch(true);
    }, [sort]);

    useEffect(() => {
        isBottom && fetch(false);
    }, [isBottom]);

    return (
        <div className="container">
            <div className="has-text-centered is-spaced text-focus-in">
                <img src="/product.png" style={{ width: '20rem' }} alt="" />
            </div>

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
                                <div className="column is-one-third">
                                    <AdCard />
                                </div>
                            ) : null}

                            <div className="column is-one-third" key={product.id}>
                                <ProductCard {...product} />
                            </div>
                        </Fragment>
                    );
                })}
            </div>

            {loading && !isFinal && <Skeleton count={5} />}
            {isFinal && !loading && (
                <>
                    <h1 className="title is-1 has-text-centered">{finalMessage}</h1>
                    {finalMessage === ERROR_MESSAGE && (
                        <p className="has-text-centered">Press F5 to reload</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductsGrid;
