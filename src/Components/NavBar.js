import React from 'react';
import {  Link } from 'react-router-dom';


function NavBar() {
  const handleClick = () => {
    alert('Button was clicked!');
  };

  return (

    <div class="container">
      <div class="row">
        <div class="col-sm">
          <button type="button" class="btn btn-primary"  > <Link to="/Virtu">Virtualization Way</Link>  </button>
        </div>
        <div class="col-sm">
          <button type="button" class="btn btn-primary"  ><Link to="/Pagination">Pagination Way</Link>  </button>
        </div>
        <div class="col-sm">
          <button type="button" class="btn btn-primary"  ><Link to="/Scroll">Normal Way</Link>  </button>

        </div>
      </div>
    </div>

  );
}

export default NavBar;