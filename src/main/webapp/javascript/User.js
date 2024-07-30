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

    toJSON() {
        return {
            "id": this.id,
            "firstName": this.firstName,
            "lastName": this.lastName,
            "email": this.email,
            "username": this.username,
            "password": this.password,
            "dateOfBirth": this.dateOfBirth
        };
    }

    getUser() {
        return this;
    }

}