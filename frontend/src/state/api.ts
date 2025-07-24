/* eslint-disable @typescript-eslint/no-explicit-any */
// import Cookies from "js-cookie";
import { Partner } from "@/types/patner/patner";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL_PROD,
    // prepareHeaders: async (headers) => {
    //   const token = Cookies.get("token");
    //   if (token) {
    //     headers.set("Authorization", `Token ${token}`);
    //   }
    //   return headers;
    // },
  }),
  reducerPath: "api",
  tagTypes: ["users"],
  endpoints: (build) => ({
    createBorrowedBook: build.mutation<
      {
        id: number;
        borrower: {
          id: number;
          card_number: string;
          name: string;
          email: string;
          created_at: string;
        };
        book: {
          id: number;
          title: string;
          isbn: string;
          stock: number;
        };
        duration: string;
        active_loan: boolean;
        created_at: string;
      },
      {
        book_borrowed: {
          book: number;
          duration: string;
          active_loan: boolean;
          borrower_data: {
            card_number: string;
            name: string;
            email: string;
          };
        };
      }
    >({
      queryFn: async (
        { book_borrowed },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/borrow/book/`;
          console.log({ book_borrowed });

          const result = await fetchWithBQ({
            url: endpoint,
            method: "POST",
            body: book_borrowed,
          });

          if ("error" in result && result.error) {
            return {
              error: `${(result as { error: any })?.error?.data?.error?.[0]}`,
            };
          }

          return {
            data: result.data as {
              id: number;
              borrower: {
                id: number;
                card_number: string;
                name: string;
                email: string;
                created_at: string;
              };
              book: {
                id: number;
                title: string;
                isbn: string;
                stock: number;
              };
              duration: string;
              active_loan: boolean;
              created_at: string;
            },
          };
        } catch (error: any) {
          return { error: error || "Something went wrong!" };
        }
      },
    }),
    editBookBorrowed: build.mutation<
      {
        id: number;
        borrower: {
          id: number;
          card_number: string;
          name: string;
          email: string;
          created_at: string;
        };
        book: {
          id: number;
          title: string;
          isbn: string;
          stock: number;
        };
        duration: string;
        active_loan: boolean;
        created_at: string;
      },
      {
        id: number;
        book_borrowed: {
          book: number;
          duration: string;
          active_loan: boolean;
          borrower_data: {
            card_number: string;
            name: string;
            email: string;
          };
        };
      }
    >({
      queryFn: async (
        { id, book_borrowed },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/borrow/book/${id}/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "PATCH",
            body: book_borrowed,
          });

          return {
            data: result.data as {
              id: number;
              borrower: {
                id: number;
                card_number: string;
                name: string;
                email: string;
                created_at: string;
              };
              book: {
                id: number;
                title: string;
                isbn: string;
                stock: number;
              };
              duration: string;
              active_loan: boolean;
              created_at: string;
            },
          };
        } catch (error: any) {
          return { error: error || "Could not fetch campaign data" };
        }
      },
    }),
    getBorrowedBookById: build.query<
      Partner,
      {
        id: string;
      }
    >({
      queryFn: async ({ id }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/partner/${id}/`;

          const partnerRes = await fetchWithBQ(endpoint);
          // console.log({ userDetailsResponse });

          return { data: partnerRes.data as Partner };
        } catch (error: any) {
          return { error: error.message || "Could not fetch hazard  data" };
        }
      },
    }),
    getBorrowedBook: build.query<
      {
        count: number;
        next: number | null;
        previous: number | null;
        results: {
          id: number;
          borrower: {
            id: number;
            card_number: string;
            name: string;
            email: string;
            created_at: string;
          };
          book: {
            id: number;
            title: string;
            isbn: string;
            stock: number;
          };
          duration: string;
          active_loan: boolean;
          created_at: string;
        }[];
      },
      { page: number }
    >({
      queryFn: async ({ page }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/borrow/book/?page=${page}`;

          const partnerRes = await fetchWithBQ(endpoint);
          // console.log({ partnerRes });

          return {
            data: partnerRes.data as {
              count: number;
              next: number | null;
              previous: number | null;
              results: {
                id: number;
                borrower: {
                  id: number;
                  card_number: string;
                  name: string;
                  email: string;
                  created_at: string;
                };
                book: {
                  id: number;
                  title: string;
                  isbn: string;
                  stock: number;
                };
                duration: string;
                active_loan: boolean;
                created_at: string;
              }[];
            },
          };
        } catch (error: any) {
          return { error: error.message || "Could not fetch partner  data" };
        }
      },
    }),
    getBook: build.query<
      {
        count: number;
        next: string | null;
        previous: string | null;
        results: {
          id: number;
          title: string;
          isbn: string;
          stock: number;
        }[];
      },
      { page: number }
    >({
      queryFn: async ({ page }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/book/?page=${page}`;

          const partnerRes = await fetchWithBQ(endpoint);
          // console.log({ partnerRes });

          return {
            data: partnerRes.data as {
              count: number;
              next: string | null;
              previous: string | null;
              results: {
                id: number;
                title: string;
                isbn: string;
                stock: number;
              }[];
            },
          };
        } catch (error: any) {
          return { error: error.message || "Could not fetch partner  data" };
        }
      },
    }),
    editBook: build.mutation<
      {
        id: number;
        title: string;
        isbn: string;
        stock: number;
      },
      {
        id: number;
        book: {
          title: string;
          isbn: string;
          stock: number;
        };
      }
    >({
      queryFn: async ({ id, book }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/book/${id}/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "PATCH",
            body: book,
          });

          return {
            data: result.data as {
              id: number;
              title: string;
              isbn: string;
              stock: number;
            },
          };
        } catch (error: any) {
          return { error: error || "Could not update book" };
        }
      },
    }),
  }),
});

export const {
  useCreateBorrowedBookMutation,
  useEditBookBorrowedMutation,
  useGetBorrowedBookQuery,
  useGetBorrowedBookByIdQuery,
  useGetBookQuery,
  useEditBookMutation,
} = api;
