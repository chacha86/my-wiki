import {getIdNoFromId} from "../ui/note_list_ui_util.js";
import {addNotePage, addGroupNote} from "../ui/item_menu_renderer.js";
import {selectedNoteId} from "../ui/note_renderer.js";

let btn = document.querySelector("#add-note-btn");
btn.addEventListener("click", function() {
    if(selectedNoteId === null) {
        alert("Please select a note to add a new note");
        return;
    }
    addNotePage(getIdNoFromId(selectedNoteId));
});

let btn2 = document.querySelector("#add-group-note");

btn2.addEventListener("click", function() {
    addGroupNote(null);
});