import { useSelector } from "react-redux";
import { useGetPostsQuery } from "../../api/endpoints/post";
import { selectAllPosts } from "../../redux/slices/extra/postSlice";
import PostCard from "./PostCard";

export default function PostPage() {
  const { isLoading, error } = useGetPostsQuery();
  const posts = useSelector(selectAllPosts);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  console.log(posts, "posts");

  return (
    <section className=" py-10">
      <div className=" max-w-[1200px] mx-auto">
        <h2 className=" text-2xl font-semibold">Post Lists</h2>
        <div className=" grid grid-cols-1 gap-4 lg:grid-cols-4 mt-5">
          {posts.map((post) => (
            <PostCard key={post.id} id={post.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
