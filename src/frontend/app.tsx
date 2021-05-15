import './app.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "./state/reducers/root-reducer";
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

    const title = useSelector<TRootState, string>(x => x.resources.title);
    const subtitle = useSelector<TRootState, string>(x => x.resources.subtitle);

    return <Layout>
        <Header>
            <Logo
                src="https://via.placeholder.com/108x40?text=LOGO"
                width="108"
                height="40" />
        </Header>
        <PageBody>
            <PageTitle>{title}</PageTitle>
            <PageSubtitle>{subtitle}</PageSubtitle>
            <VerticalSpacer space={3} />
            <DropZone></DropZone>
        </PageBody>
    </Layout>;
}