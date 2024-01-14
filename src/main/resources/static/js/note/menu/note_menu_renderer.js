import {NoteMenuApi} from "./note_menu_api.js";
import {NoteMenuHandler} from "./note_menu_handler.js";
import {NoteMenuData} from "./note_menu_data.js";

class NoteMenuRenderer {
    constructor(param) {
        this.param = param;
        this.eventHandler = new NoteMenuHandler();
    }

    async render() {
        let mousePos = this.param.mousePos;
        let itemInfo = this.param.itemInfo;

        let mouseX = mousePos.mouseX;
        let mouseY = mousePos.mouseY;

        let menuItemList = this.eventHandler.getMenuItemList(itemInfo);

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
                            <li><a data-api-name=${element.apiName} data-item-no=${element.itemInfo.itemIdNo} class="${menuItemClass}">${element.text}</a></li>
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
        // let itemInfo = this.param.itemInfo;
        // let itemType = itemInfo.itemType;
        //
        // console.log("itemType");
        // console.log(this.param);
        // let param = {
        //     "itemInfo": itemInfo,
        // }
        // if(itemType === "note") {
        //     this.eventHandler.setApiToNoteMenuItem(menuItemAnchorList, param);
        //     return;
        // }
        console.log("itemType");
        let param = {
            'selectedNoteId': this.param.selectedNoteId,
            'prevNoteId': this.param.prevNoteId,
            'selectedPageId': this.param.selectedPageId,
            'prevPageId': this.param.prevPageId,
            'itemInfo': this.param.itemInfo,
        };

        this.eventHandler.setApiToMenuItem(menuItemAnchorList, param);
    }

}

export {NoteMenuRenderer}