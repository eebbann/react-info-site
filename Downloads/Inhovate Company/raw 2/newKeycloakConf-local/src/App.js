import React from 'react';
import Keycloak from 'keycloak-js';
import LoadingScreen from './helpers/LoadingScreen';
import AppContent from './AppContent';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: false};
    }

    componentDidMount = () => {

        // INIT Keycloak
				const keycloak = new Keycloak({
					url: "http://localhost:8080/",
					realm: "inhovate-realm",
					clientId: "inhovate-id",
					onLoad: "login-required",
				});

        keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).then(authenticated => {
            this.setState({ keycloak: keycloak, authenticated: authenticated });
            sessionStorage.setItem("inhovate-token", keycloak?.token)
            sessionStorage.setItem("inhovate-username", keycloak?.tokenParsed.given_name)
            sessionStorage.setItem("inhovate-usernameTwo", keycloak?.tokenParsed.preferred_username)
            sessionStorage.setItem("inhovate-user", JSON.stringify(keycloak))
        }).catch(() => {
            console.log('Failed to load keycloak profile');
            sessionStorage.removeItem("inhovate-token")
            sessionStorage.removeItem("inhovate-username")
            sessionStorage.removeItem("inhovate-user")
        });


        // REFRESH Keycloak token
        keycloak.onTokenExpired = () => {
            console.log('expired ' + new Date());
            keycloak?.updateToken().then((refreshed) => {
                if (refreshed) {
                    console.info('Keycloak refreshed ' + new Date())
                    sessionStorage.removeItem("inhovate-token")
                    sessionStorage.setItem("inhovate-token", keycloak.token)
                } else {
                    console.warn('Keycloak not refreshed ' + new Date())
                    sessionStorage.removeItem("inhovate-token")
                    sessionStorage.removeItem("inhovate-username")
                    sessionStorage.removeItem("inhovate-usernameTwo")
                    sessionStorage.removeItem("inhovate-user")
                }
            }).catch(function () {
                sessionStorage.removeItem("inhovate-token")
                sessionStorage.removeItem("inhovate-username")
                sessionStorage.removeItem("inhovate-usernameTwo")
                sessionStorage.removeItem("inhovate-user")
                console.alert('the session has expired, please Sign in again')
            });
        }

    }

    render() {

        return (
                <>
                {this.state.authenticated ?
                    <AppContent keycloakObj={this.state.keycloak}/>
                    :
                    <LoadingScreen />
                }
                </>
        )
    }
}

export default App;

// import React, {useState, useEffect} from 'react';
// import Keycloak from 'keycloak-js';
// import LoadingScreen from './helpers/LoadingScreen';
// import AppContent from './AppContent';
// import { useDispatch, useSelector } from 'react-redux'
// import { get_userData, majUser } from './store/user';

// const App = () => {

//     const [keyckloakObj, setKeyckloakObj] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     const dispatch = useDispatch();

//     const setUser = (keycloakObject) => {
//         dispatch(
//           majUser({
//             data: keycloakObject,
//             token: keycloakObject.token,
//             firstname: keycloakObject.tokenParsed.given_name,
//             lastname: keycloakObject.tokenParsed.family_name,
//             email: keycloakObject.tokenParsed.email
//           })
//         );
//     };

//     // const userDetails = useSelector(get_userData)

//     useEffect(() => {
//         const keycloak = Keycloak({
//             "url": "http://localhost:8080/",
//             "realm": "inHovate-MappingUtility",
//             "clientId": "inHovate-React",
//             "onLoad": "login-required"
//           });

//         keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).then(authenticated => {
//             // this.setState({ keycloak: keycloak, authenticated: authenticated });
//             setKeyckloakObj(keycloak);
//             setIsAuthenticated(authenticated)
//             setUser(keycloak)
//             // console.log("in redux this is that", userDetails)
//         }).catch(() => {
//             console.log('Failed to load keycloak profile');
//         });


//         // REFRESH Keycloak token
//         keycloak.onTokenExpired = () => {
//             console.log('expired ' + new Date());
//             keycloak?.updateToken().then((refreshed) => {
//                 if (refreshed) {
//                     console.info('Keycloak refreshed ' + new Date())
//                 } else {
//                     console.warn('Keycloak not refreshed ' + new Date())
//                 }
//             }).catch(function () {
//                 console.alert('the session has expired, please Sign in again')
//             });
//         }

//     }, [])

//     return (
//         <>
//         {isAuthenticated ?
//             <AppContent/>
//             :
//             <LoadingScreen />
//         }
//         </>
//     )
// }

// export default App
