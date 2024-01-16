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

        renderTarget.innerHTML = `
        ${resultData.searchedNoteList.map((resultNote) => {
            return `
                <li data-note-id="note-${resultNote.id}" class="hover:bg-gray-400 px-[0.5rem]">
                    ${resultNote.name}
                </li>
            `;
        }).join('')}
        ${resultData.searchedNotePageList.map((resultPage) => {
            return `
                <li data-note-id="note-${resultPage.noteId}" data-page-id="page-${resultPage.id}" class="hover:bg-gray-400 px-[0.5rem]">
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