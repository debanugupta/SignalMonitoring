import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignalAddModel } from 'src/app/models/signal-add-model';
import { SignalViewModel } from 'src/app/models/signal-view-model';
import { SignalRService } from 'src/app/services/signal-r.service';
import { AlertifyService } from 'src/app/services/alertify.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signal-add',
  templateUrl: './signal-add.component.html',
  styleUrls: ['./signal-add.component.css']
})
export class SignalAddComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  signal: SignalAddModel;
  constructor(private signalRService: SignalRService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.resetSignal();
  }

  resetSignal() {
    this.signal = {
      description: '',
      customerName: '',
      accessCode: '',
      area: '',
      zone: ''
    };
  }

  save() {
    this.signalRService.addSignal(this.signal).subscribe(next => {
      this.alertify.success('Signal added successfully');
      this.editForm.reset(this.signal);
      this.router.navigate(['/signals']);
    }, error => {
      console.log(error);
      this.alertify.error(error);
    });
  }

}
