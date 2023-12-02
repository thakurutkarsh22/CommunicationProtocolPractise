const mysql = require("mysql2/promise");

// connectMyISAM();
connectInnoDB();
async function connectInnoDB() {
  try {
    const con = await mysql.createConnection({
      host: "localhost",
      port: 3307,
      user: "root",
      password: "password",
      database: "test",
    });
    await con.beginTransaction();
    await con.query("INSERT INTO employees_innodb (name) values (?)", [
      "Utkarsh1",
    ]);

    const [rows, schema] = await con.query("select * from employees_innodb");
    // Within transaction I can see my row BUT other client cant see the change
    console.table(rows);

    await con.commit();
    await con.close();
    console.log(result);
  } catch (ex) {
    console.error(ex);
  } finally {
  }
}

// for innodb Only the own transaction can see the change other client cant see the change
// OtherClient - Mysql Bash Terminal (you can open multiple terminal)

async function connectMyISAM() {
  try {
    const con = await mysql.createConnection({
      host: "localhost",
      port: 3307,
      user: "root",
      password: "password",
      database: "test",
    });
    await con.beginTransaction();
    await con.query("INSERT INTO employees_myisam (name) values (?)", [
      "utkarsh",
    ]);

    await con.commit();
    await con.close();
  } catch (ex) {
    console.error(ex);
  } finally {
  }
}

// put a breakpoint on line 44 i.e, before commmit to see that ISAM dont support transaction and having said that
// it means without commiting also the insert is seen by other client.

// conslusion:

/*
    Things about ISAM engine is true that it dont support transactions.
    but innoDB do support this.

*/
