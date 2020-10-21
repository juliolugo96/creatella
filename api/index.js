export const getProducts = ({ page, limit, sort = null }) => {
    return new Promise((resolve, reject) => {
        const url =
            sort === null
                ? `${process.env.NEXT_PUBLIC_API_URL}/api/products?_page=${page}&_limit=${
                      limit * 2
                  }`
                : `${
                      process.env.NEXT_PUBLIC_API_URL
                  }/api/products?_page=${page}&_sort=${sort}&_limit=${limit * 2}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    });
};
