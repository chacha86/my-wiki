import {ItemData, NoteData, NoteRenderer} from "../note_renderer.js";
import {NoteMoveModalRenderer} from "./move/note_move_modal_renderer.js";
import {NoteMenuApi} from "./note_menu_api.js";
import {NoteMenuRenderer} from "./note_menu_renderer.js";
import {RenameModalRenderer} from "./rename/rename_modal_renderer.js";
import {NotePageRenderer} from "../note_page/note_page_renderer.js";
import {PageMoveModalRenderer} from "./move/page_move_modal_renderer.js";
import {NotePageContentRenderer} from "../note_page_content/note_page_content_renderer.js";
import {NoteParam} from "../noteParam.js";
import {HandlerFactory, RendererFactory} from "../../initializer.js";

class NoteMenuHandler {
    constructor() {
        this.noteMenuApi = new NoteMenuApi();
    }

    setApiToMenuItem(menuItemAnchorList, param) {

        menuItemAnchorList.forEach((anchor) => {
            let apiName = anchor.getAttribute('data-api-name');

            anchor.addEventListener('click', (event) => {
                let apiFunc = this.getApiFunction(apiName);
                apiFunc(param);
            });
        });
    }

    setMenuToItem(itemList, param) {
        itemList.forEach((item) => {
            item.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                event.stopPropagation();

                let itemId = ItemData.getItemIdByElement(item);
                let itemInfo = ItemData.getItemInfoById(itemId);
                let mousePos = {
                    'mouseX': event.clientX,
                    'mouseY': event.clientY
                };
                const menuParam = new NoteParam();
                menuParam.itemInfo = itemInfo;
                menuParam.mousePos = mousePos;
                menuParam.data = this.getMenuItemList(itemInfo);

                RendererFactory.get("noteMenu").render(menuParam);
            })
        });
    }

    getItemMenuData(event, itemInfo) {

    }

    // setMenuToPageItem(pageItemList) {
    //     pageItemList.forEach((pageItem) => {
    //         pageItem.addEventListener('contextmenu', (event) => {
    //             let pageInfo = this.getPageInfoFromElement(pageItem);
    //             event.preventDefault();
    //             event.stopPropagation();
    //             let mouseX = event.clientX;
    //             let mouseY = event.clientY;
    //             this.openMenuPopup(mouseX, mouseY, pageInfo);
    //         })
    //     });
    // }

    // openMenuPopup(mouseX, mouseY, itemInfo) {
    //
    //     let groupMenuPopupEl = document.querySelector('#item-menu-popup');
    //     console.log(groupMenuPopupEl);
    //     let body = document.querySelector('body');
    //
    //     if (groupMenuPopupEl != null) {
    //         body.removeChild(groupMenuPopupEl);
    //     }
    //
    //     let menuPopupEl = this.getMenuPopupEl(itemInfo.itemType, mouseX, mouseY, itemInfo);
    //     body.appendChild(menuPopupEl);
    // }

    // getMenuPopupEl(itemType, mouseX, mouseY, itemInfo) {
    //
    //     if (itemType === 'group') {
    //         return this.createGroupMenuPopup(mouseX, mouseY, itemInfo);
    //     }
    //     if (itemType === 'note') {
    //         return this.createNoteMenuPopup(mouseX, mouseY, itemInfo);
    //     }
    //
    //     return this.createPageMenuPopup(mouseX, mouseY, itemInfo);
    //
    // }

    createMenuList(menuItemList) {
        let menuList = document.createElement('ul');
        menuItemList.forEach((element) => {
            let listItem = document.createElement('li');
            let anchor = document.createElement('a');

            anchor.setAttribute('class', 'block w-[100%] hover:bg-gray-500 rounded-md p-[5px]');
            anchor.addEventListener('click', (event) => {
                this.getApiFunction(element.itemType, element.apiName)(element.itemInfo);
            });

            anchor.innerText = element.text;
            listItem.appendChild(anchor);
            menuList.appendChild(listItem);
        });

        return menuList;
    }

    createBaseMenuPopup(mouseX, mouseY, noteInfo, menuItemList) {
        let baseMenuPopup = document.createElement('div');
        baseMenuPopup.setAttribute('class', 'absolute p-[5px] left-[' + mouseX + 'px] top-[' + mouseY + 'px] bg-gray-200 w-64 h-64');
        baseMenuPopup.setAttribute('id', 'item-menu-popup');

        let baseMenuListResult = this.createMenuList(menuItemList);
        baseMenuPopup.appendChild(baseMenuListResult);

        return baseMenuPopup;
    }

    createNoteMenuPopup(mouseX, mouseY, noteInfo) {
        const noteMenuItemList = this.getNoteMenuItemList(noteInfo);
        return this.createBaseMenuPopup(mouseX, mouseY, noteInfo, noteMenuItemList);
    }

    // createGroupMenuPopup(mouseX, mouseY, noteInfo) {
    //
    //     let baseMenuPopup = this.createNoteMenuPopup(mouseX, mouseY, noteInfo);
    //     let groupMenuItemList = this.getGroupMenuItemList(noteInfo);
    //     let groupMenuList = this.createMenuList(groupMenuItemList);
    //
    //     baseMenuPopup.appendChild(groupMenuList);
    //
    //     return baseMenuPopup;
    // }

    getPageMenuItemList(itemInfo) {
        let del = {
            'text': '🗑️ 삭제',
            'url': '/api/pages/delete/' + itemInfo.itemIdNo,
            'itemInfo': itemInfo,
            'itemType': 'page',
            'apiName': '_deletePage'
        }
        let update = {
            'text': '🛠️ 이름변경',
            'url': '/api/pages/update/' + itemInfo.itemIdNo,
            'itemInfo': itemInfo,
            'itemType': 'page',
            'apiName': '_renamePage'
        }
        let move = {
            'text': '➡️ 페이지이동',
            'url': '/page/move/' + itemInfo.itemIdNo,
            'itemInfo': itemInfo,
            'itemType': 'page',
            'apiName': '_movePageModal'
        }

        return [del, update, move];
    }

    getNoteMenuItemList(itemInfo) {

        let del = {
            'text': '🗑️ 삭제',
            'url': '/api/notes/delete/' + itemInfo.itemIdNo,
            'itemInfo': itemInfo,
            'itemType': 'note',
            'apiName': '_deleteNote',
            // 'callback' : callback
            // 'onclick': 'deleteItem(this, "note-' + noteIdNo + '"); return false;'
        }
        let update = {
            'text': '🛠️ 이름변경',
            'url': '/api/notes/update/' + itemInfo.itemIdNo,
            'itemInfo': itemInfo,
            'itemType': 'note',
            'apiName': '_renameNoteModal',
        }
        let move = {
            'text': '➡️ 노트이동',
            'url': '/api/notes/update/' + itemInfo.itemIdNo,
            'itemInfo': itemInfo,
            'itemType': 'note',
            'apiName': '_moveNoteModal',
        }

        return [del, update, move];
    }

    getGroupMenuItemList(itemInfo) {
        let addGroup = {
            'text': '🗂️ 새그룹 추가',
            'itemInfo': itemInfo,
            'url': '/api/notes/add-group/' + itemInfo.itemIdNo,
            'itemType': 'note',
            'apiName': '_addGroupNote'
        }
        let addNote = {
            'text': '➕ 새노트 추가',
            'itemInfo': itemInfo,
            'url': '/api/notes/add/' + itemInfo.itemIdNo,
            'itemType': 'note',
            'apiName': '_addNote'
        }

        return [addGroup, addNote];
    }

    getMenuItemList(itemInfo) {
        if (itemInfo == null) {
            return [];
        }

        let menuItemList = this.getNoteMenuItemList(itemInfo);

        if (itemInfo.itemType === 'page') {
            return this.getPageMenuItemList(itemInfo);
        }

        if (itemInfo.itemType === 'group') {
            const groupMenuItem = this.getGroupMenuItemList(itemInfo);
            return menuItemList.concat(groupMenuItem);
        }

        return this.getNoteMenuItemList(itemInfo);
    }

    // createPageMenuPopup(mouseX, mouseY, pageInfo) {
    //     const pageMenuItemList = this.getPageMenuItemList(pageInfo);
    //     return this.createBaseMenuPopup(mouseX, mouseY, pageInfo, pageMenuItemList);
    // }

    getApiFunction(apiName) {
        switch (apiName) {
            case '_deleteNote':
                return this._deleteNote.bind(this);
            case '_addGroupNote':
                return this._addGroupNote.bind(this);
            case '_addNote':
                return this._addNote.bind(this);
            case '_renameNoteModal':
                return this._renameModal.bind(this);
            case '_moveNoteModal':
                return this._moveNoteModal.bind(this);
            case '_deletePage':
                return this._deletePage.bind(this);
            case '_renamePage':
                return this._renameModal.bind(this);
            case '_movePageModal':
                return this._movePageModal.bind(this);
            default:
                return null;
        }
    }

    async _addNote(param) {
        const itemInfo = param.itemInfo;
        const noteParam = new NoteParam();
        const selectedNoteId = RendererFactory.get("note").props.selectedNoteId;

        const msg = await this.addNote(itemInfo.itemIdNo);
        this._openAddedGroupNote(itemInfo);

        noteParam.selectedNoteId = selectedNoteId;
        noteParam.data = await HandlerFactory.get("note").getNoteData();

        RendererFactory.get("note").render(noteParam);
    }

    async addNote(noteIdNo) {
        return await this.noteMenuApi.addNote(noteIdNo);
    }

    async _addGroupNote(param) {
        const itemInfo = param.itemInfo;
        const noteParam = new NoteParam();
        const selectedNoteId = RendererFactory.get("note").props.selectedNoteId;

        const msg = await this.addGroupNote(itemInfo.itemIdNo);
        this._openAddedGroupNote(itemInfo);
        noteParam.data = await HandlerFactory.get("note").getNoteData();
        noteParam.selectedNoteId = selectedNoteId;
        RendererFactory.get("note").render(noteParam);
    }

    async addGroupNote(noteIdNo) {
        return await this.noteMenuApi.addGroupNote(noteIdNo);
    }

    _openAddedGroupNote(itemInfo) {
        const detailsElement = NoteData.getGroupNoteDetailsElementByNoteIdNo(itemInfo.itemIdNo);
        const open = detailsElement.getAttribute('open')
        if (open === null || open === undefined) {
            detailsElement.setAttribute('open', '');
        }
    }

    async _deleteNote(param) {
        const itemInfo = param.itemInfo;
        const selectedNoteId = RendererFactory.get("note").props.selectedNoteId;
        const noteParam = new NoteParam();

        const msg = await this.deleteNote(itemInfo.itemIdNo);
        noteParam.selectedNoteId = selectedNoteId;

        if(selectedNoteId === ItemData.getNoteIdByItemNo(itemInfo.itemIdNo)) {
            noteParam.selectedNoteId = null;
        }

        if(itemInfo.itemType === 'group') {
            noteParam.selectedNoteId = null;
        }

        noteParam.data = await HandlerFactory.get("note").getNoteData();
        RendererFactory.get("note").render(noteParam);

        const notePageParam = new NoteParam();
        notePageParam.selectedNoteId = null;
        RendererFactory.get("notePage").render(notePageParam);

        const notePageContentParam = new NoteParam();
        notePageContentParam.selectedPageId = null;
        RendererFactory.get("notePageContent").render(notePageContentParam);

    }

    async deleteNote(noteIdNo) {
        return await this.noteMenuApi.deleteNote(noteIdNo);
    }

    async _deletePage(param) {
        const itemInfo = param.itemInfo;
        const selectedNoteId = RendererFactory.get("note").props.selectedNoteId;
        const notePageParam = new NoteParam();
        const notePageContentParam = new NoteParam();

        let selectedPageId = RendererFactory.get("notePage").props.selectedPageId;

        const msg = await this.deletePage(itemInfo.itemIdNo);

        if(selectedPageId === ItemData.getPageIdByItemNo(itemInfo.itemIdNo)) {
            selectedPageId = null;
        }

        notePageParam.selectedNoteId = selectedNoteId;
        notePageParam.selectedPageId = selectedPageId;
        notePageParam.sortType = param.sortType;
        notePageParam.direction = param.direction;

        notePageParam.data = await HandlerFactory.get("notePage").getNotePageData(selectedNoteId, param.sortType, param.direction);
        RendererFactory.get("notePage").render(notePageParam);

        notePageContentParam.selectedPageId = selectedPageId;
        RendererFactory.get("notePageContent").render(notePageContentParam);

    }

    async deletePage(pageIdNo) {
        return await this.noteMenuApi.deletePage(pageIdNo);
    }

    async _moveNoteModal(param) {
        const moveModal = document.querySelector('#my_modal_2');
        const itemInfo = param.itemInfo;
        const moveParam = new NoteParam();

        moveParam.moveTargetNoteId = ItemData.getNoteIdByItemNo(itemInfo.itemIdNo);
        moveParam.data = await this.getMoveNoteTree(itemInfo.itemIdNo);

        RendererFactory.get("noteMoveModal").render(moveParam);
        moveModal.show();
    }
    async getMoveNoteTree(noteIdNo) {
        return await this.noteMenuApi.moveNote(noteIdNo);
    }

    async _movePageModal(param) {
        const moveModal = document.querySelector('#my_modal_2');
        const itemInfo = param.itemInfo;
        const moveParam = new NoteParam();

        moveParam.moveTargetNoteId = RendererFactory.get("note").props.selectedNoteId;
        moveParam.moveTargetPageId = ItemData.getPageIdByItemNo(itemInfo.itemIdNo);
        moveParam.data = await this.getMoveNoteTree(itemInfo.itemIdNo);

        RendererFactory.get("pageMoveModal").render(moveParam);
        moveModal.show();
    }
    async getMovePageTree() {
        return await this.noteMenuApi.movePage();
    }

    async _renameModal(param) {
        const renameModal = document.querySelector('#my_modal_1');
        const itemTextInput = document.querySelector('#new-item-text');
        const renameParam = new NoteParam();

        itemTextInput.value = param.itemInfo.itemText;
        renameParam.itemInfo = param.itemInfo;
        RendererFactory.get("renameModal").render(param);

        renameModal.show();
    }

    async updateMovePage(pageIdNo, noteIdNo) {
        const updateMovePageParam = {
            noteId: noteIdNo,
            pageIdNo: pageIdNo
        };
        return await this.noteMenuApi.updateMovePage(updateMovePageParam);
    }
}


export {
    NoteMenuHandler
};