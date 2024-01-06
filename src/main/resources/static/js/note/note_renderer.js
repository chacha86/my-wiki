import {aPostFetch} from "../note_api.js";
import {changeSelectedItem, getNoteUIParamJsonStr} from "../ui/note_list_ui_util.js";
import {NoteEventHandler} from "./note_event_handler.js";
class NoteApi {
    async getAllNotes(param) {
        return await aPostFetch("/api/notes", param);
    }
}



class NoteData {
    constructor() {
        this.selectedNoteId = null;
        this.prevNoteId = null;
        this.noteInfo = null;
        this.mousePos = null;
    }

    getSelectedNoteNo() {
        return this.getNo(this.selectedNoteId);
    }

    getPrevNoteNo() {
        return this.getNo(this.prevNoteId);
    }

    getNo(id) {
        if (id == null) {
            return null;
        }
        return id.split("-")[1];
    }
}

class NoteRenderer {
    constructor(paramData) {
        this.paramData = paramData;
        if (paramData == null || !paramData instanceof Map) {
            this.paramData = new Map();
        }

        if (paramData["noteData"] == null || paramData["noteData"] === undefined) {
            this.paramData["noteData"] = new NoteData();
        }

        this.noteApi = new NoteApi();
        this.eventHandler = new NoteEventHandler(this.paramData);
        this.renderTarget = "note-item-list";
    }

    async render() {

        let data = await this.noteApi.getAllNotes(getNoteUIParamJsonStr());

        const noteItemList = document.querySelector("#" + this.renderTarget);
        noteItemList.innerHTML = "";

        const html = `
            <ul>
                ${this.createNoteTree(data.noteTree, data.noteUIParam)}
            </ul>
        `;

        noteItemList.innerHTML = html;
        this.postRender();
    }

    postRender() {
        let noteData = this.paramData["noteData"];

        if(noteData.selectedNoteId != null) {
            const selectedItem = document.querySelector("#" + noteData.selectedNoteId);
            let originClass = selectedItem.getAttribute("class");
            let customClass = " bg-gray-500 text-white rounded-md";
            let newClass = originClass + customClass;
            selectedItem.setAttribute("class", newClass);
        }
        this.eventHandler.addEvent();
    }

    createNoteTree(noteList, noteUIParam) {
        return `
            ${noteList.map((note) => {
            return `${this.createNoteItem(note, noteUIParam)}`;
        }).join('')}
        `
    }

    createChildNoteTree(note, noteUIParam, noteItemClass, noteAnchorClass, recurFunc) {
        return `
            <details data-note-id="${note.id}" ${noteUIParam.openList.includes(note.id) ? "open" : ""}>
                <summary class="${noteItemClass}"><a class="${noteAnchorClass}">${note.name}</a></summary>
                <ul>
                    ${note.children.length > 0 ? recurFunc(note.children, noteUIParam) : ''}
                </ul>
            </details>
        `
    }

    createNoteItem(note, noteUIParam) {
        let noteItemClass = "hover:bg-gray-500 hover:text-white hover:rounded-md";
        let groupItemClass = note.groupYn === 0 ? noteItemClass : "";
        let noteAnchorClass = "min-w-[120px]";

        return `
            <li id="${'note-' + note.id}" data-note-name="${note.name}" data-note-type="${note.groupYn}" class="${groupItemClass}">
                ${note.groupYn === 0 ? `<a class=${noteAnchorClass}">${note.name}</a>` : ``}
                ${note.groupYn === 1 ? this.createChildNoteTree(note, noteUIParam, noteItemClass, noteAnchorClass, this.createNoteTree.bind(this)) : ''}
            </li>
        `
    }
}

export {NoteApi, NoteRenderer, NoteData};