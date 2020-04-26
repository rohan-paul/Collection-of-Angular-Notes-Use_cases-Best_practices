### QueryList —

The return type of **ViewChildren** is **QueryList**. **QueryList** is just a fancy name for an object that stores a list of items. What is special about this object is when the state of the application changes Angular will automatically update the object items for you.

The type of object that ViewChildren, ContentChildren, and QueryList provide.

Implements an iterable interface, therefore it can be used in both ES6 javascript for (var i of items) loops as well as in Angular templates with \*ngFor="let i of myList".

Changes can be observed by subscribing to the changes Observable.

### QueryList API —

#### Getters —

- first — get the first item
- last — get the last item
- length — get the items length

#### Methods —

map(), filter() , find(), reduce(), forEach(), some().

toArray() — returns the items as javascript array

changes() — Changes can be observed by subscribing to the changes Observable. Any time a child element is added, removed, or moved, the query list will be updated, and the changes observable of the query list will emit a new value.

#### Remember —

**The QueryList is initialized only before the ngAfterViewInit lifecycle hook, therefore, is available only from this point.**

#### Further Reading

[https://netbasal.com/understanding-viewchildren-contentchildren-and-querylist-in-angular-896b0c689f6e](https://netbasal.com/understanding-viewchildren-contentchildren-and-querylist-in-angular-896b0c689f6e)

#### ViewChildren vs ContentChildren —

ViewChildren don’t include elements that exist within the ng-content tag.
ContentChildren includes only elements that exists within the ng-content tag.
