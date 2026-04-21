import { StateNode, toRichText } from "tldraw"

export class KamakoTool extends StateNode {
  static override id = "my-tool"

  override onEnter = () => {
    console.log("My tool activated")
  }

  override onPointerDown = () => {
    this.editor.createShape({
      type: "text",
      x: 200,
      y: 200,
      props: {
        richText: toRichText("Hello from Kamako"),
      },
    })
  }
}
