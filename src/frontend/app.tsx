import './app.css';
import React from "react";
import { useSelector } from "react-redux";
import { TRootState } from "./state/reducers/root-reducer";
import { Layout } from './components/ui/layout';
import { Header } from './components/ui/header';
import { Logo } from './components/ui/logo';
import { PageBody } from './components/ui/page/page-body';
import { PageTitle } from './components/ui/page/page-title';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { DropPage } from './components/pages/drop-page';

export const App = () => {

    const title = useSelector<TRootState, string>(x => x.resources.title);
    return <Layout>
        <Header>
            <Logo  />
        </Header>
        <PageBody>
            <PageTitle>{title}</PageTitle>

            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <DropPage />
                    </Route>
                </Switch>
            </BrowserRouter>

            
        </PageBody>
    </Layout>;
}