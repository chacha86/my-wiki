import {NoteData, ItemData, NoteRenderer} from "../../note_renderer.js";
import {PageMoveModalRenderer} from "./page_move_modal_renderer.js";
import {NoteMenuApi} from "../note_menu_api.js";
import {NotePageRenderer} from "../../note_page/note_page_renderer.js";

class PageMoveModalHandler {
    constructor() {
        this.noteMenuApi = new NoteMenuApi();
    }

    renderCollapseIcon(collapseItems) {

        let collapse = " inline-block w-[20px] text-center text-[1.3rem] shadow border border-black select-none"
        let collapseHover = " hover:font-bold hover:bg-gray-200 cursor-pointer";
        let collapseNeg = " bg-gray-200 shadow-inner border border-black";

        collapseItems.forEach((item) => {
            item.addEventListener("click", () => {
                let parentItem = item.parentElement;
                let subItems = parentItem.nextElementSibling;

                if (parentItem.getAttribute("open") === "true") {
                    item.innerHTML = "+";
                    item.setAttribute("class", "move-tree-collapse " + collapse + collapseHover);
                    subItems.style.display = "none";
                    parentItem.setAttribute("open", "false");
                } else {
                    item.innerHTML = "-";
                    item.setAttribute("class", "move-tree-collapse " + collapse + collapseHover + collapseNeg);
                    // item.classList.add("collapse-neg");
                    subItems.style.display = "block";
                    parentItem.setAttribute("open", "true");
                }
            });
        });
    }

    setSelectEffect(noteItemList, param) {

        let pageMoveModalDataRefer = param.pageMoveModalDataRefer;
        let prevSelectedNoteElement = null;
        let currentSelectedNoteElement = null;

        noteItemList.forEach((item) => {
            item.addEventListener('click', (e) => {
                prevSelectedNoteElement = this.getElementByDataNoteId(NoteData.getNo(pageMoveModalDataRefer.destinationNoteId));
                currentSelectedNoteElement = e.target;
                const noteIdNo = currentSelectedNoteElement.getAttribute('data-note-id');
                const itemInfo = ItemData.getItemInfoById(ItemData.getNoteIdByItemNo(noteIdNo));

                if(itemInfo.itemType === "group") {
                    console.log("그룹은 선택할 수 없습니다.");
                    return;
                }

                pageMoveModalDataRefer.destinationNoteId = NoteData.getId(this.getNoteIdFromElement(currentSelectedNoteElement));
                if (prevSelectedNoteElement != null) {
                    prevSelectedNoteElement.classList.remove("bg-gray-500", "rounded-md");
                }
                currentSelectedNoteElement.classList.add("bg-gray-500", "rounded-md");
            });
        });
    }

    setUpdateApiToMoveBtn(moveBtn, param) {
        let moveBtnDiv = document.querySelector("#move-btn");
        moveBtnDiv.innerHTML = "";
        moveBtnDiv.innerHTML = `<a>이동</a>`

        let pageMoveModalDataRefer = param.pageMoveModalDataRefer;

        document.querySelector("#move-btn a").addEventListener("click", async () => {
            let currentSelectedNoteId = pageMoveModalDataRefer.destinationNoteId;

            if (currentSelectedNoteId == null) {
                alert("이동할 노트를 선택해주세요.");
                return;
            }

            const updateMovePageParam = {
                "pageIdNo": NoteData.getNo(pageMoveModalDataRefer.moveTargetPageId),
                "noteIdNo": NoteData.getNo(currentSelectedNoteId)
            };

            let msg = await this.noteMenuApi.updateMovePage(updateMovePageParam);

            let notePageRenderer = new NotePageRenderer(param);
            notePageRenderer.render().catch((e) => {
                console.error(e);
            });

            const modalParam = {
                "targetNoteId": pageMoveModalDataRefer.moveTargetNoteId,
                "moveNoteTree": await this.noteMenuApi.moveNote(ItemData.getItemNoById(pageMoveModalDataRefer.moveTargetNoteId))
            };

            let pageMoveModalRenderer = new PageMoveModalRenderer(modalParam);
            pageMoveModalRenderer.render().catch((e) => {
                console.error(e);
            });
        });
    }

    getNoteIdFromElement(element) {
        return element.getAttribute('data-note-id');
    }

    getElementByDataNoteId(dataNoteId) {
        return document.querySelector(`[data-note-id="${dataNoteId}"]`);
    }
}

export {PageMoveModalHandler}