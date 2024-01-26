import {NoteData, ItemData, NoteRenderer} from "../../note_renderer.js";
import {PageMoveModalRenderer} from "./page_move_modal_renderer.js";
import {NoteMenuApi} from "../note_menu_api.js";
import {NotePageRenderer} from "../../note_page/note_page_renderer.js";
import {NoteParam} from "../../noteParam.js";
import {HandlerFactory, RendererFactory} from "../../../initializer.js";

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

        noteItemList.forEach((item) => {
            item.addEventListener('click', async (e) => {
                const moveParam = new NoteParam();
                const currentSelectedNoteElement = e.target;
                const noteIdNo = this.getNoteIdNoFromElement(currentSelectedNoteElement);
                const destinationNoteId = ItemData.getNoteIdByItemNo(noteIdNo);
                const moveTargetNoteId = RendererFactory.get("note").props.selectedNoteId;
                const itemInfo = ItemData.getItemInfoById(ItemData.getNoteIdByItemNo(noteIdNo));
                // prevSelectedNoteElement = this.getElementByDataNoteId(NoteData.getNo(pageMoveModalDataRefer.destinationNoteId));
                // currentSelectedNoteElement = e.target;
                // const noteIdNo = currentSelectedNoteElement.getAttribute('data-note-id');
                const data = await HandlerFactory.get("noteMenu").getMoveNoteTree(ItemData.getItemNoById(moveTargetNoteId));

                if (itemInfo.itemType === "group") {
                    console.log("그룹은 선택할 수 없습니다.");
                    return;
                }

                moveParam.moveTargetNoteId = moveTargetNoteId;
                moveParam.destinationNoteId = destinationNoteId;
                moveParam.moveTargetPageId = param.moveTargetPageId;
                moveParam.data = data;

                RendererFactory.get("pageMoveModal").render(moveParam);
            });
        });
    }

    setUpdateApiToMoveBtn(moveBtn, param) {
        let moveBtnDiv = document.querySelector("#move-btn");
        moveBtnDiv.innerHTML = "";
        moveBtnDiv.innerHTML = `<a>이동</a>`

        document.querySelector("#move-btn a").addEventListener("click", async () => {
            const destinationNoteId = RendererFactory.get("pageMoveModal").props.destinationNoteId;
            const moveTargetNoteId = RendererFactory.get("pageMoveModal").props.moveTargetNoteId;
            const moveTargetPageId = RendererFactory.get("pageMoveModal").props.moveTargetPageId;
            const notePageParam = new NoteParam();
            const moveParam = new NoteParam();

            if (destinationNoteId == null) {
                alert("이동할 노트를 선택해주세요.");
                return;
            }

            const updateMovePageParam = {
                "pageIdNo": ItemData.getItemNoById(moveTargetPageId),
                "noteIdNo": ItemData.getItemNoById(destinationNoteId)
            };

            const msg = await HandlerFactory.get("noteMenu").updateMovePage(updateMovePageParam);

            notePageParam.selectedPageId = moveTargetPageId;
            notePageParam.sortType = RendererFactory.get("notePage").props.sortType;
            notePageParam.direction = RendererFactory.get("notePage").props.direction;
            notePageParam.data = await HandlerFactory.get("noteMenu").getNotePageData(RendererFactory.get("note").props.selectedNoteId);

            RendererFactory.get("notePage").render(notePageParam);

            moveParam.destinationNoteId = destinationNoteId;
            moveParam.moveTargetNoteId = moveTargetNoteId;
            moveParam.moveTargetPageId = moveTargetPageId;
            moveParam.data = await HandlerFactory.get("noteMenu").getMoveNoteTree(ItemData.getItemNoById(moveTargetNoteId));

            RendererFactory.get("pageMoveModal").render(moveParam);
        });
    }

    getNoteIdNoFromElement(element) {
        return element.getAttribute('data-note-id');
    }

    getElementByDataNoteId(dataNoteId) {
        return document.querySelector(`[data-note-id="${dataNoteId}"]`);
    }
}

export {PageMoveModalHandler}