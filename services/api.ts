import { Student } from "@/const/student";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
   tagTypes: ['Students'],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost/backend/api/student",
  }),
  endpoints: (builder) => ({
    getAllStudentWithoutPagination: builder.query({
      query: () => `read.php`,
      providesTags: ['Students'],
    }),
    getAllStudents: builder.query({
      query: ({page = 1, perPage = 10} : {page:number , perPage: number}) => `read.php?page=${page}&limit=${perPage}`,
      providesTags: ['Students'],    
  },),
    getStudentById: builder.query({
      query: (id) => `read_one.php?id=${id}`,
    }),
    addStudent: builder.mutation({
      query: (student : any) => ({
        url: "create.php",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ['Students'],
    }),
    updateStudent: builder.mutation({
      query: (student : any) => ({
        url: `update.php`,
        method: "POST",
        body: student,
      }),
      invalidatesTags: ['Students'],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `delete.php?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Students'],
    }),
  }),
});

export const { useGetAllStudentsQuery, useGetStudentByIdQuery, useAddStudentMutation, useDeleteStudentMutation, useUpdateStudentMutation , useGetAllStudentWithoutPaginationQuery} = api;
