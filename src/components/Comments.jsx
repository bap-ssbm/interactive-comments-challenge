import React, { useState, useContext } from "react";

import Comment from "./Comment";
import CommentsContextProvider, { CommentsContext } from "./contexts/CommentsContext";
import ReplyContextProvider from "./contexts/ReplyContext";
import { UserContext } from "./contexts/UserContext";
import Modal from "./Modal";






function Comments(props) {


    

    const { commentdata, updateData } = useContext(CommentsContext);
    const { userData, updateUserData } = useContext(UserContext);

    function mapReplies(reply) {
        return (
         
                <Comment
                    comment={reply}
                    isUser={reply.user.username === userData.username}
                    type={"reply"}
                />
           )
    }
    function createComments(comment) {

        const hasReplies = comment.replies.length > 0;

        return (<div>
            
                <Comment
                    comment={comment}
                    isUser={comment.user.username === userData.username}
                />
           
            {hasReplies && (
                <div className="replies-section-wrapper">
                    <div className="left-indentation">
                        <div className="replies-line"></div>
                    </div>
                    <div className="replies-wrapper">
                        {comment.replies.map(mapReplies)}
                    </div>
                </div>
            )}

        </div>)


    }


    let comments = props.comments;
    return (
        
            <div className="comments-container">
                {commentdata.map(createComments)}

            </div>
    

    )
}

export default Comments;