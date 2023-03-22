import React,  { createContext, useState} from "react";
import data from "../../data.json";

export const CommentsContext = createContext();

const CommentsContextProvider = (props) =>{
    var commentDataToload;


    if (localStorage.getItem("comments") !== null) {

        const datanew = JSON.parse(localStorage.getItem('comments'));
   
     

        commentDataToload = datanew;
    } else {
        commentDataToload = data.comments;
    }

    const [commentdata, updateData] = useState(commentDataToload)

    return(
        <CommentsContext.Provider value={{commentdata, updateData}}>
            {props.children}
        </CommentsContext.Provider>
    )
}

export default CommentsContextProvider;