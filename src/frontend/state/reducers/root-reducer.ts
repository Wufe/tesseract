import { Action, combineReducers } from "redux";
import { initialInternationalizationState, internationalizationReducer, TInternationalizationState } from "./i18n-reducer";

export type TRootState = {
    i18n: TInternationalizationState;
};
export const initialRootState: TRootState = {
    i18n: initialInternationalizationState,
};

export const rootReducer = combineReducers({
    i18n: internationalizationReducer
});


export type TActionWithPayload<TType extends string, TPayload extends any> = Action<TType> & {
    payload?: TPayload;
}