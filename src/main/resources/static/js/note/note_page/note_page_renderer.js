import {NotePageData} from "./note_page_data.js";
import {NotePageHandler} from "./note_page_handler.js";
import {NoteMenuHandler} from "../menu/note_menu_handler.js";
class NotePageRenderer {
    constructor(param) {
        this.param = param;
        this.renderTarget = "page-item-list";
        this.notePageData = {
            'selectedPageId': null,
            'prevPageId': null,
        };
        this.pageHandler = new NotePageHandler();
        this.menuHandler = new NoteMenuHandler();
    }

    preRender() {
        if(this.param.selectedPageId !== undefined) {
            this.notePageData.selectedPageId = this.param.selectedPageId;
        }
        if(this.param.prevPageId !== undefined) {
            this.notePageData.prevPageId = this.param.prevPageId;
        }
    }

    async render() {
        this.preRender();
        let noteData = this.param;
        const data = await this.pageHandler.getNotePageData(noteData);
        const pageItemList = document.querySelector("#" + this.renderTarget);

        pageItemList.innerHTML = "";
        const html = `
            <ul>
                ${this.createNotePage(data.notePageDtoList)}
            </ul>
            `
        pageItemList.innerHTML = html;
        this.postRender();
    }
    postRender() {
        const param = {
            'selectedPageId': this.notePageData.selectedPageId,
            'prevPageId': this.notePageData.prevPageId,
            'selectedNoteId': this.param.selectedNoteId,
            'prevNoteId': this.param.prevNoteId
        };

        if(this.notePageData.selectedPageId != null) {
            const page = document.querySelector("#" + this.notePageData.selectedPageId);
            let customClass = " bg-gray-500 text-white rounded-md";
            let originClass = page.getAttribute("class")
            let newClass = originClass + customClass;
            page.setAttribute("class", newClass);
        }


        this.eventHandle(param);
    }

    eventHandle(param) {

        const pageItemList = document.querySelectorAll("#page-item-list li");
        this.menuHandler.setMenuToItem(pageItemList, param);

        const pageItemAnchorList = document.querySelectorAll("#page-item-list li a");
        this.pageHandler.setRenderContentByPage(pageItemAnchorList, param);

        const addPageBtn = document.querySelector("#add-page-btn");
        this.pageHandler.setAddApiToBtn(addPageBtn, param);

        const sortBtn = document.querySelector("#sort-btn");
        this.pageHandler.setSortApiToBtn(sortBtn, param);
    }

    createNotePageItem(notePageDto) {
        let pageClass = "hover:bg-gray-500 hover:text-white hover:rounded-md mb-[5px]";
        let pageLinkClass = "block p-[10px] text-[15px] hover:cursor-pointer";
        return `
            <li class="${pageClass}" id="page-${notePageDto.id}" data-item-text="${notePageDto.title}" data-item-type="page">
                <a class="${pageLinkClass}" id="page-${notePageDto.id}">${notePageDto.title}</a>
            </li>
        `
    }

    createNotePage(pageDtoList) {
        return `
            ${pageDtoList.map((notePageDto) => {
            return `${this.createNotePageItem(notePageDto)}`;
        }).join('')}
        `
    }
}

export {NotePageData, NotePageRenderer};
