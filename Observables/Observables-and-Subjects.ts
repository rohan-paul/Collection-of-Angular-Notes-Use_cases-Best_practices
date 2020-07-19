import { Observable, Subject } from "rxjs"
import { tap, delay } from "rxjs/operators"

/**
 * Observables and Subjects
   Observables will only execute upon subscribe, and will re-execute every time they are subscribed.
 */

let a = new Observable((observer) => {
  console.log(1)
  observer.next(2)
})
// a.subscribe((result) => console.log(result))
// a.subscribe((result) => console.log(result))

/* OUTPUT of above
1
2 first result
1
2 second result
*/

/**
 * Subjects are observables, that are also observers. They will send updates to all subscriptions, and allow updating from external sources.
 */

let a2 = new Subject()
let b = a2.pipe(tap(() => console.log("Side Effect")))
b.subscribe((result) => console.log(result))
b.subscribe((result) => console.log(result))
console.log(1)
a2.next(2)

/* OUTPUT of above

1
Side Effect
2 first result
Side Effect
2 second result

*/
