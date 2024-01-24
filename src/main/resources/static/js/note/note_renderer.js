import {aPostFetch} from "../note_api.js";
import {NoteMenuHandler} from "./menu/note_menu_handler.js";
import {NoteHandler} from "./note_handler.js";
import {HandlerFactory} from "../initializer.js";

class NoteApi {
    async getAllNotes(param) {
        return await aPostFetch("/api/notes", param);
    }

    async addGroupNote(noteIdNo) {
        let url = "/api/notes/add-group";
        return await aPostFetch(url, null);
    }
}


class ItemData {
    static _typeIndex = 0;
    static _noIndex = 1;
    static _pageIdPrefix = "page-";
    static _noteIdPrefix = "note-";

    static getItemIdByElement(itemElement) {
        return itemElement.getAttribute('id');
    }

    static getItemTypeById(itemId) {
        let idBits = itemId.split("-");
    console.assert(idBits.length === 2, "itemId is not valid");
        return idBits[this._typeIndex];
    }

    static getItemNoById(itemId) {
        let idBits = itemId.split("-");
        console.assert(idBits.length === 2, "itemId is not valid");
        return idBits[this._noIndex];
    }

    static getPageIdByItemNo(itemNo) {
        return this._pageIdPrefix + itemNo;
    }

    static getNoteIdByItemNo(itemNo) {
        return this._noteIdPrefix + itemNo;
    }
    static getItemElementById(itemId) {
        return document.querySelector("#" + itemId);
    }
    static getItemInfoById(itemId) {

        let itemElement = this.getItemElementById(itemId);
        let itemText = itemElement.getAttribute('data-item-text');
        let itemType = itemElement.getAttribute('data-item-type');
        return {
            'itemIdNo': this.getItemNoById(itemId),
            'itemText': itemText,
            'itemType': itemType
        };
    }

    static getElementByItemId(itemId) {
        return document.querySelector("#" + itemId);
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

    static getGroupNoteDetailsElementByNoteIdNo(noteIdNo) {
        const noteId = this.getId(noteIdNo)
        const noteElement = document.querySelector("#" + noteId);
        return noteElement.firstElementChild;
    }
}

class NoteRenderer {
    constructor() {
        this.renderTarget = "note-item-list";
        this.props = {
            'selectedNoteId': null,
            'prevNoteId': null,
            'data': null,
        }

        this.noteHandler = HandlerFactory.get("note");
        this.noteMenuHandler = HandlerFactory.get("noteMenu");
    }

    async preRender(param) {
        Object.keys(this.props).forEach((key) => {
            if(param[key] != null) {
                this.props[key] = param[key];
            }
        });

        if (this.props.data == null) {
            this.props.data = await this.noteHandler.getNoteData();
        }
    }

    async render(param) {
        await this.preRender(param);
        let data = this.props.data;

        const noteItemList = document.querySelector("#" + this.renderTarget);
        noteItemList.innerHTML = "";

        const html = `
            <ul class="menu bg-gray-800">
                ${this.createNoteTree(data.noteTree, data.noteUIParam)}
            </ul>
        `;

        noteItemList.innerHTML = html;
        this.postRender(param);
    }

    postRender(param) {
        if (this.props.selectedNoteId != null) {
            const selectedItem = document.querySelector("#" + this.props.selectedNoteId);
            let originClass = selectedItem.getAttribute("class");
            let customClass = " bg-gray-500 text-white rounded-md";
            let newClass = originClass + customClass;
            selectedItem.setAttribute("class", newClass);

            this.openSelectedTree(this.props.selectedNoteId);
        }

        Object.keys(this.props).forEach((key) => {
            param[key] = this.props[key];
        });

        this.eventHandle(param);
    }

    eventHandle(param) {

        let noteItemList = document.querySelectorAll('#note-item-list li');
        this.noteMenuHandler.setMenuToItem(noteItemList, param);

        let noteItemAnchorList = document.querySelectorAll('#note-item-list li a');
        this.noteHandler.setRenderPageBySelect(noteItemAnchorList, param);

        let addGroupDiv = document.querySelector("#add-group-note");
        this.noteHandler.setApiAddGroupNoteBtn(addGroupDiv);
    }

    openSelectedTree(selectedNoteId) {

        let target = document.querySelector("#" + selectedNoteId);

        while(target.getAttribute("id") !== "note-item-list") {
            target = target.parentElement;

            console.log(target.tagName);
            if(target.tagName !== "LI") {
                continue;
            }

            let type = target.getAttribute("data-item-type");

            if(type === "group") {
                target.querySelector("details").setAttribute("open", true);
            }
        }
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
        const group = 1;
        let noteItemClass = "hover:bg-gray-500 hover:text-white hover:rounded-md mb-[5px]";
        let groupItemClass = note.groupYn === 0 ? noteItemClass : "";
        let noteAnchorClass = "min-w-[120px]";
        let isGroup = note.groupYn === group;

        return `
            <li id="${'note-' + note.id}" data-item-text="${note.name}" data-item-type="${isGroup ? 'group' : 'note'}" class="${groupItemClass}">
                ${(!isGroup) ? `<a class=${noteAnchorClass}">${note.name}</a>` : ``}
                ${isGroup ? this.createChildNoteTree(note, noteUIParam, noteItemClass, noteAnchorClass, this.createNoteTree.bind(this)) : ''}
            </li>
        `
    }
}

export {NoteApi, NoteRenderer, NoteData, ItemData};