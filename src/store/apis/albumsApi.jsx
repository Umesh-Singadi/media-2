import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (results, error, user) => {
          return [{ type: "Albums", userId: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "GET",
            params: { userId: user.id },
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (results, error, user) => {
          return [{ type: "Albums", userId: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
