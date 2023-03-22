import React from "react";





function Modal(props) {

    return (
        <div className="modal-wrapper">
            <div className="modal">
                <h1>Delete comment</h1>
                <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className="delete-btn-section">
                    <button onClick={props.cancelDelete} className="cancel-btn">NO, CANCEL</button><button onClick={() => {
                        props.deleteConfirm(props.id)
                    }} className="delete-confirm-btn">YES, DELETE</button>
                </div>

            </div>
        </div>

    )
}

export default Modal;
