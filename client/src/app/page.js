'use client'

import { useState, useEffect } from 'react'
import { UserAuth } from "./context/AuthContext";

export default function Home() {
  //gets user from google signin
  const { user, googleSignIn, logOut } = UserAuth();

  const [message, setMessage] = useState("newest moose.net loading");
  const [moose, setMoose] = useState([]);
  const [users, setUsers] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  //console.log(PRODURL)

  var usersURL = process.env.NEXT_PUBLIC_PROD_URL;
  var mooseURL = process.env.NEXT_PUBLIC_PROD_URL + "/getMoose";
  var submitPostURL = process.env.NEXT_PUBLIC_PROD_URL + "/createPost"

  useEffect(() => {
    const userDataRef = fetch(usersURL, {
      method: 'GET', 
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    });
    userDataRef
        .then((response) => response.json()
        ).then(
          userData => { 
            console.log(userData)
            setUsers(userData)
          }
        );
  },[usersURL]);

  useEffect(() => {
    const mooseDataRef = fetch(mooseURL, {
      method: 'GET', 
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    });
    mooseDataRef
        .then((response) => response.json()
        ).then(
          mooseData => { 
            console.log(mooseData)
            setMessage(mooseData.message)
            setMoose(mooseData.moose)
          }
        );
  },[mooseURL]);
  
  function handleTitleChange(event) {
    setNewPostTitle(event.target.value);
  }
  function handleContentChange(event) {
    setNewContent(event.target.value);
  }

  function formSubmission(event) {

    event.preventDefault();

    try {
      fetch(submitPostURL + "?userId=" + user.uid + "&newPostTitle=" + 
      newPostTitle + "&newPostContent=" + newContent, {
        method: 'POST', 
        mode: "no-cors",
        headers: {
          'Content-Type': 'application/json', 
          'Access-Control-Allow-Origin': '*'
        }
      }).then(
        postRes => { 
          console.log(postRes.json())
          setNewPostTitle("");
          setNewContent("");
        }
      );
    } catch{(error) => {
          console.error('Error:', error);
      };
    };
};

  return (
    <div>
      {!user ? null : (
        <form>
        <label>Title
              <input type="text" value={newPostTitle} onChange={handleTitleChange} name="postTitle" />
          </label>
          <br></br>
          <label>Content
              <input type="text" value={newContent} onChange={handleContentChange} name="postContent" />
          </label>
          <button type="submit" onClick={formSubmission}>post</button>
        </form>
      )}

      {moose.map((individual, mooseIndex) => (
        <div key={mooseIndex}>
          {individual} the moose number {mooseIndex+1}
        </div>
      ))}
      {users.map((user, userIndex) => (
        <div key={userIndex}>
          {user.postArray.map((post, postIndex) => (
            <div key={postIndex}>
              <p><b>{user.username}</b> says</p>
              <p><b>{post.title}: </b></p>
              <p>{post.content}</p> 
              <br></br>  
          </div>
        ))}   
        </div>
      ))}
    </div>
  );
}