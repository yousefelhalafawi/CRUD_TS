import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    records: [],
    loading: false,
    error: null
};

// createAsyncThunk take 2 arguments: 
// - first: type --> that will refer to the operation that will execute
// - second: payloadCreator --> that async function to work side effect 

export const fetchPosts = createAsyncThunk( "posts/fetchPosts", async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI; // to catch error and return it
        try {
            const response = await fetch("http://localhost:9000/posts");
            const data = await response.json();
            return data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deletePost = createAsyncThunk( "posts/deletePosts", async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`http://localhost:9000/posts/${id}`, {
            method: "DELETE"
        });
        return id;
    }catch(error){
        return rejectWithValue(error.message);
    }
});

export const createPost = createAsyncThunk( "posts/createPosts", async (item, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState();
    item.userId = auth.id;
    try {
        const response = await fetch("http://localhost:9000/posts", {
            method: "POST",
            headers: {
            "Content-Type": "application/json; charset=UTF-8", // charset=UTF-8 --> to handle other language
            },
            body: JSON.stringify(item),
        });
        const data = await response.json();
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
});

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: {
        // fetch post
        [fetchPosts.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // delete post
        [deletePost.pending]: (state) => {
            state.loading = true;
            state.error = null;
        }, 
        [deletePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = state.records.filter( post =>  post.id !== action.payload );
        },
        [deletePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // create post
        [createPost.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.records.push(action.payload); // save return data from line 50
        },
        [createPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default postSlice.reducer