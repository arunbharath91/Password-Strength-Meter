const defaultOptions = {

}

export class StrengthMeter {
  private selector: HTMLElement;
  constructor(selector: string) {
    this.selector = (document.querySelector(selector) as HTMLElement);
    this.init();
  }

  init() {
    const meter = document.createElement("meter");
    meter.setAttribute('max', '4');
    meter.value = 4;
    meter.min= 0;
    this.insertAfter(meter, this.selector);
    this.selector.addEventListener('input', (e) => {
      //console.log(e);
    })
  }

insertAfter(el: HTMLElement, referenceNode: any) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}
}
