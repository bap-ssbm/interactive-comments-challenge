import React,  { createContext, useState} from "react";

export const ReplyContext = createContext();

const ReplyContextProvider = (props) =>{
    

    const [wantReply, setWantReply] = useState(false);
    const [replyTarget, setReplyTarget] = useState('');
    const [replyText,  changeReplyInputText] = useState("");
    const [replyTargetName,  setReplyTargetName] = useState("");


    return(
        <ReplyContext.Provider value={{wantReply, setWantReply, replyTarget, setReplyTarget, replyText,  changeReplyInputText, replyTargetName,  setReplyTargetName}}>
            {props.children}
        </ReplyContext.Provider>
    )
    
}

export default ReplyContextProvider;