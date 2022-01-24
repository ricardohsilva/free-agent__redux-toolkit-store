import ProductModel from "../models/product.model";

export default class ProductService {

    // Get method with fake Loading from Backend (2s)
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

    // Get method with fake Loading from Backend (2s)
    public save(model: ProductModel) {
        const url = model.id ? `http://localhost:4200/products/${model.id}` : `http://localhost:4200/products`
        return new Promise<ProductModel>((resolve) =>
            setTimeout(() => resolve(
                fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    method: model.id ? 'PUT' : 'POST',
                    body: JSON.stringify(model)
                }).then(response => {
                    return response.json();
                })
            ), 2000)
        );
    }

    // Get method with fake Loading from Backend (2s)
    public delete(id: number) {
        const url = `http://localhost:4200/products/${id}`
        return new Promise<number>((resolve) =>
            setTimeout(() => resolve(
                fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    method: 'DELETE',
                }).then(response => {
                    return id;
                })
            ), 2000)
        );
    }
}