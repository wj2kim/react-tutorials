import React, { useState, Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
const SpliteMe = React.lazy(() => import("./SplitMe"));

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick}> Hello React!</p>
        <Suspense fallback={<div>loading...</div>}>
          {visible && <SpliteMe />}
        </Suspense>
      </header>
    </div>
  );
}

export default App;

// function App() {
//   const onClick = () => {
//     import("./notify").then((result) => result.default());
//   };
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>Hello React!</p>
//         <button value="click me" onClick={onClick}></button>
//       </header>
//     </div>
//   );
// }

// export default App;
