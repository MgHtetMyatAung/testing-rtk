/* eslint-disable react/prop-types */
import { memo } from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "../../redux/slices/extra/postSlice";
import { useNavigate } from "react-router-dom";

const PostCard = ({ id }) => {
  const post = useSelector((state) => selectPostById(state, id));
  const navigate = useNavigate();

  return (
    <div className=" p-4 bg-white shadow-md rounded-md border space-y-2">
      <img
        src={post.image}
        alt=""
        className=" w-full rounded cursor-pointer"
        onClick={() => navigate(`/post/${id}`)}
      />
      <h2 className=" text-xl font-semibold">{post.title}</h2>
      <p className=" text-gray-600 truncate">{post.description}</p>
      <p className=" ">$ {post.price}</p>
    </div>
  );
};

export default memo(PostCard);
