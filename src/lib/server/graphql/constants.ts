export const endpoints = {
  store: {
    meta: 'meta',
  },
  product: {
    /** /products.json?limit=10&page=1 */
    all: 'products',
    /** /products/{handle}.[json|js] */
    product(handle: string) {
      return ['products', handle].join('/')
    },
  },
  collection: {
    all: 'collections',
    allProducts: ['collections', 'all', 'products'].join('/'),
    collection(handle: string) {
      return ['collections', handle].join('/')
    },
    products(handle: string) {
      return ['collections', handle, 'products'].join('/')
    },
  },
  recommendations: {
    /** /recommendations/products.json?product_id={product-id} */
    products: ['recommendations', 'products'].join('/'),
  },
  search: {
    // /search/suggest.json?q={query}&resources[type]=product
    suggest: ['search', 'suggest'].join('/'),
  },
}
