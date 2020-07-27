import { createStore } from "redux";

const divToggle = document.querySelector(".toggle"); // DOM 노드를 가르키는 값을 선언
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

// 프로그램 상태에 변화를 일으키는 것을 액션이라고 한다. ( 액션 이름은 문자열 형태 + 대문자 + 고유 해야 한다.)

const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// 다음으로 이 액션 이름을 사용하여 액션 객체를 만드는 액션 생성 함수를 작성 한다. ( 액션 값은 반드시 type 값을 가지고 있어야 한다.)

const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

// 프로젝트에서 사용할 초깃값을 정의 한다
const initialState = {
  toggle: false,
  counter: 0,
};

// 리듀서는 변화를 일으키는 함수이며, 함수의 파라미터로는 state 와 action 값을 받아 옵니다.
function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // 불변성 유지
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

// store 생성
const store = createStore(reducer);

// render 함수 작성 (상태가 업데이트 될 때마다 호출 됨, 리액트의 render 함수와는 다르게 이미 html을 사용하여 만들어진 UI의 속성을 상태에 따라 변경해 줍니다.)
const render = () => {
  const state = store.getState(); // 현재 상태를 불러옴
  // 토글 처리
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }
  // 카운터 처리
  counter.innerText = state.counter;
};

// 상태가 업데이트 될 때마다 render 함수를 호출하도록 코드 작성
render();
store.subscribe(render);

// 액션을 발생시키는 것을 디스패치라고 합니다. ( 액션 객체를 파라미터로 넣어줍니다.)

divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};

btnDecrease.onclick = () => {
  store.dispatch(decrease());
};

/*
리덕스의 세가지 규칙 
1. 단일 스토어 - 권장
2. 읽기 전용 상태 - 불변성을 유지시켜라 ( 내부적으로 데이터가 변경되는 것을 감지하기 위해 (shallow equality) 검사를 하기 떄문. 깊숙한 곳까지 비교하는 것이 아닌 겉핥기로 비교하니 좋은 성능을 유지할 수 있음)
3. 리듀서는 순수한 함수 - 변화를 일으키는 함수는 순수한 함수여야 합니다. 
    a. 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받는다. 
    b. 파라미터 외의 값에는 의존하면 안됩니다. 
    c. 이전 상태는 건들지 말고 변화를 준 새로운 상태 객체를 만들어서 반환 합니다.
    d. 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값을 반환해야 합니다. 
        (리듀서 함수 내부에서 랜덤값을 만들거나 Date 함수를 사용하거나, 네트워크를 요청하면 파라미터가 같아도 다른 결과를 만들어 낼 수 있기에 사용하면 안됩니다.
        함수 밖에서 처리해야합니다. 액션을 만드는 과정 or 리덕스 미들웨어에서 ) 
*/
