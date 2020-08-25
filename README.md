# FETCH HOOKS REACT

React hooks for fetching multiple or single resources.

Typescript enabled.

**Small.** 554 bytes (minified and gzipped). No dependencies.
[Size Limit](https://github.com/ai/size-limit) controls the size.


# Installation

Install it with yarn:

```
yarn add fetch-hooks-react
```


Or with npm:


```
npm i fetch-hooks-react --save
```


# Usage

Exports two hooks `fetchMany` and `fetchSingle` (see below). Both return an object with the following keys:
- `data` the data returned by the resource(s). `fetchMany` will return the data separated by keys.
- `isLoading`, a boolean value, that lets you know if the request(s) are still being made.
- `error` any error returned from the resource(s). This is an extension of the js `Error` class, and includes two more properties `status` and `statusText` that come straight from the response.



## fetchMany

Fetches multiple resources.

Params:

An array of IFetchParams:

```javascript
interface IFetchParams {
  url: RequestInfo;
  options?: RequestInit;
  key: string;
  dependsOn?: boolean[];
}
```

- `url` is the resource you want to fetch.
- `options` are the [fetch options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options). 
- `key` is the key you want this to return in the `data` object.
- `dependsOn` is an optional array of boolean variables on which making the request depends on. If the array exists and at least one value is false, the request will not be made untill all values are true.


### Example

```javascript
// .tsx file

import React, { FC } from "react";
import { fetchMany } from "fetch-hooks-react";

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const MyComponent: FC = () => {
  const doIt = true;
  const { data, isLoading, error } = fetchMany<{ todoList: ITodo[], singleTodo: ITodo>([
    { url: "https://jsonplaceholder.typicode.com/todos", options: { method: "GET" }, key: "todoList" },
    { url: "https://jsonplaceholder.typicode.com/todos/1", options: { method: "GET" }, key: "singleTodo", dependsOn: [doIt] }
  ]); 

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error || !data) {
    return <div>Unexpected error: {error.message}</div>;
  }

  return (
    <div>{JSON.stringify(data.todoList)}</div>
    <div>{JSON.stringify(data.singleTodo)}</div>
  );
}

export default MyComponent;
```


## fetchSingle

Fetches multiple resources.

Params:

- A `url` is the resource you want to fetch.
- [fetch options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options). 
- `dependsOn` is an optional array of boolean variables on which making the request depends on. If the array exists and at least one value is false, the request will not be made untill all values are true.


### Example

```javascript
// .tsx file

import React, { FC } from "react";
import { fetchSingle } from "fetch-hooks-react";

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const MyComponent: FC = () => {
  const doIt = true;
  const { data, isLoading, error } = fetchMany<ITodo>("https://jsonplaceholder.typicode.com/todos/1", { method: "GET" }, [doIt]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Unexpected error: {error.message}</div>;
  }

  return (
    <div>{JSON.stringify(data)}</div>
  );
}

export default MyComponent;
```