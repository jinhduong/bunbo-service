'use latest';

import request from 'request';

module.exports = function (ctx, cb) {
    request
        .get(`${baseUrl()}/list`, (err, res, body) => {
            const data = JSON.parse(body);
            runUptime(data, cb);
        })
    cb(null, true);
}

function runUptime(data, cb) {
    Object.keys(data).forEach((key, i) => {
        setTimeout(() => {
            uptime(key, data[key]);
        }, i * 1200);
    });
}

/**
 * 
 * @param { site, logs:Array<{}>} site 
 */
function uptime(key, siteObj) {
    console.log(`${format(siteObj.site)} is fetching...`);
    const s = +new Date();
    request
        .get(format(siteObj.site), (err, res, body) => {
            const e = +new Date();
            const time = e - s;
            if (err) {
                console.log(err);
                return updateStat(false, key, time);
            }
            return updateStat(true, key, time)
        })
}

function updateStat(isLive, key, time) {
    request
        .get(`${baseUrl()}/up/${key}?live=${isLive}&time=${time}`, (err, res, body) => {
            console.log(`update stat for ${key} is ${isLive ? 'success' : 'fail'}`)
        });
}

/**
 * 
 * @param {string} url 
 */
function format(url) {
    if (url.indexOf('http') > -1) return url;
    return `http://${url}`;
}

function baseUrl() {
    return 'https://wt-021b7f362991cec68dd62033c2455e46-0.sandbox.auth0-extend.com/uptime-manage';
}