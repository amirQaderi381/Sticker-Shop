import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:9000/"}),
  endpoints : builder => ({
    getProducts  : builder.query({
        query : () => "stickers"
    }),
    geProduct : builder.query({
      query : (productID) => `stickers/${productID}`
    })
  })
});

export const {useGetProductsQuery , useGeProductQuery} = productsApi;