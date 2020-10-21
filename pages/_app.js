import '../styles/globals.scss';
import '../styles/animations.scss';
import PropTypes from 'prop-types';

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object
};

export default MyApp;
