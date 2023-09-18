import React, { useState } from 'react';
import {  Link } from 'react-router-dom';


function NavBar() {
  const [activeButton, setActiveButton] = useState(1); 


  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  return (

    <div class="container">
      <div class="row">
        <div class="col-sm">
          <button type="button" class="btn btn-primary"  
           style={{ backgroundColor: activeButton === 1 ? 'blue' : 'gray' }}
           onClick={() => handleButtonClick(1)}
          > <Link to="/Virtu">Virtualization Way</Link>  </button>
        </div>
        <div class="col-sm">
          <button type="button" class="btn btn-primary" 
          style={{ backgroundColor: activeButton === 2 ? 'blue' : 'gray' }}
          onClick={() => handleButtonClick(2)}
          ><Link to="/Pagination">Pagination Way</Link>  </button>
        </div>
        <div class="col-sm">
          <button type="button" class="btn btn-primary" 
           style={{ backgroundColor: activeButton === 3 ? 'blue' : 'gray' }}
           onClick={() => handleButtonClick(3)}
            ><Link to="/Scroll">Classic Way</Link>  </button>

        </div>
      </div>
    </div>

  );
}

export default NavBar;