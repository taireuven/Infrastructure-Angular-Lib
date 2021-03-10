export class Prefix {
    code: number;
    text: string;
    
    constructor(code:number, text:string){
      this.code = code;
      this.text = text;
    }

}

export class Telephone {
  prefix: Prefix;
  phoneNumber: string;
}
