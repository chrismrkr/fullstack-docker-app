const express = require("express");
const bodyParser = require("body-parser");
const db = require('./db');

// Express 서버 생성
const app = express();

// json 형태로 오는 요청의 본문을 해석해줄 수 있게 등록
app.use(bodyParser.json());
db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`, (err, results, fields) => {
    console.log('results ', results);
});

app.listen(5000, () => {
    console.log("Application starts on PORT 5000");
})

app.get('/api/values', (req, res, next) => {
    db.pool.query(`SELECT * FROM lists;`, (err, results, fields) => {
        if(err) return res.status(500).send(err);
        else return res.json(results);

    });
});

app.post('/api/value', (req, res, next) => {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fields) => {
            if(err) return res.status(500).send(err);
            else return res.json({success: true, value: req.body.value});
        });
})