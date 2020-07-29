import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;

/* 
    파일 이름을 index.js 로 설정해 주면 나중에 불러올 때 디렉터리 이름까지만 입려하여 불러 올 수 있다. 
    import rootReducer from './modules';
*/
