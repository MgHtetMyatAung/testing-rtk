import { useGetTodosQuery } from "../../api/endpoints/todo";
import TodoItem from "./TodoItem";

export default function TodoPage() {
  const { data, isLoading, isError } = useGetTodosQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  console.log(data, "data");

  return (
    <section className=" py-10">
      <div className=" max-w-[1200px] mx-auto">
        <h2 className=" text-2xl font-semibold">Todo Lists</h2>
        <div className=" grid grid-cols-1 gap-4 lg:grid-cols-4 mt-5">
          {data.map((todo) => (
            <TodoItem key={todo.id} id={todo.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
