Super famous talk by Lead Engineer of RxJS Team of Google - This is great to understand some of the key concepts of rx-js - [https://www.youtube.com/watch?v=B-nFj2o03i8](https://www.youtube.com/watch?v=B-nFj2o03i8)

#### The specification

<img src="./Specificaton-of-pull-down-to-reload.png">

<img src="./NewsFeedService-Code.png">

**BehaviourSubject** - Requires an initial value and emits the current value to new subscribers. One of the variants of the Subject is the BehaviorSubject. The BehaviorSubject has the characteristic that it stores the “current” value. T
**BehaviourSubject** is both an Observer and and Observable

**Share()** - If you want an observable which sends its data to the subscribers it has at the moment the data arrives, this is coined a hot observable, and one way to get a hot observable is to use the share operator.

share makes the observable "hot" if these 2 conditions are met:

the number of subscribers > 0
AND the observable has not completed
Scenario1: number of subscribers > 0 and observable is not completed before a new subscription

<img src="./newsfeed-flow-code.png">

<img src="./newsfeed-flow.png">

#### Final Component Code

```ts
refresh = new EventEmitter<any>()

private _pos = 0;

touchStart# =  fromEvent<TouchEvent>(document, 'touchstart')
touchMove$ = fromEvent<TouchEvent>(document, 'touchmove')
touchEnd$ = fromEvent<TouchEvent>(document, 'touchend')

/* The touchmove event occurs when the user moves the finger across the screen. The touchmove event will be triggered once for each movement, and will continue to be triggered until the finger is released.
 */

touchDrag$ = this.touchStart$.pipe(
  exhaustMap(start => {
    return concat(
      this.touchMove$.pipe(
        map(move => move.touches[0].pageY - start.touches[0].pageY),
        takeUntil(this.touchEnd$),
        tap(p => this._pos * p),
      ),
      this.moveHome$
    )
  }),
  tap(y => {
    if (y > window.innerHeight / 2) {
      this.refresh.emit()
    }
  })
  takeWhile(y => y <= window.innerHeight / 2)
)

/* tap - Perform a side effect for every emission on the source Observable, but return an Observable that is identical to the source.
 */

moveHome$ = defer(() => this.rxAnimation.tween(this._pos, 0, 200))

moveHomeAfterLoad$ = this.newsfeed.loadNews$.pipe(
  exhaustMap(() => this.moveHome$)
)

/* The below functions effectively saying,
1. Take touchDrag$
2. And when touchDrag is done then start moveHomeAfterLoad$ observable
3. And moveHomeAfterLoad$ observable will wait till loadNews$ observable is done
4. Thats why we have to add repeat() - Bcz Observable are lazy, so we have to subscribe to them again when they are done.
 */
positionUpdate$ = concat(
  this.touchDrag$,
  this.moveHomeAfterLoad$,
).pipe(
  repeat()
)



positions$ = this.touchDrag$.pipe(
  startWith(0),
  map(y => y - 70)
)

```

**concat() method** - concat joins multiple Observables together, by subscribing to them one at a time and merging their results into the output Observable. You can pass either an array of Observables, or put them directly as arguments. Passing an empty array will result in Observable that completes immediately.

**exhaustMap() method** - Projects each source value to an Observable which is merged in the output Observable only if the previous projected Observable has completed.
