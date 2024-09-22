import { useSelector } from "react-redux";
import { useGetPostsQuery } from "../../api/endpoints/post";
import { selectAllPosts } from "../../redux/slices/extra/postSlice";

export default function PostPage() {
  const { isLoading, error } = useGetPostsQuery();
  const posts = useSelector(selectAllPosts);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  console.log(posts, "posts");

  return <div>PostPage</div>;
}
