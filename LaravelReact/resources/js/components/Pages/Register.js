import React from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { storeRegistration } from "../../service/authservice";

class Register extends React.Component {
    state = {
        isLoading: false,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            // user_id:1,
        };
        // const response = await storeData(postBody);
        const response = await storeRegistration(postBody);

        if (response.success) {
            this.setState({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                errors: false,
                // isLoading:false,
            });
           // alert('add successfully');
            // history.push('/allstudent');
            localStorage.setItem('logondata',JSON.stringify(response));
        }
        else {
            console.log("response.errors", response.errors);
            this.setState({
                errors: response.errors,
                isLoading: false,
            });
        }

    }



    render() {
        console.log("coming render");
        return (
            <div class="container">
                <h2>
                    Registration Form
                </h2>
                <h2 class="float-right">  <Link to="/ProjectList" class="nav-link"> All Project</Link></h2>
                <div class="clearfix"></div>




                <div class="card" style={{ maxWidth: '500px', margin: '0 auto', display: 'block' }} >
                    <div class="card-body">
                        <form onSubmit={this.submitform}>
                            <div class="form-group">
                                <label for="Name">Name</label>
                                <input type="text" class="form-control" placeholder="Enter name" value={this.state.name}
                                    name="name"
                                    onChange={(e) => this.changeInput(e)}></input>
                            </div>
                            {this.state.errors && this.state.errors.name && (
                                <p class="text-danger">{this.state.errors.name[0]}</p>
                            )}
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" name="email"
                                    value={this.state.email}
                                    onChange={(e) => this.changeInput(e)}></input>
                            </div>
                            {this.state.errors && this.state.errors.email && (
                                <p class="text-danger">{this.state.errors.email[0]}</p>
                            )}
                            <div class="form-group">
                                <label for="email">Password</label>
                                <input type="password" class="form-control" name="password"
                                    value={this.state.password}
                                    onChange={(e) => this.changeInput(e)}></input>
                            </div>
                            {this.state.errors && this.state.errors.password && (
                                <p className="text-danger">
                                    {this.state.errors.password[0]}
                                </p>
                            )}
                            <div class="form-group">
                                <label for="email">Confirm Password</label>
                                <input type="password" class="form-control" name="password_confirmation"
                                    value={this.state.password_confirmation}
                                    onChange={(e) => this.changeInput(e)}></input>
                            </div>
                            {this.state.errors && this.state.errors.password_confirmation && (
                                <p className="text-danger">
                                    {this.state.errors.password_confirmation[0]}
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

export default withRouter(Register);
