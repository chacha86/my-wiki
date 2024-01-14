import {NotePageData} from "./note_page_data.js";
import {NotePageHandler} from "./note_page_handler.js";
import {NoteMenuHandler} from "../menu/note_menu_handler.js";
class NotePageRenderer {
    constructor(param) {
        this.param = param;
        this.renderTarget = "page-item-list";
        this.pageHandler = new NotePageHandler();
        this.menuHandler = new NoteMenuHandler();
    }

    async render() {

        console.log("render");
        console.log(this.param);

        const data = await this.pageHandler.getNotePageData(this.param);
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
        let notePageData = {
            'selectedPageId': null,
            'prevPageId': null,
            'selectedNoteId': this.param.selectedNoteId,
            'prevNoteId': this.param.prevNoteId
        };

        if(notePageData.selectedPageId != null) {
            const page = document.querySelector("#" + notePageData.selectedPageId);
            let customClass = " bg-gray-500 text-white rounded-md";
            let originClass = page.getAttribute("class")
            let newClass = originClass + customClass;
            page.setAttribute("class", newClass);
        }

        this.eventHandle(notePageData);
    }

    eventHandle(notePageData) {

        console.log("eventHandle");
        console.log(notePageData);

        const pageItemList = document.querySelectorAll("#page-item-list li");
        this.menuHandler.setMenuToItem(pageItemList, notePageData);

        const pageItemAnchorList = document.querySelectorAll("#page-item-list li a");
        this.pageHandler.setRenderContentByPage(pageItemAnchorList, notePageData);

        const addPageBtn = document.querySelector("#add-page-btn");
        this.pageHandler.setAddApiToBtn(addPageBtn, notePageData);
    }

    createNotePageItem(notePageDto) {
        let pageClass = "hover:bg-gray-500 hover:text-white hover:rounded-md";
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
