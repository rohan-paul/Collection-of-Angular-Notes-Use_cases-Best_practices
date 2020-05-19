ngOnChanges runs whenever any of the inputs change, if you use setter/getters for the inputs you want to listen to they will only run when that input is being changed.

When it comes to subscribing to property changes in Angular, I think most people would immediately think of thengOnChanges lifecycle hook. A typical example looks like this:

```ts
    ngOnChanges(changes: SimpleChanges) {
  if (changes.key1) {
      console.log(`key1 is changed from ${changes.key1.previousValue} to ${changes.key1.currentValue}`);
  }
  if (changes.key2) {
    console.log(`key2 is changed from ${changes.key2.previousValue} to ${changes.key2.currentValue}`);
  }
  // ...
}
```

Personally, I am NOT a big fan of ngOnChanges for the following reasons:
It combines change detection of ALL input properties into one ngOnChanges hook function. And then we need to separate those properties with an if statement making it less readable especially when there are many properties to be watched.
The interface of SimpleChanges accepts any string as its key, making it possible for typos. For example, changes.typo_key will not be complained about by the TypeScript compiler.
SimpleChange.previousValue and SimpleChange.currentValue are typed to any instead of the desired property type.

a common alternative to ngOnChanges, which is to use a setter function. It looks like this:

```ts
export class AppComponent {
    private _title: string;

    @Input()
    set title(value: string) {
        this._title = value;
        console.log(`title is changed to ${value}`);
    }

    get title(): string {
        return this._title;
    }
}
```
