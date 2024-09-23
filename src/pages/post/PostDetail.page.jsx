import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectPostById } from "../../redux/slices/extra/postSlice";
import { CircleChevronLeft } from "lucide-react";

export default function PostDetailPage() {
  const { id } = useParams();
  const post = useSelector((state) => selectPostById(state, id));
  return (
    <section>
      <div className=" container mx-auto py-5">
        <div className=" flex gap-5 ">
          <div>
            <img src={post.image} alt="" className=" w-[300px] rounded" />
          </div>
          <div className="space-y-5">
            <Link to={-1} className=" flex gap-2 items-center">
              <CircleChevronLeft /> Back
            </Link>
            <h2 className=" text-2xl font-semibold">{post.title}</h2>
            <p className=" p-3 border text-gray-600 rounded">
              {post.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
