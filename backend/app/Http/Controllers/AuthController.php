<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    
    public function register(Request $request){
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:8'
        ]);

        $user = User::create($fields);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            // return response([
            //     'message' => 'The provided credentials are incorrect.'
            // ], 401);
            return [
                'errors' => [
                    'email' => ['The provided credentials are incorrect.']
                ]
            ];
        }

        $token = $user->createToken($user->name)->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        // $request->user()->currentAccessToken()->delete();
        return response([
            'message' => 'You are logged out.'
        ], 200);
    }

    public function destroy(Request $request){
        $user = $request->user();
        $user->tokens()->delete();
        $user->delete();
        return response([
            'message' => 'Your account has been permanently deleted.'
        ], 200);
    }

}
