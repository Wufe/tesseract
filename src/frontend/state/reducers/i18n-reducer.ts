import { Reducer } from "redux";
import { decrypt, encrypt } from "./encrypt-decrypt";
import { TActionWithPayload } from "./root-reducer";

export enum Language {
    ENGLISH = 'english',
    ENCRYPTED = 'encrypted',
}

export type TInternationalizationState = {
    currentLanguage: Language;
    resources: {
        title: string;
        subtitle: string;
        english: string;
        chooseFile: string;
        footer: string;
    }
}

export const initialInternationalizationState: TInternationalizationState = {
    currentLanguage: Language.ENCRYPTED,
    resources: {
        title: `\`4!!(3=s 4+3`,
        subtitle: `^#5 -"$#=.-+(-$=%(+$=$-"18/3(.-= -#=#$"18/3(.-K=p$"41$= -8=%(+$=38/$= -#=, (-3 (-=8.41=/1(5 "8>`,
        english: `b-&+(2'`,
        chooseFile: `\`'..2$=%(+$>`,
        footer: `q'$=6'.+$=(2=-$5$1=3'$=24,=.%=3'$=/ 132=J=(3=(2=&1$ 3$1=.1=+$22$1I=#$/$-#(-&=.-='.6=6$++=3'$=(-#(5(#4 +2=6.1*=3.&$3'$1`
    }
}

export enum I18NAction {
    SWITCH_LANGUAGE = '@@resources/switchLanguage'
}

const key = 'fullstack';
const decryptWithKey = function (message: string) {
    return decrypt(key, message);
}
const encryptWithKey = function (message: string) {
    return encrypt(key, message);
}
export const internationalizationReducer: Reducer<TInternationalizationState> = (state: TInternationalizationState = initialInternationalizationState, action: TActionWithPayload<I18NAction, unknown>): TInternationalizationState => {
    switch (action.type) {
        case I18NAction.SWITCH_LANGUAGE:
            const { payload: language } = action as TActionWithPayload<I18NAction, Language>;
            let cipherFunction: (message: string) => string;
            if (language === Language.ENCRYPTED) {
                if (state.currentLanguage === Language.ENCRYPTED)
                    return state;
                cipherFunction = encryptWithKey;
            } else if (language === Language.ENGLISH) {
                if (state.currentLanguage === Language.ENGLISH)
                    return state;
                cipherFunction = decryptWithKey;
            }
            return {
                ...state,
                currentLanguage: language,
                resources: {
                    ...state.resources,
                    title: cipherFunction(state.resources.title),
                    subtitle: cipherFunction(state.resources.subtitle),
                    english: cipherFunction(state.resources.english),
                    chooseFile: cipherFunction(state.resources.chooseFile),
                    footer: cipherFunction(state.resources.footer)
                }
            };
    }
    return state;
}


