import {aPostFetch} from "../note_api.js";
import {NoteMenuHandler} from "./menu/note_menu_handler.js";
import {NoteHandler} from "./note_handler.js";

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
        return NoteData.getNo(this.selectedNoteId);
    }

    getPrevNoteNo() {
        return NoteData.getNo(this.prevNoteId);
    }
    static getElementByNoteIdNo(noteIdNo) {
        return document.querySelector("#note-" + noteIdNo);
    }

    static getNoteIdByElement(noteElement) {
        return noteElement.getAttribute('id');
    }
    static getNoteIdNoByElement(noteElement) {
        return noteElement.getAttribute('data-note-id');
    }
    static getNoteInfoByNoteIdNo(noteIdNo) {
        let noteElement = NoteData.getElementByNoteIdNo(noteIdNo);
        console.log(noteElement);
        return {
            'noteIdNo': noteIdNo,
            'noteName': noteElement.getAttribute('data-note-name'),
            'noteType': noteElement.getAttribute('data-note-type') === "0" ? 'note' : 'group'
        };
    }

    static getNo(id) {
        if (id == null) {
            return null;
        }
        let idBits = id.split("-");
        return idBits[idBits.length - 1];
    }

    static getId(no) {
        return "note-" + no;
    }
}

class NoteRenderer {
    constructor(param) {
        this.param = param;

        this.renderTarget = "note-item-list";
        this.noteData = {
            'selectedNoteId': null,
            'prevNoteId': null,
        }

        this.noteApi = new NoteApi();
        this.noteHandler = new NoteHandler();
        this.noteMenuHandler = new NoteMenuHandler();
    }

    async render() {

        let data = await this.noteHandler.getNoteData();
        const noteItemList = document.querySelector("#" + this.renderTarget);
        noteItemList.innerHTML = "";

        const html = `
            <ul>
                ${this.createNoteTree(data.noteTree, data.noteUIParam)}
            </ul>
        `;

        noteItemList.innerHTML = html;
        this.postRender();
        this.eventHandle();
    }

    postRender() {
        if (this.noteData.selectedNoteId != null) {
            const selectedItem = document.querySelector("#" + this.noteData.selectedNoteId);
            let originClass = selectedItem.getAttribute("class");
            let customClass = " bg-gray-500 text-white rounded-md";
            let newClass = originClass + customClass;
            selectedItem.setAttribute("class", newClass);
        }
    }

    eventHandle() {
        let noteItemList = document.querySelectorAll('#note-item-list li');
        this.noteMenuHandler.setMenuToNoteItem(noteItemList);

        let noteItemAnchorList = document.querySelectorAll('#note-item-list li a');
        this.noteHandler.setRenderPageBySelect(noteItemAnchorList, this.noteData);
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