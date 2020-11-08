export interface Takeout {
  id: string;
  title: string;
  createdBy: string;
  description: string;
  startedAt: Date;
  endAt: Date;
  enabled: boolean;
  providerId: string;
}
