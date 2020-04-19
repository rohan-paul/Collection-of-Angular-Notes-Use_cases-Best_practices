Super Famous talk by Lead Engineer of RxJS Team of Google - [https://www.youtube.com/watch?v=B-nFj2o03i8](https://www.youtube.com/watch?v=B-nFj2o03i8)

```ts
refresh = new EventEmitter<any>()

private _pos = 0;

touchStart# =  fromEvent<TouchEvent>(document, 'touchstart')
touchMove$ = fromEvent<TouchEvent>(document, 'touchmove')
touchEnd$ = fromEvent<TouchEvent>(document, 'touchend')

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

moveHome$ = defer(() => this.rxAnimation.tween(this._pos, 0, 200))

moveHomeAfterLoad$ = this.newsfeed.loadNews$.pipe(
  exhaustMap(() => this.moveHome$)
)

/* The below functions effectively saying,
1. Take touchDrag$
2. And when touchDrag is done then start moveHomeAfterLoad$ observable
3. And moveHomeAfterLoad$ observable will wait till loadNews$ observable is done
4. Had to add repeat() - Bcz Observable are lazy, so we have to subscribe to them again when they are done.
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
