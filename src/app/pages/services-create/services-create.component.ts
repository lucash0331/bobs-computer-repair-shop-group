import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/shared/interfaces/services.interface';
import { ServicesService } from 'src/app/services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-create',
  templateUrl: './services-create.component.html',
  styleUrls: ['./services-create.component.css']
})
export class ServicesCreateComponent implements OnInit {
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicesService: ServicesService
    ) {}

  ngOnInit(): {
    this.form = this.fb.form({
      text: [null, Validators.compose([Validators.required])]
    })
  }

  create() {
    const newService = {} as Service;
    newService.name = this.form.controls.name.value
    this.servicesService.createService(newService).subscribe(
      (res) => {
        this.router.navigate(["/services"])
      },
      (err) => {
        console.log(err)
      }
    )
  }
}
