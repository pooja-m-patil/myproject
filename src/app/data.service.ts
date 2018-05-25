import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';

import { Socket } from './interfaces';

declare var io : {
  connect(url: string): Socket;
};

@Injectable()
export class DataService {

  socket: Socket=socketIo('http://localhost:3000');
  observer: Observer<any>;

  getQuotes() : Observable<any> {
    

  this.socket.on('message', (res) => {
    //   if(res.event){
    //   this.observer.next(res.event);
    //   this.observer.next(res.devId);
    //   console.log(res);
    // }
    //   else{
        this.observer.next(res.devId);
      //}
  });

    // this.socket.on('stop', (res) => {
    //   this.observer.next(res.devId);
    //   console.log(res.devId);
    // });

    return this.createObservable();
  }

  createObservable() : Observable<any> {
      return new Observable(observer => {
        this.observer = observer;
      });
  }

  private handleError(error) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        let errMessage = error.error.message;
        return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }

}