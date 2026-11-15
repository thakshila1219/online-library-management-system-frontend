import {combineReducers} from "redux";
import {productReducer} from "./productsSlice.ts";

export const rootReducer = combineReducers({
    products: productReducer,
})

export type RootReducerState = ReturnType<typeof rootReducer>