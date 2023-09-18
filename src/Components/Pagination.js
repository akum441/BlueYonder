import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { entitiesFetched, setCurrentPage, setEntitiesPerPage } from '../Redux/entitiesSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

function Pagination() {
  const maxPagesToShow = 5;
  const entities = useSelector((state) => state.entities.entities);
  const currentPage = useSelector((state) => state.entities.currentPage);
  const entitiesPerPage = useSelector((state) => state.entities.entitiesPerPage);
  const dispatch = useDispatch();

  const totalPages = Math.ceil(entities.length / entitiesPerPage);
  const displayedEntities = entities.slice((currentPage - 1) * entitiesPerPage, currentPage * entitiesPerPage);

  const handleEntitiesPerPageChange = (e) => {
    dispatch(setEntitiesPerPage(Number(e.target.value)));
    dispatch(setCurrentPage(1));  // Reset to first page when changing the number of entities per page
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.publicapis.org/entries`);
      const data = await response.json();

      // Store in Redux
      dispatch(entitiesFetched(data.entries));
    }

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      {/* Dropdown to select number of entities per page */}
      <div className="mb-3">
        <label>Show entities per page:</label>
        <select value={entitiesPerPage} onChange={handleEntitiesPerPageChange} className="form-control w-auto d-inline-block ml-2">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      {/* Display entities in a Bootstrap table */}
      <table className="table">
        <thead>
          <tr>
            <th>API</th>
            <th>Description</th>
            <th>Auth</th>
            <th>HTTPS</th>
            <th>Cors</th>
            <th>Link</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {displayedEntities.map(entity => (
            <tr key={entity.id}>
              <td>{entity.API}</td>
              <td>{entity.Description}</td>
              <td>{entity.Auth}</td>
              <td>{String(entity["HTTPS"])}</td>
              <td>{entity.Cors}</td>
              <td>{entity.Link}</td>
              <td>{entity.Category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <nav>
      <ul className="pagination">
        {/* First and Previous Page Buttons */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => dispatch(setCurrentPage(1))}>First</button>
        </li>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => dispatch(setCurrentPage(currentPage - 1))}>Previous</button>
        </li>

        {/* Page Numbers */}
        {currentPage > 2 && <li className="page-item"><span className="page-link">...</span></li>}
        {[...Array(Math.min(totalPages, maxPagesToShow))].map((_, index) => {
          const pageNumber = currentPage <= 2 ? index + 1 : currentPage - 2 + index;
          if (pageNumber > totalPages) return null;
          return (
            <li className={`page-item ${pageNumber === currentPage ? 'active' : ''}`} key={pageNumber}>
              <button className="page-link" onClick={() => dispatch(setCurrentPage(pageNumber))}>
                {pageNumber}
              </button>
            </li>
          );
        })}
        {currentPage < totalPages - 1 && <li className="page-item"><span className="page-link">...</span></li>}

        {/* Next and Last Page Buttons */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => dispatch(setCurrentPage(currentPage + 1))}>Next</button>
        </li>
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => dispatch(setCurrentPage(totalPages))}>Last</button>
        </li>
      </ul>
    </nav>
    </div>
  );
}

export default Pagination;
