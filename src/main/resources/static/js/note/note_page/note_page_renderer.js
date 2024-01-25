import {NotePageData} from "./note_page_data.js";
import {NotePageHandler} from "./note_page_handler.js";
import {NoteMenuHandler} from "../menu/note_menu_handler.js";
import {HandlerFactory} from "../../initializer.js";

class NotePageRenderer {
    constructor() {
        this.renderTarget = "page-item-list";
        this.props = {
            'selectedNoteId': null,
            'selectedPageId': null,
            'prevPageId': null,
            'sortType': 'TITLE',
            'direction': 0,
            'data': null
        };
        this.pageHandler = HandlerFactory.get("notePage");
        this.menuHandler = HandlerFactory.get("noteMenu");
    }

    async preRender(param) {
        Object.keys(this.props).forEach((key) => {
            if (param[key] != null) {
                this.props[key] = param[key];
            }
        });

        if (this.props.data == null) {
            this.props.data = await this.pageHandler.getNotePageData(this.props.selectedNoteId, this.props.sortType, this.props.direction);
        }
    }

    async render(param) {
        await this.preRender(param);

        const data = this.props.data;
        const pageItemList = document.querySelector("#" + this.renderTarget);

        pageItemList.innerHTML = "";
        const html = `
            <ul>
                ${this.createNotePage(data.notePageDtoList)}
            </ul>
            `
        pageItemList.innerHTML = html;
        this.postRender(param);
    }

    postRender(param) {
        console.assert(param.selectedNoteId != null, "selectedNoteId is null");

        Object.keys(this.props).forEach((key) => {
            param[key] = this.props[key];
        });

        const page = document.querySelector("#" + this.props.selectedPageId);
        if(page == null) {
            this.eventHandle(param);
            return;
        }

        let customClass = " bg-gray-500 text-white rounded-md";
        let originClass = page.getAttribute("class")
        let newClass = originClass + customClass;

        page.setAttribute("class", newClass);

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
