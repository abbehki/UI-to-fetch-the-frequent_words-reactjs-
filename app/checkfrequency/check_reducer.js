import ACTION from '../action_constants';

function check_reducer(state = {},action){
  let tempState = Object.assign({}, state);
  if(action.type === "RESULT") {
    tempState.load = action.data;
    return tempState;
  }
  return state;
}
export default check_reducer;
