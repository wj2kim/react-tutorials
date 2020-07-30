import React from "react";
import CounterContainer from "./contain/CounterContainer";
import Todos from "./components/Todos";

const App = () => {
  return (
    <div>
      <CounterContainer />
      <hr />
      <Todos />
    </div>
  );
};

export default App;
