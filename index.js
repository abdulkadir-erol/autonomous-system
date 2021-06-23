const express = require('express');

const app = express();
app.listen(3000, () => console.log('listening in 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.get('/autonomous', (request, response) => {
    console.log('I got to get something !');
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    })
});

app.post('/autonomous', (request, response) => {
    console.log('I got a request ');
    const data = request.body;

    response.json({
        status: 'success',
        time: data.time,
        power: data.power
    });
});