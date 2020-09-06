import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import ReactDOM from 'react-dom';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Allstudent from './Pages/Allstudent';

class Index extends React.Component{
    render(){
        return (
            <Router>
                <div>
               <Header></Header>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/about">
                       <About></About>
                        </Route>
                        <Route path="/contact">
                        <Contact></Contact>
                        </Route>
                        <Route path="/allstudent">
                            <Allstudent></Allstudent>
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
