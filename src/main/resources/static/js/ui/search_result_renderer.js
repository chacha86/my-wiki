import {postFetch} from '../note_api.js'
import {getNoteUIParamJsonStr, renderingNoteTree2, selectedNoteId} from "./note_renderer.js";

let searchInput = document.querySelector("#search-input");
searchInput.addEventListener('keyup', searchKeydownEvent);

function searchKeydownEvent(currentNoteId, prevNoteId) {
    const url = "/api/notes/search";
    const searchInput = document.querySelector("#search-input");
    let keyword = "";
    if(searchInput != null) {
         keyword = searchInput.value;
    }
    const searchParamDto = {
        "keyword": keyword
    }
    postFetch(url, JSON.stringify(searchParamDto), function (data) {
        renderingSearchResult(data);
        const listItems = document.querySelectorAll('#search-result-list li');
        console.log(listItems);
        listItems.forEach(item => {
            console.log(item);
            item.addEventListener('click', function (e) {
                const noteId = item.getAttribute("data-note-id");
                console.log(noteId);
                const pageId = item.getAttribute("data-page-id");
                console.log(pageId);
                // selectedNoteId = noteId;
                // selectedPageId = pageId;
                renderingNoteTree2(getNoteUIParamJsonStr(), currentNoteId, prevNoteId);
            });
        });
    });
}

function renderingSearchResult(searchedResult) {
    const searchResultList = document.querySelector("#search-result-list");
    let html = `
        ${searchedResult.searchedNoteList.map((resultNote) => {
            return `
                <li data-note-id="note-${resultNote.id}" class="hover:bg-gray-400 px-[0.5rem]">
                    ${resultNote.name}
                </li>
            `;
        }).join('')}
        ${searchedResult.searchedNotePageList.map((resultPage) => {
        return `
                <li data-note-id="note-${resultPage.noteId}" data-page-id="page-${resultPage.id}" class="hover:bg-gray-400 px-[0.5rem]">
                    ${resultPage.title}
                </li>
            `;
    }).join('')}
    `;

    searchResultList.innerHTML = html;
}

export {searchKeydownEvent}