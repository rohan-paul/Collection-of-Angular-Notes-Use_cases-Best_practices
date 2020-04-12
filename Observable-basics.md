Observable isn’t an Angular specific feature, but a new standard for managing async data that will be included in the ES7 release. Angular uses observables extensively in the event system and the HTTP service.

Most simply, **observables** are lazy collections of multiple values over time.

**Observables are lazy**

You could think of lazy observables as newsletters. For each subscriber a new newsletter is created. They are then only send to those people, and not to anyone else.

**Observables can have multiple values over time**

Now if you keep that subscription to the newsletter open, you will get a new one every once and a while. The sender decides when you get it but all you have to do is just wait until it comes straight into your inbox.

### Comparison with Promise

If you come from the world of promises this is a key difference as promises always return only one value. Another thing is that observables are cancelable. If you don’t want your newsletter anymore, you unsubscribe. With promises this is different, you can’t cancel a promise. If the promise is handed to you, the process that will produce that promise’s resolution is already underway, and you generally don’t have access to prevent that promise’s resolution from executing.

### Push vs pull

A key thing to understand when using observables is that observables push. Push and pull are two different ways that describe how a data producer communicates with the data consumer.

### Pull

When pulling, the data consumer decides when it get’s data from the data producer. The producer is unaware of when data will be delivered to the consumer.
Every javascript function uses the pull. The function is a Producer of data, and the code that calls the function is consuming it by “pulling” out a single return value from its call.

### Push

When pushing, it works the other way around. The data producer (the creator of the newsletter) decides when the consumer (the subscriber to the newsletter) gets the data.
Promises are the most common way of push in JavaScript today. A promise (the producer) delivers a resolved value to registered callbacks (the consumers), but unlike functions, it is the promise which is in charge of determining precisely when that value is “pushed” to the callbacks.
Observables are a new way of pushing data in JavaScript. An observable is a Producer of multiple values, “pushing” them to subscribers.

### Observables in Angular

If you start using Angular you will probably encounter observables when setting up your HTTP requests. So let’s start there.

```js
import { Observable } from "rxjs/Rx"
import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"

@Injectable()
export class HttpClient {

    constructor(
        public http: Http
    ) {}

    public fetchUsers() {
        return this.http.get("/api/users").map((res: Response) => res.json())
    }
}

```

We have now created a simple HttpClient with a fetchUsers method that returns an observable. We probably like to display the users in some sort of list, so let’s do something with this method. Since this method returns an observable we have to subscribe to it. In Angular we can subscribe to an observable in two ways:
Manner 1:

We subscribe to an observable in our template using the async pipe. The benefit of this is that Angular deals with your subscription during the lifecycle of a component. Angular will automatically subscribe and unsubscribe for you. Don’t forget to import the “CommonModule” into your module, as the async pipe will be exposed from that.

**component.ts**

```js
import { Component } from "@angular/core"
import { Observable } from "rxjs/Rx"

// client
import { HttpClient } from "../services/client"

// interface
import { IUser } from "../services/interfaces"

@Component({
    selector: "user-list",
    templateUrl:  "./template.html",
})
export class UserList {

    public users$: Observable<IUser[]>

    constructor(
        public client: HttpClient,
    ) {}

    // do a call to fetch the users on init of component
    // the fetchUsers method returns an observable
    // which we assign to the users$ property of our class
    public ngOnInit() {
        this.users$ = this.client.fetchUsers()
    }
}
```

And the corresponding template, where I am using the pipe ("|") and async to subscribe to the Observable.

```html
<!-- We use the async pipe to automatically subscribe/unsubscribe to our observable -->
<ul class="user__list" *ngIf="(users$ | async).length">
  <li class="user" *ngFor="let user of users$ | async">
    {{ user.name }} - {{ user.birth_date }}
  </li>
</ul>
```

Please note the dollar sign. Using the dollar sign in the name of a variable that is an observable, is considered best practice. This way it’s easy to identify if your variable is an observable or not.

#### Further Reading

1. [understanding-creating-and-subscribing-to-observables-in-angular-426dbf0b04a3](https://medium.com/@luukgruijs/understanding-creating-and-subscribing-to-observables-in-angular-426dbf0b04a3)
