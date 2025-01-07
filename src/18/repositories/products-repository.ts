const products = [{id: 1, title: 'apple'}, {id: 2, title: 'potato'}];

export const productsRepository = {
    findProducts(title: string | null | undefined) {
        return title
            ? products.filter(p => p.title.includes(title))
            : products;
    },
    findProductByTitle(title: string) {
        return products.find(p => p.title === title);
    },
    findProductById(id: number) {
        return products.find(p => p.id === id);
    },
    createProduct(title: string) {
        const newProduct = {
            id: +(new Date()),
            title,
        };

        products.push(newProduct);
        return newProduct;
    },
    updateProduct(id: number, title: string) {
        const product = products.find(p => p.id === id);

        if (product) {
            product.title = title;
            return true;
        } else {
            return false;
        }
    },
    deleteProduct(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1);
                return true;
            }
        }

        return false;
    },
};
