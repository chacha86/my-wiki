import {getNoteInfo} from "../ui/item_menu_renderer";

class MenuRenderer {
    constructor(paramData) {
        this.paramData = paramData;
    }

    render() {
        let noteItemList = document.querySelectorAll('#note-item-list li');
        noteItemList.forEach((noteItem) => {

            noteItem.addEventListener('contextmenu', (event) => {
                let noteInfo = getNoteInfo(noteItem);
                event.preventDefault();
                event.stopPropagation();
                let mouseX = event.clientX;
                let mouseY = event.clientY;
                openMenuPopup(mouseX, mouseY, noteInfo);
            })
        });
    }
}