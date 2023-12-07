'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect } from 'react'

export default function Home() {

  const [message, setMessage] = useState("Loading")
  const [moose, setMoose] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/home").then(
      response => response.json()
    ).then(
      data => { 
        console.log(data)
        setMessage(data.message)
        setMoose(data.moose)
      }
    )
  },[])
  
  return (
    <div>
      <div>
        {message}
      </div>
      {moose.map((individual, index) => (
        <div key={index}>
          {individual} the moose number {index+1}
        </div>
      ))}
    </div>
  )
}
