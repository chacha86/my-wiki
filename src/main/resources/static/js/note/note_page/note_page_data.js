class NotePageData {
    constructor() {
        this.selectedPageId = null;
        this.prevPageId = null;
    }
    getSelectedPageNo() {
        return this.getNo(this.selectedPageId);
    }
    getPrevPageNo() {
        return this.getNo(this.prevPageId);
    }
    getNo(id) {
        return id.split("-")[1];
    }
    setData(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
}

export { NotePageData };