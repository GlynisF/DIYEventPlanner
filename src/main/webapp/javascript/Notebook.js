class Notebook  {
    constructor(title, user) {
        this.title = title;
        this.user = user;
    }

    displayNotebook() {
        return `${this.title}, ${this.user}`;
    }


}