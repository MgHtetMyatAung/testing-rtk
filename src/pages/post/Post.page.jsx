import { useSelector } from "react-redux";
import { useGetPostsQuery } from "../../api/endpoints/post";
import { selectAllPosts } from "../../redux/slices/extra/postSlice";
import PostCard from "./PostCard";
import { useState } from "react";

export default function PostPage() {
  const [layout, setLayout] = useState(4);
  const { isLoading, error } = useGetPostsQuery();
  const posts = useSelector(selectAllPosts);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  console.log(posts, "posts");

  return (
    <section className=" py-10">
      <div className=" max-w-[1200px] mx-auto">
        <div className=" flex justify-between">
          <h2 className=" text-2xl font-semibold">Post Lists</h2>
          <div className=" hidden lg:block">
            <button
              className=" border py-2 px-4 rounded"
              onClick={() => setLayout(3)}
            >
              3
            </button>
            <button
              className=" border py-2 px-4 rounded"
              onClick={() => setLayout(4)}
            >
              4
            </button>
            <button
              className="border py-2 px-4 rounded"
              onClick={() => setLayout(6)}
            >
              6
            </button>
          </div>
        </div>
        <div
          className={`grid grid-cols-1 gap-4 ${
            layout == 3
              ? "lg:grid-cols-3"
              : layout == 4
              ? "lg:grid-cols-4"
              : "lg:grid-cols-6"
          } mt-5`}
        >
          {posts.map((post) => (
            <PostCard key={post.id} id={post.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
