import { Reducer } from "redux";
import { TActionWithPayload } from "./root-reducer";

export type TResourcesState = {
    title: string;
    subtitle: string;
    languageSelectorOption: string;
    fileSelector: string;
    footer: string;
}

export const initialResourcesState: TResourcesState = {
    title: `\`4!!(3=s 4+3`,
    subtitle: `^#5 -"$#=.-+(-$=%(+$=$-"18/3(.-= -#=#$"18/3(.-K=p$"41$= -8=%(+$=38/$= -#=, (-3 (-=8.41=/1(5 "8>`,
    languageSelectorOption: `b-&+(2'`,
    fileSelector: `\`'..2$=%(+$>`,
    footer: `q'$=6'.+$=(2=-$5$1=3'$=24,=.%=3'$=/ 132=J=(3=(2=&1$ 3$1=.1=+$22$1I=#$/$-#(-&=.-='.6=6$++=3'$=(-#(5(#4 +2=6.1*=3.&$3'$1`
}

export enum ResourcesAction {
    USE_ENCRYPTED = '@resources/useEncrypted'
}

export const resourcesReducer: Reducer<TResourcesState> = (state: TResourcesState = initialResourcesState, action: TActionWithPayload<ResourcesAction, unknown>): TResourcesState => {
    return state;
}