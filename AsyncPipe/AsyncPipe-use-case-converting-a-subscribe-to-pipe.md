#### Real App Use case

Initially I was subscribing to a selector coming from reselect/redux. And the below code was perfectly working and I was getting
`lRolesListFromAccessControl` in the child component to be consumed.

```ts
import {
  rolesSelector
} from "../selectors/roles-and-policies.selector";

  @select(rolesSelector)
  allRolesListFromAccessControl$: Observable<Role[]>;
  allRolesListFromAccessControl: Role[];

   this.trackSubscription(
      this.allRolesListFromAccessControl$
        .pipe(map(value => value))
        .subscribe(roles => {
          this.allRolesListFromAccessControl = roles;
        })
    );

// And then in .html template passing to the Child as below
<some-child-component
   [allRolesListFromAccessControl]="allRolesListFromAccessControl"
><some-child-component
```

And then, passing that subscribed data `allRolesListFromAccessControl` down to the Child Component, where I will, in turn, just passing that data as it is is ultimately to be consumed by an `ng-select` to be fed to to a dropdown-list.

However, the recommended approach is - Your child component does not need to know anything about the observable

It should look like -
In parent

```ts
<some-child-component
[allRolesListFromAccessControl]="allRolesListFromAccessControl$ | async"
><some-child-component
```

And now `allRolesListFromAccessControl` is available in the child component
