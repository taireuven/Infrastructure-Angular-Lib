<div dir="rtl">

**Config Service**

שרות זה מנהל את הקונפיגורציה של האפליקציה.

השרות טוען קובץ json המכיל את ערכי הקונפיגורציה וחושף את הנתונים לשימוש בכל מקום באפליקציה.

## הטמעה

1. ה solution template מכיל קובץ config.json בתיקיית assets. (במידה ולא קיים יש להוסיף)

    הקובץ מכיל את האובייקט הבא (חלקם אופציונליים וייעודיים לשימושים ספציפיים, עליהם מפורט במסמכים הרלוונטיים):

    ```json
    "moh-package": {
        "appId": 1,  //optional – the appId in the database (sql)
        "appName": 'AppName',  //optional -  the app name in umbraco
        "servicesApiURL": "http://servicesapi.dev.health.gov.il/",
        "umbracoApiURL": "http://umbracodataproviderapi.dev.health.gov.il/",
        "draftApi": "/api/draft/"
    }
    ```

      יש לעדכן את הערכים המתאימים לכל אפליקציה , וכן לעדכן את הקובץ בהתאמה עבור כל סביבה.

2. בקובץ app.module במערך של ה imports, ישנה קריאה לפונקציה MohPackageModule.configure ואליה נשלח הנתיב של הקובץ config.json .

הנתיב מוגדר בקובץ environment.ts.

## אופן השימוש

השרות מכיל מאפיין configuration המחזיר אובייקט json המכיל את ערכי הקונפיגורציה.

כדי להשתמש בשרות זה יש לייבא את השרות ולהזריק את ה service ב constractor של הרכיב \ השרות :

```typescript
Import {configService} from 'moh-package';
```
```typescript
constructor(private configService:ConfigService){}
```
יש להוסיף את הערך המבוקש בקובץ הקונפיגורציה ולהשתמש בו כך:

```typescript
let url = this.configService.configuration.url;
```
