## Arikaim CMS Api Client for Nodejs
![version: 1.0.0](https://img.shields.io/github/release/arikaim/api-client-js.svg)
![license: MIT](https://img.shields.io/badge/License-MIT-blue.svg)


This repo is part of  [Arikaim CMS](http://arikaim.com)  project.


### Installation

```sh

npm install @arikaim/arikaim-client

```

### Usage

```js

import { ArikaimClient } from '@arikaim/arikaim-client';


var client = new ArikaimClient(apiEndpoint,apiKey);

client.request(method,url,{
    // request data  key: value
}).then(function (response) {
    // response.data;  
}).catch(function (error) {
   // error
});


```
