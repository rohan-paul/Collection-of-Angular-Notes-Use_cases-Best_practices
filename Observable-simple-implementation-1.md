**A very simple example** usecase in an angular component file - accessControl.component.ts - which is using reselect package - I have the following

```js
@select(currentRolesListDataSelector)

accessControl$: Observable<Role[]>;
accessControl: Role[];
```

In the above,

**accessControl\$** is name for observable , and

**accessControl** is name for the variable

And below is the way I access it inside `ngOnInit()`

```js

ngOnInit() {

this.accessControl$.subscribe(hello => {
	console.log("accessControl ", hello);
	this.accessControl = hello;
});

}
```
