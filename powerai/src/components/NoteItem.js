import React, {useContext} from 'react'
import noteContext from '../context/noteContext';
import './Chat.css';


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <p className="card-text">Request: {note.title}</p>
                    <br />
                    <div className="responseContainer">
                    <p className="response">Response: {note.description}</p>
                    </div>

                    <div className="d-flex align-items-center">
                
                <br />
                        <center>
                        <i className="bi bi-trash3" onClick={()=>{deleteNote(note._id)}}>
                            <br />
                            <button className="btn-primary">Delete</button>
                        </i>
                        </center>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default Noteitem
