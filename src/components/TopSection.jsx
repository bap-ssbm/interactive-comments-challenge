import React, {useContext} from "react";
import { UserContext } from "./contexts/UserContext";
import moment from "moment/moment";
import TopBtns from "./TopBtns";




function TopSection(props) {
    const { userData } = useContext(UserContext);
    const isUser = props.commentData.user.username === userData.username;
    console.log()
   return(<div className="top-section">
        <div>
            <img className="profile-pic" src={props.commentData.user.image.png} />
            <span className="name">{props.commentData.user.username}</span>
            {isUser&&<div className="you"><p>you</p></div>}
            <span className="date">{moment(props.commentData.createdAt).fromNow() === "Invalid date" ? props.commentData.createdAt : moment(props.commentData.createdAt).fromNow()}</span>
        </div>
      
            <TopBtns commentData={props.commentData}/>
   

       
    </div>)
}

export default TopSection