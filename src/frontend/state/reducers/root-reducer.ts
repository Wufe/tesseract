import { Action } from "redux";

export type TRootState = {
    initialized: boolean;
};
export const initialRootState: TRootState = {
    initialized: false,
};

export enum RootAction {
    START = '@@root/start',
}

export const rootReducer = (state: TRootState = initialRootState, action: TActionWithPayload<RootAction, unknown>): TRootState => {
    switch (action.type) {
        case RootAction.START:
            return { ...state, initialized: true };
    }
    return state;
}


type TActionWithPayload<TType extends string, TPayload extends any> = Action<TType> & {
    payload?: TPayload;
}