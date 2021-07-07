import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {useAuthContext} from '../AuthContext';


const AddBookmark = () => {
    const history = useHistory();
    const {user}=useAuthContext();
    const {id}=user;
    const [bookmark, setBookmark] = useState({  UserId: id });

    const onTextChange = e => {
        let copy = { ...bookmark };
        copy[e.target.name] = e.target.value;
        setBookmark(copy);
    };

    const onFormSubmit = async e => {
        e.preventDefault();
         await axios.post('/api/bookmarks/add', bookmark);
        history.push('/mybookmarks');
    }

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Add Bookmark</h3>
                <form onSubmit={onFormSubmit}>
                    <input onChange={onTextChange} value={bookmark.title} type="text" name="title" placeholder="Title" className="form-control" />
                    <br />
                    <input onChange={onTextChange} value={bookmark.url} type="text" name="url" placeholder="Url" className="form-control" />
                    <br />
                    <button className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    )

}


export default AddBookmark;