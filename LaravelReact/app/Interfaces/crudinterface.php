<?php

namespace app\Interfaces;

use Illuminate\Http\Request;
interface crudinterface{
    public function getall();
    public function getbyid($id);
    public function edit(Request $request,$id);
    public function delete1($id);
    public function create(Request $request);

}
