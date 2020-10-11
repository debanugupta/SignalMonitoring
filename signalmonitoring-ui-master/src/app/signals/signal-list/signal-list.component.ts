import { Component, OnInit } from '@angular/core';
import { SignalViewModel } from 'src/app/models/signal-view-model';
import { Observable } from 'rxjs';
import { SignalRService } from 'src/app/services/signal-r.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signal-list',
  templateUrl: './signal-list.component.html',
  styleUrls: ['./signal-list.component.css']
})
export class SignalListComponent implements OnInit {
  signalList: SignalViewModel[] = [];
  signals: Observable<SignalViewModel[]>;

  constructor(private signalRService: SignalRService,
    private route: ActivatedRoute,
    private router: Router) {}

  fillSignals() {
    this.signals = this.signalRService.getSignals();
  }

  addSignal()
    {
      this.router.navigate(['/signals/add']);
    }

  ngOnInit() {
    this.fillSignals();
    this.signalRService.signalReceived.subscribe((signal: SignalViewModel) => {
      this.signalList.push(signal);
    });
  }
}

