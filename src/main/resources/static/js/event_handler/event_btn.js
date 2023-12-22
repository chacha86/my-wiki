import {getIdNoFromId} from "../ui/note_list_ui_util.js";
import {addNotePage} from "../ui/item_menu_renderer.js";
import {selectedNoteId} from "../ui/note_renderer.js";
let btn = document.querySelector("#add-note-btn");
btn.addEventListener("click", function() {
    console.log("add note button clicked");
    console.log(selectedNoteId);
    addNotePage(getIdNoFromId(selectedNoteId));
});