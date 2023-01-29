export interface IMessage {
  date: {
    seconds: number;
    nanoseconds: number;
  };
  text: string;
  img?: string[];
  id: string;
  avtorId: string;
}
