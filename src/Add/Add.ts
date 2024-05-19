import { SelectDatabase } from "./Database/Database";
import { SelectPayment } from "./Payment/Payment";

export class Add {
  static AddPackage = (data: Array<string>) => {
    switch (data[0]) {
      case "database":
        SelectDatabase();
        break;
      default:
        break;
    }
  };
}
