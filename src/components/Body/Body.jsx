import React from 'react';

// Ye ek dynamic component hai, jo arguments ke hisab se change hoga
// React me jo function haina component wale, un sabke paas ek special argument ata hai automatically jiska naam hai "props"
// To jab is function kko kahin bhi tag ki tara use karoge (jaise App.jsx me kar rakha hai) aur property pass karoge to wo is
// props object pe chali jaegi
// fir use karlo unhe
const Body = props => {
  return (
    <div>
      <p>Name is {props.name}</p>
      <p>Age is {props.age}</p>
    </div>
  );
};

// Ye jo {} use kar rakha haina <p> mein wo hai html me javascript ke lie
// props to ek object hai JS ka, aur return mein sirf html hai, to agar JS use karni ho to {} mein daldeni hai

export default Body;
