# Simple localStorage Cache [![npm version](https://badge.fury.io/js/simple-localstorage-cache.svg)](https://www.npmjs.com/package/simple-localstorage-cache)

![build and release](https://github.com/MauricioRobayo/simple-localstorage-cache/workflows/build%20and%20release/badge.svg)
[![codecov](https://codecov.io/gh/MauricioRobayo/simple-localstorage-cache/branch/master/graph/badge.svg)](https://codecov.io/gh/MauricioRobayo/simple-localstorage-cache)
[![CodeFactor](https://www.codefactor.io/repository/github/mauriciorobayo/simple-localstorage-cache/badge)](https://www.codefactor.io/repository/github/mauriciorobayo/simple-localstorage-cache)

Simple localStorage cache to save API responses and avoid multiple unnecessary requests.

Dependencies-free and super small.

[![install size](https://packagephobia.now.sh/badge?p=simple-localstorage-cache)](https://packagephobia.now.sh/result?p=simple-localstorage-cache)

## Usage

Install the package in your dependencies:

```
npm i simple-local-storage
```

Create an instance with the key that you want to use and the expiration time in seconds:

```js
import SLSC from 'simple-local-storage';

const expiration = 60; // One minute
const key = 'key'; 
const cache = new SLSC(key, expiration);
```

The `key` will be transformed to use the 'slsc-' prefix and a random number suffix:

`slsc-key-1234567890`

### Methods

Simple localStorage cache provides three convenient methods: `get`, `update`, and `hasCache`.

#### get()

The `get()` method is used to get the data stored in localStorage. It will return `null` if there is not data to retrieve or if the key has expired.

If there is data to retrieve and it hasn't expired, then it will return an object with two properties, the `data` property, containing the data that was originally stored, and the `expiration` property, with the expiration time as a number of milliseconds.

```js
const cached = cache.get();
console.log(cached);
// { data: { ... }, expiration: 1595179891655, }
```

#### update(_data_)

The `update(data)` method allows to set new data or update it:


```js
const response = await fetch(url);
const data = await response.json();

cache.update(data);
```

#### hasCache()

The `hasCache()` method will return `false` if there is no cache set or if it has expired. Otherwise it will return `true`.

## Example

```js
import SLSC from "simple-local-storage";
import axios from "axios";

async function getChuckNorrisFact() {
  const url = "https://api.chucknorris.io/jokes/random";

  const cache = new SLSC("chuck", 60);

  if (cache.hasCache()) {
    return cache.get().data;
  }

  const response = await axios.get(url);

  cache.update(response.data);

  return response.data;
}
```

You can also use it with TypeScript:

```ts
import SLSC from "simple-local-storage";
import axios, { AxiosResponse } from "axios";

interface ChuckNorrisFact {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}

async function getChuckNorrisFact() {
  const url = "https://api.chucknorris.io/jokes/random";

  const cache = new SLSC<ChuckNorrisFact>("chuck", 60);

  if (cached.hasCache()) {
    return cache.get().data;
  }

  const response = await axios.get<string, AxiosResponse<ChuckNorrisFact>>(url);

  cache.update(response.data);

  return response.data;
}
```

## Contributing

Contributions, issues and feature requests are welcome!

## Show your support

Give a ⭐️ if you like this project!

## License

[MIT](LICENSE).