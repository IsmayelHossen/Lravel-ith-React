
import React from 'react';
import Axios from 'axios';
import Studentupdate from './Studentupdate';


 class Editstudent extends React.Component{

    state ={
      getstudent:{},
        toggleAddTask: false,
        toggleEditProject: false,
        isLoading: false,
    };
    componentDidMount() {
       this.getstudentindi();
    }
     getstudentindi = () => {
         this.setState({ isLoading: true });
         Axios.get(`http://localhost:8000/api/Student/${this.props.match.params.id}`).then((res) => {
             const getstudent = res.data.data;
             // const searchProject = res.data.Data;
             //  console.log(getall);
             this.setState({
                 getstudent,

             });
         });
     };

     toggleEditProject = () => {
         this.setState({
             isLoading: false,
             toggleEditProject: !this.state.toggleEditProject,
         });
     };
     onCompleteProjectEdit = () => {
         isLoading: false;
         this.getstudentindi();
         this.toggleEditProject();
     };

    render(){
         return(
             <>
                 <button
                     class="btn btn-success mr-2"
                     onClick={() => this.toggleEditProject()}
                 >
                     {!this.state.toggleEditProject && <span>Edit </span>}
                     {this.state.toggleEditProject && <span>Cancel Editing</span>}
                 </button>

                 {/* <div></div> <h2 class="float-right clearfix">  <Link to="/ProjectCreate" class="nav-link clearfix">Create Project</Link></h2> */}
                 {this.state.isLoading && (
                     <div class="spinner-border" role="status">
                         <span class="sr-only">Loading...</span>
                     </div>
                 )}

                 {!this.state.toggleEditProject && (
             <div class="container bg-secondary">
                     <h2>{this.state.getstudent.name}</h2>
                     <h2>{this.state.getstudent.dept}</h2>
                     <h2>{this.state.getstudent.session}</h2>
                     <h2>{this.state.getstudent.des}</h2>
                     <h2>{this.state.getstudent.phone}</h2>

             </div>
                 )}
                 {
                     this.state.toggleEditProject && (

                         // pass project object value to projecEdit page
                         <Studentupdate project={this.state.getstudent}
                             onCompleteProjectEdit={this.onCompleteProjectEdit}
                         />

                     )}

             </>
         );
    }
 }
  export default Editstudent
