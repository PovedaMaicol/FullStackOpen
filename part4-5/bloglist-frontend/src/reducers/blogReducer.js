import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        addBlog(state, action) {
            console.log('Adding blog:', action.payload);
            const existingBlog = state.find(blog => blog.id === action.payload.id);
            if (!existingBlog) {
              state.push(action.payload);
            } else {
              console.log('Blog already exists:', action.payload);
            }
        }
    }
})

export const { setBlogs, addBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        console.log('Blogs fetched from server:', blogs);
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (newBlog) => {
    return async (dispatch) => {
        const nvBlog = await blogService.create(newBlog)
        dispatch(addBlog(nvBlog))
    }

}

export default blogSlice.reducer