switchMap() operators
One of the most common usecase of switchMap() is to pull a url parma (the employee ID in the below code example ), and retrieve the employee to display.

```js
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { EmployeeService }  from '../employee.service';
import { Employee} from '../employee;

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee$: Observable<Hero>;

  constructor(
        	private route: ActivatedRoute,
        	private router: Router,
        	private service: EmployeeService
  ) {}

  ngOnInit() {
        	this.employee$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
        	    this.service.getEmployee(params.get('id')))
        	);
  }
  }
}
```
