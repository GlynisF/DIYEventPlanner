class Notebook  {
    constructor(title, user_id) {
        this.title = title;
        this.user_id = user_id;
    }

    displayNotebook() {
        return `${this.title}, ${this.user_id}`;
    }


}