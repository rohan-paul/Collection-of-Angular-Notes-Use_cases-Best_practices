Let's say we wanted to debounce search queries and dismiss consecutive duplicates since the user is going to be to be typing on a physical or soft keyboard.

This is a reusable presenter that can be reused in multiple components which have a search box.

A benefit of having a reusable presenter is that we can change search behaviour in a single place. Let's say we wanted to debounce search queries and dismiss consecutive duplicates since the user is going to be to be typing on a physical or soft keyboard. This change is easily made in a reusable presenter as seen in Listing 2.

```js
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export class SearchPresenter implements OnDestroy {
  private searchQuery = new Subject<string>();

  searchQuery$ = this.searchQuery.pipe(
    debounceTime(150), // 👈
    distinctUntilChanged(), // 👈
  );

  ngOnDestroy(): void {
    this.searchQuery.complete();
  }

  search(query: string): void {
    this.searchQuery.next(query);
  }
}
```

As an experiment, let's tie this presenter to a search box component as per Listing 3.

```js
// search-box.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { SearchPresenter } from './search.presenter';

@Component({
  providers: [SearchPresenter],
  selector: 'app-search-box',
  template: `
    <input
      type="search"
      placeholder="Search..."
      (input)="onSearch($event.target.value)"> <!-- [1] -->
  `,
})
export class SearchBoxComponent implements OnInit {
  @Output()
  search = new EventEmitter<string>();

  constructor(
    private presenter: SearchPresenter,
  ) {}

  ngOnInit(): void {
    this.presenter.searchQuery$.subscribe(searchQuery => // [4]
      this.search.emit(searchQuery)); // [4]
  }

  onSearch(query: string): void { // [2]
    this.presenter.search(query); // [3]
  }
}
```

We deliberately only have a dataflow going in one direction. The user enters search queries (1) which are intercepted by the component's event handler (2). The queries are then filtered through the presenter (3). Finally, the presenter's search query observable is connected to the component's output property (4), allowing parent components to use event binding to be notified of user searches.

We've effectively tied the search presenter to a search box. If that's the only place where we're going to use this user interaction logic, we might as well reuse the search box component rather than the search presenter. In this way, our consumers–or parent components–only have to use the search box component and bind to its search event to add search functionality.

#### Further Reading

[https://indepth.dev/presenters-with-angular/](https://indepth.dev/presenters-with-angular/)
