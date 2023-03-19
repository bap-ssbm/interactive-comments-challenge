import React, { useState } from "react";

import ScoreButton from "./ScoreButton";
import TopSection from "./TopSection";
import Reply from "./Reply";
import moment from "moment/moment";
import TextareaAutosize from 'react-textarea-autosize';



function Comment(props) {


    function mapEditComment() {

        const firstIndex = props.findIndex(props.commentsData, props.id);
        const secondIndex = props.findReplyIndex(props.commentsData, props.id);



        if (props.wantEdit && (props.editTarget.firstIndex === firstIndex && (props.editTarget.secondIndex === secondIndex))) {
            return (
                <div className="edit-area">
                    <TextareaAutosize
                        minRows={3}
                        onChange={props.updateEditArea}
                        name={props.type}
                        value={props.editTextInput}></TextareaAutosize>
                    <button onClick={props.editComment} name={props.type} value={props.id} className="blue-btn" >UPDATE</button>
                </div>
            )
        } else {
            return (
                <div className="comments-section">
                    <p>{(props.type === "reply") && <span className="replyAt">{"@" + props.atReply + " "}</span>}{props.content}</p>
                </div>

            )
        }

    }


    return (
        <div className="reply-comment-wrapper">
            <div className="comment-wrapper">
                <ScoreButton
                    updateVote={props.updateVote}
                    score={props.comment.score}
                    id={props.id} 
                    user = {props.user}/>
                    
                <div className="comment-right">
                    <TopSection replyBtn={props.replyBtn}
                        deleteBtn={props.deleteBtn}
                        editBtn={props.editBtn}
                        replybtn={props.replyBtn}
                        id={props.id}
                        imgURL={props.imgURL}
                        userName={props.userName}
                        date={moment(props.date).fromNow() === "Invalid date" ? props.date : moment(props.date).fromNow()}
                        isUser={props.isUser}
                        deleteConfirm={props.deleteConfirm}
                        cancelDelete={props.cancelDelete}
                        deleteModal={props.deleteModal}
                    />

                    {mapEditComment()}

                </div>
            </div>
            {((props.replyTarget.targetName === props.userName) && props.wantReply) &&
                <Reply
                    targetName={props.replyTarget.targetName}
                    catchTextAreaChange={props.catchTextAreaChange}
                    sendReply={props.sendReply}
                    clickFunction={props.clickFunction}
                    profilePic={props.currentUser.image.png}
                    type="reply"
                    textInput={props.textInput}
                />}
        </div>

    )
}

export default Comment;