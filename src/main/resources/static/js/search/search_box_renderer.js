import {SearchBoxHandler} from "./search_box_handler.js";
import {HandlerFactory} from "../initializer.js";

class SearchBoxRenderer {
    constructor() {
        this.renderTarget = "search-result-list";
        this.props = {
            'keyword': "",
            'data': null
        }
        this.handler = HandlerFactory.get("searchBox");
    }

    async preRender(param) {
        Object.keys(this.props).forEach((key) => {
            if (param[key] != null) {
                this.props[key] = param[key];
            }
        });

        if(this.props.data == null) {
            this.props.data = await this.handler.getSearchList(this.props.keyword);
        }
    }

    async render(param) {
        await this.preRender(param);
        const resultData = this.props.data;
        const renderTarget = document.querySelector("#" + this.renderTarget);
        const itemClass = "hover:bg-gray-400 w-[100%] px-[0.5rem] mb-[5px]";

        renderTarget.innerHTML = `
        ${resultData.searchedNoteList.map((resultNote) => {
            return `
                <li data-note-id="note-${resultNote.id}" class="${itemClass}">
                    <i class="fa-solid fa-book mr-[5px]"></i> 
                    ${resultNote.name}
                </li>
            `;
        }).join('')}
        ${resultData.searchedNotePageList.map((resultPage) => {
            return `
                <li data-note-id="note-${resultPage.noteId}" data-page-id="page-${resultPage.id}" class="${itemClass}">
                    <i class="fa-solid fa-file mr-[5px]"></i>
                    ${resultPage.title}
                </li>
            `;
        }).join('')}
    `;

        this.postRender(param);
    }

    postRender(param) {
        Object.keys(this.props).forEach((key) => {
            param[key] = this.props[key];
        });
        this.eventHandle(param);
    }

    eventHandle(param) {

        const searchResultItems = document.querySelectorAll('#search-result-list li');
        this.handler.setClickToItems(searchResultItems, param);

    }
}

export {SearchBoxRenderer};