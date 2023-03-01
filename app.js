const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

function log_info(req){
    console.log("==============================")
    console.log(req.path);
    console.log(req.url);
    console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));
}

function resp_fix_status(req) {
    let url = require('url')
    let url_parts = url.parse(req.url, true)
    let query = url_parts.query
    if (query.http_status) {
        return query.http_status
    } else {
        return null
    }
}

app.all('*', (req, res) => {
    log_info(req);
    http_status = resp_fix_status(req)
    if (http_status != null) {
        res.status(http_status)
    }
    res_value = {
        "path": req.url,
        "header": req.headers,
        "method": req.method,
        "body" : req.body
    }
    res.send(res_value)
})

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})
