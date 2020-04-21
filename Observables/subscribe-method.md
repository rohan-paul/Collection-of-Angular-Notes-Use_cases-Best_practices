**[.subscribe is not an Angular2 thing. It's a method that comes from rxjs library which Angular is using internally.](https://stackoverflow.com/questions/44921788/what-is-subscribe-in-angular/51935993)**

[Source Doc](https://rxjs-dev.firebaseapp.com/api/index/class/Observable#subscribe-)

[reactivex.io/documentation/operators/subscribe.html](http://reactivex.io/documentation/operators/subscribe.html)
A typical implementation of the Subscribe operator may accept one to three methods (which then constitute the observer), or it may accept an object (sometimes called an Observer or Subscriber) that implements the interface which includes those three methods:

**onNext**

An Observable calls this method whenever the Observable emits an item. This method takes as a parameter the item emitted by the Observable.

**onError**

An Observable calls this method to indicate that it has failed to generate the expected data or has encountered some other error. This stops the Observable and it will not make further calls to onNext or onCompleted. The onError method takes as its parameter an indication of what caused the error (sometimes an object like an Exception or Throwable, other times a simple string, depending on the implementation).

**onCompleted**

An Observable calls this method after it has called onNext for the final time, if it has not encountered any errors.
