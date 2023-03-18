import React, { useState, useEffect } from "react";
import TextareaAutosize from 'react-textarea-autosize';




function Reply(props) {

    function sendAt(){
        return "@" + props.targetName + " ";
    }
    return (
        <form className={"reply-wrapper " + props.type}>
            <div className="picture"><img src={props.profilePic} /></div>
            <TextareaAutosize
                placeholder="Add a comment..."
                minRows={3}
                onChange={props.catchTextAreaChange}
                name = {props.type}
                value={props.textInput}></TextareaAutosize>
            {props.type === "send" ? <button  className="blue-btn" onClick={props.clickFunction} name={props.type}>SEND</button> : <button   className="blue-btn" onClick={props.sendReply} nanme={props.type}>REPLY</button>}
        </form>
    )
}

export default Reply;
