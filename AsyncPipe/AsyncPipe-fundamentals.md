**[AsyncPipe](https://angular.io/api/common/AsyncPipe#asyncpipe)**

Unwraps a value from an asynchronous primitive.

Description
The async pipe subscribes to an Observable or Promise and returns the latest value it has emitted. When a new value is emitted, the async pipe marks the component to be checked for changes. When the component gets destroyed, the async pipe unsubscribes automatically to avoid potential memory leaks.

Normally to render the result of a promise or an observable we have to:

-   1. Wait for a callback.

-   2. Store the result of the callback in a variable.

-   3. Bind to that variable in the template.

With AsyncPipe we can use promises and observables directly in our template, without having to store the result on an intermediate property or variable.

AsyncPipe accepts as argument an observable or a promise, calls subcribe or attaches a then handler, then waits for the asynchronous result before passing it through to the caller.

#### Further Reading

[https://malcoded.com/posts/angular-async-pipe/](https://malcoded.com/posts/angular-async-pipe/)
