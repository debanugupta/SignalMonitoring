import { Injectable, EventEmitter } from "@angular/core";
import * as signalR from "@aspnet/signalr";
import { SignalViewModel } from "../models/signal-view-model";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SignalAddModel } from '../models/signal-add-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class SignalRService {
  baseUrl = environment.apiUrl;
  private hubConnection: signalR.HubConnection;
  signalReceived = new EventEmitter<SignalViewModel>();

  signals: SignalViewModel[] = [];

  constructor(private http: HttpClient) {
    this.buildConnection();
    this.startConnection();
  }

  getSignals() {
    return this.http.get<[SignalViewModel]>(this.baseUrl + 'v1/signals').pipe(
      map(signals => {
        this.signals = signals;
        return signals;
      })
    );
  }

  addSignal(signal: SignalAddModel) {
    return this.http.post(this.baseUrl + 'v1/signals/deliverypoint', signal);
  }

  private buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:63291/signalHub") //use your api adress here and make sure you use right hub name.
      .build();
  };

  private startConnection = () => {
    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection Started...");
        this.registerSignalEvents();
      })
      .catch(err => {
        console.log("Error while starting connection: " + err);

        //if you get error try to start connection again after 3 seconds.
        setTimeout(function() {
          this.startConnection();
        }, 3000);
      });
  };

  private registerSignalEvents() {
    this.hubConnection.on("SignalMessageReceived", (data: SignalViewModel) => {
      this.signalReceived.emit(data);
    });
  }
}
