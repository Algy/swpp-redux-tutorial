const redux = require("redux");
const createState = redux.createStore;
const initialState = {  number: 0};

const reducer = (state = initialState, action) => {
    if(action.type == 'ADD'){
        return {...state,  number: state.number+1};
    }else if(action.type == 'ADD_VALUE'){
        return {...state, number: state.number + action.va;ue};
    }
    return state;
}

const store = createStore(reducer);
store.subscribe(() =>{
    console.log('[subscription]'.getState());
});
console.log(store.getState());