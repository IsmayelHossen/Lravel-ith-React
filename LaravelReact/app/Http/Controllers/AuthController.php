<?php

namespace App\Http\Controllers;

use App\Repository\AuthRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
 use App\User;
class AuthController extends Controller
{
    public $authcon;
    public function __construct(AuthRepository $authcon)
    {
        $this->authcon=$authcon;
    }
    public function createToken()
    {
        $user = User::first();
        $accessToken = $user->createToken('Token Name')->accessToken;
        return $accessToken;
    }

    public function login(Request $request)
    {
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'email' => 'required',
            'password' => 'required',
        ], [
            'email.required' => 'Please give your email address',
            'password.required' => 'Please give your password',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        if ($this->authcon->checkIfAuthenticated($request)) {
            $user = $this->authcon->findUserByEmailAddress($request->email);
          //  $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Logged in successully !!',
                'user' => $user,
               // 'access_token' => $accessToken,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Sorry Invalid Email and Password',
                'errors' => null,
            ]);
        }
    }

    public function register(Request $request)
    {
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'name' => 'required|min:3|max:30',
            'email' => 'required|email|max:100|unique:users',
            'password' => 'required|confirmed|min:8',
        ], [
            'name.required' => 'Please give your name',
            'email.required' => 'Please give your email address',
            'email.unique' => 'Your email address is already used, Please Login or use another',
            'password.required' => 'Please give your password',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $user = $this->authcon->registerUser($request);
        if (!is_null($user)) {
            $user = $this->authcon->findUserByEmailAddress($request->email);
          //  $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Registered successully !!',
                'user' => $user,
               // 'access_token' => $accessToken,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Registration Cannot successfull !',
                'errors' => null,
            ]);
        }
    }
}
