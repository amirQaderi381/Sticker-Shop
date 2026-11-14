import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:9000/"}),
  endpoints : builder => ({
    getAllProducts  : builder.query({
        query : () => "stickers"
    })
  })
});

export const {useGetAllProductsQuery} = productsApi;