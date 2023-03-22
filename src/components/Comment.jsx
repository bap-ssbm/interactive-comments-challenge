import React, { useState, useContext } from "react";
import UserContextProvider, { UserContext } from "./contexts/UserContext";

import ScoreButton from "./ScoreButton";
import TopSection from "./TopSection";
import Reply from "./Reply";

import { ReplyContext } from "./contexts/ReplyContext";
import { EditContext } from "./contexts/EditContext";
import { CommentsContext } from "./contexts/CommentsContext";
import EditArea from "./EditArea";



function Comment(props) {

    const { userData, updateUserData } = useContext(UserContext);
    const { wantEdit, editTarget, setEditTarget } = useContext(EditContext);
    const { commentdata, updateData } = useContext(CommentsContext);

    const { wantReply, setWantReply, replyTarget, replyTargetName } = useContext(ReplyContext);


    return (
        <div className="reply-comment-wrapper">
            <div className="comment-wrapper">
                <ScoreButton

                    commentData={props.comment}
                />


                <div className="comment-right">
                    <TopSection commentData={props.comment} />
                    <div className="comments-section">
                        <UserContextProvider>
                            {(wantEdit&&editTarget===props.comment.id)? (<EditArea commentData={props.comment}/>):(<p>{(props.type === "reply") && <span className="replyAt">{"@" + props.comment.replyingTo + " "}</span>}{props.comment.content}</p>)}
                        </UserContextProvider>

                    </div>
                </div>
            </div>
            {(wantReply && props.comment.id === replyTarget) &&
                (<Reply type="reply" target={props.comment.id} />)}

        </div>


    )
}

export default Comment;