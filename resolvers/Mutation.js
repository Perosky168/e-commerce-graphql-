const { v4: uuid } = require("uuid");
const { Category } = require("./Category");

exports.Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const {name} = input;
    const newCategory = {
      id: uuid(),
      name,
    };
    db.categories.push(newCategory);

    return newCategory;
  },

  addProduct: (parent, { input }, { db }) => {
    const {name, image, price, onSale, quantity, description, categoryId} = input;

    const newProduct = {
      id: uuid(),
      name,
      image,
      price,
      onSale,
      quantity,
      description,
      categoryId
    };

    db.products.push(newProduct);

    return newProduct;
  },

  addReview: (parent, { input}, { db }) => {
    const {
      date,
      title,
      comment,
      rating,
      productId,
    } = input;

    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productId,
    }

    db.reviews.push(newReview);

    return newReview;
  },
  deleteCategory: (parent, { id }, { db }) => {
    db.categories = db.categories.filter((category) => category.id !== id);
    db.products = db.products.map(product => {
      
    })
    return true;
  },
}