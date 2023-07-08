import { Injectable } from '@angular/core';
import { CounterService } from './counter.service';

@Injectable()
export class UserService {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];

  constructor(private counterService: CounterService) {
  }

  setToActive(id: number): void {
    this.activeUsers.push((this.inactiveUsers[id]));
    this.inactiveUsers.splice(id, 1);
    this.counterService.incrementInactiveToActive();
  }

  seToInactive(id: number): void {
    this.inactiveUsers.push((this.activeUsers[id]));
    this.activeUsers.splice(id, 1);
    this.counterService.incrementActiveToInactive();
  }
}
