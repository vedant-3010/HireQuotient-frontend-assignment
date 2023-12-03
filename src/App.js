import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setUsers,
  selectUser,
  selectAllUsers,
  clearSelectedUsers,
  setCurrentPage,
  setSearchTerm,
} from './redux/userSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { data, selectedIds, currentPage, itemsPerPage, searchTerm } = useSelector(state => state.users);

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserData, setEditableUserData] = useState({
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const data = await response.json();
      dispatch(setUsers(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredData = data.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearch = event => {
    dispatch(setSearchTerm(event.target.value));
    dispatch(setCurrentPage(1));
  };

  const handlePagination = page => {
    dispatch(setCurrentPage(page));
  };

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      dispatch(clearSelectedUsers());
    } else {
      dispatch(selectAllUsers());
    }
  };

  const handleSelectUser = userId => {
    dispatch(selectUser(userId));
  };

  const handleDeleteSelected = () => {
    const updatedData = data.filter(user => !selectedIds.includes(user.id));
    dispatch(setUsers(updatedData));
    dispatch(clearSelectedUsers());
  };

  const handleDeleteUser = userId => {
    if (editableUserId !== userId) {
      const updatedData = data.filter(user => user.id !== userId);
      dispatch(setUsers(updatedData));
    }
  };
  
  const handleEditUser = userId => {
    setEditableUserId(userId);

    const userToEdit = data.find(user => user.id === userId);
    setEditableUserData({
      name: userToEdit.name,
      email: userToEdit.email,
      role: userToEdit.role,
    });
  };

  const handleSaveEdit = () => {
    dispatch(
      setUsers(data.map(user => (user.id === editableUserId ? { ...user, ...editableUserData } : user)))
    );
    setEditableUserId(null);
  };
  
  const handleCancelEdit = () => {
    setEditableUserId(null);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="btn btn-outline-secondary search-icon" type="button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div className="col-md-6 text-md-end">
          <button className="btn btn-danger" onClick={handleDeleteSelected}>
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover ">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedIds.length === paginatedData.length}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(user => (
              <tr key={user.id} className={selectedIds.includes(user.id) ? 'table-active' : ''}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleSelectUser(user.id)}
                    checked={selectedIds.includes(user.id)}
                  />
                </td>
                <td>
                  {editableUserId === user.id ? (
                    <input
                      type="text"
                      value={editableUserData.name}
                      onChange={e => setEditableUserData({ ...editableUserData, name: e.target.value })}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editableUserId === user.id ? (
                    <input
                      type="text"
                      value={editableUserData.email}
                      onChange={e => setEditableUserData({ ...editableUserData, email: e.target.value })}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editableUserId === user.id ? (
                    <input
                      type="text"
                      value={editableUserData.role}
                      onChange={e => setEditableUserData({ ...editableUserData, role: e.target.value })}
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {editableUserId === user.id ? (
                    <>
                      <button className="btn btn-light border mx-1" onClick={handleSaveEdit}>
                        <i className="fas fa-check"></i>
                      </button>
                      <button className="btn btn-light border mx-1" onClick={handleCancelEdit}>
                        <i className="fas fa-times text-danger"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-light border mx-1" onClick={() => handleEditUser(user.id)}>
                        <i className="fas fa-edit text-dark"></i>
                      </button>
                      <button className="btn btn-light border mx-1" onClick={() => handleDeleteUser(user.id)}>
                        <i className="fa-regular fa-trash-can text-danger"></i>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          {selectedIds.length >= 0 && (
            <p>{`${selectedIds.length} of ${filteredData.length} row(s) selected.`}</p>
          )}
        </div>

        <div className="col-md-6 text-md-end pb-4">
          <div className="btn-group" role="group">
            <button className="btn btn-light border mx-1" onClick={() => handlePagination(1)}>
              <i className="fa-solid fa-angles-left" style={{ color: "#9e9e9e" }}></i>
            </button>
            <button
              className="btn btn-light border mx-1"
              onClick={() => handlePagination(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fa-solid fa-angle-left" style={{ color: "#9e9e9e" }}></i>
            </button>
            {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => index + 1).map(page => (
              <button
                key={page}
                className={`btn btn-light border mx-1 ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePagination(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="btn btn-light border mx-1"
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
            >
              <i className="fa-solid fa-chevron-right" style={{ color: "#9e9e9e" }}></i>
            </button>
            <button
              className="btn btn-light border mx-1"
              onClick={() => handlePagination(Math.ceil(filteredData.length / itemsPerPage))}
            >
              <i className="fa-solid fa-angles-right" style={{ color: "#9e9e9e" }}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
