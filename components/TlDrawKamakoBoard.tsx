'use client'
import {
    DefaultToolbar,
    DefaultToolbarContent,
    Editor,
    TLComponents,
    TLUiAssetUrlOverrides,
    TLUiOverrides,
    Tldraw,
    TldrawUiMenuItem,
    toRichText,
    useIsToolSelected,
    useTools,
} from 'tldraw'
import 'tldraw/tldraw.css'
import { ScreenshotTool } from '@/components/tools/screenshot-tool/ScreenshotTool'
import { KamakoTool } from '@/components/tools/kamako'

// [0]
const customTools = [ScreenshotTool, KamakoTool]

// [1]
const customUiOverrides: TLUiOverrides = {
    tools: (editor, tools) => {
        return {
            ...tools,
            kamako: {
                id: 'kamako',
                label: "Kamako board",
                icon: 'tool-kamako',
                kbd: 'k',
                onSelect() {
                    editor.setCurrentTool('kamako')
                }
            },
        }
    },
}

function CustomToolbar() {
    const tools = useTools()
    const isKamakoSelected = useIsToolSelected(tools['kamako'])
    return (
        <DefaultToolbar>
            <TldrawUiMenuItem {...tools['kamako']} isSelected={isKamakoSelected} />
            <DefaultToolbarContent />
        </DefaultToolbar>
    )
}

const customAssetUrls: TLUiAssetUrlOverrides = {
    icons: {
        'tool-kamako': '/kamako-board.svg'
    },
}



const customComponents: TLComponents = {
    Toolbar: CustomToolbar,
}


function Page() {
    const handleMount = (editor: Editor) => {
        editor.createShape({
            type: 'text',
            x: 199,
            y: 199,
            props: {
                richText: toRichText('Hello world!'),
            },
        })

    }

    return (
        <div className="fixed inset-1">
            <Tldraw
                persistenceKey="tldraw_screenshot_example"
                onMount={handleMount}
                tools={customTools}
                overrides={customUiOverrides}
                assetUrls={customAssetUrls}
                components={customComponents}
            />
        </div>
    )
}

export default Page;
