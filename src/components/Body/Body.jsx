import React from 'react';
import PropTypes from 'prop-types';

// Ye ek dynamic component hai, jo arguments ke hisab se change hoga
// React me jo function haina component wale, un sabke paas ek special argument ata hai automatically jiska naam hai "props"
// To jab is function kko kahin bhi tag ki tara use karoge (jaise App.jsx me kar rakha hai) aur property pass karoge to wo is
// props object pe chali jaegi
// fir use karlo unhe
const Body = ({ name, age }) => {
  return (
    <div>
      <p>Name is {name}</p>
      <p>Age is {age}</p>
    </div>
  );
};

// Ye jo {} use kar rakha haina <p> mein wo hai html me javascript ke lie
// props to ek object hai JS ka, aur return mein sirf html hai, to agar JS use karni ho to {} mein daldeni hai

Body.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
};

export default Body;
