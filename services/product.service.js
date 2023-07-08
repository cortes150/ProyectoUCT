const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");
class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }
  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.urlPicsumPhotos(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }
  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  find() {
    return this.products;
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(this.products);
    //   }, 3000);
    // });
  }
  async findOne(id) {
    // const res = this.products.find((item) => item.id === id);
    // console.log(res);
    //const name = this.getAverage();
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      //throw new Error("Product not found");
      throw boom.notFound('Product not found"');
    }
    if (product.isBlock) {
      throw boom.conflict("product is block");
    }
    return product;
  }
  // async findOne(id) {
  //   const index = this.products.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new Error("Product not found");
  //   }
  //   return this.products.find((item) => item.id === id);
  // }
  update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      //throw new Error("Product not found");
      throw boom.notFound('Product not found"');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }
  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      //throw new Error("Product not found");
      throw boom.notFound('Product not found"');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
// function (req,res,next){
//   if(somethig){
//     res.send("end");
//   }else{
//     next();
//   }
// }

// function (req,res,next){
//   if(somethig){
//     res.status(500).json({error});
//   }else{
//     next();
//   }
// }
