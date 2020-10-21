export const getProducts = ({ page, limit, sort = null }) => {
    return new Promise((resolve, reject) => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${baseUrl}/api/products?_page=${page}&_limit=${limit * 2}${
            sort === null ? '' : `&_sort=${sort}`
        }`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    });
};
