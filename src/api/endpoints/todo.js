import { baseApi } from "../config/baseApi";
import { revalidate } from "../revalidate";

export const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: "/todo",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? result.map((todo) => ({
              type: revalidate.todo,
              id: todo.id,
            }))
          : [],
    }),

    getTodoById: builder.query({
      query: (id) => ({
        url: `/todo/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: revalidate.todo, id }],
    }),

    editTodo: builder.mutation({
      query: (todo) => ({
        url: `/todo/${todo.id}`,
        method: "PUT",
        body: todo,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTodos", undefined, (draft) => {
            const todo = draft.find((todo) => todo.id === args.id);
            if (todo) {
              Object.assign(todo, args);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      //   invalidatesTags: (result, error, { id }) => [
      //     { type: revalidate.todo, id }, // Invalidate specific todo
      //   ],
    }),
  }),
});

export const { useGetTodosQuery, useEditTodoMutation, useGetTodoByIdQuery } =
  todoApi;
