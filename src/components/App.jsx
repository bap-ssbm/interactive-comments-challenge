import React from "react";

import Comments from "./Comments";
import Reply from "./Reply";

import CommentsContextProvider from "./contexts/CommentsContext";
import UserContextProvider from "./contexts/UserContext";
import ReplyContextProvider from "./contexts/ReplyContext";
import EditContextProvider from "./contexts/EditContext";




function App() {

   
    return (
        <div className="main-wrapper" >


            <main >
                <CommentsContextProvider>
                    <UserContextProvider>
                        <ReplyContextProvider>
                            <EditContextProvider>
                                <Comments />
                                <Reply type="comment" />
                            </EditContextProvider>

                        </ReplyContextProvider>
                    </UserContextProvider>
                </CommentsContextProvider>
            </main>
        </div>
    );
}

export default App;