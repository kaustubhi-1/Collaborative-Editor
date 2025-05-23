'use client';

import { useEditor, EditorContent } from '@tiptap/react'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import { useEditorStore } from '@/store/use-editor-store';
import Underline from '@tiptap/extension-underline';
import {Color} from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { FontSizeExtension } from '@/extensions/font-size';
import { Threads } from './threads';


export const Editor = () => {
    const liveBlocks = useLiveblocksExtension()
    const {setEditor} = useEditorStore()
    const editor = useEditor({
        // onCreate(props){
        //    setEditor(editor)  
        // },
        onCreate(){
           setEditor(editor)  
        },
        onDestroy(){
            setEditor(null)
        },
        onUpdate({editor}){
            setEditor(editor)
        },
        onSelectionUpdate({editor}){
            setEditor(editor)
        },
        onTransaction({editor}){
            setEditor(editor)
        },
        onFocus({editor}){
            setEditor(editor)
        },
        onBlur({editor}){
            setEditor(editor)
        },
        onContentError({editor}){
            setEditor(editor)
        },
        editorProps:{
            attributes:{
                style:"padding-left:56px; padding-right:56px;",
                class:"focus:outline-none bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
            }
        },
        extensions: [
            StarterKit.configure({
                history:false,
            }),
            liveBlocks,
            FontSizeExtension,
            FontFamily,
            TextAlign.configure({
                types:["heading","paragraph"]
            }),
            Color,
            Highlight.configure({
                multicolor:true
            }),
            TextStyle,
            Underline,
            TaskItem.configure({
                nested:true,
            }),
            TaskList,
        ],
        content: '<p>Hello Word</p>'
    })
    return (
        <div className='size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible'>
            <div className='min-w-max flex justify-center w-[816px] py-4 mx-auto'>
                <EditorContent editor={editor} />
                <Threads editor={editor}/>
            </div>
        </div>
    )
}