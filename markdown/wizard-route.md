<div dir=rtl>
<center>

## **מסמך הדרכה לשימוש ברכיב Wizard**
</center>


הרכיב מציג אשף מבוסס routing, כך שהמיקום באשף משתקף ב url.  
האשף מכיל שלבים כאשר כל שלב הוא component מותאם אישית.  

### פרוט התהליך:  
ניתן לעבור בין השלבים ע"י לחיצה על הכפתורים המופיעים בתחתית ה wizard  - מעבר לשלב הבא/ מעבר לשלב הקודם, וכן ע"י לחיצה על הניווט העליון של ה wizard.  
לחיצה על הכפתורים שומרת את נתוני הטופס בתנאי שהם ללא שגיאות ולידציה, 
לפי ברירת המחדל של ה wizard - לחיצה על הכפתור מעבר לשלב הקודם מתאפשרת בכל מקרה ולחיצה על הכפתור מעבר לשלב הבא מתאפשרת כאשר הטופס תקין. מעבר ע"י לחיצה על הניווט לא שומרת את הנתונים.  
שמירת נתוני ה wizard מתבצעת ב service (מפורט בהמשך).  

### דוגמה:    

![](../../screenshots/components/v2/wizard-route.png)

### אופן השימוש:  
1. תחילה יש להוסיף import בקובץ app.module:
    ```typescript
    import { WizardRouteV2Module } from 'moh-package';

    @NgModule({
        imports: [
            WizardRouteV2Module
        ]
    })
    ```
2. נוסיף את רכיב ה wizard לקומפוננטה הרצויה כך:  
    html
    ```html
    <moh-wizard-route [steps]="steps"></moh-wizard-route>
    ```
    ts
    ```typescript

    this.steps = [
        { title: 'פרטים אישיים', path: 'personal', icon: 'person' },
        { title: 'כתובת', path: 'address', icon: 'home' },
        { title: 'סיום', path: 'result', icon: 'send' }
    ];
    ```

    ה input steps מקבל מערך של אובייקטים מסוג [Step](../classes/Step.html).  
    כאשר המאפיין path זהה לערך של המאפיין path בהגדרת ה routing של ה wizard, כפי המפורט בשלב הבא.
 
3. יש להוסיף routing בהתאם לשלבים של ה wizard, כאשר ה routes לsteps יהיו children של ה routes בו נמצאת הקומפוננטה של ה wizard:  
    ```typescript
    import { NgModule }             from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';
    
    import { PersonalComponent }    from './personal/personal.component';
    import { AddressComponent }     from './address/address.component';
    import { ResultComponent }      from './result/result.component';
    
    export const appRoutes: Routes = [
        {
            path: 'wizard', component: WizardFormComponent,
            children: [
                // 1st Route
                { path: 'personal',  component: PersonalComponent },
                // 2rd Route
                { path: 'address',  component: AddressComponent },
                // 3th Route
                { path: 'result',  component: ResultComponent },
                // 4th Route
                { path: '',   redirectTo: '/personal', pathMatch: 'full' },
                // 5th Route
                { path: '**', component: PersonalComponent }
            ]
        }
    ];
    
    @NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: true} )],
    exports: [RouterModule]
    })
    
    export class AppRoutingModule {}
    ```
4. יש ליצור את הרכיבים עבור כל שלב.
5. כל רכיב המייצג שלב צריך לירש מהמחלקה [WizardStep](../classes/WizardStep.html)
    ולשלוח injector ב constructor, לדוגמה:
    ```typescript
    export class PersonalComponent extends WizardStep  {

        constructor(injector: Injector) {
            super(injector);

            this.stepFormGroup = this.fb.group({
                firstName: ['', mohValidators.required()],
                lastName: []
            });
        }
    }
    ```
    ברוב במקרים הרכיב מכיל גם טופס, יש להשתמש ב formGroup הקיים ב base class WizardStep הנקרא stepFormGroup ולאתחל אותו ב constructor, כפי המפורט בדוגמה הנ"ל.

### יכולות נוספות לרכיב:
<details>
<summary><b>Wizard INputs & Outputs</b></summary>

### רשימת ה Inputs של הרכיב:
<div dir=ltr>

| שם    |   תאור         |
|:----------|-------------:|
| **steps: [Step](../classes/Step.html)[]** |  .מערך של פרטי השלבים עבור בניית האשף |
| **nextIfValid: boolean = true** |  .האם לאפשר לחיצה על הכפתור מעבר לשלב הבא רק כאשר הטופס של השלב הנוכחי תקין | 
| **prevIfValid: boolean = false** | .האם לאפשר לחיצה על הכפתור מעבר לשלב הקודם רק כאשר הטופס של השלב הנוכחי תקין |     
| **allowPrev: boolean = true** | .האם להציג כפתור למעבר לשלב הקודם |    
| **resetOnSubmit: boolean = true** | .האם לאפס את נתוני הטפסים באשף לאחר לחיצה על כפתור הסיום |    
| **prevButtonText: string** | .הטקסט שיופיע על כפתור המעבר לשלב הקודם |  
| **prevButtonTextKey: string = 'prevStep'** | .המפתח באומברקו של הטקסט שיופיע על הכפתור מעבר לשלב הקודם |  
| **nextButtonText: string** | .הטקסט שיופיע על כפתור המעבר לשלב הבא |  
| **nextButtonTextKey: string = 'nextStep'** | .המפתח באומברקו של הטקסט שיופיע על הכפתור מעבר לשלב הבא |  
| **confirmNext: boolean = false** | האם להציג הודעה בלחיצה על הכפתור מעבר לשלב הבא - ולבצע את המעבר רק לאחר אישור המשתמש, מפורט בהמשך |  
| **wizardId?: string** | .מזהה יחודי לאשף - מיועד עבור אתר בו משתמשים ביותר ממופע אחד של הרכיב | 

</div>

שימוש במאפיין **confirmNext**:  
אם נשלח למאפיין הערך true תוצג הודעה בכל שלב באשף.  
 ההודעה תוצג לאחר לחיצה על פתור המעבר לשלב הבא - לפני המעבר בפועל,  
  ההודעה תוצג לצד הכפתור הקיים וכן יתווסף כפתור לביטול המעבר :  

![](../../screenshots/readme/wizard_confirm_next.png)

הטקסטים המופיעים בהודעה מגיעים מאומברקו ניתן לשנות אותם על ידי דריסה דשל המפתחות הבאים:
1. confirmNextMessage - המפתח של הטקסט של ההודעה שתהיה מוצגת לצד כפתור ההמשך.
2. confirmNextOk - המפתח של הטקסט של כפתור האישור שמבצע את המעבר לשלב הבא.
3. confirmNextCancel - המפתח של הטקסט של כפתור הביטול המבטל את המעבר לשלב הבא.

### רשימת ה Outputs של הרכיב:  

<div dir=ltr>


|     שם      |        תאור      |         הפרמטר המועבר      |               
|:----------|-------------:|--------------:|
| **onSubmit** | הארוע מופעל בלחיצה על כפתור הסיום בשלב האחרון של האשף | אובייקט המכיל את כל נתוני האשף בצורה היררכית לפי השלבים הקיימים |
| **onNext** | הארוע מופעל בלחיצה על כפתור המעבר לשלב הבא בכל שלב באשף | אובייקט המכיל את ערך נתוני הטופס של השלב הנוכחי |
| **onPrev** | הארוע מופעל בלחיצה על כפתור המעבר לשלב הקודם בכל שלב באשף | אובייקט המכיל את ערך הטופס של השלב הנוכחי |
| **onStepChanged: EventEmitter&lt;WizardStep&gt;** | הארוע מופעל בכניסה לכל שלב באשף | אובייקט המכיל את מאפייני הרכיב המייצג את השלב   |

</div>

דוגמה לשימוש:
```html
   <moh-wizard-route (onSubmit)="submitWizard($event)"></moh-wizard-route>
```
```typescript
  submitWizard(formsData) {
    console.log('submit wizard', formsData);
  }
```


</details>
<details>
<summary><b><a href="../classes/WizardStep.html">WizardStep</a></b></summary>
    
1. allowPrev property- ישנה יכולת להציג\להסתיר את כפתור המעבר לשלב הקודם - עבור כל שלב בנפרד.  
כדי להגדיר עבור כל הwizard האם להציג את הכפתור יש לשלוח ערך מתאים לinput allowPrev, ערך ברירת המחדל הוא true - מציג את הכפתור.

    במקרה שרוצים להסתיר את הכפתור הזה רק בחלק מהשלבים - אין צורך לשלוח ערך לinput הנ"ל, אלא יש לתת ערך false למאפיין allowPrev  - בתוך הרכיב היורש מהמחלקה WizardStep:
    ```typescript
    export class stepWithoutPrevButton extends WizardStep implements OnInit {

        constructor(private fb: FormBuilder, injector: Injector) {
            super(injector);
            this.stepFormGroup = this.fb.group({
            firstName: ['', mohValidators.required()],
            lastName: [''],
            });

            this.allowPrev = false;
        }
    }
    ``` 
2. canNext fuction - פונקציה זו מיועדת למקרה בו רוצים למנוע או לעכב את המעבר לשלב הבא,   
הפונציה מחזירה Observable של ערך בוליאני, המשפיע האם לאפשר מעבר לשלב הבא לאחר לחיצה על הכפתור "שלב הבא".  
כיוון שהרכיב מאזין לשינויים בobservable זה, ניתן לבצע פעולות שונות בפונקציה זו באופן סינכרוני. 

    דוגמה לשימוש ביכולת זו ברכיב היורש מ WizardStep:
    ```typescript
    canNextSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    canNext(): Observable<boolean> {
        this.myDataService.save(this.stepFormGroup.value).subscribe((result) => {
            this.canNextSubject.next(true);
        });

        return this.canNextSubject.asObservable();
    }
    ```
    בדוגמה הנ"ל הפונקציה ממומשת בצורה מסוימת ולכן - כאשר המשתמש ילחץ על מעבר לטאב הבא תופעל הפונקציה, הקריאה לapi תתבצע, הפונקציה תחזיר את האוביקט canNextSubject שהערך ההתחלתי שלו הוא false ותגרום למעבר להתעכב,  
        אם שמירת הנתונים תעבור בהצלחה ישתנה הערך של האוביקט canNextSubject ל true ויתבצע המעבר לשלב הבא.

</details>

<details>
<summary><b>WorkflowGuard</b></summary>

זהו שרות (canActivate Guard) לשימוש בהגדרת ה routing של שלבי ה wizard,  
במעבר לשלב עליו מוגדר ה guard -השרות בודק האם המשתמש עבר בכל השלבים הקודמים לשלב היעד וכל הטפסים בהם ללא שגיאות ולידציה,  
במידה והתנאי לא מתקיים השרות יבצע מעבר לשלב המתקדם ביותר שעונה על התנאי. 

אופן השימוש:  
יש להוסיף כך בהגדרות הrouting (סעיף 3 בהטמעת הרכיב):
```typescript
    export const appRoutes: Routes = [
    // 1st Route
    { path: 'personal',  component: PersonalComponent },
    // 2rd Route
    { path: 'address',  component: AddressComponent, canActivate: [WorkflowGuard] },
    // 3th Route
    { path: 'result',  component: ResultComponent, canActivate: [WorkflowGuard] },
    // 4th Route
    { path: '',   redirectTo: '/personal', pathMatch: 'full' },
    // 5th Route
    { path: '**', component: PersonalComponent }
];
```
</details>
<details>
<summary><b>WizardDeactivateGuard</b></summary>
זהו שרות (canDeactivate Guard) לשימוש בהגדרת ה routing של שלבי ה wizard,  
ביציאה מהשלב עליו מוגדר ה guard -השרות בודק האם בוצעו שינויים בנתוני הטופס שלא נשמרו,   
 אם כן מציג הודעה על כך ומאפשר  למנוע יציאה מהשלב.

אופן השימוש:  
יש להוסיף כך בהגדרות הrouting (סעיף 3 בהטמעת הרכיב):
```typescript
export const appRoutes: Routes = [
    // 1st Route
    { path: 'personal',  component: PersonalComponent, canDeactivate: [WizardDeactivateGuard] },
    // 2rd Route    
    { path: 'address',  component: AddressComponent, canDeactivate: [WizardDeactivateGuard]},
    // 3th Route
    { path: 'result',  component: ResultComponent, canDeactivate: [WizardDeactivateGuard] },
    // 4th Route
    { path: '',   redirectTo: '/personal', pathMatch: 'full' },
    // 5th Route
    { path: '**', component: PersonalComponent }
];
```
</details>

<details>
<summary><b>WizardDataService</b></summary>
זהו שרות בו מתנהלת השמירה של נתוני הטפסים ב wizard.  
ניתן להשתמש בו כדי לשלוף את נתוני ה wizard שנשמרו, לדוגמה כדי להציג נתונים בשלב אחד על סמך השלב הקודם לו וכדו.

פונקציות הקיימות בשרות:  
1. שליפת הנתונים של כל ה wizard: 
    ```typescript
    getFormData(wizardId?: string)
    ```
    הפונקציה מחזירה את כל נתוני ה wizard בצורה היררכית לפי השלבים הקיימים :  
    אובייקט המכיל מאפיין עבור כל שלב, המאפיין הוא ה path של השלב, והערך של המאפיין הוא ה value של ה formGroup של אותו השלב, כולל ערכים של שדות לא מאופשרים.  
    לדוגמה:
    ```json
    { 
        "personal": {"firstName": "aa", "LastName":"bb"},
        "work":{"type": 1, "place":"cc"}
    }
    ```  
2. שליפת הנתונים של שלב מסוים ב wizard: 
    ```typescript
    getData(key: string, wizardId?: string)
    ```
    הפונקציה מחזירה נתונים של שלב מסוים עפ"י ה key המתקבל כפרמטר, הkey הוא הערך של המאפיין path של השלב הרצוי.  
    מבנה הנתונים הוא ה value של ה formGroup של השלב המבוקש, כולל ערכים של שדות לא מאופשרים.
    לדוגמה:
    ```json
    {"firstName": "aa", "LastName":"bb"}
    ```  
לשתי הפונקציות יש פרמטר אופציונלי wizardId - פרמטר זה מיועד למקרה בו משתמשים במופעים רבים של רכיב ה wizard באותה אפליקצייה.  

אופן השימוש:  
1. יש להזריק את השרות ב constructor של הרכיב בו רצוי המידע:  
    ```typescript
        constructor(private wizardDataService: WizardDataService) {
            this.wizardDataService.getFormData();
            this.wizardDataService.getData("personal");
        }
    ```
2. הפעלת הפונקציה המתאימה:
    ```typescript
        //במקרה של מופע בודד
        this.wizardDataService.getFormData();
        //במקרה של מופעים רבים
        this.wizardDataService.getFormData('firstWizardId');

        //במקרה של מופע בודד
        this.wizardDataService.getData('personal');
        //במקרה של מופעים רבים
        this.wizardDataService.getData('personal', 'firstWizardId');
    ```    
</details>


