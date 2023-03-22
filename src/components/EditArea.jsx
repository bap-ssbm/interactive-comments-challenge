import React, { useState, useContext } from "react";



import TextareaAutosize from 'react-textarea-autosize';
import { ReplyContext } from "./contexts/ReplyContext";
import { EditContext } from "./contexts/EditContext";
import { CommentsContext } from "./contexts/CommentsContext";

import {findFirstIndex, findReplyIndex} from "./findIndex";



const EditArea = (props) => {


    const { wantEdit, setWantEdit, editTarget, setEditTarget,  editAreaValue, setEditAreaValue } = useContext(EditContext);
    const { commentdata, updateData } = useContext(CommentsContext);

    const { wantReply, setWantReply, replyTarget, replyTargetName } = useContext(ReplyContext);

    const catchEditChange = (event) =>{
        const newchange = event.target.value;
        setEditAreaValue(newchange);
    }

    const updateEdit = () =>{
        const firstI = findFirstIndex(commentdata, editTarget);
        const secondI = findReplyIndex(commentdata, editTarget);
        
       

        if (secondI == -1) {
            var clonedCommentArray = commentdata.slice();
            const newComment = {...props.commentData, content: editAreaValue + " (edited)"};
            console.log(newComment)
            clonedCommentArray.splice(firstI, 1);
            clonedCommentArray.splice(firstI, 0, newComment);
            localStorage.setItem('comments', JSON.stringify( clonedCommentArray));
            updateData( clonedCommentArray);

        } else {

            const newComment = {...props.commentData, content: editAreaValue + " (edited)"};
            //remove items from the array
            //get the array to remove from
            const clonedReplyArray = commentdata[firstI].replies;

            //removed the reply from the array
            clonedReplyArray.splice(secondI, 1);
            clonedReplyArray.splice(firstI, 0, newComment);
            //added the new array to the necessary property
            commentdata[firstI].replies = clonedReplyArray;
            const newCommentReplies = {
                ...commentdata[firstI],
                replies: clonedReplyArray
            }
            


    
            var cloneArray = commentdata.slice();
            cloneArray.splice(firstI, 1);
            cloneArray.splice(firstI, 0, newCommentReplies);
            updateData(cloneArray);
            localStorage.setItem('comments', JSON.stringify(cloneArray));
          
        }
        setWantEdit(false);

    }

    return (
        <div className="edit-area">
            <TextareaAutosize onChange={catchEditChange} value={editAreaValue} minRows={3}></TextareaAutosize>
            <button onClick={updateEdit}className="blue-btn" >UPDATE</button>
        </div>
        )


}

export default EditArea;