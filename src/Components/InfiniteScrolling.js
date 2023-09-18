import React, { useEffect, useCallback, useRef ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, entitiesFetched } from '../Redux/entitiesSlice';

function InfiniteScrolling() {
  const dispatch = useDispatch();
  const entities = useSelector((state) => state.entities.entities);
  const loading = useSelector((state) => state.entities.loading);
  const hasMore = useSelector((state) => state.entities.hasMore);
  const [page, setPage] = useState(1);

  const observer = useRef();
  const lastEntityRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    async function fetchData() {
      dispatch(startLoading());
      const response = await fetch(`https://api.example.com/entities?page=${page}`);
      const data = await response.json();
      dispatch(entitiesFetched(data));
    }

    fetchData();
  }, [dispatch, page]);

  return (
    <div>
      {entities.map((entity, index) => {
        if (entities.length === index + 1) {
          return <div ref={lastEntityRef} key={entity.id}>{entity.name}</div>;
        } else {
          return <div key={entity.id}>{entity.name}</div>;
        }
      })}
      {loading && <div>Loading...</div>}
      {!hasMore && <div>No more entities to load</div>}
    </div>
  );
}

export default InfiniteScrolling;
