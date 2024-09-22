/* eslint-disable react/prop-types */
import { memo } from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "../../redux/slices/extra/postSlice";

const PostCard = ({ id }) => {
  const post = useSelector((state) => selectPostById(state, id));

  return (
    <div className=" p-4 bg-white shadow-md rounded-md border">
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </div>
  );
};

export default memo(PostCard);
