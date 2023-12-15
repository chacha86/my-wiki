class NotePage extends Base {

    constructor(url, itemPrefix, customClass) {
        super(url, itemPrefix, customClass);
    }

    createNotePageItem(notePageDto) {
        console.log(notePageDto);
        let pageClass = "hover:bg-gray-500 hover:text-white hover:rounded-md";
        let pageLinkClass = "block p-[10px] text-[15px] hover:cursor-pointer";
        return `
            <li class="${pageClass}">
                <a class="${pageLinkClass}" id="note-page-${notePageDto.id}" onclick="getContent(${notePageDto.id});">${notePageDto.title}</a>
            </li>
        `
    }

    createNotePage(pageDtoList) {
        return `
            ${pageDtoList.map((notePageDto) => {
            return `${this.createNotePageItem(notePageDto)}`;
        }).join('')}
        `
    }

    renderingNotePage(data) {
        setPageSideMenu(data.noteUIParam);
        const pageItemList = document.querySelector("#page-item-list");
        const html = `
            ${this.createNotePage(data.notePageDtoList)}
        `;

        pageItemList.innerHTML = html;
    }

    render(data) {
        super.render(data, this.renderingNotePage.bind(this));
    }
}
