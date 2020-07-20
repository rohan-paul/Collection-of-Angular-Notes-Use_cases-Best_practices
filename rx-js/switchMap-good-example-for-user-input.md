The benefits of using a switchMap() operator will become
clearer when we execute long-running tasks. For argument's sake, let's define such a task,
like so:

```js
import { flatMap, switchMap } from "rxjs/operators"

function longRunningTask(input) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("response based on " + input)
    }, 5000)
  })
}
```

In this code, we have a function that takes 5 seconds to execute; enough time to show the
point we are trying to make. Next, let's show what the effect is if we keep using
the flatMap() operator in the following code:

```js
let longRunningStream$ = keyStream$
  .map((ev) => ev.key)
  .filter((key) => elem.value.length > 3)
  .filter((key) => key !== "Backspace")
  .flatMap((key) => Rx.Observable.from(longRunningTask(elem.value)))
longRunningStreamlongRunningStreamlongRunningStreamlongRunningStreamlongRunningStreamlongRunningStreamlongRunningStreamlongRunningStream\$.subscribe(
  (data) => console.log(data)
)
```

The preceding code works in the following way: every time we hit a key, it generates an
event. However, we have a .filter() operator in place that ensures an event is only
generated when at least four keys are entered,

```js
filter((key) => elem.value.length > 3)
```

Let's talk about the user's expectation at this point. If a user enters keys in an input
control, they most likely expect a request to be made when they are done typing. A user
defines being done as entering a few characters and also that they should be able to move
characters if they were mistyped. So, therefore, we can assume the following input
sequence:
