import { createAsyncThunk } from "@reduxjs/toolkit"

export const createAsyncThunkForSlice = (type, resolver, options) => {
    return createAsyncThunk(type, resolver, options)
}