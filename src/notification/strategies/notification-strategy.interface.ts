export interface NotificationStrategy<T = any> {
  supports(event: any): event is T;
  execute(event: T): Promise<void>;
}