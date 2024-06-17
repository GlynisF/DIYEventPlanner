class User {
    constructor(id, firstName, lastName, email, username, password, dateOfBirth) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.dateOfBirth = dateOfBirth;

    }

    getUser() {
        return this;
    }

}