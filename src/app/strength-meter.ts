interface IOptions {
  onchange?: Function,
  customValidation?: ICustomValidator[]
}

type TStrength = 1 | 2 | 3 | 4 | 5;

interface ICustomValidator {
  validator: string,
  state: string,
  strength: TStrength
}

const defaultOptions = {

}

export class StrengthMeter {
  private selector: HTMLElement;
  private meter!: HTMLElement;
  private message!: HTMLElement;
  public state = {} as any;
  private options: IOptions;
  constructor(selector: string, options?: IOptions) {
    this.selector = (document.querySelector(selector) as HTMLElement);
    this.options = {...defaultOptions, ...options}
    this.init();
  }

  init() {
    this.selector.setAttribute('autocomplete', Math.random().toString())
    this.meter = document.createElement("div");
    this.meter.className = 'strength-meter';
    this.insertAfter(this.meter, this.selector);
    this.message = document.createElement("p");
    this.message.className = 'message';
    this.insertAfter(this.message, this.meter);
    this.selector.addEventListener('keyup', (e: any) => {
      this.validate(e.target.value);
      this.options.onchange?.call(this, this.state)
    })
  }

insertAfter(el: HTMLElement, referenceNode: any) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

private validate(password: string) {
  let strength = 0;

  if(this.options.customValidation) {
    for(let v of this.options.customValidation) {
      if(password.match(v.validator)) {
        strength += v.strength;
        this.state[v.state] = true;
       }
    }
  } else {
    if(password.match("[a-z]")) {
      strength += 1;
      this.state.lowercase = true;
      }
      if(password.match("[A-Z]")) {
      strength += 1;
      this.state.uppercase = true;
      }
      if(password.match("[0-9]")) {
      strength += 1;
      this.state.number = true;
      }
      if(password.match("[$@$!%*#?&]")) {
      strength += 1;
      this.state.special = true;
      }
      if(password.length > 5) {
      strength += 1;
      this.state.length = true;
      }
      if(password.length <= 0) {
      strength = 0;
      this.state = {};
      }
  }

switch(strength) {
  case 0:
  this.meter.style.setProperty('--strength', '0');
  this.meter.style.setProperty('--meterColor', 'transparent');
  this.message.style.color = '';
  this.message.innerHTML = '';
  break;
  case 1:
  this.meter.style.setProperty('--strength', '20');
  this.meter.style.setProperty('--meterColor', '#dc3545');
  this.message.style.color = '#dc3545';
  this.message.innerHTML = 'Weak 🥺';
  break;
  case 2:
  this.meter.style.setProperty('--strength', '40');
  this.meter.style.setProperty('--meterColor', '#ffc107');
  this.message.style.color = '#ffc107';
  this.message.innerHTML = 'Not Bad 🙂';
  break;
  case 3:
  this.meter.style.setProperty('--strength', '60');
  this.meter.style.setProperty('--meterColor', '#FF4500');
  this.message.style.color = '#FF4500';
  this.message.innerHTML = 'Good 😊';
  break;
  case 4:
  this.meter.style.setProperty('--strength', '80');
  this.meter.style.setProperty('--meterColor', '#007bff');
  this.message.style.color = '#007bff';
  this.message.innerHTML = 'Pretty Good 😃';
  break;
  case 5:
  this.meter.style.setProperty('--strength', '100');
  this.meter.style.setProperty('--meterColor', '#28a745');
  this.message.style.color = '#28a745';
  this.message.innerHTML = 'Strong 😄';
  this.state.valid = true;
  break;
}


}

}
