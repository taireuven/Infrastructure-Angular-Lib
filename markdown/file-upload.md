<div dir=rtl>

## **מסמך הדרכה לשימוש ברכיב File Upload**

הרכיב מאפשר העלאת קבצים, נותן מזהה ייחודי לקובץ, ומעביר לכספת שעוברת הלבנה והעברה לסביבת המשרד.

לאחר הגעה לסביבת המשרד הקבצים ישלפו לפי המזהים הייחודיים שניתנו להם.

הרכיב מממש את ng2-file-upload, שנמצא פה:  
[https://github.com/valor-software/ng2-file-upload](https://github.com/valor-software/ng2-file-upload)

ה-html אמור בסופו של דבר להיראות כך:

```html
<form [formGroup]="form">
    <file-upload [UploaderSettings]="settings"
   [buttonText] = "'+ בחר קובץ'";
   [fieldText] = "'תיאור 'הקובץ";
   [tooltipText] = "'טקסט של הטולטיפ'"	
                 (errorItem)="onMyErrorItem($event)"
                 (complete)="onMycomplete($event)"
                 formControlName="uploader">
    </file-upload    
</form>
```
פירוט ה inputs ו – outputs:
<div dir=ltr>

**1. @Input() uploaderSettings: UploaderSettings**
</div>

משתנה ה-settings  הוא משתנה שמוגדר בקובץ ה- ts של ה- component  והוא מסוג UploaderSettings שאליו יש להוסיף import מהמיקום של הקובץ בפרויקט לדוג&#39;:

```typescript
import { UploaderSettings } from&#39;../FileUpload/UploaderSettings&#39;;
```

המשתנה עצמו נראה כך:

```typescript
settings: UploaderSettings = new UploaderSettings();
this.settings.allowMimeTypes = ['image/png', 'image/gif'];
 
this.settings.maxFileSize = 1 * 1024 * 1024;//MB

this.settings.queueLimit = 5;

this.settings.queueMinLimit = 2;
this.settings.isMultiple = true;
this.settings.hasDescription = false;

this.settings.isRequired = true;
this.settings.isDescriptionRequired = true;

```

פירוט:

AllowMimeTypes – אילו סוגי הקבצים הנתמכים ברכיב:

לרשימה המלאה:  
[https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics\_of\_HTTP/MIME\_types/Complete\_list\_of\_MIME\_types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types)

- MaxFileSize – הגבלת הגודל של כל הקבצים המצורפים.
- QueueuLimit – הגבלת מספר הקבצים המצורפים.
- QueueMinLimit – הגבלת מינימום של קבצים מצורפים.
- isMultiple – האם ניתן להעלות יותר מקובץ אחד.
- HasDescription – האם לאפשר למשתמש להזין את תיאור הקובץ בעצמו.
- isRequired – האם העלאת קבצים היא חובה.
- isDescriptionRequired – האם תיאור הקובץ הוא חובה (במידה וישנו קובץ אחד לפחות)

<div dir=ltr>

**2. @Input() buttonText: string -** הטקסט שיופיע על כפתור הצירוף.

**3. @Input() buttonTextKey: string –** המפתח של הטקסט באומברקו שיופיע על כפתור הצירוף.

**4. @Input() fieldText: string –** כותרת השדה שתופיע מעל שדה תיאור הקובץ.

**5. @Input() fieldTextKey: string –** המפתח של הטקסט באומברקו שיופיע ככותרת ל שדה תיאור הקובץ.

**6. @Input() tooltipText: string –** הטקסט שיופיע בטולטיפ לצד הרכיב

**7. @Input() tooltipTextKey: string –** המפתח של הטקסט באומברקו שיופיע בטולטיפ לצד הרכיב

**8. @Input() tooltipTextParams: any –** הפרמטרים של המפתח של הטולטיפ באומברקו

**9. @Input() additionalInfoTextKey: string –** המפתח של הטקסט באומברקו שיופיע תחת הרכיב (למידע נוסף)

**10. @Input() additionalInfoTextParams: any –** הפרמטרים של המפתח של הטקסט באומברקו שיופיע תחת הרכיב

**11. @Output() errorItem: EventEmitter<ErrorInformation>** 
</div>
זהו אירוע שמתרחש כאשר העלאה של קובץ נכשלת, ואם רוצים ניתן לטפל בו באופן פרטי. (הרכיב דואג לסמן ליד הקובץ שהעלאתו נכשלה).

דוגמא לשימוש ב ts:
```typescript
onMyErrorItem(event: any) {
  console.log(event);
}
```
Html:
```html
(errorItem)="onMyErrorItem($event)"
```
המשתנה $event  מכיל אובייקט שמחזיק:

- Response – התשובה שחזרה מהשרת.
- Status – סטטוס הבקשה שחזרה (400, 500 וכד&#39;)
- File name – שם הקובץ שהעלאתו נכשלה

<div dir=ltr>

**12.	@Output() complete: EventEmitter<any>**
</div>
זהו אירוע שמתרחש כאשר כל הקבצים עלו בהצלחה, וניתן לטפל בו באופן פרטי.

דוגמא לשימוש ב ts:
```typescript
onMycomplete () {
  console.log(&quot;complete&quot;);
}
```
Html:
```html
(complete)="onMycomplete($event)"
```
המערך של ה- Guids  (והתיאור במקרה שהוגדר) שנוצרו עבור כל קובץ חוזר ב-value  של הרכיב וניתן לגשת אליו בצורה הזו:
```typescript
this.form.value.uploader;
```