class Department {

    constructor(db, id = 0, name = ''){
        this.db = db;
        this.id = id;
        this.name = name;
    }

    viewAllDepartments(){
        let sql = "SELECT * FROM departments";
        this.db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);

        })
    }
}

module.exports = Department;