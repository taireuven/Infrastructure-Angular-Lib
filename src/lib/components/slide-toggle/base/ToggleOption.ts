export class ToggleOption {

  text: string;
  value: any;
  matIconName: string;

  constructor(text: string, value: any, matIconName: string = null) {

    this.text = text;
    this.value = value;
    this.matIconName = matIconName;

  }
}
