'use client'
import React from "react"
import { Tldraw, Editor, toRichText, TldrawEditorProps } from "tldraw"
import { KamakoTool } from "@/components/tools/kamako"
import "tldraw/tldraw.css"

function Page(){
  // make a request to the database, using the user auth

  const handleMount = (editor: Editor) => {
    // for each shape inside of the boards/tickets and any shapes
    // draw them on the editor window
    editor.updateInstanceState({
      isDebugMode: false,
    })

    editor.user.updateUserPreferences({
      colorScheme: 'dark',
      isSnapMode: true,
    })

		editor.createShape({
			type: 'text',
			x: 200,
			y: 200,
			props: {
				richText: toRichText('Hello world!'),
			},
		})
	}

  return(
    <div className="fixed inset-0">
      <Tldraw 
        onMount={handleMount}
        tools={[KamakoTool]}
      />
    </div>
  )
}

export default Page;
