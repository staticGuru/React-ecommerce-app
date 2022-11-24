export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCT':
      return { ...state, products: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    default:
      return state;
  }
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case 'SET_PAGINATION':
      return {...state,pagination:action.payload};
    case "SORT_BY_CATEGORY":
      return { ...state,searchQuery:"", category: action.payload };
   
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload,category:{value:-1,label:'select the category'} };
    case "CLEAR_FILTERS":
      return { byRating: 0,searchQuery:"",pagination:{skip:0,total:0} };
    default:
      return state;
  }
};
