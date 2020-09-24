const redux = require("redux");
// import redux from 'redux';

const createStore = redux.createStore;
const initialState = { number: 0 };

const reducer = (state = initialState, action) => {
    if (action.type == "ADD"){
        return ({...state, number: state.number + 1});
    }
    else if (action.type == "ADD_VALUE"){
        return ({
            ...state, number: state.number + action.value
        });
    }
    return state;
}

const store = createStore(reducer);

store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

store.dispatch({type: "ADD"});
console.log(store.getState());
store.dispatch({type: "ADD_VALUE", value: 5});
console.log(store.getState());