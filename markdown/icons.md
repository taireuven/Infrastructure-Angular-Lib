<div dir=rtl>

## **מסמך הדרכה לשימוש באייקונים**

התשתית משתמשת באייקונים ותומכת בהוספת אייקונים חדשים שלא קיימים במאגר.

***איך עושים את זה?***

לצורך הוספת אייקונים לפרויקט שלכם יש להיכנס לאפליקציה של icomoon כאן:

[https://icomoon.io/app/#/select](https://icomoon.io/app/#/select)

ולבחור בתפריט "New Empty Set" בצד שמאל למעלה

![](../../screenshots/readme/NewSet.png)

לאחר מכן ניתן להעלות איקונים לתוך המאגר ע"י לחיצה על התפריט בצד ימין ובחירה ב- Import to Set

![](../../screenshots/readme/ImportToSet.png)

לאחר שהאיקון הועלה יש להוריד את החבילה ש -Icomoon יוצרים ולהטמיע את הקבצים באתר בצורה הבאה (חשוב מאוד להקפיד על מילוי מדויק של כל השלבים כדי לוודא עבודה תקינה)

1. בצד שמאל למטה יש ללחוץ על הכפתור Generate SVG & More.


יש לשנות את הקוד של האייקונים החדשים לקוד כלשהוא (המספרים e900 עד e3000 שמורים לאייקונים של התשתית)

2. בצד ימין למטה יש ללחוץ על הכפתור Generate Font

![](../../screenshots/readme/GnerateFont.png)

3. אח"כ יש ללחוץ על גלגל השיניים

![](../../screenshots/readme/Settings.png)

4. בחלון שנפתח יש להוסיף את ההגדרות הבאות:

Font Name: projectName-icon

Class Prefix: moh-icon.

במקטע של css selector יש לבחור באופציה הראשונה (Use i)

![](../../screenshots/readme/SettingsWindow.png)

5. אחרי הלחיצה על dwonload ירד קובץ zip עם כל הקבצים שזקוקים להטמעה.

      הקובץ מכיל:

      א. קובץ css שמכיל קישורים לשאר הקבצים

      ב.קובץ selection.json

      ג. תיקיית fonts

      את הקבצים ניתן למקם היכן שרוצים (לדוג' בתיקיית assets, רק יש לזכור לעדכן את הקישורים בקובץ ה-style.css)

6. בקובץ ה-css יש למחוק את ה-class i ב-class הבא:

```css
.moh-icon {
  font-family: "projectName-icon", "Moh Icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```


7. יש ליבא את קובץ ה -style של האיקונים או בקובץ styles.scss
או בקובץ angular-cli.json לאחר קובת ה-style של התשתית.

   את מאגר האייקונים של תשתית משרד הבריאות ניתן לראות כאן:
    [MOH Icons](../../moh-icons/demo.html)
