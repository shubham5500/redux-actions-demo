const defaultState = { counter: 0 };

const content = document.getElementById("content");

const { createStore } = window.Redux;

const { createActions, handleActions, combineActions } = window.ReduxActions;

const { increment, decrement } = createActions({
  INCREMENT: (amount = 1) => ({ amount }),
  DECREMENT: (amount = 1) => ({ amount: -amount })
});

const reducer = handleActions(
  {
    [combineActions(increment, decrement)]: (
      state,
      { payload: { amount } }
    ) => ({
      ...state,
      counter: state.counter + amount
    })
  },
  defaultState
);

const store = createStore(reducer, defaultState);

document.getElementById("increment").addEventListener("click", function () {
  store.dispatch(increment(5));
});

document.getElementById("decrement").addEventListener("click", function () {
  store.dispatch(decrement());
});

const render = () => {
  content.innerHTML = store.getState().counter;
};

render();

store.subscribe(render);
