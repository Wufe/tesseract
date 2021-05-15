import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootAction, TRootState } from './state/reducers/root-reducer';
import { store } from './state/store';

const App = () => {

    const dispatch = useDispatch();
    const initialized = useSelector<TRootState, boolean>(x => x.initialized);

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: RootAction.START });
        }, 1000);
    }, []);


    return <>
        <h1>Hello world</h1>
        {initialized && <span>Initialized!</span>}
    </>;
}

render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('app'));