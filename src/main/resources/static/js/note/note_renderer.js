import {aPostFetch} from "../note_api.js";
import {addContextMenuEventToNote} from "../ui/item_menu_renderer.js";
import {changeSelectedItem, getNoteUIParamJsonStr} from "../ui/note_list_ui_util.js";
import {NotePageData, NotePageApi, NotePageRenderer, NotePageEventHandler} from "./note_page_renderer.js"
import {AddNoteRenderer} from "./menu/add_note_renderer.js";

class NoteApi {
    async getAllNotes(param) {
        return await aPostFetch("/api/notes", param);
    }
}


class NoteEventHandler {
    constructor(paramData) {
        this.paramData = paramData;
        this.noteData = paramData["noteData"];
    }

    addEvent() {
        addContextMenuEventToNote();
        document.querySelectorAll("#note-item-list li a").forEach(item => {
            item.addEventListener("click", (e) => {
                const noteId = item.parentElement.getAttribute("id");
                if (noteId != null) {
                    this.noteData.prevNoteId = this.noteData.selectedNoteId;
                    changeSelectedItem(noteId, this.noteData.prevNoteId, " bg-gray-500 text-white rounded-md");
                    this.noteData.selectedNoteId = noteId;
                    let notePageRenderer = new NotePageRenderer(this.paramData);
                    notePageRenderer.render().catch((e) => {
                        console.log(e)
                    });
                }
            });
        });
        let addNoteRenderer = new AddNoteRenderer(this.paramData);
        console.log(addNoteRenderer);
        addNoteRenderer.render().catch((e) => {
            console.error(e);
        });

    }
}

class NoteData {
    constructor(selectedNoteId, prevNoteId) {
        this.selectedNoteId = selectedNoteId;
        this.prevNoteId = prevNoteId;
    }

    getSelectedNoteNo() {
        return this.getNo(this.selectedNoteId);
    }
    getPrevNoteNo() {
        return this.getNo(this.prevNoteId);
    }
    getNo(id) {
        return id.split("-")[1];
    }
}

class NoteRenderer {
    constructor(paramData) {
        this.paramData = paramData;
        if(paramData==null || !paramData instanceof Map) {
            this.paramData = new Map();
        }

        if(paramData["noteData"] == null || paramData["noteData"] === undefined) {
            this.paramData["noteData"] = new NoteData(null, null, null);
        }

        this.noteApi = new NoteApi();
        this.eventHandler = new NoteEventHandler(this.paramData);
    }

    async render() {

        let data = await this.noteApi.getAllNotes(getNoteUIParamJsonStr());

        const noteItemList = document.querySelector("#note-item-list");

        const html = `
            ${this.createNoteTree(data.noteTree, data.noteUIParam)}
        `;

        noteItemList.innerHTML = html;
        this.postRender();
    }

    postRender() {
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

export {NoteApi, NoteEventHandler, NoteRenderer, NoteData};