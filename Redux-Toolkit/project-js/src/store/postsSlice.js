import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  offset: 0,
  limit: 10,
  pageCount: 0,
  loading: false,
};

export const getPosts = createAsyncThunk('posts/get', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    increaseOffset: (state) => {
      state.offset += state.limit;
    },
    decreaseOffset: (state) => {
      state.offset -= state.limit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.pageCount = action.payload.length / state.limit;
      });
  },
});

export const { increaseOffset, decreaseOffset } = postsSlice.actions;

export const selectPageCount = (state) => state.posts.pageCount;
export const selectLoading = (state) => state.posts.loading;
export const selectAllPosts = (state) => state.posts.posts;
export const selectOffset = (state) => state.posts.offset;
export const selectLimit = (state) => state.posts.limit;

export const selectPosts = createSelector(selectAllPosts, selectOffset, selectLimit, (posts, offset, limit) => {
  return posts.slice(offset, offset + limit);
});

export default postsSlice.reducer;
