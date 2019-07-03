const https = require('https');

export function get(host, path, token){

    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
    }

    var options = {
        headers : headers,
        host : host,
        path : path,
        protocol : 'https:',
    }

    console.log(options.path);

    https.get(options, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(JSON.parse(data));
        return JSON.parse(data).explanation;
    });

    }).on("error", (err) => {
    console.log(err.stack);
    })
};