/* eslint-disable react/prop-types */
import { Bolt } from "lucide-react";
import {
  useEditTodoMutation,
  //   useGetTodoByIdQuery,
  useGetTodosQuery,
} from "../../api/endpoints/todo";
import { memo } from "react";

const TodoItem = ({ id }) => {
  const { todo } = useGetTodosQuery(undefined, {
    selectFromResult: ({ data }) => ({
      todo: data?.find((todo) => todo.id === id),
    }),
  });

  const [edit, { isError, isLoading }] = useEditTodoMutation();

  async function handleEdit() {
    try {
      await edit({ id, title: "new title", description: "new desc" });
    } catch (error) {
      console.log(error);
    }
  }

  // if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  console.log(todo, "todo");

  return (
    <div className=" p-4 bg-white shadow-md rounded-md border flex items-center justify-between">
      <p> {todo?.title}</p>
      <Bolt
        className={` cursor-pointer ${isLoading ? " animate-spin" : null}`}
        onClick={handleEdit}
      />
    </div>
  );
};

export default memo(TodoItem);
