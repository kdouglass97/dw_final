'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect } from 'react'
//import PRODURL from '../../deployment_url.js'


export default function Home() {

  const [message, setMessage] = useState("newest moose.net loading")
  const [moose, setMoose] = useState([]);

  //console.log(PRODURL)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PROD_URL}`).then(
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
