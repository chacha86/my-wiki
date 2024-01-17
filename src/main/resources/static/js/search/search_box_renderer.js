import {SearchBoxHandler} from "./search_box_handler.js";

class SearchBoxRenderer {
    constructor(param) {
        this.param = param;
        this.renderTarget = "search-result-list";
        this.searchBoxDataRefer = {
            'keyword': "",
        }
        this.eventHandler = new SearchBoxHandler();
    }

    preRender() {
    }

    async render() {

        this.preRender();

        const renderTarget = document.querySelector("#" + this.renderTarget);
        const keyword = this.param.keyword;
        const resultData = await this.eventHandler.getSearchList(keyword);
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

        this.postRender();
    }

    postRender() {
        this.eventHandle();
    }

    eventHandle() {

        const searchResultItems = document.querySelectorAll('#search-result-list li');
        this.eventHandler.setClickToItems(searchResultItems, this.param);

    }
}

export {SearchBoxRenderer};