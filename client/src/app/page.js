'use client'

import { useState, useEffect } from 'react'

export default function Home() {

  const [message, setMessage] = useState("newest moose.net loading");
  const [moose, setMoose] = useState([]);
  const [users, setUsers] = useState([]);

  //console.log(PRODURL)

  var usersURL = process.env.NEXT_PUBLIC_PROD_URL;
  var mooseURL = process.env.NEXT_PUBLIC_PROD_URL + "/getMoose";

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

  return (
    <div>
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
              <p></p>  
          </div>
        ))}   
        </div>
      ))}
    </div>
  );
}