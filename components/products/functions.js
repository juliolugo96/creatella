import { MONTHS, AD_FREQUENCY } from '@/components/products/constants';

export const willShowAd = (id) => id % AD_FREQUENCY === 0;

// Handle scroll
export const handleScroll = (callback) => {
    const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
        callback(true);
    }
};

export const dropdownOpenEvent = () => {
    var dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('click', function (event) {
        event.stopPropagation();
        dropdown.classList.toggle('is-active');
    });
};

// Throttle function: Input as function which needs to be throttled and delay is the time interval in milliseconds
var throttleFunction = function (func, delay) {
    // Schedule a setTimeout after delay seconds
    setTimeout(function () {
        func();

        // Once setTimeout function execution is finished, timerId = undefined so that in <br>
        // the next scroll event function execution can be scheduled by the setTimeout
        // timerId = undefined;
    }, delay);
};

export const infiniteScroll = (callback) => {
    throttleFunction(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            callback();
        }
    }, 400);
};

const formatDate = (date) => {
    return `${MONTHS[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}`;
};

export const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;
    interval = seconds / 2592000;
    interval = seconds / 86400;

    if (interval > 1 && Math.floor(interval) > 6) return formatDate(new Date(date));

    if (interval > 1) {
        const days = Math.floor(interval);
        return days + ` day${days === 1 ? '' : 's'} ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';

    return Math.floor(seconds) + ' seconds ago';
};
