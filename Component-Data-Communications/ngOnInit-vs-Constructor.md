#### Constructor

A class constructor in Angular is mostly used to inject dependencies. Angular calls this constructor injection pattern.

The Constructor is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses. Angular, or better Dependency Injector (DI), analyses the constructor parameters and when it creates a new instance by calling new MyClass() it tries to find providers that match the types of the constructor parameters, resolves them and passes them to the constructor

### NgOnInit

As we learnt above when Angular calls ngOnInit it has finished creating a component DOM, injected all required dependencies through constructor and processed input bindings. So here you have all the required information available which makes it a good place to perform initialization logic.

It’s a common practice to use ngOnInit to perform initialization logic even if this logic doesn’t depend on DI, DOM or input bindings.

Mostly we use ngOnInit for all the initialization/declaration and avoid stuff to work in the constructor. The constructor should only be used to initialize class members but shouldn't do actual "work".

So you should use constructor() to setup Dependency Injection and not much else. ngOnInit() is better place to "start" - it's where/when components' bindings are resolved.
