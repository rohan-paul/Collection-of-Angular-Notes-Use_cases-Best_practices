#### Difference between [(ngModel)] and [ngModel] for binding state to property?

Angular2+ data flow:
--------------------
In Angular the data can flow between the model (component class ts.file) and view (html of the component) in the following manners:

 1. From the model  to the view. 
 2. From the view to the model.
 3. Data flows in both directions, also known as **2 way data binding**. 

Syntax:
-------

**model to view:**

    <input type="text" [ngModel]="overRideRate">

This syntax is also known as **property binding**. Now if the `overRideRate` property of the input field changes the view automatically will get updated. However if the view updates when the user enters a number the `overRideRate`  property will not be updated.

**view to model:**

    (input)="change($event)"            // calling a method called change from the component class
    (input)="overRideRate=$event.target.value" // on input save the new value in the title property

#### What happens here is that an event is triggered (in this case input event, but could be any event). We then can call methods of the component class or directly save the property in a class property.

**2-way data binding:**

The following syntax is used for 2-way data binding. It is basically a syntactic sugar  for both:

 1. Binding model to view.
 2. Binding view to model
    
<input [(ngModel)]="overRideRate" type="text" >

Now something changes inside our class this will reflect our view (model to view), and whenever the user changes the input the model will be updated (view to model). 

