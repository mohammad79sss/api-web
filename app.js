const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'moradinima.ir',
    user            : 'root',
    password        :  null,
    database        : 'rucerimu_messages'
})


// Get all rucerimu_messages
app.get('/get-message', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as Id ' + connection.threadId)
        connection.query('SELECT * from message', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from messages table are: \n', rows)
        })
    })
})


// Add messages
app.post('/post-message', (req, res) => {

    console.log("hit");
    pool.getConnection((err, connection) => {
        if(err) throw err

        const params = req.body;
        console.log(params.SenderName);

        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        let values = [params.SenderName,params.SenderEmail,params.MessageText,date];

        connection.query('INSERT INTO message (SenderName,SenderEmail,MessageText,MessageDate) VALUES (?)', [values],
            (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    res.send(`messages with the record Id  has been added.`)
                } else {
                    console.log(err)
                }

                console.log('The data from messages table are:11 \n', rows)
            })
    })
});
app.listen(port, () => console.log(`Listening on port ${port}`))







/*
// Get an message
app.get('/:Id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM messages WHERE Id = [req.params.Id]', (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log('The data from messages table are: \n', rows)
        })
    })
});

// Delete a message
app.delete('/:Id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM messagess WHERE Id = [req.params.Id]', (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`messages with the record Id ${[req.params.Id]} has been removed.`)
            } else {
                console.log(err)
            }

            console.log('The data from messages table are: \n', rows)
        })
    })
});
*/

/*
app.put('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as Id ${connection.threadId}`)

        const { Id , SenderName, SenderEmail, MessageDate, MessageText } = req.body

        connection.query('UPDATE messages SET SenderName = req.params.SenderName, SenderEmail = req.params.SenderEmail,  MessageDate = req.params.MessageDate, MessageText = req.params.MessageText WHERE Id = Id', [SenderName, SenderEmail, MessageDate, MessageText, Id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`messages with the SenderName: ${SenderName} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})

*/

