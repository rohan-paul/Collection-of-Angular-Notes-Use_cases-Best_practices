### Async | Pipe

#### Short ANS we DONT'T need to unsubscribe when using async pipe.

```js
export class AsyncPipeCardComponent implements OnInit {
  messageSubscription: Observable<string>;
  constructor(private upperCaseService: UpperCaseService) {}
 
  ngOnInit() {
    this.messageSubscription = this.upperCaseService.getUpperCaseMessage();
  }
}
  
```
Then in the template 

```html
    <h4 class="card-title">{{messageSubscription | async}}</h4>
```

The async pipe subscribes to an Observable or Promise and returns the latest value it has emitted. When a new value is emitted, the async pipe marks the component to be checked for changes. 

#### When the component gets destroyed, the asyncpipe automatically unsubscribes  all active subscriptions to avoid potential memory leaks.

Using the async pipe is a huge advantage if we are using Observables in our components because it will subscribe to them and unsubscribe from them. We will not be bothered about forgetting to unsubscribe from them in ngOnDestroy when the component is being killed off.

<img src="./async_pipe.png">

Another big advantage of using | async pipe together with *ngIf directive is that we can guarantee that the unwrapped value will be available to all child components at the time they are rendered.
Such an approach helps us to prevent excessive use of “elvis” operator (?.)in our templates which is used to get rid prop of undefined errors...

Without <ng-container> it would look more like this…

<img src="./async_pipe-2.png">

As a conclusion 

we should always use async pipe when possible and only use .subscribe when the side effect is an absolute necessity as we are safe as long as we stay in the observable. The code terminating the observable should be the framework (Angular) and the last piece (the UI). 