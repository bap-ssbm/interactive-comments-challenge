# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed. _>> DONE
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted. -->> DONE

### Screenshot

![https://prnt.sc/uFLGxEclArZW]



### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- [React](https://reactjs.org/) - JS library


**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html/react

        if (props.wantEdit && (props.editTarget.firstIndex === firstIndex && (props.editTarget.secondIndex === secondIndex))) {
            return (
                <div className="edit-area">
                    <TextareaAutosize
                        minRows={3}
                        onChange={props.updateEditArea}
                        name={props.type}
                        value={props.editTextInput}></TextareaAutosize>
                    <button onClick={props.editComment} name={props.type} value={props.id} className="blue-btn" >UPDATE</button>
                </div>
            )
        } else {
            return (
                <div className="comments-section">
                    <p>{(props.type === "reply") && <span className="replyAt">{"@" + props.atReply + " "}</span>}{props.content}</p>
                </div>

            )
        }

        using conditional rendering to determine what to display with react. this code specically for when a user wants to edit their comment.
```
```css
.reply-wrapper>div>img{
        height: 40px;
        width: 40px;
    }
    .picture{
        position: absolute;
        bottom: 20px;
    }
    .reply-wrapper>textarea{
        margin: 0;
        margin-bottom: 60px;
    }
    .reply-wrapper>button{
        position: absolute;
        right: 25px;
        bottom: 20px;
    }
    
    mixing in absolute positioning with flexbox to change positions of flex items based on viewport.
```
```js
 function findIndex(commentdata, targetid) {

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

 it was hard to pick a specifc code that im proud of, since I felt like there were so much to choose from. But these two helped me alot, in the long run. Taking the id of each item then finding out the indexes, helped
 also see if that item was a comment or reply, and where it was.
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development
I want to learn local storage more in the future, and also learning how to simplify my code further in the future.
I feel like I couldve made it alot simpler by planning out how to distribute the data.json before hand. But practicing it with this code, helped me alot to learn about that.
