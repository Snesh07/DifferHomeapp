import * as actionTypes from '../redux/actions'

// let arr = new Array(3).fill(1);
const initialState = {
  propertyTypeArr:[1,1,1],
  state:"",
  city:""
};
const homeReducer = (state = initialState, action) => {
  // console.log(action);

  switch (action.type) {

    case actionTypes.HANDLE_PROPERTY_TYPE:

      return  { ...state, ['propertyTypeArr']: state.propertyTypeArr.map((value,i)=>{
        if(i === action.payload.id) return (value+1)%2;
        return value;
      })  };
      
    case actionTypes.HANDLE_STATE:

          return {...state,['state']:action.payload.state};

    case actionTypes.HANDLE_CITY:
        return {...state,['city']:action.payload.city};
      
    default:
      return state;
  }
};

export default homeReducer;
