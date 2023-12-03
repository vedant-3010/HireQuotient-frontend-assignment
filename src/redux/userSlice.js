import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    selectedIds: [],
    currentPage: 1,
    itemsPerPage: 10,
    searchTerm: '',
  },
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload;
    },
    selectUser: (state, action) => {
      const userId = action.payload;
      if (state.selectedIds.includes(userId)) {
        state.selectedIds = state.selectedIds.filter(id => id !== userId);
      } else {
        state.selectedIds.push(userId);
      }
    },
    selectAllUsers: state => {
      state.selectedIds = state.data
        .slice((state.currentPage - 1) * state.itemsPerPage, state.currentPage * state.itemsPerPage)
        .map(user => user.id);
    },
    clearSelectedUsers: state => {
      state.selectedIds = [];
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setUsers, selectUser, selectAllUsers, clearSelectedUsers, setCurrentPage, setSearchTerm } = userSlice.actions;
export default userSlice.reducer;
