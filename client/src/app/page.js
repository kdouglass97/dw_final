'use client'

import { useState, useEffect } from 'react'

export default function Home() {

  const [message, setMessage] = useState("newest moose.net loading");
  const [moose, setMoose] = useState([]);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  //console.log(PRODURL)

  var userURL = process.env.NEXT_PUBLIC_PROD_URL + "/users";

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PROD_URL}`).then(
      mooseResponse => mooseResponse.json()
    ).then(
      mooseData => { 
        console.log(mooseData)
        setMessage(mooseData.message)
        setMoose(mooseData.moose)
      }
    )
  },[]);

  useEffect(() => {
    fetch(userURL).then(
      userDataResponse => userDataResponse.json()
    ).then(
      userData => { 
        console.log(userData)
        setUser(userData.user)
        setPosts(userData.postArray)
      }
    )
  },[userURL]);

  return (
    <div>
      <div> {user} says {message} </div>
      {moose.map((individual, mooseIndex) => (
        <div key={mooseIndex}>
          {individual} the moose number {mooseIndex+1}
        </div>
      ))}
      {posts.map((post, postIndex) => (
        <div key={postIndex}>
          <p><b>{user}</b> says</p>
          <p><b>{post.title}: </b></p>
          <p>{post.content}</p> 
          <p></p>         
        </div>
      ))}
    </div>
  );
}