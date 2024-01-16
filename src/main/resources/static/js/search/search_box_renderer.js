import {SearchBoxHandler} from "./search_box_handler.js";

class SearchBoxRenderer {
    constructor(param) {
        this.param = param;
        this.renderTarget = "search-result-list";
        this.eventHandler = new SearchBoxHandler();
    }

    async render() {
        const renderTarget = document.querySelector("#" + this.renderTarget);
        const searchInput = document.querySelector("#search-input");

        let keyword = "";
        if (searchInput != null) {
            keyword = searchInput.value;
        }

        const resultData = await this.eventHandler.getSearchList(keyword);

        let html = "";
        html = `
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

        renderTarget.innerHTML = html;
    }
}

export {SearchBoxRenderer};