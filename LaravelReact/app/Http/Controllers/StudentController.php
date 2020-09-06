<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repository\StudentRepository;
use Illuminate\Support\Facades\Validator;
class StudentController extends Controller
{
    public $StudentReprository;
    public function __construct(StudentRepository $StudentReprository)
    {
        $this->StudentReprository= $StudentReprository;
    }
    public function index(){

        $data= $this->StudentReprository->getall();
        return $data;
    }
    public function store(Request $request){
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'name' => 'required',
            'dept' => 'required',
            'session' => 'required',
            'des'=>'required',
            'phone'=>'required|max:11|min:11|unique:students',
        ], [
            'name.required' => 'Student Name required',
            'dept.required' => 'Student Dept. required',
            'session.required' => 'Student Session required',
            'des.required' => 'Student Description required',
            'phone.required' => 'Phone minimum and maximum 11 digit',


        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),

            ]);
        }
        $storeData = $this->StudentReprository->create($request);
        return response()->json([
            'success' => 'Add successfully',
            'message' => 'message',
            'data' => $storeData

        ]);

    }
    public function show($id){
        $showbyid=$this->StudentReprository->getbyid($id);
        return response()->json([
            'success' => 'Data show',
            'message' => 'message',
            'data' => $showbyid

        ]);

    }
    public function update(Request $request,$id){
        $update=$this->StudentReprository->edit($request,$id);
        return response()->json([
            'success' => 'Updated successfully',
            'message' => 'message',
            'data' => $update

        ]);
    }

        public function destroy($id){
            $delete=$this->StudentReprository->delete1($id);
        return response()->json([
            'success' => 'Deleted successfully',
            'message' => 'message',
            'data' => $delete

        ]);

        }

}
