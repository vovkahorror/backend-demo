const addresses = [{id: 1, title: 'Kherson'}, {id: 2, title: 'Kyiv'}, {id: 3, title: 'Ivano-Frankivsk'}];

export const addressesRepository = {
    findAddresses(title: string | null | undefined) {
        return title
            ? addresses.filter(a => a.title.includes(title))
            : addresses;
    },
    findAddressById(id: number) {
        return addresses.find(a => a.id === id);
    },
};