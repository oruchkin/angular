export class CounterService {
  activeToInactiveCounter = 0;
  inactiveToInactiveCounter = 0;

  incrementActiveToInactive() {
    this.activeToInactiveCounter++;
    console.log('Active to Inactive: ' + this.activeToInactiveCounter);
  }

  incrementInactiveToActive() {
    this.inactiveToInactiveCounter++;
    console.log('Inactive to Active: ' + this.inactiveToInactiveCounter);
  }

}
