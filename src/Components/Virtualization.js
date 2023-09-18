import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, entitiesFetched } from '../Redux/entitiesSlice';
import { FixedSizeList as List } from 'react-window';
import 'bootstrap/dist/css/bootstrap.min.css';


const columnClasses = {
  API: "col-1",
  Description: "col-3",
  Auth: "col-1",
  HTTPS: "col-1",
  Cors: "col-1",
  Link: "col-4",
  Category: "col-1"
};

const listHeight = window.innerHeight * 0.8;
function EntityList() {
  const dispatch = useDispatch();
  const entities = useSelector((state) => state.entities.entities);

  useEffect(() => {
    async function fetchData() {
      dispatch(startLoading());
      const response = await fetch("https://api.publicapis.org/entries");
      const data = await response.json();
      dispatch(entitiesFetched(data.entries));
    }

    fetchData();
  }, [dispatch]);



  // For the header:
  <div className="d-flex border bg-light">
    {Object.keys(columnClasses).map((key) => (
      <div className={columnClasses[key]} key={key}>{key}</div>
    ))}
  </div>

  const Row = ({ index, style }) => {
    const item = entities[index];
    return (
      <div className="d-flex border" style={style}>
        <div className={`${columnClasses.API} truncate`}>{item.API}</div>
        <div className={`${columnClasses.Description} truncate`}>{item.Description}</div>
        <div className={`${columnClasses.Auth} truncate`}>{item.Auth}</div>
        <div className={`${columnClasses.HTTPS} truncate`}>{String(item["HTTPS"])}</div>
        <div className={`${columnClasses.Cors} truncate`}>{item.Cors}</div>
        <div className={`${columnClasses.Link} truncate`}>{item.Link}</div>
        <div className={`${columnClasses.Category} truncate`}>{item.Category}</div>
      </div>
    );
  };
  return (
    <div className="container mt-4">
      <div className="d-flex border bg-light headingVirTable">
        {Object.keys(columnClasses).map((key) => (
          <div className={columnClasses[key]} key={key}>{key}</div>
        ))}
      </div>
      <List
        height={listHeight}
        itemCount={entities.length}
        itemSize={50}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
}

export default EntityList;
