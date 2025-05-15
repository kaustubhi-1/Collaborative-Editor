import {Editor} from "./editor"
import { Navbar } from "./navbar"
import { Room } from "./room"
import { Toolbar } from "./toolbar"

interface DocumentIdPageProps {
    params: Promise<{documentId:string}>
}
const DocumentIdPage = async({params}:DocumentIdPageProps) => {
    // const {documentId} = await params
    // const {documentId} = awaitedParams.documentId
    return (
        <div>
            <Navbar />
            <Toolbar />
            <Room>
                <Editor />
            </Room>
            
        </div>
    )
}
export default DocumentIdPage