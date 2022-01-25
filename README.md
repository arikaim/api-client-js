## Arikaim CMS Api Client for Nodejs
![version: 1.0.0](https://img.shields.io/github/release/arikaim/api-client-js.svg)
![license: MIT](https://img.shields.io/badge/License-MIT-blue.svg)


### Installation

```sh

    npm install @arikaim/arikaim-client

```

### Usage

```js

const ArikaimClient = require('@arikaim/arikaim-client');


var client = new ArikaimClient(apiEndpoint,apiKey);

client.request(method,url,{

    // request data  key: value

}).then(function (response) {
    // response.data;  
}).catch(function (error) {
   // error
});


```
