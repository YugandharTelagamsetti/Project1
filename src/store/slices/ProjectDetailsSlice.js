import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCaseList } from "../../ApiService";

const initialState = {
  projectDetailsData: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  statusCode:null,
  // ... initial state properties
};
export const projectDetailsList = createAsyncThunk('projectDetails', async (params, thunkApi) => {
  try {
    const response = await getCaseList(params);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const clearProjectDetailsData = createAction('projectDetails/clearData');



export const ProjectDetailsSlice = createSlice({
  name: 'projectDetails',
  initialState,
  reducers:{},
  extraReducers: builder => {
    builder.addCase(projectDetailsList.pending,state  => {
      state.isLoading = true;    
    });
    builder.addCase(projectDetailsList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.projectDetailsData = [...state.projectDetailsData, ...action.payload];

    });
    builder.addCase(projectDetailsList.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      if(action.payload.error.response!=null){
        state.statusCode=action.payload.error.response.status;
      }
    });
    builder.addCase(clearProjectDetailsData, (state) => {
      state.projectDetailsData = [];
    });
  },
});


export const { reducer: projectDetailsReducer } = ProjectDetailsSlice;
