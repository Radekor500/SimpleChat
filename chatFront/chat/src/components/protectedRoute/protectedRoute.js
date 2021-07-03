import { Redirect, Route, withRouter } from "react-router";


const ProtectedRoute = ({loginCheck, component: Component, component2: Component2, component3: Component3, ...rest}) => {
   
    return (
        <Route
        {...rest}
        render={props => {
            console.log(loginCheck)
            if(loginCheck) {
                if(props.match.path === "/"){
                    return  (
                        <div>
                            <Component {...props} {...rest}/>
                        </div>
                    )
                        }
                if (props.match.path === "/rooms") {
                    return <Component {...props} {...rest}/>
                }
            } else {
                return (
                    <Redirect
                    to={{
                        pathname: "/login",
                        state: {
                            from: props.location
                        }
                    }}
                    ></Redirect>
                )
            }
        }}
        ></Route>
    )
}

export default withRouter(ProtectedRoute);