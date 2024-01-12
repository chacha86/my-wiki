import {addNotePage, addGroupNote, getNoteInfo} from "../ui/item_menu_renderer.js";
import {selectedNoteId} from "../ui/note_renderer.js";

let btn = document.querySelector("#add-page-btn");
btn.setAttribute("class", btn.getAttribute("class") + " hover:cursor-pointer")
btn.addEventListener("click", function() {
    if(selectedNoteId === null) {
        alert("Please select a note to add a new note");
        return;
    }

    const noteElement = document.querySelector('#' + selectedNoteId);
    const noteInfo = getNoteInfo(noteElement);
    addNotePage(noteInfo);

});

let btn2 = document.querySelector("#add-group-note");

btn2.addEventListener("click", function() {
    addGroupNote(null);
});