import 'dotenv/config';
import WooCommerceAPI from 'woocommerce-api';
import querystring from 'querystring';

var WooCommerce = new WooCommerceAPI({
  url: 'http://localhost/testsite',
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3' // WooCommerce WP REST API version
});

// Creating an authentication endpoint URL
// const storeUrl = 'http://localhost/testsite'
// const endpoint = '/wc-auth/v1/authorize';
// const params = {
//   app_name: 'myApp',
//   scope: 'read_write',
//   user_id: 10001,
//   return_url: 'http://localhost/testsite/return-page',
      // TODO: Add a domain with https protocol for callback-url
//   callback_url: ''
// };
// const queryString = querystring.stringify(params).replace(/%20/g, '+');

// Sample product for upload
var data = {
  name: 'Premium Quality',
  type: 'simple',
  regular_price: '21.99',
  description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
  short_description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  categories: [
    {
      id: 9
    },
    {
      id: 14
    }
  ],
  images: [
    {
      src: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg'
    },
    {
      src: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg'
    }
  ]
};

// upload a product
// WooCommerce.post('products', data, function(err, data, res) {
//   console.log(res);
// });

// Get all the products using params to limit count and page number
WooCommerce.get('products?per_page=4&page=1', function(err, data, res) {
  let result = JSON.parse(res);
  result = result.map(product => product.name);
  console.log(`Product(s): \n ${result}`);
});

// Get a single product using the id as the parameter
// WooCommerce.get('products/17', function(err, data, res) {
//   let result = JSON.parse(res);
//   console.log(`Product(s): \n ${result}`);
// });

// Sample product data update
const updateData = {
  name: "updated name"
}

// Update a product
// WooCommerce.put('products/17', updateData, (err, data, res) => {
//   let result = JSON.parse(res);
//   console.log(result.name);
// })

// // Delete a product
// WooCommerce.delete('products/14', (err, data, res) => {
//   let result = JSON.parse(res);
//   console.log(result.id);
// });

// All other operations for products are also available for orders
// Get orders
// WooCommerce.get('orders', function(err, data, res) {
//   let result = JSON.parse(res);
//   result = result.map(order => order);
//   console.log(`Orders: \n ${result}`)
// });