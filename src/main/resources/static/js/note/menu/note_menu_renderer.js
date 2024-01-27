import {NoteMenuApi} from "./note_menu_api.js";
import {NoteMenuHandler} from "./note_menu_handler.js";
import {NoteMenuData} from "./note_menu_data.js";
import {HandlerFactory} from "../../initializer.js";

class NoteMenuRenderer {
    constructor() {
        this.props = {
            'mousePos' :null,
            'itemInfo' : null,
            'data' : null
        };
        this.handler = HandlerFactory.get("noteMenu");
    }

    preRender(param) {
        Object.keys(this.props).forEach((key) => {
            if (param[key] !== undefined) {
                this.props[key] = param[key];
            }
        });

        if (this.props.data == null) {
            this.props.data = this.handler.getMenuItemList(this.props.itemInfo);
        }
    }
    async render(param) {
        this.preRender(param);
        const mousePos = this.props.mousePos;
        const itemInfo = this.props.itemInfo;

        let mouseX = mousePos.mouseX;
        let mouseY = mousePos.mouseY;

        let menuItemList = this.props.data;

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
        this.postRender(param);
    }

    postRender(param) {
        // let param = {
        //     'selectedNoteId': this.param.selectedNoteId,
        //     'prevNoteId': this.param.prevNoteId,
        //     'selectedPageId': this.param.selectedPageId,
        //     'prevPageId': this.param.prevPageId,
        //     'itemInfo': this.param.itemInfo,
        // };
        Object.keys(this.props).forEach((key) => {
            param[key] = this.props[key];
        });

        this.eventHandle(param);
    }

    eventHandle(param) {
        let menuItemAnchorList = document.querySelectorAll("#item-menu-popup a");
        this.handler.setApiToMenuItem(menuItemAnchorList, param);
    }

}

export {NoteMenuRenderer}