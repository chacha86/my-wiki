import {NoteMenuApi} from "./note_menu_api.js";
import {NoteRenderer} from "../note_renderer.js";
import {getNoteUIParamJsonStr} from "../../ui/note_list_ui_util.js";
import {NotePageContentData} from "../note_page_content_renderer.js";

class AddNoteData {

}

class AddNoteRenderer {
    constructor(paramData) {
        this.paramData = paramData;
        if (paramData["addNoteData"] == null || paramData["addNoteData"] === undefined) {
            this.paramData["addNoteData"] = new AddNoteData();
        }
        this.noteMenuApi = new NoteMenuApi();
    }

    async render() {
        let noteData = this.paramData["noteData"];
        console.log(noteData);
        let param = this.addOpenList(getNoteUIParamJsonStr(), noteData.getSelectedNoteNo());
        let data = await this.noteMenuApi.addNote(noteData.getSelectedNoteNo(), param).catch((e) => {
            console.error(e);
        });

        alert("노트가 추가되었습니다.");
        console.log(data);

        let noteRenderer = new NoteRenderer(this.paramData);
        noteRenderer.render().catch((e) => {
            console.error(e);
        });

        this.postRender();
    }

    postRender() {
    }

    addOpenList(noteUIParamJson, noteIdNo) {
        const noteUIParam = JSON.parse(noteUIParamJson);
        noteUIParam.openList.push(noteIdNo);
        return JSON.stringify(noteUIParam);
    }
}

export {AddNoteRenderer}