import ProductModel from "../models/product.model";

export default class ProductService {

    // Get method with fake Loading from Backend (2000s)
    public get(search?: string) {
        return new Promise<ProductModel[]>((resolve) =>
            setTimeout(() => resolve(
                fetch('http://localhost:4200/products', {
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
            ), 2000)
        );
    }

    // Get by Id method with fake Loading from Backend (2s)
    public getById(id: number) {
        return new Promise<ProductModel>((resolve) =>
            setTimeout(() => resolve(
                fetch(`http://localhost:4200/products/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    return response.json();
                })
            ), 2000)
        );
    }

    // Get method with fake Loading from Backend (2000s)
    public save(id: number, model: ProductModel) {
        return new Promise<ProductModel[]>((resolve) =>
            setTimeout(() => resolve(
                fetch(`http://localhost:4200/products/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    method: 'PUT',
                    body: JSON.stringify(model)
                }).then(response => {
                    return response.json();
                })
            ), 2000)
        );
    }
}