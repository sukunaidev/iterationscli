'use client'
import React from "react"
import { Tldraw } from "tldraw"
import "tldraw/tldraw.css"

function Page(){
  return(
    <div className="fixed inset-0">
      <Tldraw />
    </div>
  )
}

export default Page;
