exports.Query = {
  hello: () => {
    return 'World';
  },
  products: (parent, {filter}, {products}) =>  {
    let filteredProducts = products;

    if (filter) {
      if (filter.onSale === true) {
        filteredProducts = filteredProducts.filter(product => {
          return product.onSale
        })
      }
    }
    return filteredProducts
  },
  product: (parent, {id}, {products}) => {
    return products.find((product) => product.id === id);
  },
  categories: (parent, args, {categories}) => categories,
  category: (parent, {id}, {categories}) => {
    return categories.find((category) => category.id === id);
  }
}
