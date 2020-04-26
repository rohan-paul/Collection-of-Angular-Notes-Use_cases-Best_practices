#### What Is ContentChildren?

ContentChildren is a parameter decorator that is used to fetch the QueryList of elements or directives from the content DOM. The QueryList is updated whenever the child element/component is added or removed.

The child element reference is set in QueryList just before the ngAfterContentInit lifecycle Hook method.

**Below, we are using the ContentChildren to get the QueryList containing the list of the child component ChildComp. The list is stored in the contentChildren variable in the Parent component.**

```ts
@ContentChildren(ChildComp) contentChildren : QueryList<ChildComp>;

```
