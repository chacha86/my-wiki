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

    async render() {

        const data = await this.pageHandler.getNotePageData(this.param["noteData"]);
        const pageItemList = document.querySelector("#" + this.renderTarget);
        pageItemList.innerHTML = "";
        const html = `
            <ul>
                ${this.createNotePage(data.notePageDtoList)}
            </ul>
            `
        pageItemList.innerHTML = html;
        this.postRender();
        this.eventHandle();
    }
    postRender() {

        if(this.notePageData.selectedPageId != null) {
            const page = document.querySelector("#" + this.notePageData.selectedPageId);
            let customClass = " bg-gray-500 text-white rounded-md";
            let originClass = page.getAttribute("class")
            let newClass = originClass + customClass;
            page.setAttribute("class", newClass);
        }
    }

    eventHandle() {
        let pageItemList = document.querySelectorAll("#page-item-list li");
        this.menuHandler.setMenuToPageItem(pageItemList);

        let pageItemAnchorList = document.querySelectorAll("#page-item-list li a");
        this.pageHandler.setRenderContentByPage(pageItemAnchorList, this.notePageData);
    }

    createNotePageItem(notePageDto) {
        let pageClass = "hover:bg-gray-500 hover:text-white hover:rounded-md";
        let pageLinkClass = "block p-[10px] text-[15px] hover:cursor-pointer";
        return `
            <li class="${pageClass}" id="page-${notePageDto.id}" data-page-title="${notePageDto.title}">
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
