import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Classicway() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.publicapis.org/entries');
        const result = await response.json();
        setData(result.entries);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="sr-only"></span></div></div>;
  }

  return (
    <div className="container mt-4">
      <table className="table table-fixed">
        <thead>
          <tr>
            <th className="width-api">API</th>
            <th className="width-description">Description</th>
            <th className="width-auth">Auth</th>
            <th className="width-https">HTTPS</th>
            <th className="width-cors">Cors</th>
            <th className="width-link">Link</th>
            <th className="width-category">Category</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entity, index) => (
            <tr key={index}>
              <td className="width-api cell-truncate">{entity.API}</td>
              <td className="width-description cell-truncate">{entity.Description}</td>
              <td className="width-auth cell-truncate">{entity.Auth}</td>
              <td className="width-https truncate">{String(entity["HTTPS"])}</td>
              <td className="width-cors cell-truncate">{entity.Cors}</td>
              <td className="width-link cell-truncate">{entity.Link}</td>
              <td className="width-category cell-truncate">{entity.Category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Classicway;
