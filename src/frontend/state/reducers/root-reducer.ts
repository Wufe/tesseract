import { Action, combineReducers } from "redux";
import { initialResourcesState, resourcesReducer, TResourcesState } from "./resources-reducer";

export type TRootState = {
    resources: TResourcesState;
};
export const initialRootState: TRootState = {
    resources: initialResourcesState,
};

export const rootReducer = combineReducers({
    resources: resourcesReducer
});


export type TActionWithPayload<TType extends string, TPayload extends any> = Action<TType> & {
    payload?: TPayload;
}