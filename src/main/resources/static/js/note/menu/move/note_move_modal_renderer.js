import {NoteData} from "../../note_renderer.js";
import {NoteMenuBusiness} from "../note_menu_business.js";
import {NoteMoveModalEventHandler} from "./note_move_modal_event_handler.js";
import {getNoteUIParamJsonStr} from "../../../ui/note_list_ui_util.js";
import {NoteMenuApi} from "../note_menu_api.js";

class NoteMoveModalData {

    constructor() {
        this.selectedNoteIdNo = null;
        this.targetNoteIdNo = null;
        this.moveNoteTree = null;
    }

    getSelectedNoteId() {
        return "note-" + this.selectedNoteIdNo;
    }
}
class NoteMoveModalRenderer {
    constructor(paramData) {
        this.paramData = paramData;
        let dataName = "noteMoveModalData";
        if (paramData[dataName] == null || paramData[dataName] === undefined) {
            this.paramData[dataName] = new NoteMoveModalData();
        }
        this.eventHandler = new NoteMoveModalEventHandler(this.paramData);
        this.noteMenuApi = new NoteMenuApi();
        this.renderTarget = "move-note-modal";
    }

    async render() {

        let noteData = this.paramData["noteData"];
        let noteMoveModalData = this.paramData["noteMoveModalData"];
        noteMoveModalData.targetNoteIdNo = noteData.noteInfo.noteIdNo;

        const noteItemList = document.querySelector("#" + this.renderTarget);
        let itemContent = " inline-block w-[90%] p-[5px] cursor-default";
        let itemContentHover = " hover:bg-gray-200 hover:rounded-md";

        let data = await this.noteMenuApi.moveNote(getNoteUIParamJsonStr());

        noteItemList.innerHTML = "";
        let html = "";
        html += `<div>
            <span data-note-id="-1" class="${"move-tree-content" + itemContent + itemContentHover}" selected="false">
                최상단
            </span>
        </div>`;

        html += `
            ${this.createNoteTree(data.noteTree, data.noteUIParam)}
        `;

        noteItemList.innerHTML = html;

        let parentItems = document.querySelectorAll(".parent");

        let collapse = " inline-block w-[20px] text-center text-[1.3rem] shadow border border-black select-none"
        let collapseHover = " hover:font-bold hover:bg-gray-200 cursor-pointer";
        // let collapseNeg = " bg-gray-200 shadow-inner border border-black";

        parentItems.forEach(function (item) {

            const childList = item.parentElement.querySelector(".child-list");
            if (childList != null) {
                let collapseSpan = document.createElement("span");
                // collapseSpan.setAttribute("class", "collapse");
                collapseSpan.setAttribute("class", "move-tree-collapse " + collapse + collapseHover);
                collapseSpan.innerHTML = "+";
                let firstChild = item.firstChild;
                item.insertBefore(collapseSpan, firstChild);
            }
            if (item.getAttribute("open") === "false") {
                let subItems = item.nextElementSibling;

                if (subItems != null) {
                    console.log(subItems);
                    subItems.style.display = "none";
                }
            }
        });

        this.postRender();
    }

    postRender() {
        let noteMoveModalData = this.paramData["noteMoveModalData"];
        if(noteMoveModalData.selectedNoteIdNo != null) {
            const selectedItem = document.querySelector(".move-tree-content[data-note-id='" + noteMoveModalData.selectedNoteIdNo + "']");
            let originClass = selectedItem.getAttribute("class");
            let customClass = " bg-gray-500 rounded-md";
            let newClass = originClass + customClass;
            selectedItem.setAttribute("class", newClass);
        }
        this.eventHandler.addEvent();
    }
    createNoteTree(noteList, noteUIParam) {
        return `
            ${noteList.map((note) => {
            if (note.groupYn === 0) {
                return '';
            }
            return `${this.createNoteItem(note, noteUIParam)}`;
        }).join('')}
        `
    }

    createChildNoteTree(note, noteUIParam, recurFunc) {
        let childList = " child-list pl-[30px]";

        return `
            <div class="${childList}">
                ${note.children.length > 0 ? recurFunc(note.children, noteUIParam) : ''}
            </div>
        `
    }

    createNoteItem(note, noteUIParam) {
        let item = " h-[50px] p-[5px]";
        let itemContent = " inline-block w-[90%] p-[5px] cursor-default";
        let itemContentHover = " hover:bg-gray-200 hover:rounded-md";
        let collapse = " inline-block w-[20px] text-center text-[1.3rem] shadow border border-black select-none"
        let collapseHover = " hover:font-bold hover:bg-gray-200 cursor-pointer";
        let collapseNeg = " bg-gray-200 shadow-inner border border-black";

        let itemParent = "item parent" + item;
        return `
            <div class="item-group">
                <div class="${itemParent}" open="true">
                    <span data-note-id="${note.id}" class="${"move-tree-content" + itemContent + itemContentHover}" selected="false">${note.name}</span>
                </div>
                ${note.groupYn === 1 ? this.createChildNoteTree(note, noteUIParam, this.createNoteTree.bind(this)) : ''}
            </div>
        `
    }
}
export {NoteMoveModalRenderer};