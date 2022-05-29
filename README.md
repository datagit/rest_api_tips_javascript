# rest_api_tips_javascript
rest_api_tips_javascript
```bash
guide: 
  - rest: https://www.youtube.com/watch?v=CX_BGViLEoM&list=PLw0w5s5b9NK5vec1mvOh5grtNlCwcgO0j
  - openSSL SSL/TLS: https://xuanthulab.net/ssl-tls-va-giao-thuc-https-voi-open-ssl-va-let-s-encrypt.html
  - salt into raw pass: https://xuanthulab.net/su-dung-salt-voi-password-trong-php.html
```
recommended for a good rest api
```javascript
1: Protocol: HTTPS/443, SSL/PLS, openSSL
2. domain name: api.example.com
3. versioning api:
  - https://api.example.com/v1/
  - https://api.example.com/v2/
4. endpoint: do not should put a verb in the endpoint, It has to a noun
  - https://api.example.com/v1/{noun word}
  - https://api.example.com/v1/animals
  - https://api.example.com/v1/employees
5. HTTP Option: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS
  - GET: select one or many resource from server
  - POST: to create new a object
  - PUT: update the existed object, and need provide full fields for updating
  - PATCH: update the existed object, but only provide some fields for updating(reduce network traffic)
  - DELETE: delete the existed object
  and HEADER: contain some info such as: session token,...
6. Filtering:
  - ?limit=10: assign number of record to return is 10
  - ?offset=10: assign position record to return is 10
  - ?page=2&per_page=100: assign number page is 2 and number of record each a page is 100
  - ?sortby=name&orderby=asc: set sort field is name and set how sort by asc
7. Return status: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
  - 200: server response success
  - 201: server made changing data success: [POST, PUT, PATCH]
  - 202: The request has been received but not yet acted(task sync)
  - 204: No content(end user was deleted)
  - 400: Bad request(in [POST, PUT, PATCH]: params of request is invalid and server not yet acted)
  - 401: Unauthorized(in [*]: username or password is incorrect)
  - 403: Forbidden(in [*]: end user is authorized but end user is forbidden)
  - 404: Not found(in [*]: request od end user to a record that is not existed in db)
  - 406: Not acceptable(in [GET]: server is not accepted format of end user, ex: server is only HTML but end user want get JSON)
  - 500: Internal server error
  - 501: Server not implemented(method was not supported)
  - 502: Bad gateway
  - 503: Server unavailable
  - 504: Gateway timeout
8. Handle error
  - error format
  - if need then roback action(in transaction)
  - write log
    - format message: ip, time, uuid, file, function, input
9. return
  - get more then return an array
  - get one then return an object
  - post to create then return a new object
  - put to update then return the changed object
  - patch to update then return the changed object
  - delete then return not content status=204
10. HATEOAS: https://en.wikipedia.org/wiki/HATEOAS
  - Hypermedia as the Engine of Application State
  - example:
    HTTP/1.1 200 OK
    
    {
        "account": {
            "account_number": 12345,
            "balance": {
                "currency": "usd",
                "value": 100.00
            },
            "links": {
                "deposits": "/accounts/12345/deposits",
                "withdrawals": "/accounts/12345/withdrawals",
                "transfers": "/accounts/12345/transfers",
                "close-requests": "/accounts/12345/close-requests"
            }
        }
    }
```
let's started:
```bash
# init project from empty
npm init -y

touch server.js

# install 2 packages and save them to file package.json
npm install express nodemon --save

# update code in file server.js
node server.js

# check server response
curl http://localhost:5000
# check server response with header
curl http://localhost:5000 --include

# add new file .env
# mention secret then we do not should upload the file .env to repository. because 2 main reason(1. secret info, 2. code will be deployed to any environment)
touch .env
npm i dotenv --save

# run process with pass some variables in command
FOO=myfoo BAR=mybar node server.js
FOO=myfoo BAR="my bar" node server.js

# at local run by nodemon for watching and auto restart server
# install extension rest client in VSCode
touch myPostMan.http
```

issue secret and tracking request from client
```bash
# Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
npm i helmet --save
# header before
  HTTP/1.1 200 OK
  X-Powered-By: Express
  Content-Type: text/html; charset=utf-8
  Content-Length: 21
  ETag: W/"15-n7oqK1hHtAnl/QKArAxeppSYqTE"
  Date: Sat, 28 May 2022 08:47:43 GMT
  Connection: close
# header after
  HTTP/1.1 200 OK
  Content-Security-Policy: default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
  Cross-Origin-Embedder-Policy: require-corp
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
  X-DNS-Prefetch-Control: off
  Expect-CT: max-age=0
  X-Frame-Options: SAMEORIGIN
  Strict-Transport-Security: max-age=15552000; includeSubDomains
  X-Download-Options: noopen
  X-Content-Type-Options: nosniff
  Origin-Agent-Cluster: ?1
  X-Permitted-Cross-Domain-Policies: none
  Referrer-Policy: no-referrer
  X-XSS-Protection: 0
  Content-Type: text/html; charset=utf-8
  Content-Length: 21
  ETag: W/"15-n7oqK1hHtAnl/QKArAxeppSYqTE"
  Date: Sat, 28 May 2022 08:50:15 GMT
  Connection: close
# HTTP request logger middleware for node.js
npm i morgan --save
# check console log in server
::ffff:127.0.0.1 - - [Sat, 28 May 2022 08:57:46 GMT] "GET / HTTP/1.1" 200 21 "-" "vscode-restclient"
::ffff:127.0.0.1 - - [Sat, 28 May 2022 09:03:03 GMT] "GET /v1/users/111 HTTP/1.1" 200 8 "-" "vscode-restclient"

# separate route
touch user.routes.js 
```

Parsing request RESTful api | Express.js vs Node.js
```bash 
# https://www.youtube.com/watch?v=7U71q1GLEro
- type1: query string
  GET http://localhost:3000/users?id=10
  express -> query string <req.query>
- type2: route parameter
  GET http://localhost:3000/users/10
  express -> route parameter <req.params>
- type3: post with content type is application/json
  POST http://localhost:3000/users
  Content-Type: application/json
  {
    "name": "my name",
    "age": 38,
  }
  express -> request body: req.body
    need using package body-parser to parse request to json
- type4: post with content type is x-www-form-urlencoded
  POST http://localhost:3000/users
  Content-Type: application/x-www-form-urlencoded
  name=my%20name&age=38
  express -> request body: req.body
    need using package body-parser to parse request to json
    ```js
    // apply body-parser to express for Content-Type: application/json
    app.use(express.json());

    // apply body-parser to express for Content-Type: application/x-www-form-urlencoded
    app.use(express.urlencoded({extended: true}));
    ```
```
Setting express with error handler, Create HTTP errors for Express
```bash
# https://www.youtube.com/watch?v=gDo-I9YgZTQ
npm i http-errors --save
```