**Recaptcha**

**קליינט:**

ב- module בו רוצים להשתמש ברכיב ה recaptcha, יש להוסיף import ל- RecaptchaModule.

בקובץ ה ts:

יש להגדיר formControl המייצג את ה recaptcha.

לדוגמא:
```typescript
this.form = this.fb.group({

      reCaptcha: [],

});
```
וב -HTML יש לכתוב כך:

```html
<moh-recaptcha [visible]="true" formControlName="reCaptcha"></moh-recaptcha>
```

המאפיין visible קובע את ה-size  של ה-recaptcha.

כאשר שולחים בו true  הרכיב יהיה גלוי והמשתמש יצטרך לסמן checkbox .

כאשר שולחים בו false  הרכיב עדיין ייראה אך המשתמש לא יצטרך לסמן את ה checkbox והבדיקה תתבצע בזמן שליחת הטופס.

כאשר visible=false יש להוסיף ב submitButton את ה input הבא:

```html
<moh-recaptcha [visible]="false" formControlName="reCaptcha"></moh-recaptcha>
<moh-submit-button textKey="שלח בקשה" [control]="demoForm" (onButtonClick)="sendReq" validateInvisibleRecaptcha="true"></moh-submit-button>
```
 
**סרבר:**

ע&quot;מ שרכיב ה recaptcha יעבור את בדיקות הולידציה לצרכי אבטחת מידע חובה לעשות את השלבים הבאים:

יש להתקין את MOH.Common (1.1.11) בפרויקט מתוך: P:\MOHPackages.

במחלקה המייצגת את הטופס יש לרשת מהמחלקה ReCaptchaResponse כך:

```typescript
public class DemoForm : ReCaptchaResponse
```

המחלקה מכילה שדה בשם ReCaptcha המכיל ולידציות על השדה.

יש לשים לב:

מכיוון שהשם של השדה במחלקה ReCaptchaResponse הוא ReCaptcha והוא מוגדר כחובה, חובה לספק את השדה הזה כאשר שולחים את האובייקט מהקליינט לסרבר, ויש לשלוח אובייקט המכיל שדה בשם הזה בדיוק!