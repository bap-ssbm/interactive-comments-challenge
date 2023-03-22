import React, { useContext, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { CommentsContext } from "./contexts/CommentsContext";
import { ReplyContext } from "./contexts/ReplyContext";

import { findFirstIndex, findReplyIndex } from "./findIndex"
import { EditContext } from "./contexts/EditContext";
import Modal from "./Modal";




function TopBtns(props) {
    const { userData } = useContext(UserContext);
    const isUser = props.commentData.user.username === userData.username;
    const { commentdata, updateData } = useContext(CommentsContext);
    const {wantReply, setWantReply, setReplyTarget, changeReplyInputText,  replyTargetName,  setReplyTargetName} = useContext(ReplyContext);
    const {wantEdit, setWantEdit, setEditTarget, setEditAreaValue} = useContext(EditContext);

    const replyBtn = (event)=>{
        event.preventDefault();
        setWantReply(!wantReply);
        setReplyTarget(props.commentData.id);
        changeReplyInputText("@" + props.commentData.user.username + " ");
        setReplyTargetName( props.commentData.user.username);
    }

    function deleteBtn(commentId) {
        const firstI = findFirstIndex(commentdata, commentId);
        const secondI = findReplyIndex(commentdata, commentId);
        

        if (secondI == -1) {
            const removedComments = [...commentdata.slice(0, firstI), ...commentdata.slice(firstI + 1)];
            localStorage.setItem('comments', JSON.stringify(removedComments));
            updateData(removedComments);

        } else {

            //remove items from the array
            //get the array to remove from
            const arrayToRemove = commentdata[firstI].replies;

            //removed the reply from the array
            arrayToRemove.splice(secondI, 1);
            
            //added the new array to the necessary property
            commentdata[firstI].replies = arrayToRemove;
            const newCommentReplies = {
                ...commentdata[firstI],
                replies: arrayToRemove
            }


    
            var cloneArray = commentdata.slice();
            cloneArray.splice(firstI, 1);
            cloneArray.splice(firstI, 0, newCommentReplies);
            updateData(cloneArray);
            localStorage.setItem('comments', JSON.stringify(cloneArray));
          
        }
    }
    
    const [confirmDelete,  changeConfirmDelete] = useState(false);

    function deleteConfirm(commentId) {
        deleteBtn(commentId);
        changeConfirmDelete(false);
        document.body.style.overflow = 'auto';
    }
    function cancelDelete() {
        changeConfirmDelete(false);
        document.body.style.overflow = 'auto';
    }

    const [deleteTargetID, updateDeleteTargetID] = useState("");

    function deleteModal(event) {
        document.body.style.overflow = 'hidden'
        changeConfirmDelete(true);
    }


    const editBtn = () =>{
        setEditTarget(props.commentData.id);
        setWantEdit(!wantEdit);
        const firstI = findFirstIndex(commentdata, props.commentData.id );
        const secondI = findReplyIndex(commentdata, props.commentData.id );
        setEditAreaValue(secondI == -1?(props.commentData.content).replace(" (edited)", ""):("@" + props.commentData.replyingTo + " " + props.commentData.content).replace(" (edited)", ""));
    }
    
    


    if (isUser) {
        return (
            <div className="top-section-btns">
                <button className="delete-btn" name={props.commentData.id} onClick={deleteModal}>
                    <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368" />
                    </svg>  Delete</button>
                <button className="reply-btn" name={props.commentData.user.username} value={props.commentData.id} onClick={editBtn}>
                    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6" />
                    </svg>  Edit</button>
                    {confirmDelete&&<Modal cancelDelete={cancelDelete} id = {props.commentData.id} deleteConfirm={deleteConfirm} />}
            </div>
        )
    } else {
        return (
            <div className="top-section-btns">
                <button className="reply-btn" onClick={replyBtn} name={props.userName} value={props.commentData.id}>
                    <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6" />
                    </svg>  Reply</button>
                    {confirmDelete&&<Modal cancelDelete={cancelDelete} id = {props.commentData.id} deleteConfirm={deleteConfirm} />}
            </div>
        )
    }



}

export default TopBtns;