General Syntax

The new version of combineLatest() accepts an array of Observables as its argument:

```ts
combineLatest([this.items$, this.emails$]).subscribe(([items, emails]) => {});
```

### A common pattern of use-case in actual application with both pipe() and subscribe()

```ts
    import {
  combineLatest,
  combineLatest as observableCombineLatest,
  Observable
} from "rxjs";

  // This selectors are coming from redux-reselect
  @select(selector1)
  selector1$: Observable<SomeType[]>;
  selector1: SomeType[];

  @select(selector2)
  selector2$: Observable<SomeType[]>;
  selector2: SomeType[];

  @select(mySomeOtherSelector$)
  mySomeOtherSelector$: Observable<SomeotherType>;

  someState: someState;

ngOnInit() {
this.mySomeOtherSelector$
    .pipe(
        filter(somData => isDefinedAndNotNull(someData)),
        mergeMap(data> {
            this.someState = data
            return observableCombineLatest(
                this.selector1$,
                this.someFunction(),
                this.selector2$
            );
        })
    )
    .subscribe(([selector1, someFunctionResult, selector2]) => {
        // And here I have the subscibed observer results
        this.selector1 = selector1;
        this.someState2 = someFunctionResult;
        this.selector2 = selector2;
    });

}


  someFunction() {
    return combineLatest(this.someObservable1$, this.someObservable2$).pipe(
      map(([observer1, observer2]) => {
        // ...DO ANYTHING HERE...
        });
      })

```
