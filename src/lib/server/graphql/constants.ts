export const endpoints = {
  store: {
    /** /meta.json */
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
    /** /collections.json?limit=10&page=1 */
    all: 'collections',
    /** /collections/all/products.json?limit=10&page=1 */
    allProducts: ['collections', 'all', 'products'].join('/'),
    /** /collections/{handle}.json */
    collection(handle: string) {
      return ['collections', handle].join('/')
    },
    /** /collections/{handle}/products.json?limit=10&page=1 */
    products(handle: string) {
      return ['collections', handle, 'products'].join('/')
    },
  },
  pages: {
    /** /pages.json?limit=10&page=1 */
    all: 'pages',
    /** /pages/{handle}.json */
    page(handle: string) {
      return ['pages', handle].join('/')
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
