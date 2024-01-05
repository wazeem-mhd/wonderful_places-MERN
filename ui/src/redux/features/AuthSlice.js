import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupUser } from "../Api";

export const createUser = createAsyncThunk(
  "/user/create",
  async ({ values, navigate }) => {
    try {
      //   console.log(values);
      const response = await signupUser(values);
      if (response.data.isSuccess) {
        navigate("/auth/login");
      } else {
        // console.log(response.data);
        navigate("/auth/signup");
        return response.data;
      }
    } catch (error) {
      return error.message;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    message: "",
    errormsg: "",
  },
  reducers: {
    reseSetState: (state) => {
      state.loading = false;
      state.user = null;
      state.message = "";
      state.errormsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.message = "";
        state.errormsg = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.errormsg = action.payload;
      });
  },
});

export const { reseSetState } = userSlice.actions;
export default userSlice.reducer;
