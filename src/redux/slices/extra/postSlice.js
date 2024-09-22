import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { postApi } from "../../../api/endpoints/post";

// Initialize the adapter
export const postsAdapter = createEntityAdapter();

// Create the initial state using the adapter's getInitialState method
export const initialState = postsAdapter.getInitialState({
  // You can add additional state properties here
  loading: false,
  error: null,
});

// Create the slice
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Define your reducers here
  },
  extraReducers: (builder) => {
    // Define extra reducers here
    builder.addMatcher(
      postApi.endpoints.getPosts.matchFulfilled,
      (state, action) => {
        // Handle the fulfilled action
        postsAdapter.setAll(state, action.payload.entities);
        state.loading = false;
      }
    );
    builder.addMatcher(postApi.endpoints.getPosts.matchPending, (state) => {
      // Handle the pending action
      state.loading = true;
    });
    builder.addMatcher(
      postApi.endpoints.getPosts.matchRejected,
      (state, action) => {
        // Handle the rejected action
        state.loading = false;
        state.error = action.error;
      }
    );
  },
  selectors: {
    // Define selectors here
  },
});

export const { selectAll: selectAllPosts, selectById: selectPostById } =
  postsAdapter.getSelectors((state) => state.posts);

export default postSlice.reducer;
