import React from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { loginUser } from "../../service/authservice";
class Singin extends React.Component {
    state = {
        isLoading: false,

        email: "",
        password: "",
        errormessage: "",
        errors: {},
    };

    componentDidMount() { }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    submitform = async (e) => {
        e.preventDefault();
        const { history } = this.props;
        // this.setState({ isLoading:true  });
        const postBody = {

            email: this.state.email,
            password: this.state.password,

            // user_id:1,
        };
        // const response = await storeData(postBody);
        const response = await loginUser(postBody);

        if (response.success) {
            this.setState({

                email: "",
                password: "",

                errors: {},
                errormessage: "",
                // isLoading:false,
            });
            //alert('add successfully');
           // console.log('response', response);
            // history.replace('/ProjectList');

            localStorage.setItem("loginData", JSON.stringify(response));
            window.location.href = "/allstudent";
          // history.replace('/allstudent');
        }
        else {
            console.log("response.errors", response.errors);
            this.setState({
                errors: response.errors,
                isLoading: false,
                errormessage: response.message,
            });
        }

    }

    render() {
        console.log("coming render");
        return (
            <div class="container">
                <h2 style={{ textAlign: 'center' }}>
                    Sing In
                </h2>
                <h2 class="float-right">  <Link to="/allstudent" class="nav-link"> All Project</Link></h2>
                <div class="clearfix"></div>


                {this.state.errormessage.length > 0 && (
                    <p className="text-danger" style={{ textAlign: 'center' }}>
                        {this.state.errormessage}
                    </p>
                )}

                <div class="card" style={{ maxWidth: '500px', margin: '0 auto', display: 'block' }} >
                    <div class="card-body">
                        <form onSubmit={this.submitform}>

                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control is-valid" name="email" placeholder="Enter Email Please"
                                    value={this.state.email}
                                    onChange={(e) => this.changeInput(e)}></input>
                                <div class="valid-feedback"></div>
                            </div>
                            {this.state.errors && this.state.errors.email && (
                                <p class="text-danger">{this.state.errors.email[0]}</p>
                            )}
                            <div class="form-group">
                                <label for="email">Password</label>
                                <input type="password" class="form-control" name="password" placeholder="Enter Passwprd Please"
                                    value={this.state.password}
                                    onChange={(e) => this.changeInput(e)}></input>
                            </div>
                            {this.state.errors && this.state.errors.password && (
                                <p className="text-danger">
                                    {this.state.errors.password[0]}
                                </p>
                            )}

                            <div class="form-group">


                                <input type="submit" class="btn btn-primary" value="submit" ></input>


                            </div>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(Singin);
