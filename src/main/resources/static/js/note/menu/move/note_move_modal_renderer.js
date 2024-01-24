import {NoteMoveModalHandler} from "./note_move_modal_handler.js";
import {ItemData, NoteData} from "../../note_renderer.js";

class NoteMoveModalData {

    constructor() {
        this.selectedNoteIdNo = null;
        this.moveNoteTree = null;
    }

    getSelectedNoteId() {
        return "note-" + this.selectedNoteIdNo;
    }
}

class NoteMoveModalRenderer {
    constructor(param) {
        this.param = param;
        this.eventHandler = new NoteMoveModalHandler();
        this.renderTarget = "move-note-modal";

        this.noteMoveModalDataRefer = {
            'destinationNoteId': null,
            'moveTargetNoteId': null,
        };

    }

    async render() {

        let data = this.param.moveNoteTree;
        let targetNoteIdNo = Number(ItemData.getItemNoById(this.param.targetNoteId));

        const noteItemList = document.querySelector("#" + this.renderTarget);
        let itemContent = " inline-block w-[90%] p-[5px] cursor-default";
        let itemContentHover = " hover:bg-gray-200 hover:rounded-md";

        noteItemList.innerHTML = "";

        let html = "";
        html += `<div>
            <span data-note-id="0" class="${"move-tree-content" + itemContent + itemContentHover}" selected="false">
                최상단
            </span>
        </div>`;

        html += `
            ${this.createNoteTree(data.noteTree, data.noteUIParam, targetNoteIdNo)}
        `;

        noteItemList.innerHTML = html;

        this.postRender();
    }

    postRender() {
        this.renderCollapseIcon();
        this.renderSelectEffect()

        this.noteMoveModalDataRefer.moveTargetNoteId = this.param.targetNoteId;


        const param = {
            'moveNoteTree': this.param.moveNoteTree,
            'itemInfo': this.param.itemInfo,
            'noteMoveModalDataRefer': this.noteMoveModalDataRefer,
            'selectedNoteId': this.param.selectedNoteId,
            'selectedNoteIdNo': this.param.selectedPageId,
            'prevNoteId': this.param.prevNoteId,
            'prevPageId': this.param.prevPageId,
        };
        this.eventHandle(param);
    }

    eventHandle(param) {
        let collapseItems = document.querySelectorAll(".parent .move-tree-collapse");
        this.eventHandler.renderCollapseIcon(collapseItems);

        let noteItemList = document.querySelectorAll(".move-tree-content");
        this.eventHandler.setSelectEffect(noteItemList, param);

        let moveBtn = document.querySelector("#move-btn");
        this.eventHandler.setUpdateApiToMoveBtn(moveBtn, param);
    }

    renderSelectEffect() {
        if (this.param.targetNoteId != null) {
            let targetNoteIdNo = ItemData.getItemNoById(this.param.targetNoteId);
            const selectedItem = document.querySelector(".move-tree-content[data-note-id='" + targetNoteIdNo + "']");
            let originClass = selectedItem.getAttribute("class");
            let customClass = " bg-gray-300 rounded-md";
            let newClass = originClass + customClass;
            selectedItem.setAttribute("class", newClass);
        }
    }

    renderCollapseIcon() {
        let parentItems = document.querySelectorAll(".parent");
        let collapse = " inline-block w-[20px] text-center text-[1.3rem] shadow border border-black select-none"
        let collapseHover = " hover:font-bold hover:bg-gray-200 cursor-pointer";

        parentItems.forEach((item) => {
            const childList = item.parentElement.querySelector(".child-list");
            if (childList != null) {
                let collapseSpan = document.createElement("span");
                let firstChild = item.firstChild;

                collapseSpan.setAttribute("class", "move-tree-collapse " + collapse + collapseHover);
                collapseSpan.innerHTML = "+";
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
    }

    createNoteTree(noteList, noteUIParam, targetNoteIdNo) {
        return`
            ${noteList.map((note) => {
            if (note.groupYn === 0 && note.id !== targetNoteIdNo) {
                return '';
            }
            return `${this.createNoteItem(note, noteUIParam, targetNoteIdNo)}`;
        }).join('')}
        `
    }

    createChildNoteTree(note, noteUIParam, recurFunc, targetNoteIdNo) {
        let childList = " child-list pl-[30px]";

        return `
            <div class="${childList}">
                ${note.children.length > 0 ? recurFunc(note.children, noteUIParam, targetNoteIdNo) : ''}
            </div>
        `
    }

    createNoteItem(note, noteUIParam, targetNoteIdNo) {
        let item = " h-[50px] p-[5px]";
        let itemContent = " inline-block w-[90%] p-[5px] cursor-default";
        let itemContentHover = " hover:bg-gray-200 hover:rounded-md";

        let itemParent = "item parent" + item;
        return `
            <div class="item-group">
                <div class="${itemParent}" open="true">
                    <span data-note-id="${note.id}" class="${"move-tree-content" + itemContent + itemContentHover}" selected="false">${note.name}</span>
                </div>
                ${note.groupYn === 1 ? this.createChildNoteTree(note, noteUIParam, this.createNoteTree.bind(this), targetNoteIdNo) : ''}
            </div>
        `
    }
}

export {NoteMoveModalRenderer};