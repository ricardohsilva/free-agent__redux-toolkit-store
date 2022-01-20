import ProductModel from "../models/product.model";

export default class ProductService {

    // Get method with fake Loading from Backend (150ms)
    public get(search?: string) {
        return new Promise<ProductModel[]>((resolve) =>
            setTimeout(() => resolve(
                fetch('http://localhost:3000/db/products.json', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    return response.json()
                }).then(json => {
                    let products = json;
                    if (search) {
                        products = json.filter((item: ProductModel) => item.name.toLowerCase().includes(search.toLowerCase()));
                    }

                    return products;
                })
            ), 150)
        );
    }

    // Get by Id method with fake Loading from Backend (2s)
    public getById(id: number) {
        return new Promise<ProductModel>((resolve) =>
            setTimeout(() => resolve(
                fetch('http://localhost:3000/db/products.json', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    return response.json();
                }).then(json => {
                    const product = json.filter((item: ProductModel) => item.id === id)[0];
                    return product;
                })
            ), 2000)
        );
    }
}