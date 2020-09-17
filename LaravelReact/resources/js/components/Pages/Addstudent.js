import React from 'react';
import { Link, withRouter, useHistory  } from "react-router-dom";
import { storeData } from '../../service/StudentService';
class AddStudent extends React.Component{
    state ={
      name:"",
      dept:"",
      session:"",
      des:"",
      phone:"",
    }
    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    submitform = async (e) => {
        e.preventDefault();
        const history  = this.props;
        // this.setState({ isLoading:true  });
        const postBody = {
            name: this.state.name,
            dept: this.state.dept,
            session: this.state.session,
            des: this.state.des,
            phone: this.state.phone,
            // user_id:1,
        };
        const response = await storeData(postBody);

        if (response.success) {
            this.setState({
                name: "",
                dept: "",
                session:"",
                des:"",
                phone:"",

                // isLoading:false,
            });
            // alert('add successfully');
            history.push('/allstudent');
        }
        else {
            console.log("response.errors", response.errors);
            this.setState({
                errors: response.errors,
                isLoading: false,
            });
        }

    }

     render(){
          return(
              <>
                  <div class="container">
                      <h2>
                          Create Project
                </h2>
                      <h2 class="float-right">  <Link to="/allstudent" class="nav-link"> All Student</Link></h2>
                      <div class="clearfix"></div>




                      <div class="card">
                          <div class="card-body">
                              <form onSubmit={this.submitform}>
                                  <div class="form-group">
                                      <label for="email">Name</label>
                                      <input type="text" class="form-control" placeholder="Enter name" value={this.state.name}
                                          name="name"
                                          onChange={(e) => this.changeInput(e)}></input>
                                  </div>
                                  {this.state.errors && this.state.errors.name && (
                                      <p className="text-danger">{this.state.errors.name[0]}</p>
                                  )}
                                  <div class="form-group">
                                      <label for="email">Dept</label>
                                      <input type="text" class="form-control" placeholder="Enter dept" value={this.state.dept}
                                          name="dept"
                                          onChange={(e) => this.changeInput(e)}></input>
                                  </div>
                                  {this.state.errors && this.state.errors.dept && (
                                      <p className="text-danger">{this.state.errors.dept[0]}</p>
                                  )}
                                  <div class="form-group">
                                      <label for="email">Session</label>
                                      <input type="text" class="form-control" placeholder="Enter session" value={this.state.session}
                                          name="session"
                                          onChange={(e) => this.changeInput(e)}></input>
                                  </div>
                                  {this.state.errors && this.state.errors.session && (
                                      <p className="text-danger">{this.state.errors.session[0]}</p>
                                  )}
                                  <div class="form-group">
                                      <label for="email">Description</label>
                                      <textarea class="form-control" name="des"
                                          value={this.state.des}
                                          onChange={(e) => this.changeInput(e)}></textarea>
                                  </div>
                                  {this.state.errors && this.state.errors.des && (
                                      <p className="text-danger">
                                          {this.state.errors.des[0]}
                                      </p>
                                  )}
                                  <div class="form-group">
                                      <label for="email">Phone</label>
                                      <input type="text" class="form-control" placeholder="Enter phone" value={this.state.phone}
                                          name="phone"
                                          onChange={(e) => this.changeInput(e)}></input>
                                  </div>
                                  {this.state.errors && this.state.errors.phone && (
                                      <p className="text-danger">{this.state.errors.phone[0]}</p>
                                  )}
                                  <div class="form-group">


                                      <input type="submit" class="btn btn-primary" value="submit" ></input>


                                  </div>
                              </form>
                          </div>
                      </div>

                  </div>
              </>
          );
     }
}
export default withRouter(AddStudent)
