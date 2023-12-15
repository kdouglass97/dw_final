'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function UserPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const [username, setUsername] = useState("User");
  const [posts, setPosts] = useState(null);
  const userURL = new URL("/getUser?uId=" + userId, process.env.NEXT_PUBLIC_PROD_URL).href;

  function fetchUser() {
    fetch(userURL , {
      method: 'GET', 
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    }).then(response => response.json()
    ).then( userData => {
        console.log(userData);
        setUsername(userData.username);
        setPosts(userData.postArray);
      }
    );
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div> 
      <br></br>
      {!posts ? [] : (
        <div>
        {posts.map((post, postIndex) => (
          <div key={postIndex}>
            <p><b>{username}</b> says</p>
            <p><b>{post.title}: </b></p>
            <p>{post.content}</p>
            <br></br>  
          </div>
        ))}
        </div>
        )}
    </div>

  );
}