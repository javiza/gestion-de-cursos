
const { Pool } = require('pg');
const pool = new Pool({
    user: 'jona',
    host: 'localhost',
    port: 5432,
    password: '1234',
    database: 'cursos',
});

async function nuevoCurso(nombre, nivel, fecha, duracion) {
    try {
        const result = await pool.query(
            `INSERT INTO cursos1 (nombre, nivel, fecha, duracion)
            values ('${nombre}','${nivel}','${fecha}','${duracion}') RETURNING *`
        );
        return result.rows;
    } catch (e) {
        console.log(e);
        return e;
    }
}

async function getCurso() {
    try {
        const result = await pool.query(`SELECT * FROM cursos1`);
        return result.rows;
    } catch (e) {
        console.log(e);
        return e;
    }
}
console.log(getCurso())
async function editCurso(id,nombre, nivel, fecha, duracion) {
    try {
        const res = await pool.query(
            `UPDATE cursos1 SET nombre='${nombre}', nivel= '${nivel}', fecha='${fecha}', duracion='${duracion}' WHERE id = '${id}'
    RETURNING *`
        );

        return res.rows;
    } catch (e) {
        console.log(e);
        return e;
    }
}

async function deleteCurso(id) {
    try {
        const result = await pool.query(`DELETE FROM cursos1 WHERE id ='${id}'`);
        return result.rowCount;
    } catch (e) {
        return e;
    }
}
module.exports = {
    nuevoCurso,
    getCurso,
    editCurso,
    deleteCurso
}