import React, { useState, useEffect } from "react";
import data from "../data.json";
import Comments from "./Comments";
import Reply from "./Reply";
import Modal from "./Modal";
import { type } from "@testing-library/user-event/dist/type";





//functtion that finds the index of target id. if the target is inside a comment aka, its a reply, it will send the index of the comment its wrapped in.
function findFirstIndex(commentdata, targetid) {

    let commentIndex = commentdata.findIndex(comment => comment.id == targetid);


    if (commentIndex === -1) {
        commentIndex = commentdata.findIndex(x => x.replies.some(reply => reply.id == targetid));
    }

    return commentIndex;
}

//function that finds reply index inside replies array
function findReplyIndex(commentdata, targetid) {

    var commentIndex = -1;
    commentdata.forEach(comment => {
        (comment.replies.findIndex(comment => comment.id == targetid) > -1) && (commentIndex = comment.replies.findIndex(comment => comment.id == targetid));
    });
    return commentIndex;
}

function App() {

    const [commentSendInput, changeComentSendInputText] = useState("");
    const [commentReplyInput, changeComentReplyInputText] = useState("");
    const [editTextInput, changeEditAreaInput] = useState("");



    const [sentText, catchSentText] = useState("");


    //the data i got

    const [replytarget, changeReplyClick] = useState({ wantReply: false, targetName: "", targetID: "" });
    const { wantReply, targetName, targetID } = replytarget;

    const [confirmDelete, changeConfirmDelete] = useState(false);

    var commentDataToload;
    var userDataToLoad;

    if (localStorage.getItem("comments") !== null && localStorage.getItem("userData") !== null) {

        const datanew = JSON.parse(localStorage.getItem('comments'));
        const newUserData = JSON.parse(localStorage.getItem('userData'));


      

        userDataToLoad = newUserData;
     

        commentDataToload = datanew;
    } else {
        commentDataToload = data.comments;
        userDataToLoad = data.currentUser;
    }

    const [commentdata, updateData] = useState(commentDataToload)
    const [userData, updateUserData] = useState(userDataToLoad);



    useEffect(() => {
        const comments = JSON.parse(localStorage.getItem('comments'));
        console.log("local storage loaded");
        if (comments) {
            updateData(comments);
        }

    }, []);
    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem('userData'));
        console.log("local storage loaded");
        if (userdata) {
            updateUserData(userdata);
        }

    }, []);


    function catchTextAreaChange(event) {
        const typeofcomment = event.target.name;
        var messagetosend = event.target.value;

        changeComentSendInputText(messagetosend);
    }

    function catchReplyAreaChange(event) {
        const typeofcomment = event.target.name;
        var messagetosend = event.target.value;

        changeComentReplyInputText(messagetosend);
    }



    function handleReplyClick(event) {

        const name = event.target.name;
        const id = event.target.value;

        changeComentReplyInputText("@" + name + " ");

        changeReplyClick(previousValue => {

            if (previousValue.targetName === name) {
                return replytarget.wantReply ? { wantReply: false, targetName: name, targetID: id } : { wantReply: true, targetName: name, targetID: id };
            } else {
                return { wantReply: true, targetName: name, targetID: id }
            }
        });
    }

    //function for soending comments

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



        //sets the value of the text area to blank
        changeComentSendInputText("");

    }

    //fucnction for sending replies
    function sendReply(event) {
        event.preventDefault();

        const strToRemove = "@" + targetName + " ";

        //creating date
        const d = new Date();


        catchSentText(commentSendInput);
        //creating the id for the new reply
        let id = commentdata.length + 1;
        commentdata.forEach(comment => {
            id = id + comment.replies.length;
        })

        const newComment = {
            id: id,
            content: commentReplyInput.replace(strToRemove, ""),
            createdAt: d.toString(),
            score: 0,
            replyingTo: targetName,
            user: {
                image: {
                    png: userData.image.png,
                    webp: userData.image.webp,
                },
                username: userData.username
            }
        }

        //calls function that checks the index of the comment replied to
        let commentIndex = findFirstIndex(commentdata, targetID);

        //push items into the necessary array
        commentdata[commentIndex].replies.push(newComment);

        localStorage.setItem('comments', JSON.stringify(commentdata));
        //sets the value of the text area to blank
        changeComentReplyInputText("");

        //closes the reply box when done sending message
        changeReplyClick({ wantReply: false, targetName: targetName, targetID: targetID });

    }

    //delete btn function currently only works for comments not replies
    function deleteBtn(commentId) {
        const firstI = findFirstIndex(commentdata, commentId);
        const secondI = findReplyIndex(commentdata, commentId);

        if (secondI == -1) {
            const removedComments = [...commentdata.slice(0, firstI), ...commentdata.slice(firstI + 1)];
            localStorage.setItem('comments', JSON.stringify(removedComments));
            updateData(removedComments);

        } else {
            const removedReplies = [...commentdata[firstI].replies.slice(0, secondI), ...commentdata[firstI].replies.slice(secondI + 1)];
            commentdata[firstI].replies = removedReplies;
            localStorage.setItem('comments', JSON.stringify(commentdata));
        }


        changeComentSendInputText("");

    }


    const [edittarget, changeEditClick] = useState({ wantEdit: false, firstIndex: "", secondIndex: "" });

    //editbutton
    const [editArea, changeEditArea] = useState("");

    function edit(event) {
        const editid = event.target.value;
        const firstI = findFirstIndex(commentdata, editid);
        const secondI = findReplyIndex(commentdata, editid);
        if (commentdata && commentdata[firstI].content) {






            if (secondI == -1) {
                changeEditAreaInput(commentdata[firstI].content.replace(" (edited)", ""));
            } else {
                changeEditAreaInput("@" + commentdata[firstI].replies[secondI].replyingTo + " " + commentdata[firstI].replies[secondI].content.replace(" (edited)", ""));
            }

            changeEditClick(previousValue => {

                if (previousValue.firstIndex === firstI && previousValue.secondIndex === secondI) {
                    return edittarget.wantEdit ? { wantEdit: false, firstIndex: firstI, secondIndex: secondI } : { wantEdit: true, firstIndex: firstI, secondIndex: secondI };
                } else {
                    return { wantEdit: true, firstIndex: firstI, secondIndex: secondI };
                }
            });
        }




    }

    //update comment after edit

    function updateEditArea(event) {

        const newchange = event.target.value;
        changeEditAreaInput(newchange);
    }

    //update btn click

    function editComment(event) {
        event.preventDefault();





        const id = event.target.value;
        const firstIndex = findFirstIndex(commentdata, id);
        const secondIndex = findReplyIndex(commentdata, id);
        let updatedComments = "";




        if (secondIndex == -1) {


            let changeReplies = [...commentdata.slice(0, firstIndex), ...commentdata.slice(firstIndex + 1)];
            updatedComments = commentdata.map((item) => {
                if (item.id == id) {
                    return { ...item, content: editTextInput + " (edited)" };
                }
                return item;
            });
            updateData(updatedComments);
        } else {
            const strToRemove = "@" + commentdata[firstIndex].replies[secondIndex].replyingTo + " ";
            const editedText = editTextInput.replace(strToRemove, "");

            updatedComments = commentdata[firstIndex].replies.map((item) => {
                if (item.id == id) {
                    return { ...item, content: editedText + " (edited)" };
                }
                return item;
            });

            commentdata[firstIndex].replies = updatedComments;
            updateData(commentdata);
        }


        localStorage.setItem('comments', JSON.stringify(commentdata));
        changeEditClick({ wantEdit: false, firstIndex: "", secondIndex: "" });
    }

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
        updateDeleteTargetID(event.target.name);
        document.body.style.overflow = 'hidden'
        changeConfirmDelete(true);
    }



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
          
        } else {
            userData.voted.push(newVote);

            if (commentdata) {

                if (secondI == -1) {


                    commentdata[firstI].score = numofvotes;
                    // console.log(updatedVotes);
                    updateData(commentdata);



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
            localStorage.setItem('comments', JSON.stringify(commentdata));
        }
        localStorage.setItem('userData', JSON.stringify(userData));





    }

    return (
        <div className="main-wrapper" style={{ overflow: confirmDelete ? "hidden" : "auto" }}>


            <main >

                <Comments
                    comments={commentdata}
                    currentUser={userData}
                    user={userData}
                    catchTextAreaChange={catchReplyAreaChange}
                    deleteBtn={deleteBtn}
                    clickFunction={sendComment}
                    replyBtn={handleReplyClick}
                    wantReply={wantReply}
                    sendReply={sendReply}
                    replyTarget={replytarget}
                    textInput={commentReplyInput}
                    editBtn={edit}
                    wantEdit={edittarget.wantEdit}
                    editTarget={edittarget}
                    findIndex={findFirstIndex}
                    findReplyIndex={findReplyIndex}
                    editTextInput={editTextInput}
                    updateEditArea={updateEditArea}
                    editComment={editComment}
                    deleteConfirm={deleteConfirm}
                    cancelDelete={cancelDelete}
                    deleteModal={deleteModal}
                    confirmDelete={confirmDelete}
                    updateVote={updateVote}


                />
                <Reply
                    comments={commentdata}
                    user={userData}
                    catchTextAreaChange={catchTextAreaChange}
                    textInput={commentSendInput}
                    clickFunction={sendComment}
                    profilePic={userData.image.png}

                    type="send" />
                {confirmDelete && <Modal deleteTargetID={deleteTargetID} deleteConfirm={deleteConfirm} cancelDelete={cancelDelete} />}
            </main>
        </div>
    );
}

export default App;