**Translate**

התשתית מספקת שירות תרגומים וכן מטפלת בתרגום בכל הרכיבים.

## הטמעה

ההטמעה קיימת ב solution template.

בכל מקרה יש לוודא שהפרויקט מכיל את כל שלבי ההטמעה הבאים:

1. יש לוודא שקיים ערך umbracoApiURL  בקובץ  config.json (api שהביא את התרגומים מ umbraco), ולעדכן אותו עבור כל סביבה.

הסבר על קובץ ה config.json מפורט במסמך הדרכה על Config Service.

1. יש להוסיף ערך בקובץ config.json – עבור קוד השפה שתשמש את האתר, לדוגמה:
lang&quot;:&quot;he&quot;&quot;.
אם לא ישלח ערך , ברירת המחדל תהיה .&quot;he&quot;

1. ניתן להוסיף appName ייחודי לאפליקציה, כאשר שם האפליקציה צריך להיות תואם לשם האפליקציה באומברקו,  במידה והוגדר, ערכים באומברקו הנמצאים תחת ה app name יגברו על הערכים שמגיעים מהתשתית.

```json
"moh-package": {
    "appName": 'AppName',  //optional -  the app name in umbraco
    "umbracoApiURL": "http://umbracodataproviderapi.dev.health.gov.il/"
  }
```

1. בקובץ  app.component.ts
ישנה אפשרות לתרגם את ה title של הטאב בדפדפן, כך שה – title ישתנה בהתאם לשפה של האתר.
בפונקציה ngOnInit() יש להגדיר את ה title כך:

this.translate.setTitleKey(&#39;appTitle&#39;);// appTitle – המפתח באומברקו

כאשר משתמשים ביכולת הזו הטקסט היושב בין תגיות ה \&lt;title\&gt;\&lt;/title\&gt;בקובץ  index.html מיותר.

1. יש להשתמש ב directivemohDir ע&quot;מ שהתשתית תטפל בכיוון התצוגה בעת שינוי שפה.
  -  להוסיף import DirectivesModule
  - להוסיף לתגית הראשית בקובץ app.component.html : mohDir=&quot;rtl&quot;
  - להסיר את ה attribute dir  מהקובץ index.html

## פירוט

**ניהול ייבוא ותרגום טקסטים על המסך מUmbraco Cms.**

יכולת זו קיימת באופן רוחבי לכל רכיבי התשתית הקיימים, רכיבי Input, ורכיבים מורכבים.

הרכיבים מאפשרים לקבל key של טקסט (label\error message וכו&#39;( להצגת הערך הרלוונטי המנוהל בUmbraco Cms .

**LabelText vs TextKey**

כל רכיבי הform Controls  חושפים את ה @Inputs הבאים:
```typescript
@Input() textKey: string

@Input() textParams?: any

@Input() useDefaultKey: boolean = true
```
כאשר ה @Inputs לעיל מיועדים לטפל בהצגת הטקסט לתווית (מתורגמת) מUmbraco.

אופן השימוש בפרמטרים:

**textKey** – מקבל את הקוד שמופיע באומברקו עבור כותרת השדה (labelText),

- אם נשלח LabelText, הערך ב Input הזה יוצג, גם אם נשלח textKey.
- אם לא נשלח ערך ב labelText ונשלח textKey, תתבצע שליפה של הטקסט מאומברקו על פי ה textKey.
- אם לא נשלח ערך ב labelText ולא נשלח ערך ב textKey, הערך בformControlName  שהוגדר לformControl  ישמש במקרה זה כtextKey .

**textParams** - במקרה שעבור הtextKey, מוגדר באומברקו ביטוי שחלקים בתוכו דינמיים לדוג&#39;

 &quot;שלום {{name}},ברוך הבא לשיעור {{lesson}}&quot;

יש אפשרות לשלוח את האובייקט הבא ל textParams:

```
{ name:'רבקה', lesson:'אנגולר' }
```

ותתבצע &quot;השמה&quot; של ערכי הפרמטרים שנשלחו לתוך הביטוי שהוגדר עבור הtextKey.

**useDefaultKey** –

ערך ברירת המחדל בשדה זה הוא true, ומשמעו שאם לא נשלח ערך ב labelText ולא נשלח ערך בtextKey , אז הערך בformControlName  שהוגדר ל formControl ישמש במקרה זה כ textKey.

אך אם יישלח בשדה זה false, וגם לא יישלחו ערכים ב  labelTextוב textKey, אז גם ה formControlName לא ייחשב כ textKey ולא יופיע שום טקסט ב label.

מסקנה: ע&quot;מ להסתיר את כותרת השדה יש לשלוח useDefaultKey=false, ולא לשלוח ערכים ב  labelText וב textKey.

**דוגמאות:**

- שימוש בlabelText

```html
<moh-textbox labelText="שם פרטי"></moh-textbox> 
```

- שימוש ב textKey

```html
<moh-textbox textKey="firstName"></moh-textbox>
```

- שימוש ב  textParams

```html
<moh-textbox textKey="title" textParams="{name:'רבקה',lesson:'אנגולר'}">
</moh-textbox>
```

כאשר הטקסט באומברקו הוא  &quot;שלום {{name}},ברוך הבא לשיעור {{lesson}}&quot; והקוד הוא &quot;title&quot;

## Translate Service

שירות תרגומים המחצין את הפונקציונליות של ngx-translate. מתועד [באתר התיעוד](https://mohdigitaltest.health.gov.il/injectables/MohTranslateService.html).

## מחלקת Label Base

מחלקה זו מטפלת בתרגום טקסט.

כל component מותאמת אישית שצריכה טיפול בתרגום טקסט יכולה לרשת מהמחלקה LabelBase, ולקבל בירושה את המאפיינים והפונקציות הבאות:


Properties
```typescript
@Input() textKey: string- קוד של הטקסט הקיים באומברקו

@Input() textParams?: any – פרמטרים לטקסט שקיים באומברקו
```
```typescript
get textValue(): Observable<string>- 
```
 מחזיר את הטקסט המתורגם עבור הקוד ב @Input textKey
בשילוב הפרמטרים ב @Input textParams


Methods
```typescript
getLabelText(textKey, textParams?:any): Observable<string>
```
מחזירה את הטקסט המתורגם של המפתח או את המפתח אם הוא לא נמצא.
```typescript
getInstantLabelText(textKey, textParams?: any): string
```
מחזירה את הטקסט המתורגם המיידי של המפתח.

**אופן השימוש במאפיינים ובפונקציות:**

- לדוגמה במקרה שהcomponent צריך תרגום או ייבוא מUmbraco Cms של טקסט:

קוד html עם טקסט hard coded:

```html
<div>
  <span>דוגמה לתרגום</span>
  <span>דוגמה לתרגום עם פרמטר {{param}}</span>
</div>
```

על מנת לייבא טקסט מ Umbraco Cms יש לממש בצורה הבאה:

```html
<div>
  <span>{{getLabelText(‘translateExampleKey’) | async}}</span>
  <span>{{getLabelText(‘transWithParamsKey’,{param1:param} )| async}}</span>
</div>
```

- במקרה שהרכיב מקבל @Input טקסט ניתן להשתמש במאפיינים באופן הבא:

קוד html עם @Input טקסט:

```html
<span>{{text}}</span>
```

כאשר  @Input() text?: string

על מנת לקבל @input key של הטקסט ולייבא את הטקסט מ Umbraco Cms יש לממש בצורה הבאה:

```html
<span>{{textValue | async}}</span>
```

באופן כזה המשתמש ברכיב ישלח את ה key ב @input textKey   שהתקבל בירושה ממחלקת הבסיס LabeBase, וישלח את הפרמטרים לטקסט ב @Input textParams שאף הוא התקבל בירושה,

כתוצאה מכך המאפיין textValue שהתקבל בירושה יחזיר את הטקסט המתאים ל textKey שנשלח ולכן יש להציג אותו ב html.



## רכיב לבחירת שפה – Select Language

הרכיב מציג את רשימת השפות מאומברקו, כאשר מחליפים שפה הרכיב אחראי על שינוי הכיוון של הדף בהתאם לשפה, ומעדכן את השפה הנוכחית בשרות התרגום

Selector: moh-select-language

Module: SelectLanguageModule

@Input:

1. labelTextKey:string –

מקבל את המפתח מאומברקו של הכותרת שתופיע מעל השדה

1.  currentLang: string –

מקבל את השפה הנוכחית (בשתי אותיות קטנות לדוג: אנגלית- en)
שתהיה מוצגת ברכיב כברירת מחדל,

אם לא נשלח ערך והוגדרה שפה לאתר ב app.component (חוץ מהשפה הדיפולטיבית), השפה שתוצג ברכיב כערך ברירת המחדל תהיה השפה המוגדרת ב app.component,

אם לא נשלח ערך ולא הוגדרה שפה לאתר לא יוצג ערך נבחר ברכיב.

1. languagesListApps:string -

ה Input מקבל את שם האפליקציה\ אפליקציות עבורה תישלף רשימת השפות מאומברקו.

במקרה שרוצים להציג צריף של כמה רשימות ניתן לשלוח מספר שמות מופרדים בפסיקים.

אם לא ישלח ערך – הרכיב יציג את רשימת השפות של התשתית.
