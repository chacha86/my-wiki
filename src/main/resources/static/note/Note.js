class Note extends Base {
    constructor(url, itemPrefix, customClass) {
        super(url, itemPrefix, customClass);
    }

    renderingNoteTree(data) {
        setNoteSideMenu(data.noteUIParam);
        const noteItemList = document.querySelector("#note-item-list");

        const html = `
            ${this.createNoteTree(data.noteTree, data.noteUIParam)}
        `;

        noteItemList.innerHTML = html;
    }

    createNoteTree(noteList, noteUIParam) {
        return `
            ${noteList.map((note) => {
            return `${this.createNoteItem(note, noteUIParam)}`;
        }).join('')}
        `
    }

    createChildNoteTree(note, noteUIParam, noteItemClass, recurFunc) {
        return `
            <details data-note-id="${note.id}" ${noteUIParam.openList.includes(note.id) ? "open" : ""}>
                <summary class="${noteItemClass}"><a>${note.name}</a></summary>
                <ul>
                    ${note.children.length > 0 ? recurFunc(note.children, noteUIParam) : ''}
                </ul>
            </details>
        `
    }

    createNoteItem(note, noteUIParam) {
        let noteItemClass = "hover:bg-gray-500 hover:text-white hover:rounded-md";
        let groupItemClass = note.groupYn === 0 ? noteItemClass : "";

        return `
            <li class="${groupItemClass}">
                ${note.groupYn === 0 ? `<a id="note-${note.id}" onclick="getPages(${note.id});">${note.name}</a>` : ``}
                ${note.groupYn === 1 ? this.createChildNoteTree(note, noteUIParam, noteItemClass, this.createNoteTree.bind(this)) : ''}
            </li>
        `
    }

    render(data) {
        super.render(data, this.renderingNoteTree.bind(this));
    }
}
