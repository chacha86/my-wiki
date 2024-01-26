import {NoteMoveModalHandler} from "./note_move_modal_handler.js";
import {ItemData, NoteData} from "../../note_renderer.js";
import {HandlerFactory} from "../../../initializer.js";

class NoteMoveModalRenderer {
    constructor() {
        this.renderTarget = "move-note-modal";

        this.props = {
            'destinationNoteId': null,
            'moveTargetNoteId': null,
            'data': null
        };
        this.handler = HandlerFactory.get("noteMoveModal");
    }
    preRender(param) {
        Object.keys(this.props).forEach((key) => {
            if (param[key] !== undefined) {
                this.props[key] = param[key];
            }
        });
    }

    async render(param) {
        this.preRender(param);

        const data = this.props.data;
        const targetNoteIdNo = Number(ItemData.getItemNoById(this.props.moveTargetNoteId));

        const noteItemList = document.querySelector("#" + this.renderTarget);
        const itemContent = " inline-block w-[90%] p-[5px] cursor-default";
        const itemContentHover = " hover:bg-gray-200 hover:rounded-md";

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

        this.postRender(param);
    }

    postRender(param) {

        Object.keys(this.props).forEach((key) => {
            param[key] = this.props[key];
        });

        this._renderCollapseIcon();
        this._renderSelectEffect();

        // this.noteMoveModalDataRefer.moveTargetNoteId = this.param.targetNoteId;
        // const param = {
        //     'moveNoteTree': this.param.moveNoteTree,
        //     'itemInfo': this.param.itemInfo,
        //     'noteMoveModalDataRefer': this.noteMoveModalDataRefer,
        //     'selectedNoteId': this.param.selectedNoteId,
        //     'selectedNoteIdNo': this.param.selectedPageId,
        //     'prevNoteId': this.param.prevNoteId,
        //     'prevPageId': this.param.prevPageId,
        // };
        this.eventHandle(param);
    }

    eventHandle(param) {
        let collapseItems = document.querySelectorAll(".parent .move-tree-collapse");
        this.handler.renderCollapseIcon(collapseItems);

        let noteItemList = document.querySelectorAll(".move-tree-content");
        this.handler.setSelectEffect(noteItemList, param);

        let moveBtn = document.querySelector("#move-btn");
        this.handler.setUpdateApiToMoveBtn(moveBtn, param);

        let closeBtn = document.querySelector("#move-close-btn");
        this.handler.setMoveCloseBtn(closeBtn, param);
    }

    _renderSelectEffect() {
        if (this.props.moveTargetNoteId != null) {
            let targetNoteIdNo = ItemData.getItemNoById(this.props.moveTargetNoteId);
            console.log(".move-tree-content[data-note-id='" + targetNoteIdNo + "']");
            const selectedItem = document.querySelector(".move-tree-content[data-note-id='" + targetNoteIdNo + "']");
            let originClass = selectedItem.getAttribute("class");
            let customClass = " bg-gray-300 rounded-md";
            let newClass = originClass + customClass;
            selectedItem.setAttribute("class", newClass);
        }

        if(this.props.destinationNoteId != null) {
            let targetNoteIdNo = ItemData.getItemNoById(this.props.destinationNoteId);
            console.log(".move-tree-content[data-note-id='" + targetNoteIdNo + "']");
            const selectedItem = document.querySelector(".move-tree-content[data-note-id='" + targetNoteIdNo + "']");
            let originClass = selectedItem.getAttribute("class");
            let customClass = " bg-gray-500 rounded-md";
            let newClass = originClass + customClass;
            selectedItem.setAttribute("class", newClass);
        }
    }

    _renderCollapseIcon() {
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