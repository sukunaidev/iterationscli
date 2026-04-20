'use client'
import React from "react"
import { Tldraw, Editor, toRichText } from "tldraw"
import "tldraw/tldraw.css"

function Page(){
  const handleMount = (editor: Editor) => {
		editor.createShape({
			type: 'text',
			x: 200,
			y: 200,
			props: {
				richText: toRichText('Hello world!'),
			},
		})

		editor.selectAll()

		editor.zoomToSelection({
			animation: { duration: 5000 },
		})
	}

  return(
    <div className="fixed inset-0">
      <Tldraw onMount={handleMount}/>
    </div>
  )
}

export default Page;
