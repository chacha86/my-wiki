import {NoteMenuRenderer} from "./menu/note_menu_renderer.js";
import {changeSelectedItem} from "../ui/note_list_ui_util.js";
import {NotePageRenderer, NotePageData} from "./note_page/note_page_renderer.js";
import {NoteMenuBusiness} from "./menu/note_menu_business.js";
import {NoteRenderer} from "./note_renderer.js";

class NoteEventHandler {
    constructor(paramData) {
        this.paramData = paramData;
        this.noteData = paramData["noteData"];
    }

    addEvent() {
        let noteItemList = document.querySelectorAll('#note-item-list li');
        noteItemList.forEach((noteItem) => {
            noteItem.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.noteData.mousePos = {
                    'mouseX': event.clientX,
                    'mouseY': event.clientY
                };
                this.noteData.noteInfo = this.getNoteInfoFromElement(noteItem);
                new NoteMenuRenderer(this.paramData).render().catch((e) => {
                    console.error(e);
                });
            })
        });

        document.querySelectorAll("#note-item-list li a").forEach(item => {
            item.addEventListener("click", (e) => {
                const noteId = item.parentElement.getAttribute("id");
                if (noteId != null) {
                    this.noteData.prevNoteId = this.noteData.selectedNoteId;
                    this.noteData.selectedNoteId = noteId;
                    changeSelectedItem(noteId, this.noteData.prevNoteId, " bg-gray-500 text-white rounded-md");

                    if(this.paramData["notePageData"] != null) {
                        this.paramData["notePageData"] = null;
                    }
                    let notePageRenderer = new NotePageRenderer(this.paramData);
                    notePageRenderer.render().catch((e) => {
                        console.log(e)
                    });
                }
            });
        });
    }

    getNoteInfoFromElement(element) {
        return {
            'noteIdNo': this.noteData.getNo(element.getAttribute('id')),
            'noteName': element.getAttribute('data-note-name'),
            'noteType': element.getAttribute('data-note-type') === "0" ? 'note' : 'group'
        };
    }
}

export {NoteEventHandler};