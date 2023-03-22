
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


export {findFirstIndex, findReplyIndex};