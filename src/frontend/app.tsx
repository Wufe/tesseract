import './app.css';
import React from "react";
import { useSelector } from "react-redux";
import { TRootState } from "./state/reducers/root-reducer";
import { Layout } from './components/ui/layout';
import { Header, SubHeader } from './components/ui/header';
import { Logo } from './components/ui/logo';
import { PageBody } from './components/ui/page/page-body';
import { PageTitle } from './components/ui/page/page-title';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UploadPage } from './components/pages/upload/upload-page';
import { VerticalSpacer } from './components/ui/spacer';
import { Footer } from './components/ui/footer';
import { DownloadPage } from './components/pages/download/download-page';
import { LanguageSwitcherInner, LanguageSwitcherOuter } from './components/ui/language-switcher';
import { I18nSwitch } from './components/i18n-switch';
import { useMediaQuery } from 'react-responsive';

export const App = () => {
    const title = useSelector<TRootState, string>(x => x.i18n.resources.title);
    const footer = useSelector<TRootState, string>(x => x.i18n.resources.footer);
    const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

    return <Layout>
        <Header>
            <Logo  />
            {!isMobile && <I18nSwitch />}
        </Header>
        {isMobile && <>
            <VerticalSpacer space={2} />
            <SubHeader>
                <I18nSwitch />
            </SubHeader>
            <VerticalSpacer space={2} />
        </>}
        <PageBody>
            <PageTitle>{title}</PageTitle>

            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <UploadPage />
                    </Route>
                    <Route path="/decrypt">
                        <DownloadPage />
                    </Route>
                </Switch>
            </BrowserRouter>

            <VerticalSpacer space={8} /> {/* Footer spacing */}
            <Footer>{footer}</Footer>
        </PageBody>
    </Layout>;
}