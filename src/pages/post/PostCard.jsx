/* eslint-disable react/prop-types */
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById } from "../../redux/slices/extra/postSlice";
import { useNavigate } from "react-router-dom";
import { addToCard } from "../../redux/slices/extra/addToCartSlice";

const PostCard = ({ id }) => {
  const post = useSelector((state) => selectPostById(state, id));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addtocart = (post) => {
    dispatch(
      addToCard({
        id: Number(post.id),
        name: "Product 5",
        price: 50,
        quantity: 1,
        items: [],
      })
    );
  };

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
      <div className=" flex justify-between mt-3">
        <p className=" ">$ {post.price}</p>
        <button
          onClick={() => addtocart(post)}
          className=" py-2 px-4 bg-gray-800 text-white rounded"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default memo(PostCard);
