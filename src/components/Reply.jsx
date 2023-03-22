import React, { useState, useEffect, useContext } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { CommentsContext } from "./contexts/CommentsContext";
import { ReplyContext } from "./contexts/ReplyContext";
import { UserContext } from "./contexts/UserContext";

import { findFirstIndex} from "./findIndex"




function Reply(props) {

    const { userData} = useContext(UserContext);
    const { commentdata, updateData } = useContext(CommentsContext);
    const { wantReply, setWantReply, replyText, changeReplyInputText, replyTarget, replyTargetName,  setReplyTargetName } = useContext(ReplyContext)


    const [commentSendInput, changeComentSendInputText] = useState("");
    const [sentText, catchSentText] = useState("");



    const catchTextAreaChange = (event) => {
        const typeofcomment = event.target.name;
        var messagetosend = event.target.value;

        changeComentSendInputText(messagetosend);
    }

    const catchReplyTextAreaChange = (event) => {
        const typeofreply = event.target.name;
        var replytosend = event.target.value;

        changeReplyInputText(replytosend);
    }



    function sendComment(event) {
        event.preventDefault();

        const d = new Date();

        catchSentText(commentSendInput);

        //creating the id for the new reply
        let id = commentdata.length + 1;
        commentdata.forEach(comment => {
            id = id + comment.replies.length;
        })

        const newComment = {
            id: id,
            content: commentSendInput,
            createdAt: d.toString(),
            score: 0,
            user: {
                image: {
                    png: userData.image.png,
                    webp: userData.image.webp,
                },
                username: userData.username
            },
            replies: []
        }

        //adds a new comment to the existing datas
        updateData(previousData => {

            if (previousData && newComment) {
                localStorage.setItem('comments', JSON.stringify([...previousData, newComment]));
                return [...previousData, newComment]
            }

        });
    }

    const sendReply = (event) => {
        event.preventDefault();

        const strToRemove = "@" + replyTargetName + " ";

        //creating date
        const d = new Date();



        //creating the id for the new reply
        let id = commentdata.length + 1;
        commentdata.forEach(comment => {
            id = id + comment.replies.length;
        })

        const newComment = {
            id: id,
            content: replyText.replace(strToRemove, ""),
            createdAt: d.toString(),
            score: 0,
            replyingTo: replyTargetName,
            user: {
                image: {
                    png: userData.image.png,
                    webp: userData.image.webp,
                },
                username: userData.username
            }
        }
       
        //calls function that checks the index of the comment replied to
        let commentIndex = findFirstIndex(commentdata, replyTarget);

        //push items into the necessary array
        const arrayToPush = commentdata[commentIndex].replies;
        arrayToPush.push(newComment);

        commentdata[commentIndex].replies = arrayToPush;
        const newCommentReplies = {
            ...commentdata[commentIndex],
            replies: arrayToPush
        }

        var cloneArray = commentdata.slice();
        cloneArray.splice(commentIndex, 1);
        cloneArray.splice(commentIndex, 0, newCommentReplies);
        updateData(cloneArray);
        localStorage.setItem('comments', JSON.stringify(cloneArray));

        
        //sets the value of the text area to blank
        changeReplyInputText("");

        //closes the reply box when done sending message
        setWantReply(false);



        //sets the value of the text area to blank
        changeComentSendInputText("");

    }



    return (
        <form className={"reply-wrapper " + props.type}>
            <div className="picture"><img src={userData.image.png} /></div>
            <TextareaAutosize
                placeholder="Add a comment..."
                minRows={3}
                onChange={props.type === "reply" ? catchReplyTextAreaChange : catchTextAreaChange}
                name={props.type}
                value={props.type === "reply" ? replyText : commentSendInput}></TextareaAutosize>
            {props.type === "reply" ? <button className="blue-btn" onClick={sendReply} name={props.type}>REPLY</button> : <button className="blue-btn" onClick={sendComment} name={props.type}>SEND</button>}
        </form>
    )
}

export default Reply;
