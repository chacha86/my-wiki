import {getNoteUIParamJsonStr} from "../../ui/note_list_ui_util.js";
import {NoteRenderer} from "../note_renderer.js";
import {NoteMenuBusiness} from "./note_menu_business.js";
import {aPostFetch, postFetch} from "../../note_api.js";

class NoteMenuEventHandle {
    constructor(paramData) {
        this.paramData = paramData;
        this.noteMenuData = this.paramData["noteMenuData"];
        this.noteMenuBusiness = new NoteMenuBusiness(this.paramData);
    }

    addEvent() {
        let menuItemAnchorList = document.querySelectorAll("#item-menu-popup a");
        menuItemAnchorList.forEach((anchor) => {
            let apiName = anchor.getAttribute('data-api-name');
            let noteIdNo = anchor.getAttribute('data-note-no');
            anchor.addEventListener('click', (event) => {
                let apiFunc = this.noteMenuBusiness.getApiFunction(apiName);
                console.log(apiFunc);
                apiFunc(noteIdNo).then((data) => {
                    new NoteRenderer(this.paramData).render().catch((error) => {
                        console.error(error);
                    });
                });
            });
        })

    }
}

export {NoteMenuEventHandle};