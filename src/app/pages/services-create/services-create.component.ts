import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Service } from "src/app/shared/interfaces/services.interface";
import { ServicesService } from "src/app/services/services.service";
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "src/app/shared/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-services-create",
  templateUrl: "./services-create.component.html",
  styleUrls: ["./services-create.component.css"],
})
export class ServicesCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicesService: ServicesService,
    private resultDialog: MatDialog
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
      icon: [null, Validators.compose([])],
      description: [null, Validators.compose([Validators.required])],
    });
  }

  createService() {
    const newService = {} as Service;
    newService.name = this.form.controls.name.value;
    newService.price = this.form.controls.price.value;
    newService.icon = this.form.controls.icon.value;
    newService.description = this.form.controls.description.value;

    this.servicesService.createService(newService).subscribe(
      (res) => {
        this.router.navigate(["/services"]);
        this.resultDialog.open(ConfirmationDialogComponent, {
          data: {
            message: "New service has been created successfully.",
          },
          disableClose: true,
          width: "fit-content",
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // This is the cancel button.
  cancel() {
    this.router.navigate(["/services"]);
  }
}
