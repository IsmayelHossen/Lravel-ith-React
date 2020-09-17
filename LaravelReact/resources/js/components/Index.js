import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import ReactDOM from 'react-dom';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Allstudent from './Pages/allstudent';
import Editstudent from './Pages/Editstudent';
import AddStudent from './Pages/Addstudent';
import Register from './Pages/register';
import Singin from './Pages/Singin';
import { checkIfAuthenticated1 } from '../service/authservice';
import AuthenticatedRoutes from './AuthenticatedRoutes';

class Index extends React.Component{
    state ={
        user:"",
        isLoggedIn: false,
    }
    componentDidMount() {
        if (checkIfAuthenticated1()) {
            this.setState({
                user: checkIfAuthenticated1(),
                isLoggedIn: true,
            });
            console.log('checkIfAuthenticated1', checkIfAuthenticated1);
        }

    }
    render(){
        return (
            <Router>
                <div>
                    <Header authData={this.state} />

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/about">
                       <About></About>
                         </Route>
                        {/* <Route path="/contact">
                        <Contact></Contact>
                        </Route> */}
                        {/* <Route path="/allstudent">
                           <Allstudent></Allstudent>
                        </Route> */}
                        <AuthenticatedRoutes
                            authed={this.state.isLoggedIn}
                            path="/allstudent" exact={true}
                            component={Allstudent}
                        />
                        <AuthenticatedRoutes
                            authed={this.state.isLoggedIn}
                            path="/contact" exact={true}
                            component={Contact}
                        />
                        <Route path="/register">
                        <Register></Register>
                        </Route>
                        <Route path="/singin">
                            <Singin></Singin>
                        </Route>
                        {/* <Route path="/editstudent:id">
                            <Editstudent></Editstudent>
                        </Route> */}
                        <Route path="/editstudent/:id" component={Editstudent} />
                        <Route path="/addstudent">
                         <AddStudent></AddStudent>
                        </Route>

                        <Route path="/">
                            <Home></Home>
                        </Route>

                    </Switch>
                    <Footer></Footer>
                </div>

            </Router>

        );
    }
}
// function Index() {
//     return (

//     );
// }


export default Index;

if (document.getElementById('example')) {
    ReactDOM.render(<Index />, document.getElementById('example'));
}
