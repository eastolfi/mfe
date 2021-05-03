import { useHistory } from 'react-router';
import { Auth0Provider } from '@auth0/auth0-react';

export const Auth0ProviderWithHistory = (props) => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

    const history = useHistory();

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            { props.children }
        </Auth0Provider>
    );
};