class Department {

    constructor(connection, id = 0, name = ''){
        this.connection = connection;
        this.id = id;
        this.name = name;
    }

    viewAllDepartments(){
        this.connection.query(
            
        )
    }
}