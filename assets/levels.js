window.COURSE_TITLE = "Web Design 1010";

function baseHtml() {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

  </body>
</html>`;
}

window.LEVELS = [
  // ========== المستوى الأول: بناء الهيكل ==========
  {
    id: 1,
    title: "HTML Structure",
    steps: [
      {
        instruction: "اكتب !doctype html في أول الملف.",
        starterCode: "",
        hints: ["الـ doctype يجب أن يكون أول سطر.", "اكتب: <!doctype html>"],
        test: { type: "rawRegex", pattern: "^\\s*<!doctype\\s+html>\\s*$" }
      },
      {
        instruction: "أضف html بعد الـ doctype (مع فتح وإغلاق).",
        starterCode: "<!doctype html>\n",
        hints: ["وسم html يحيط بكل محتوى الصفحة.", "لا تنسَ الإغلاق </html>"],
        test: { type: "rawRegex", pattern: "<!doctype\\s+html>[\\s\\S]*<html>[\\s\\S]*</html>" }
      },
      {
        instruction: "أضف head داخل html.",
        starterCode: "<!doctype html>\n<html>\n\n</html>",
        hints: ["head يوضع داخل html قبل body.", "يحتوي على معلومات الصفحة."],
        test: { type: "hasSelector", selector: "html > head" }
      },
      {
        instruction: "أضف body داخل html بعد head.",
        starterCode: "<!doctype html>\n<html>\n  <head>\n  </head>\n\n</html>",
        hints: ["body يوضع بعد إغلاق head.", "يحتوي على محتوى الصفحة الظاهر."],
        test: { type: "rawRegex", pattern: "<head>[\\s\\S]*</head>\\s*<body>[\\s\\S]*</body>" }
      },
      {
        instruction: "أضف meta charset=\"utf-8\" داخل head.",
        starterCode: "<!doctype html>\n<html>\n  <head>\n\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["meta charset=\"utf-8\" يوضع داخل head.", "يساعد في دعم الأحرف العربية."],
        test: { type: "hasSelector", selector: "head > meta[charset='utf-8']" }
      },
      {
        instruction: "أضف title داخل head.",
        starterCode: "<!doctype html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["title يوضع داخل head.", "سيحتوي على عنوان الصفحة."],
        test: { type: "hasSelector", selector: "head > title" }
      },
      {
        instruction: "داخل title اكتب النص التالي بالضبط: Kuwait Vision",
        starterCode: "<!doctype html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <title></title>\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["تأكد من كتابة 'Kuwait Vision' بحرف K كبير و V كبير.", "لا توجد نقطة في النهاية."],
        test: { type: "titleEquals", expected: "Kuwait Vision" }
      },
      {
        instruction: "أضف h1 داخل body.",
        starterCode: "<!doctype html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <title>Kuwait Vision</title>\n  </head>\n  <body>\n\n  </body>\n</html>",
        hints: ["h1 يوضع داخل body.", "عادة ما يكون أول عنصر في body."],
        test: { type: "hasSelector", selector: "body > h1" }
      },
      {
        instruction: "داخل h1 اكتب النص التالي: Kuwait Future",
        starterCode: "<!doctype html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <title>Kuwait Vision</title>\n  </head>\n  <body>\n    <h1></h1>\n  </body>\n</html>",
        hints: ["اكتب 'Kuwait Future' بحرف K كبير و F كبير."],
        test: { type: "selectorTextEquals", selector: "body > h1", expected: "Kuwait Future" }
      },
      {
        instruction: "أضف فقرة p بعد h1 مباشرة، واكتب داخلها: est 2033",
        starterCode: "<!doctype html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <title>Kuwait Vision</title>\n  </head>\n  <body>\n    <h1>Kuwait Future</h1>\n\n  </body>\n</html>",
        hints: ["p يجب أن تأتي بعد إغلاق h1.", "اكتب 'est 2033' بحروف صغيرة."],
        test: { type: "rawRegex", pattern: "<h1>\\s*Kuwait Future\\s*</h1>\\s*<p>\\s*est 2033\\s*</p>" }
      }
    ]
  },

  // ========== المستوى الثاني: صفحة تعريفية عربية ==========
  {
    id: 2,
    title: "Arabic Profile Page",
    steps: [
      {
        instruction: "أنشئ هيكل الصفحة الأساسي (!doctype html, html, head, body).",
        starterCode: "",
        hints: ["ابدأ بـ <!doctype html>", "ثم <html> ثم <head> ثم <body>"],
        test: { type: "rawRegex", pattern: "<!doctype\\s+html>[\\s\\S]*<html>[\\s\\S]*<head>[\\s\\S]*</head>[\\s\\S]*<body>[\\s\\S]*</body>[\\s\\S]*</html>" }
      },
      {
        instruction: "أضف خاصية اللغة العربية لوسم html لتصبح html lang=\"ar\"",
        starterCode: "<!doctype html>\n<html>\n  <head>\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["أضف lang=\"ar\" داخل وسم html الافتتاحي."],
        test: { type: "htmlAttrEquals", attr: "lang", expected: "ar" }
      },
      {
        instruction: "أضف اتجاه الصفحة من اليمين لليسار لتصبح html lang=\"ar\" dir=\"rtl\"",
        starterCode: "<!doctype html>\n<html lang=\"ar\">\n  <head>\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["أضف dir=\"rtl\" داخل وسم html."],
        test: { type: "htmlAttrEquals", attr: "dir", expected: "rtl" }
      },
      {
        instruction: "أضف meta charset=\"utf-8\" داخل head.",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["ضع <meta charset=\"utf-8\"> داخل head."],
        test: { type: "hasSelector", selector: "head > meta[charset='utf-8']" }
      },
      {
        instruction: "أضف title واكتب داخله: نبذة عني",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["title يوضع داخل head.", "اكتب 'نبذة عني'."],
        test: { type: "titleEquals", expected: "نبذة عني" }
      },
      {
        instruction: "أضف h1 داخل body واكتب (عبدالله حمد محمد).",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>نبذة عني</title>\n  </head>\n  <body>\n\n  </body>\n</html>",
        hints: ["h1 داخل body.", "اكتب (عبدالله حمد محمد)."],
        test: { type: "hasSelector", selector: "body > h1" }
      },
      {
        instruction: "أضف فقرة p بعد h1 (أحب القراءة والسباحة).",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>نبذة عني</title>\n  </head>\n  <body>\n    <h1>عبدالله حمد محمد</h1>\n\n  </body>\n</html>",
        hints: ["p تحت h1.", "اكتب 'أحب القراءة والسباحة'."],
        test: { type: "hasSelector", selector: "body > p" }
      },
      {
        instruction: "أضف عنوان h2 واكتب داخله: لغات البرمجة",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>نبذة عني</title>\n  </head>\n  <body>\n    <h1>عبدالله حمد محمد</h1>\n    <p>أحب القراءة والسباحة.</p>\n\n  </body>\n</html>",
        hints: ["h2 بعد الفقرة.", "اكتب 'لغات البرمجة'."],
        test: { type: "rawRegex", pattern: "<p>.*</p>\\s*<h2>\\s*لغات البرمجة\\s*</h2>" }
      },
      {
        instruction: "أضف عنوان h3 تحت h2 واكتب داخله اسم لغة برمجة (بايثون).",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>نبذة عني</title>\n  </head>\n  <body>\n    <h1>عبدالله حمد محمد</h1>\n    <p>أحب القراءة والسباحة.</p>\n    <h2>لغات البرمجة</h2>\n\n  </body>\n</html>",
        hints: ["h3 تحت h2.", "اكتب اسم لغة برمجة."],
        test: { type: "hasSelector", selector: "h2 + h3" }
      },
      {
        instruction: "أضف h3 ثاني للغة أخرى (جافا سكريبت).",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>نبذة عني</title>\n  </head>\n  <body>\n    <h1>عبدالله حمد محمد</h1>\n    <p>أحب القراءة والسباحة.</p>\n    <h2>لغات البرمجة</h2>\n    <h3>بايثون</h3>\n\n  </body>\n</html>",
        hints: ["أضف h3 جديد بعد الأول.", "اكتب لغة أخرى."],
        test: { type: "rawRegex", pattern: "<h3>[\\s\\S]*</h3>\\s*<h3>[\\s\\S]*</h3>" }
      }
    ]
  },

  // ========== المستوى الثالث: تنسيق الخطوط ==========
  {
    id: 3,
    title: "Text Formatting",
    steps: [
      {
        instruction: "اكتب عنوان الصفحة في title ليكون: Summer Science Sale",
        starterCode: baseHtml(),
        hints: ["title داخل head.", "اكتب 'Summer Science Sale'."],
        test: { type: "titleEquals", expected: "Summer Science Sale" }
      },
      {
        instruction: "أضف عنوان رئيسي h1 واكتب داخله: Summer Science Sale",
        starterCode: baseHtml().replace("<body>\n\n  </body>", "<body>\n    <h1></h1>\n  </body>"),
        hints: ["h1 داخل body.", "اكتب 'Summer Science Sale'."],
        test: { type: "selectorTextEquals", selector: "body > h1", expected: "Summer Science Sale" }
      },
      {
        instruction: "أضف الفقرة التالية داخل p: The summer science sale is finally here! Get the 5th edition of \"The Chemistry of Water (H2O)\" for only 10KD. *Offer valid while supplies last.",
        starterCode: baseHtml().replace("<body>\n\n  </body>", "<body>\n    <h1>Summer Science Sale</h1>\n\n  </body>"),
        hints: ["p بعد h1.", "انسخ النص بدقة."],
        test: { type: "hasSelector", selector: "body > p" }
      },
      {
        instruction: "ضع علامة mark حول العبارة 'summer science sale' داخل الفقرة.",
        starterCode: baseHtml().replace("<body>\n\n  </body>", "<body>\n    <h1>Summer Science Sale</h1>\n    <p>The summer science sale is finally here! Get the 5th edition of \"The Chemistry of Water (H2O)\" for only 10KD. *Offer valid while supplies last.</p>\n  </body>"),
        hints: ["mark لتظليل النص.", "ضعها حول 'summer science sale' فقط."],
        test: { type: "rawRegex", pattern: "<mark>\\s*summer science sale\\s*</mark>" }
      },
      {
        instruction: "استخدم sup للرفع على الحرفين 'th' في الكلمة '5th'.",
        starterCode: baseHtml().replace("<body>\n\n  </body>", "<body>\n    <h1>Summer Science Sale</h1>\n    <p>The summer science sale is finally here! Get the 5th edition of \"The Chemistry of Water (H2O)\" for only 10KD. *Offer valid while supplies last.</p>\n  </body>"),
        hints: ["sup يجعل النص مرتفعًا.", "طبّقها على 'th' فقط."],
        test: { type: "rawRegex", pattern: "5<sup>\\s*th\\s*</sup>" }
      },
      {
        instruction: "استخدم sub للتخفيض على الرقم '2' في H2O.",
        starterCode: baseHtml().replace("<body>\n\n  </body>", "<body>\n    <h1>Summer Science Sale</h1>\n    <p>The summer science sale is finally here! Get the 5th edition of \"The Chemistry of Water (H2O)\" for only 10KD. *Offer valid while supplies last.</p>\n  </body>"),
        hints: ["sub يجعل النص منخفضًا.", "طبّقها على الرقم '2'."],
        test: { type: "rawRegex", pattern: "H<sub>\\s*2\\s*</sub>O" }
      },
      {
        instruction: "استخدم small حول العبارة: '*Offer valid while supplies last.'",
        starterCode: baseHtml().replace("<body>\n\n  </body>", "<body>\n    <h1>Summer Science Sale</h1>\n    <p>The summer science sale is finally here! Get the 5th edition of \"The Chemistry of Water (H2O)\" for only 10KD. *Offer valid while supplies last.</p>\n  </body>"),
        hints: ["small يجعل النص صغيرًا.", "طبّقها على الجملة الأخيرة."],
        test: { type: "rawRegex", pattern: "<small>\\s*\\*Offer valid while supplies last\\.\\s*</small>" }
      },
      {
        instruction: "أضف خطًا أفقيًا hr بعد الفقرة.",
        starterCode: baseHtml().replace("<body>\n\n  </body>", "<body>\n    <h1>Summer Science Sale</h1>\n    <p>The summer science sale is finally here! Get the 5th edition of \"The Chemistry of Water (H2O)\" for only 10KD. *Offer valid while supplies last.</p>\n\n  </body>"),
        hints: ["hr عنصر فاصل.", "ضعه بعد إغلاق p."],
        test: { type: "hasSelector", selector: "body > hr" }
      },
      {
        instruction: "أضف فقرة جديدة p تحت hr تحتوي على: This book is perfect for students who want to understand water in a simple way. It includes: Easy explanations of H2O Simple experiments to try Clear pictures and examples",
        starterCode: baseHtml().replace("<body>\n\n  </body>", "<body>\n    <h1>Summer Science Sale</h1>\n    <p>The summer science sale is finally here! Get the 5th edition of \"The Chemistry of Water (H2O)\" for only 10KD. *Offer valid while supplies last.</p>\n    <hr>\n\n  </body>"),
        hints: ["p جديدة بعد hr.", "انسخ النص كما هو."],
        test: { type: "hasSelector", selector: "hr + p" }
      },
      {
        instruction: "استخدم strong حول العبارة 'This book' في الفقرة الجديدة.",
        starterCode: baseHtml().replace("<body>\n\n  </body>", "<body>\n    <h1>Summer Science Sale</h1>\n    <p>The summer science sale is finally here! Get the 5th edition of \"The Chemistry of Water (H2O)\" for only 10KD. *Offer valid while supplies last.</p>\n    <hr>\n    <p>This book is perfect for students who want to understand water in a simple way. It includes: Easy explanations of H2O Simple experiments to try Clear pictures and examples</p>\n  </body>"),
        hints: ["strong لتأكيد النص.", "طبّقها على 'This book'."],
        test: { type: "rawRegex", pattern: "<strong>\\s*This book\\s*</strong>" }
      },
      {
        instruction: "استخدم em حول العبارة 'understand water' في الفقرة الجديدة.",
        starterCode: baseHtml().replace("<body>\n\n  </body>", "<body>\n    <h1>Summer Science Sale</h1>\n    <p>The summer science sale is finally here! Get the 5th edition of \"The Chemistry of Water (H2O)\" for only 10KD. *Offer valid while supplies last.</p>\n    <hr>\n    <p>This book is perfect for students who want to understand water in a simple way. It includes: Easy explanations of H2O Simple experiments to try Clear pictures and examples</p>\n  </body>"),
        hints: ["em لإمالة النص.", "طبّقها على 'understand water'."],
        test: { type: "rawRegex", pattern: "<em>\\s*understand water\\s*</em>" }
      },
      {
        instruction: "استخدم br لفصل العبارات التالية في أسطر منفصلة داخل الفقرة الجديدة:\n• Easy explanations of H2O\n• Simple experiments to try\n• Clear pictures and examples",
        starterCode: baseHtml().replace("<body>\n\n  </body>", "<body>\n    <h1>Summer Science Sale</h1>\n    <p>The summer science sale is finally here! Get the 5th edition of \"The Chemistry of Water (H2O)\" for only 10KD. *Offer valid while supplies last.</p>\n    <hr>\n    <p>This book is perfect for students who want to understand water in a simple way. It includes: Easy explanations of H2O Simple experiments to try Clear pictures and examples</p>\n  </body>"),
        hints: ["ضع br بعد كل عبارة لتكون في سطر جديد."],
        test: { type: "rawRegex", pattern: "Easy explanations of H2O\\s*<br>\\s*Simple experiments to try\\s*<br>\\s*Clear pictures and examples" }
      }
    ]
  },

  // ========== المستوى الرابع: القوائم ==========
  {
    id: 4,
    title: "Lists (Coffee Menu)",
    steps: [
      {
        instruction: "أنشئ هيكل الصفحة الأساسي (!doctype html, html, head, body).",
        starterCode: "",
        hints: ["ابدأ بـ <!doctype html>", "ثم <html> ثم <head> ثم <body>"],
        test: { type: "rawRegex", pattern: "<!doctype\\s+html>[\\s\\S]*<html>[\\s\\S]*<head>[\\s\\S]*</head>[\\s\\S]*<body>[\\s\\S]*</body>[\\s\\S]*</html>" }
      },
      {
        instruction: "أضف خاصية اللغة العربية لوسم html لتصبح html lang=\"ar\"",
        starterCode: "<!doctype html>\n<html>\n  <head>\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["أضف lang=\"ar\" داخل html."],
        test: { type: "htmlAttrEquals", attr: "lang", expected: "ar" }
      },
      {
        instruction: "أضف اتجاه الصفحة RTL لتصبح html lang=\"ar\" dir=\"rtl\"",
        starterCode: "<!doctype html>\n<html lang=\"ar\">\n  <head>\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["أضف dir=\"rtl\"."],
        test: { type: "htmlAttrEquals", attr: "dir", expected: "rtl" }
      },
      {
        instruction: "أضف meta charset=\"utf-8\" داخل head.",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["ضعها داخل head."],
        test: { type: "hasSelector", selector: "head > meta[charset='utf-8']" }
      },
      {
        instruction: "أضف title واكتب داخله: أنواع القهوة",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["title داخل head.", "اكتب 'أنواع القهوة'."],
        test: { type: "titleEquals", expected: "أنواع القهوة" }
      },
      {
        instruction: "أضف عنوان رئيسي h1 واكتب داخله: أنواع القهوة",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>أنواع القهوة</title>\n  </head>\n  <body>\n\n  </body>\n</html>",
        hints: ["h1 داخل body.", "اكتب 'أنواع القهوة'."],
        test: { type: "selectorTextEquals", selector: "body > h1", expected: "أنواع القهوة" }
      },
      {
        instruction: "أضف عنوان فرعي h2 واكتب داخله: القهوة الساخنة",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>أنواع القهوة</title>\n  </head>\n  <body>\n    <h1>أنواع القهوة</h1>\n\n  </body>\n</html>",
        hints: ["h2 بعد h1.", "اكتب 'القهوة الساخنة'."],
        test: { type: "rawRegex", pattern: "<h1>.*</h1>\\s*<h2>\\s*القهوة الساخنة\\s*</h2>" }
      },
      {
        instruction: "أضف قائمة مرتبة ol تحت h2 تحتوي على العناصر التالية:\n• الإسبريسو\n• اللاتيه\n• الكابتشينو\n• القهوة التركية",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>أنواع القهوة</title>\n  </head>\n  <body>\n    <h1>أنواع القهوة</h1>\n    <h2>القهوة الساخنة</h2>\n\n  </body>\n</html>",
        hints: ["استخدم ol لقائمة مرتبة.", "كل عنصر داخل li."],
        test: { type: "hasSelector", selector: "h2 + ol li:nth-child(4)" }
      },
      {
        instruction: "أضف عنوان فرعي ثاني h2 واكتب داخله: القهوة الباردة",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>أنواع القهوة</title>\n  </head>\n  <body>\n    <h1>أنواع القهوة</h1>\n    <h2>القهوة الساخنة</h2>\n    <ol>\n      <li>الإسبريسو</li>\n      <li>اللاتيه</li>\n      <li>الكابتشينو</li>\n      <li>القهوة التركية</li>\n    </ol>\n\n  </body>\n</html>",
        hints: ["h2 جديد بعد القائمة.", "اكتب 'القهوة الباردة'."],
        test: { type: "rawRegex", pattern: "</ol>[\\s\\S]*<h2>\\s*القهوة الباردة\\s*</h2>" }
      },
      {
        instruction: "أضف قائمة غير مرتبة ul تحت h2 الثاني تحتوي على:\n• الأمريكانو البارد\n• الموكا المثلجة\n• القهوة المثلجة\n• فرابتشينو",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>أنواع القهوة</title>\n  </head>\n  <body>\n    <h1>أنواع القهوة</h1>\n    <h2>القهوة الساخنة</h2>\n    <ol>\n      <li>الإسبريسو</li>\n      <li>اللاتيه</li>\n      <li>الكابتشينو</li>\n      <li>القهوة التركية</li>\n    </ol>\n    <h2>القهوة الباردة</h2>\n\n  </body>\n</html>",
        hints: ["استخدم ul لقائمة غير مرتبة.", "كل عنصر داخل li."],
        test: { type: "hasSelector", selector: "h2 + ul li:nth-child(4)" }
      }
    ]
  },

  // ========== المستوى الخامس: شركة بناء ==========
  {
    id: 5,
    title: "Company Profile (Construction)",
    steps: [
      {
        instruction: "أنشئ هيكل صفحة كامل (!doctype html, html, head, body).",
        starterCode: "",
        hints: ["ابدأ بـ <!doctype html>", "ثم <html> ثم <head> ثم <body>"],
        test: { type: "rawRegex", pattern: "<!doctype\\s+html>[\\s\\S]*<html>[\\s\\S]*<head>[\\s\\S]*</head>[\\s\\S]*<body>[\\s\\S]*</body>[\\s\\S]*</html>" }
      },
      {
        instruction: "أضف اللغة العربية واتجاه RTL لوسم html (html lang=\"ar\" dir=\"rtl\").",
        starterCode: "<!doctype html>\n<html>\n  <head>\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["أضف lang=\"ar\" dir=\"rtl\" داخل html."],
        test: { type: "rawRegex", pattern: "<html\\s+lang=\"ar\"\\s+dir=\"rtl\">" }
      },
      {
        instruction: "أضف meta charset=\"utf-8\" داخل head.",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["ضع <meta charset=\"utf-8\"> داخل head."],
        test: { type: "hasSelector", selector: "head > meta[charset='utf-8']" }
      },
      {
        instruction: "أضف title واكتب داخله: شركة البناء الحديث",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["title داخل head.", "اكتب 'شركة البناء الحديث'."],
        test: { type: "titleEquals", expected: "شركة البناء الحديث" }
      },
      {
        instruction: "أضف h1 داخل body واكتب اسم الشركة: شركة البناء الحديث",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>شركة البناء الحديث</title>\n  </head>\n  <body>\n\n  </body>\n</html>",
        hints: ["h1 داخل body.", "اكتب 'شركة البناء الحديث'."],
        test: { type: "selectorTextEquals", selector: "body > h1", expected: "شركة البناء الحديث" }
      },
      {
        instruction: "أضف فقرة تعريفية p تحت h1 تصف الشركة (مثال: شركة رائدة في مجال البناء والتشييد).",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>شركة البناء الحديث</title>\n  </head>\n  <body>\n    <h1>شركة البناء الحديث</h1>\n\n  </body>\n</html>",
        hints: ["p بعد h1.", "اكتب وصفاً مختصراً."],
        test: { type: "hasSelector", selector: "body > p" }
      },
      {
        instruction: "أضف عنوان h2 واكتب داخله: خدماتنا",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>شركة البناء الحديث</title>\n  </head>\n  <body>\n    <h1>شركة البناء الحديث</h1>\n    <p>شركة رائدة في مجال البناء والتشييد.</p>\n\n  </body>\n</html>",
        hints: ["h2 بعد الفقرة.", "اكتب 'خدماتنا'."],
        test: { type: "rawRegex", pattern: "<p>.*</p>\\s*<h2>\\s*خدماتنا\\s*</h2>" }
      },
      {
        instruction: "أضف قائمة غير مرتبة ul تحت h2 تحتوي على 3 خدمات:\n• تصميم المباني\n• إشراف هندسي\n• تنفيذ المشاريع",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>شركة البناء الحديث</title>\n  </head>\n  <body>\n    <h1>شركة البناء الحديث</h1>\n    <p>شركة رائدة في مجال البناء والتشييد.</p>\n    <h2>خدماتنا</h2>\n\n  </body>\n</html>",
        hints: ["استخدم ul و li."],
        test: { type: "hasSelector", selector: "h2 + ul li:nth-child(3)" }
      },
      {
        instruction: "أضف عنوان h2 آخر واكتب داخله: مشاريع سابقة",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>شركة البناء الحديث</title>\n  </head>\n  <body>\n    <h1>شركة البناء الحديث</h1>\n    <p>شركة رائدة في مجال البناء والتشييد.</p>\n    <h2>خدماتنا</h2>\n    <ul>\n      <li>تصميم المباني</li>\n      <li>إشراف هندسي</li>\n      <li>تنفيذ المشاريع</li>\n    </ul>\n\n  </body>\n</html>",
        hints: ["h2 جديد بعد القائمة.", "اكتب 'مشاريع سابقة'."],
        test: { type: "rawRegex", pattern: "</ul>[\\s\\S]*<h2>\\s*مشاريع سابقة\\s*</h2>" }
      },
      {
        instruction: "أضف قائمة مرتبة ol تحت h2 الجديد تحتوي على 3 مشاريع:\n• برج الكويت\n• مستشفى السلام\n• مجمع الأفنيوز",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>شركة البناء الحديث</title>\n  </head>\n  <body>\n    <h1>شركة البناء الحديث</h1>\n    <p>شركة رائدة في مجال البناء والتشييد.</p>\n    <h2>خدماتنا</h2>\n    <ul>\n      <li>تصميم المباني</li>\n      <li>إشراف هندسي</li>\n      <li>تنفيذ المشاريع</li>\n    </ul>\n    <h2>مشاريع سابقة</h2>\n\n  </body>\n</html>",
        hints: ["استخدم ol لقائمة مرتبة."],
        test: { type: "hasSelector", selector: "h2 + ol li:nth-child(3)" }
      }
    ]
  },

  // ========== المستوى السادس: كاتب عربي مشهور ==========
  {
    id: 6,
    title: "Arabic Writer Bio",
    steps: [
      {
        instruction: "أنشئ هيكل صفحة كامل (!doctype html, html, head, body).",
        starterCode: "",
        hints: ["ابدأ بـ <!doctype html>", "ثم <html> ثم <head> ثم <body>"],
        test: { type: "rawRegex", pattern: "<!doctype\\s+html>[\\s\\S]*<html>[\\s\\S]*<head>[\\s\\S]*</head>[\\s\\S]*<body>[\\s\\S]*</body>[\\s\\S]*</html>" }
      },
      {
        instruction: "أضف اللغة العربية واتجاه RTL لوسم html (html lang=\"ar\" dir=\"rtl\").",
        starterCode: "<!doctype html>\n<html>\n  <head>\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["أضف lang=\"ar\" dir=\"rtl\"."],
        test: { type: "rawRegex", pattern: "<html\\s+lang=\"ar\"\\s+dir=\"rtl\">" }
      },
      {
        instruction: "أضف meta charset=\"utf-8\" داخل head.",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["ضع <meta charset=\"utf-8\"> داخل head."],
        test: { type: "hasSelector", selector: "head > meta[charset='utf-8']" }
      },
      {
        instruction: "أضف title واكتب داخله: نبذة عن الكاتب",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n\n  </head>\n  <body>\n  </body>\n</html>",
        hints: ["اكتب 'نبذة عن الكاتب'."],
        test: { type: "titleEquals", expected: "نبذة عن الكاتب" }
      },
      {
        instruction: "أضف h1 داخل body واكتب اسم كاتب عربي مشهور (مثال: نجيب محفوظ).",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>نبذة عن الكاتب</title>\n  </head>\n  <body>\n\n  </body>\n</html>",
        hints: ["اكتب اسم كاتب مشهور."],
        test: { type: "hasSelector", selector: "body > h1" }
      },
      {
        instruction: "أضف فقرة تعريفية p تحت h1 تصف الكاتب (مثال: روائي مصري حاصل على جائزة نوبل).",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>نبذة عن الكاتب</title>\n  </head>\n  <body>\n    <h1>نجيب محفوظ</h1>\n\n  </body>\n</html>",
        hints: ["اكتب وصفاً مختصراً."],
        test: { type: "hasSelector", selector: "body > p" }
      },
      {
        instruction: "أضف عنوان h2 واكتب داخله: أهم المؤلفات",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>نبذة عن الكاتب</title>\n  </head>\n  <body>\n    <h1>نجيب محفوظ</h1>\n    <p>روائي مصري حاصل على جائزة نوبل.</p>\n\n  </body>\n</html>",
        hints: ["اكتب 'أهم المؤلفات'."],
        test: { type: "rawRegex", pattern: "<p>.*</p>\\s*<h2>\\s*أهم المؤلفات\\s*</h2>" }
      },
      {
        instruction: "أضف قائمة غير مرتبة ul تحت h2 تحتوي على 3 كتب:\n• أولاد حارتنا\n• الثلاثية\n• اللص والكلاب",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>نبذة عن الكاتب</title>\n  </head>\n  <body>\n    <h1>نجيب محفوظ</h1>\n    <p>روائي مصري حاصل على جائزة نوبل.</p>\n    <h2>أهم المؤلفات</h2>\n\n  </body>\n</html>",
        hints: ["استخدم ul و li."],
        test: { type: "hasSelector", selector: "h2 + ul li:nth-child(3)" }
      },
      {
        instruction: "أضف عنوان h2 آخر واكتب داخله: الجوائز",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>نبذة عن الكاتب</title>\n  </head>\n  <body>\n    <h1>نجيب محفوظ</h1>\n    <p>روائي مصري حاصل على جائزة نوبل.</p>\n    <h2>أهم المؤلفات</h2>\n    <ul>\n      <li>أولاد حارتنا</li>\n      <li>الثلاثية</li>\n      <li>اللص والكلاب</li>\n    </ul>\n\n  </body>\n</html>",
        hints: ["اكتب 'الجوائز'."],
        test: { type: "rawRegex", pattern: "</ul>[\\s\\S]*<h2>\\s*الجوائز\\s*</h2>" }
      },
      {
        instruction: "أضف قائمة مرتبة ol تحت h2 الجديد تحتوي على 3 جوائز:\n• جائزة نوبل في الأدب\n• جائزة الدولة التقديرية\n• وسام الاستحقاق",
        starterCode: "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>نبذة عن الكاتب</title>\n  </head>\n  <body>\n    <h1>نجيب محفوظ</h1>\n    <p>روائي مصري حاصل على جائزة نوبل.</p>\n    <h2>أهم المؤلفات</h2>\n    <ul>\n      <li>أولاد حارتنا</li>\n      <li>الثلاثية</li>\n      <li>اللص والكلاب</li>\n    </ul>\n    <h2>الجوائز</h2>\n\n  </body>\n</html>",
        hints: ["استخدم ol لقائمة مرتبة."],
        test: { type: "hasSelector", selector: "h2 + ol li:nth-child(3)" }
      }
    ]
  }
];
