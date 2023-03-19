import React, { useState } from "react";

import Comment from "./Comment";
import Modal from "./Modal";







function Comments(props) {



    function mapReplies(reply) {
        return (<Comment
            id={reply.id}
            comment={reply}
            currentUser={props.currentUser}
            imgURL={reply.user.image.png}
            userName={reply.user.username}
            date={reply.createdAt}
            score={reply.score}
            content={reply.content}
            deleteBtn={props.deleteBtn}
            clickFunction={props.clickFunction}
            isUser={reply.user.username === props.currentUser.username}
            replyBtn={props.replyBtn}
            wantReply={props.wantReply}
            replyTarget={props.replyTarget}
            sendReply={props.sendReply}
            catchTextAreaChange={props.catchTextAreaChange}
            textInput={props.textInput}
            atReply={reply.replyingTo}
            type={"reply"}
            editBtn={props.editBtn}
            wantEdit={props.wantEdit}
            editTarget={props.editTarget}
            findIndex={props.findIndex}
            findReplyIndex={props.findReplyIndex}
            commentsData={props.comments}
            editTextInput={props.editTextInput}
            updateEditArea={props.updateEditArea}
            editComment={props.editComment}
            deleteConfirm={props.deleteConfirm}
            cancelDelete={props.cancelDelete}
            deleteModal={props.deleteModal}
            updateVote={props.updateVote}
            user = {props.user}
            
        />)
    }
    function createComments(comment) {

        const hasReplies = comment.replies.length > 0;

        return (<div>
            <Comment
                id={comment.id}
                comment = {comment}
                currentUser={props.currentUser}
                imgURL={comment.user.image.png}
                userName={comment.user.username}
                date={comment.createdAt}
                score={comment.score}
                content={comment.content}
                clickFunction={props.clickFunction}
                isUser={comment.user.username === props.currentUser.username}
                deleteBtn={props.deleteBtn}
                replyBtn={props.replyBtn}
                wantReply={props.wantReply}
                replyTarget={props.replyTarget}
                sendReply={props.sendReply}
                catchTextAreaChange={props.catchTextAreaChange}
                textInput={props.textInput}
                comments={props.comments}
                editBtn={props.editBtn}
                wantEdit={props.wantEdit}
                editTarget={props.editTarget}
                findIndex={props.findIndex}
                findReplyIndex={props.findReplyIndex}
                commentsData={props.comments}
                editTextInput={props.editTextInput}
                updateEditArea={props.updateEditArea}
                editComment={props.editComment}
                deleteConfirm={props.deleteConfirm}
                cancelDelete={props.cancelDelete}
                deleteModal={props.deleteModal}
                updateVote={props.updateVote}
                user = {props.user}
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
            {comments.map(createComments)}

        </div>
    )
}

export default Comments;