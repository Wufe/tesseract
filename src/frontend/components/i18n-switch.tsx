import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TActionWithPayload, TRootState } from '../state/reducers/root-reducer';
import { LanguageSwitcherOuter, LanguageSwitcherInner } from './ui/language-switcher';
import { I18NAction, Language } from '../state/reducers/i18n-reducer';

export const I18nSwitch = () => {

    const dispatch = useDispatch();
    const currentLanguage = useSelector<TRootState, Language>(x => x.i18n.currentLanguage);
    const englishResource = useSelector<TRootState, string>(x => x.i18n.resources.english);

    const onLanguageClick = (language: Language) => {
        dispatch({ type: I18NAction.SWITCH_LANGUAGE, payload: language } as TActionWithPayload<I18NAction, Language>);
    }

    return <LanguageSwitcherOuter>
        <LanguageSwitcherInner
            selected={currentLanguage === Language.ENCRYPTED}
            onClick={() => onLanguageClick(Language.ENCRYPTED)}>Encrypted</LanguageSwitcherInner>
        <LanguageSwitcherInner
            selected={currentLanguage === Language.ENGLISH}
            onClick={() => onLanguageClick(Language.ENGLISH)}>{englishResource}</LanguageSwitcherInner>
    </LanguageSwitcherOuter>;
}