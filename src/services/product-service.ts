export declare type Product = {
    id: string,
    name: string,
    description: string,
    price: number
}

export  function getProducts() {
    const product1: Product = {
        id: '1',
        name: 'Áo Thun Unisex EARTH',
        description: 'Chào bạn, có phải bạn đang tìm 1 sản phẩm chất đẹp, theo mùa và hợp thời trang, phù hợp với vóc dáng của bạn, mặc thoải mái thấm hút mồ hôi cực tốt, đẹp –độc – lạ và rẻ nhất thị trường.',
        price: 34000
    }
    const product2: Product = {
        id: '2',
        name: 'Áo Thun Unisex EARTH',
        description: 'Chào bạn, có phải bạn đang tìm 1 sản phẩm chất đẹp, theo mùa và hợp thời trang, phù hợp với vóc dáng của bạn, mặc thoải mái thấm hút mồ hôi cực tốt, đẹp –độc – lạ và rẻ nhất thị trường.',
        price: 34000
    }
    const product3: Product = {
        id: '3',
        name: 'Áo Thun Unisex EARTH',
        description: 'Chào bạn, có phải bạn đang tìm 1 sản phẩm chất đẹp, theo mùa và hợp thời trang, phù hợp với vóc dáng của bạn, mặc thoải mái thấm hút mồ hôi cực tốt, đẹp –độc – lạ và rẻ nhất thị trường.',
        price: 34000
    }

    return [product1, product2, product3]
}