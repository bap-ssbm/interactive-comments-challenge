import React, {useState, useContext} from "react";
import UserContextProvider, { UserContext } from "./contexts/UserContext";
import { findFirstIndex, findReplyIndex } from "./findIndex"
import { CommentsContext } from "./contexts/CommentsContext";

function ScoreButton(props) {
    const { userData, updateUserData } = useContext(UserContext);
    const { commentdata, updateData } = useContext(CommentsContext);

    const [numOfVotes, updateNumVotes] = useState(parseInt(props.commentData.score));

    const upVoteMatch = userData.voted.some(vote => {
        return vote.votedID === props.commentData.id && vote.typeOfVote === "upvote";
    });
    const downVoteMatch = userData.voted.some(vote => {
        return vote.votedID === props.commentData.id && vote.typeOfVote === "downvote";
    });
    const [votedUp, updateVotedUp] = useState(upVoteMatch);
    const [votedDown, updateVotedDown] = useState(downVoteMatch);


    function updateVote(id, numofvotes, typeOfVote) {


        const firstI = findFirstIndex(commentdata, id);
        const secondI = findReplyIndex(commentdata, id);


        const newVote = {
            votedID: id,
            typeOfVote: typeOfVote
        }

        const oppositeType = typeOfVote == "upvote" ? "downvote" : "upvote";
    

        const match = userData.voted.some(vote => {
            return vote.votedID === newVote.votedID && vote.typeOfVote === newVote.typeOfVote;
        });

        const oppositematch = userData.voted.some(vote => {
            return vote.votedID === newVote.votedID && vote.typeOfVote === oppositeType;
        });

       
        // const indexOfVote = userData.voted.findIndex(vote => vote.votedID == id);


        if (match) {

            
        } else if (oppositematch) {
            let commentIndex = userData.voted.findIndex(vote => vote.votedID == id);
    
            if (commentIndex > -1) { // only splice array when item is found
                userData.voted.splice(commentIndex, 1); // 2nd parameter means remove one item only
            }
            
            if (secondI == -1) {


                commentdata[firstI].score = numofvotes;
                // console.log(updatedVotes);
                updateData(commentdata);
                localStorage.setItem('comments', JSON.stringify(commentdata));


            } else {


                let updatedVotes = commentdata[firstI].replies.map((item) => {
                    if (item.id == id) {
                        return { ...item, score: numofvotes }
                    }
                    return item;
                });

                commentdata[firstI].replies = updatedVotes;

                // console.log(updatedVotes);
                updateData(commentdata);
                // updateData(updatedVotes);
                // commentdata[firstI].replies[secondI].score = currentScore + 1;
                

            }
      
            
          
        } else {
            userData.voted.push(newVote);

            if (commentdata) {

                if (secondI == -1) {


                    commentdata[firstI].score = numofvotes;
                    // console.log(updatedVotes);
                    updateData(commentdata);
                    localStorage.setItem('comments', JSON.stringify(commentdata));


                } else {


                    let updatedVotes = commentdata[firstI].replies.map((item) => {
                        if (item.id == id) {
                            return { ...item, score: numofvotes }
                        }
                        return item;
                    });

                    commentdata[firstI].replies = updatedVotes;

                    // console.log(updatedVotes);
                    updateData(commentdata);
                    // updateData(updatedVotes);
                    // commentdata[firstI].replies[secondI].score = currentScore + 1;
                    

                }
            }
            
        }
        localStorage.setItem('comments', JSON.stringify(commentdata));
        localStorage.setItem('userData', JSON.stringify(userData));
        





    }


    function upvote(event){
        event.preventDefault()
        const oppositeType = "downvote";
        const match = userData.voted.some(vote => {
            return vote.votedID === props.commentData.id && vote.typeOfVote === "upvote";
        });

        const oppositematch = userData.voted.some(vote => {
            return vote.votedID === props.commentData.id && vote.typeOfVote === oppositeType;
        });

        if(match){
            let newVote = numOfVotes+1;
            updateVote(props.commentData.id, newVote, "upvote");
        }else if(oppositematch){
            let newVote = numOfVotes+1;
            updateVotedUp(false);
            updateVotedDown(false);
            updateNumVotes(newVote);
            updateVote(props.commentData.id, newVote, "upvote");
        }else{
            let newVote = numOfVotes+1;
            updateNumVotes(newVote);
            updateVotedUp(true);
            updateVote(props.commentData.id, newVote, "upvote");
        }
        
        
        
    }
    function downvote(event){
        event.preventDefault()
        const oppositeType = "upvote";
        const match = userData.voted.some(vote => {
            return vote.votedID === props.commentData.id && vote.typeOfVote === "downvote"
        });

        const oppositematch = userData.voted.some(vote => {
            return vote.votedID === props.commentData.id && vote.typeOfVote === oppositeType;
        });
        if(match){
            let newVote = numOfVotes-1;
            updateVote(props.commentData.id, newVote, "downvote");
        }else if(oppositematch){
            let newVote = numOfVotes-1;
            updateVotedDown(false);
            updateVotedUp(false);
            updateNumVotes(newVote);
            updateVote(props.commentData.id, newVote, "downvote");
            
        }else{
            let newVote = numOfVotes-1;
            updateVotedDown(true);
            updateNumVotes(newVote);
            updateVote(props.commentData.id, newVote, "downvote");
        }
      
    }
    

    
    return (<div className="vote-section"> 
        <form className="vote-wrapper">
            <button className="upvote" name={numOfVotes} value = {props.commentData.id} onClick={userData&&upvote}>
                <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path style = {votedUp?{ fill: 'hsl(238, 40%, 52%)'} : {}} d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF" /></svg>
            </button>
            <span className="numVote">{numOfVotes}</span>
            <button  value = {props.commentData.id} name={numOfVotes} className="downvote" onClick={userData&&downvote}>
                
                <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path style = {votedDown?{ fill: 'hsl(358, 79%, 66%)'} : {}} d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF" /></svg>
            </button>
        </form>
    </div>)
}

export default ScoreButton;