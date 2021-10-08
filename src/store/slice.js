import {createSlice,  createAsyncThunk} from '@reduxjs/toolkit';

export const getContacts = createAsyncThunk('personal-account/getContacts', async (_, {extra}) => {

  try {
    const response = await extra.getContacts();
    return response;
  } catch (error) {
    console.error(error);
  }
});

export const editContact = createAsyncThunk('personal-account/editContact', async ({id, data} ={}, {extra}) => {

  try {
    await extra.editContact(id, data);
    const response = await extra.getContacts();
    return response;
  } catch (error) {
    console.error(error);
  }
});

export const addContact = createAsyncThunk('personal-account/addContact', async (data, {extra}) => {

  try {
    await extra.addContact(data);
    const response = await extra.getContacts();
    return response;
  } catch (error) {
    console.error(error);
  }
});

export const deleteContact = createAsyncThunk('personal-account/deleteContact', async (id, {extra}) => {

  try {
    await extra.deleteContact(id);
    const response = await extra.getContacts();
    return response;
  } catch (error) {
    console.error(error);
  }
});

export const search = createAsyncThunk('personal-account/search', async (query, {extra}) => {

  try {
    const response =  await extra.search(query);
    return response;
  } catch (error) {
    console.error(error);
  }
});

export const loginUser = createAsyncThunk('personal-account/loginUser', async ({login, password} = {}, {rejectWithValue, extra}) => {

  try {
    const data = await extra.loginUser({login, password});
    localStorage.setItem('token', data[0].token);
    localStorage.setItem('user', JSON.stringify({name: data[0].login, avatar: data[0].avatar}));
    return data[0]
  } catch (error) {
    console.log('Error', error.response.data);
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  contactsData: [],
  editedCard: 0,
  authorizedUser: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  isPlug: localStorage.getItem('user') ? true : false,
  isLoading: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errors: {},
};

const personalAccountSlice = createSlice({
  name: 'personal-account',
  initialState,
  reducers: {
    setEditedCard: (state, action) => {
      state.editedCard = action.payload;
    },
    setPlug: (state) => {
      state.isPlug = true;
    },
    logOut: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.isPlug = false;
      state.authorizedUser  = {};
    },
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    clearErrors: (state) => {
      state.errors = {};
      return state;
    },
  },
  extraReducers: {
    [getContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.contactsData = action.payload;
    },
    [getContacts.pending]: (state) => {
      state.isLoading = true;
    },
    [editContact.fulfilled]: (state, action) => {
      state.contactsData = action.payload;
    },
    [addContact.fulfilled]: (state, action) => {
      state.contactsData = action.payload;
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.contactsData = action.payload;
    },
    [search.fulfilled]: (state, action) => {
      state.contactsData = action.payload;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.authorizedUser = {name: payload.login, avatar: payload.avatar};
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, {payload}) => {
      state.isFetching = false;
      state.isError = true;
      state.errors = {...state.errors, ...payload};
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

const Reducer = personalAccountSlice.reducer;

export const {
    setEditedCard,
    setPlug,
    logOut,
    clearState,
    clearErrors
  } = personalAccountSlice.actions;

export const personalAccountSelector = state => state;

export default Reducer;
