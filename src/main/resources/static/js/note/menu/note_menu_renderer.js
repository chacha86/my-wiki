import {NoteMenuApi} from "./note_menu_api.js";
import {NoteMenuHandler} from "./note_menu_handler.js";
import {NoteMenuData} from "./note_menu_data.js";

class NoteMenuRenderer {
    constructor(param) {
        this.param = param;
        this.renderTarget = "";
        this.noteMenuData = {

        };
        this.eventHandler = new NoteMenuHandler();
    }

    async render() {
        let noteMenuData = this.param["noteMenuData"];
        let mouseX = noteMenuData.mousePos.mouseX;
        let mouseY = noteMenuData.mousePos.mouseY;

        let menuItemList = this.eventHandler.getMenuItemList(noteMenuData.noteInfo);

        let itemMenuPopup = document.querySelector('#item-menu-popup');
        let body = document.querySelector('body');
        if (itemMenuPopup != null) {
            body.removeChild(itemMenuPopup);
        }

        let popupClass = 'absolute p-[5px] left-[' + mouseX + 'px] top-[' + mouseY + 'px] bg-gray-200 w-64 h-64'
        let menuItemClass = 'block w-[100%] hover:bg-gray-500 rounded-md p-[5px]';
        let html = `
            <div id="item-menu-popup" class="${popupClass}">
                <ul>
                    ${menuItemList.map((element) => {
            return `
                            <li><a data-api-name=${element.apiName} data-note-no=${element.itemInfo.noteIdNo} class="${menuItemClass}">${element.text}</a></li>
                        `;
        }).join('')}
                </ul>
            </div>
        `;
        body.insertAdjacentHTML('beforeend', html);
        this.postRender();
        this.eventHandle();
    }

    postRender() {
    }

    eventHandle() {
        let menuItemAnchorList = document.querySelectorAll("#item-menu-popup a");
        this.eventHandler.setApiToMenuItem(menuItemAnchorList);
    }

}

export {NoteMenuRenderer}