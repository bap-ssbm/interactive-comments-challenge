import React,  { createContext, useState} from "react";


export const EditContext = createContext();

const EditContextProvider = (props) =>{
    
    const [wantEdit, setWantEdit] = useState(false);
    const [editTarget, setEditTarget] = useState("");
    const [editAreaValue, setEditAreaValue] = useState ("");

    return(
        <EditContext.Provider value={{wantEdit, setWantEdit, editTarget, setEditTarget, editAreaValue, setEditAreaValue}}>
            {props.children}
        </EditContext.Provider>
    )
}

export default EditContextProvider;