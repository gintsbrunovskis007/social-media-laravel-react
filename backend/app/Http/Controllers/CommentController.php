<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    
    public function store(Request $request){
        $fields = $request->validate([
            'body' => 'required',
            'post_id' => 'required|exists:posts,id'
        ]);

        $comment = $request->user()->comments()->create($fields);

        return $comment->load('user');
    }

    public function update(Request $request, Comment $comment){
        if($request->user()->id !== $comment->user_id){
            return response([
                'message' => "You dont own this comment!"
            ], 403);
        }

        $fields = $request->validate([
            'body' => 'required'
        ]);

        $comment->update($fields);

        return $comment->load('user');
    }

    public function destroy(Request $request, Comment $comment){
        if($request->user()->id !== $comment->user_id){
            return response([
                'message' => "You dont own this comment!"
            ], 403);
        }

        $comment->delete();
        
        return ['message' => 'Comment deleted successfully!'];
    }

}
