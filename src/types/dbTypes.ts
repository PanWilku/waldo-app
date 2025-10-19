import { JsonValue } from "@prisma/client/runtime/library";

export type WaldoImage = {
  id: number;
  url: string;
  title: string;
  createdAt: Date;
  waldoSpots: JsonValue;
  level: number;
  description: string;
};
