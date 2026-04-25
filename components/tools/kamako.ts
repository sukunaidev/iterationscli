import { StateNode, TLPointerEventInfo, toRichText } from "tldraw"

export class KamakoTool extends StateNode {
  static override id = "kamako"

  override onEnter = () => {
    console.log("My tool activated")
  }

  override onPointerDown = (info: TLPointerEventInfo) => {
    console.log("info of pointer with kamako:", info);

    this.editor.createShape({
      type: "text",
      x:  info.point.x - 250,
      y:  info.point.y - 350,
      props: {
        richText: toRichText("Hello from Kamako"),
      },
    })
  }
}
