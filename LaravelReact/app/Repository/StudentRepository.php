<?php

namespace app\Repository;
use App\Student;
use App\Interfaces\crudinterface;
use Illuminate\Http\Request;

class StudentRepository implements crudinterface{

    public function getall(){
        $get=Student::get();
        return $get;

    }
    public function getbyid($id){
        //for two table data show in the same time.here task name is function name which is declared in the project model
       $find=Student::find($id);
       // $find = project::find($id);

        return $find;

    }
    public function edit(Request $request,$id){
       // $data=$this->getbyid($id);
       $data=Student::find($id);
        $data->name = $request->name;
        $data->dept = $request->dept;
        $data->session = $request->session;
        $data->des = $request->des;
        $data->phone = $request->phone;
        $data->save();
        return $data;



    }
    public function delete1($id){
        //$data = $this->getbyid($id);
        $data =Student::find($id);
        $data->delete();
        return $data;
    }
    public function create(Request $request){


        $data=new Student();
        $data->name=$request->name;
        $data->dept = $request->dept;
        $data->session = $request->session;
        $data->des = $request->des;
        $data->phone = $request->phone;
        $data->save();
        return $data;



    }

}
