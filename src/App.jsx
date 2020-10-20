import React from 'react';
import { hot } from 'react-hot-loader/root';

// Here we import all the custom made components from components folder
import Title from './components/Title/Title';
import Body from './components/Body/Body';
import TestCompo from './components/TestCompo/TestCompo';

// This is the main App which will be the final webpage
const App = () => {
  // Ye return statement mein ya  to custom components use karlo ya fir html ke tags
  return (
    <div>
      <Title />
      <Body name="Pragun Saini" age="19" />
      <hr />
      <Body name="Yash Pal" age="20" />
      <hr />
      <Body name="Kuldeep" age="2000" />
      <TestCompo name="SachMe" />
    </div>
  );
};

/*

  ye jo return me <> </> wale tags haina inhe Fragment kehte hain,
  React me kya haina ki return mein ek outer tag hona hi chahie, jaise xml me hota hai main tag ek

  to agar ek hi tag hai jaise <p> to to direct return kardo
    return <p>blablabla</p>

  par agar ek se jada hain to yato div mein daldo ek
    return (
      <div>
        <p>Wow</p>
        <p>Wow</p>
      </div>
    )

    par isse div bhi render hoga html me, to bin baat ka div ni chahie to <></> use karlo
    return (
      <>
        <p>Wow</p>
        <p>Wow</p>
      </>
    )

*/

export default hot(App);
