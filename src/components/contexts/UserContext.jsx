import React,  { createContext, useState} from "react";
import data from "../../data.json";

export const UserContext = createContext();

const UserContextProvider = (props) =>{
    var userDataToLoad;


    if (localStorage.getItem("userData") !== null) {

        const newUserData = JSON.parse(localStorage.getItem('userData'));
   
     

        userDataToLoad = newUserData;
    } else {
        userDataToLoad = data.currentUser;
    }

    const [userData, updateUserData] = useState(userDataToLoad);

    return(
        <UserContext.Provider value={{userData, updateUserData}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;