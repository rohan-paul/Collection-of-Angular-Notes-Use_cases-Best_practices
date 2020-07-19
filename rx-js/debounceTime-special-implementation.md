I have a web worker that crunches data when a message is received from the main thread. I've created a hot observable of those messages (using fromEvent). While the worker is crunching numbers, several messages will have come in telling the worker to re-crunch, I wanted to disregard all but the latest of those.

Solution

```js
messages$.pipe(debounceTime(0))
```

This approach presumes that these messages come synchronously.

#### Further Reading

[https://stackoverflow.com/questions/62964906/rxjs-disregard-all-but-the-last-message-while-a-webworker-is-cpu-bound](https://stackoverflow.com/questions/62964906/rxjs-disregard-all-but-the-last-message-while-a-webworker-is-cpu-bound)
