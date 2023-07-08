export class LoggingService {
  logStatusChange(status: string){
    console.log('Service - A server status changed, new status: ' + status);
  }
}
