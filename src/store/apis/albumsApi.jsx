import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        query: (user) => {
          return {
            url: "/albums",
            method: "GET",
            params: { userId: user.id },
          };
        },
        providesTags: (result, error, user) => {
          return [{ type: "Album", id: user.id }];
        },
      }),

      addAlbum: builder.mutation({
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
        invalidatesTags: (result, error, user) => {
          return [{ type: "Album", id: user.id }];
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
