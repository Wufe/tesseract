import './app.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRootState, RootAction } from "./state/reducers/root-reducer";
import styled from "styled-components";
import { FlexCol } from './components/ui/flex-col';
import { Layout } from './components/ui/layout';
import { Header } from './components/ui/header';
import { Logo } from './components/ui/logo';
import { PageBody } from './components/ui/page/page-body';
import { PageTitle } from './components/ui/page/page-title';
import { PageSubtitle } from './components/ui/page/page-subtitle';
import { DropZone } from './components/drop-zone';
import { VerticalSpacer } from './components/ui/spacer';

export const App = () => {

    const dispatch = useDispatch();
    const initialized = useSelector<TRootState, boolean>(x => x.initialized);

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: RootAction.START });
        }, 1000);
    }, []);


    return <Layout>
        <Header>
            <Logo
                src="https://via.placeholder.com/108x40?text=LOGO"
                width="108"
                height="40" />
        </Header>
        <PageBody>
            <PageTitle>`4!!(3=s 4+3</PageTitle>
            <PageSubtitle>^#5 -"$#=.-+(-$=%(+$=$-"18/3(.-= -#=#$"18/3(.-K=p$"41$= -8=%(+$=38/$= -#=, (-3 (-=8.41=/1(5 "8&gt;</PageSubtitle>
            {initialized && <span>Initialized!</span>}
            <VerticalSpacer space={3} />
            <DropZone></DropZone>
        </PageBody>
    </Layout>;
}