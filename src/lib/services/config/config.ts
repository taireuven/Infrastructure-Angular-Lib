export class Configuration {
  appId?: number;
  appName?: string;
  servicesApiURL: string;
  umbracoApiURL: string;
  lang?: string;
  fileUploadApiURL?: string;
  draftApi?: string;
  jsonListsPrefixURL?: string;
  jsonListsSuffixURL?: string;

  constructor() {
    this.appId = null;
    this.appName = null;
    this.servicesApiURL = '';
    this.umbracoApiURL = '';
    this.lang = 'he';
    this.fileUploadApiURL = null;
    this.draftApi = '';
    this.jsonListsPrefixURL = '';
    this.jsonListsSuffixURL = '.json';
  }

  tryParse(obj): boolean {
    this.appId = obj['appId'] || null;
    this.appName = obj['appName'] || null;
    this.lang = obj['lang'] || 'he';
    this.fileUploadApiURL = obj["fileUploadApiURL"] || null;
    this.servicesApiURL = this.parseRequiredProperty(obj, 'servicesApiURL');
    this.umbracoApiURL = this.parseRequiredProperty(obj, 'umbracoApiURL');
    this.draftApi = this.parseRequiredProperty(obj, 'draftApi');
    this.jsonListsPrefixURL = obj['jsonListsPrefixURL'] || null;
    this.jsonListsSuffixURL = obj['jsonListsSuffixURL'];

    return !!obj['servicesApiURL'] && !!obj['umbracoApiURL'];
  }

  private parseRequiredProperty(obj: any, prop: string) {
    if (obj[prop]) {
      return obj[prop];
    }

    console.log(`Error in convert to configuration object: not found "${prop}" property.`);
    return this[prop];
  }
}
