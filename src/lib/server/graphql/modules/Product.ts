import { createModule, gql } from 'graphql-modules'
import type { Context } from '../types'

import { products } from './resolvers/products'
import { productJson } from './resolvers/productJson'
import { productJs } from './resolvers/productJs'

export const Product = createModule({
  id: 'product',
  typeDefs: gql`
    type ProductJSONVariant {
      id: ID!
      productId: ID!
      title: String
      price: String
      sku: String
      position: Int
      compareAtPrice: String
      fulfillmentService: String
      inventoryManagement: String
      option1: String
      option2: String
      option3: String
      createdAt: String
      updatedAt: String
      taxable: Boolean
      barcode: String
      grams: Int
      imageId: ID
      weight: Float
      weightUnit: String
      requiresShipping: Boolean
    }

    type ProductJSONOption {
      id: ID!
      productId: ID!
      name: String
      position: Int
      values: [String!]
    }

    type ProductJSONImage {
      id: ID!
      productId: ID!
      position: Int
      createdAt: String
      updatedAt: String
      alt: String
      width: Int
      height: Int
      src: String
      variantIds: [ID!]
    }

    type ProductJSON {
      id: ID!
      _data: JSONObject
      title: String
      bodyHtml: String
      vendor: String
      productType: String
      createdAt: String
      handle: String!
      updatedAt: String
      publishedAt: String
      templateSuffix: String
      publishedScope: String
      tags: [String!]
      variants: [ProductJSONVariant!]
      options: [ProductJSONOption!]
      images: [ProductJSONImage!]
      image: ProductJSONImage
    }

    type ProductJSVariantSellingPlanAllocationPriceAdjustment {
      position: Int
      price: String
    }

    type ProductJSVariantSellingPlanAllocation {
      checkoutChargeAmount: String
      compareAtPrice: String
      perDeliveryPrice: String
      price: String
      priceAdjustments: [ProductJSVariantSellingPlanAllocationPriceAdjustment]
      remainingBalanceChargeAmount: String
      sellingPlan: ProductJSSellingPlan
      sellingPanGroupId: ID
      unitPrice: Int
    }

    type ProductJSVariant {
      id: ID!
      title: String
      option1: String
      option2: String
      option3: String
      sku: String
      requiresShipping: Boolean
      taxable: Boolean
      featuredImage: String
      available: Boolean
      name: String
      publicTitle: String
      options: [String!]
      price: Int
      weight: Int
      compareAtPrice: Int
      inventoryManagement: String
      barcode: String
      requiresSellingPlan: Boolean
      sellingPlanAllocations: [ProductJSVariantSellingPlanAllocation!]
    }

    type ProductJSOption {
      name: String
      position: Int
      values: [String!]
    }

    type ProductJSMediaPreviewImage {
      aspectRatio: Float
      height: Int
      width: Int
      src: String
    }

    type ProductJSMedia {
      id: ID!
      position: Int
      alt: String
      previewImage: ProductJSMediaPreviewImage
      aspectRatio: Float
      height: Int
      mediaType: String
      src: String
      width: Int
    }

    type ProductJSSellingPlanGroupOption {
      name: String
      position: Int
      selectedValue: String
      values: [String!]
    }

    type ProductJSSellingPlanCheckoutCharge {
      value: Int
      valueType: String
    }

    type ProductJSSellingPlanOption {
      name: String
      position: Int
      value: String
    }

    type ProductJSSellingPlanPriceAdjustment {
      orderCount: Int
      position: Int
      value: Int
      valueType: String
    }

    type ProductJSSellingPlan {
      id: ID!
      groupId: ID!
      name: String
      description: String
      checkoutCharge: ProductJSSellingPlanCheckoutCharge
      options: [ProductJSSellingPlanOption!]
      priceAdjustments: [ProductJSSellingPlanPriceAdjustment!]
      recurringDeliveries: Boolean
      selected: Boolean
    }

    type ProductJSSellingPlanGroup {
      id: ID!
      appId: ID!
      name: String
      options: [ProductJSSellingPlanGroupOption!]
      sellingPlanSelected: Boolean
      sellingPlans: [ProductJSSellingPlan!]
    }

    type ProductJS {
      id: ID!
      _data: JSONObject
      title: String
      handle: String!
      description: String
      publishedAt: String
      createdAt: String
      vendor: String
      type: String
      tags: [String!]
      price: Int
      priceMin: Int
      priceMax: Int
      available: Boolean
      compareAtPrice: Int
      compareAtPriceMin: Int
      compareAtPriceMax: Int
      compareAtPriceVaries: Boolean
      variants: [ProductJSVariant!]
      images: [String!]
      featuredImage: String
      options: [ProductJSOption!]
      url: String
      media: [ProductJSMedia!]
      requiresSellingPlan: Boolean
      sellingPlanGroups: [ProductJSSellingPlanGroup!]
    }

    type ShopProductVariant {
      id: ID!
    }

    type ShopProductImage {
      id: ID!
    }

    type ShopProductOption {
      name: String!
      position: Int!
      values: [String!]!
    }

    type ShopProduct {
      id: ID!
      _data: JSONObject
      title: String
      handle: String
      bodyHtml: String
      publishedAt: String
      createdAt: String
      updatedAt: String
      vendor: String
      productType: String
      tags: [String!]
      variants: [ShopProductVariant!]
      images: [ShopProductImage!]
      options: [ShopProductOption!]
      productJson: ProductJSON!
      productJs: ProductJS!
    }

    extend type Shop {
      products(limit: Int, page: Int): [ShopProduct!]!
      productJson(handle: String!): ProductJSON
      productJs(handle: String!): ProductJS
    }
  `,
  resolvers: {
    Shop: {
      products(
        shop: { url: string },
        { limit = 10, page }: { limit?: number; page?: number } = {},
        context: Context,
      ) {
        context.shop = shop

        return products(context, limit, page)
      },
      productJson(
        shop: { url: string },
        { handle }: { handle: string },
        context: Context,
      ) {
        context.shop = shop

        return productJson(context, handle)
      },
      productJs(
        shop: { url: string },
        { handle }: { handle: string },
        context: Context,
      ) {
        context.shop = shop

        return productJs(context, handle)
      },
    },
    ShopProduct: {
      _data(source: unknown) {
        return source
      },
      productJson(
        { handle }: { handle: string },
        _args: unknown,
        context: Context,
      ) {
        return productJson(context, handle)
      },
      productJs(
        { handle }: { handle: string },
        _args: unknown,
        context: Context,
      ) {
        return productJs(context, handle)
      },
    },
    ProductJSON: {
      _data(source: unknown) {
        return source
      },
    },
    ProductJS: {
      _data(source: unknown) {
        return source
      },
    },
  },
})
