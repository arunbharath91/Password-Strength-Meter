import { StrengthMeter } from "./strength-meter";

const password = new StrengthMeter('#password', {
  onchange: (state: any) => {
    console.log(state)
  }
});
