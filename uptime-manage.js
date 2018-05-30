const express = require('express');
const Webtask = require('webtask-tools');
const bodyParser = require('body-parser');
const uid = require('uid');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.get('/add', (req, res) => {
    const site = req.query.site;
    if (!isUrl(site)) res.sendStatus(400).json('site not correct');

    // Add site
    const key = uid();
    fetchData(req.webtaskContext, (data) => {
        data[key] = {
            site: site,
            logs: []
        }
    });

    // Result
    res.json({
        key: key,
        site: site
    });
})

app.get('/stats/:key', (req, res) => {
    const key = req.params.key;
    fetchData(req.webtaskContext, (data) => {
        res.json(data[key]);
    })
})

app.get('/up/:key', (req, res) => {
    const key = req.params.key;
    fetchData(req.webtaskContext, (data) => {
        const _up = {
            created: new Date().getTime(),
            live: req.query.live,
            time: req.query.time
        }
        data[key].logs.push(_up);
        res.json(_up);
    })
})

app.get('/list', (req, res) => {
    fetchData(req.webtaskContext, (data) => {
        res.json(data);
    })
})

function fetchData(ctx, cb) {
    ctx.storage.get(function (error, data) {

        // Check error
        if (error) return console.log(error);
        data = data || {};

        // Update data
        cb(data);

        ctx.storage.set(data, function (error) {
            if (error) return console.log(error)
            else console.log('Update data successfully');
        });
    });
}

function isUrl(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}

module.exports = Webtask.fromExpress(app);