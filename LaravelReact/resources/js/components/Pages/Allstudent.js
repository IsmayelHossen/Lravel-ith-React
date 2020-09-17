import React from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";
import { deleteStudent } from '../../service/StudentService';
class Allstudent extends React.Component{
     state ={
          getall:[],
          akta:{},
         searchProject: [],
         search: "",
     };
     componentDidMount() {
    this.getallstudent();
    this.user();
     }
    getallstudent = () => {
        this.setState({ isLoading: true });
        Axios.get("http://localhost:8000/api/Student").then((res) => {
            const getall = res.data;
            const searchProject =res.data;
           // const searchProject = res.data.Data;
         //  console.log(getall);
            this.setState({
                getall,
                searchProject,

            });
        });
    };
    user = () => {
        this.setState({ isLoading: true });
        Axios.get(`http://localhost:8000/api/Student/3`).then((res) => {
            const akta = res.data;
            // const searchProject = res.data.Data;
            console.log(akta);
            this.setState({
                akta,

            });
        });
    };
    deleteStudent = async ($id) => {
        const response = await deleteStudent($id);


        if (response.success) {
            this.setState({

                isLoading: false,
            });
            this.getallstudent();
            // alert('Update successfully');
            //  history.push('/ProjectList');
            // console.log('response',response);
            //this.props.onCompleteProjectEdit();
        }
        else {
            console.log("response.errors", response.errors);
            // this.setState({
            //     errors: response.errors,
            //     isLoading: false,
            // });
        }
    }
    // search functionality
    onSearch = (e) => {
        const search = e.target.value;
        // console.log('search',search);
        this.setState({


            isLoading: true,
        });
        if (search.length > 0) {
            const searchData = this.state.searchProject.filter(function (item) {
                const itemData = item.name + " " + item.phone +" "+item.dept;
                const textData = search.trim().toLowerCase();
                return itemData.trim().toLowerCase().indexOf(textData) !== -1;
            });
            this.setState({

                searchProject: searchData,
               // search: search,
                isLoading: false,
            });
        }
        else {
            this.setState({
               // search: search,
                isLoading: false,

            });
            //here call this method when search result length is empty

            this.getallstudent();

        }
    }
    //end search functionality

     render(){
          return(
     <>
      <div class="container">
                      <h2>
                          Project List{" "}
                          <span class="badge badge-secondary">{this.state.searchProject.length}</span>

                      </h2>
                      <>

                          <div class="input-group">
                              <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" placeholder="type here to find" onChange={(e) => this.onSearch(e)}></input>
                              <div class="input-group-append">
                                  <span class="input-group-text">$</span>
                                  <span class="input-group-text">0.00</span>
                              </div>
                          </div>
                      </>
                      {this.state.searchProject.length ==0 &&(
                          <h2>no data found</h2>
                      )}

                      {this.state.searchProject.map((project, index) => (

                          <div class="card clearfix overflow-hidden">
                              <div class="card-body">
                                  Project{this.state.akta.id}
                                  <h5 class="card-title">{project.name}</h5>
                                  <h5 class="card-title">{project.dept}</h5>
                                  <h5 class="card-title">{project.session}</h5>
                                  <h5 class="card-title">{project.des}</h5>
                                  <h6 class="card-subtitle mb-2 text-muted">{project.email}</h6>
                                  <p class="card-text">{project.phone}</p>
                                  <Link to={`/editstudent/${project.id} `} class="btn btn-success mx-2">View</Link>
                                  <a href="#" class="btn btn-success mx-2">Update</a>
                                  <button class="btn btn-danger mx-2" onClick={() => this.deleteStudent(project.id)}>delete</button>
                              </div>
                          </div>
                      ))}
      </div>
     </>

          );
     }
}
 export default Allstudent
