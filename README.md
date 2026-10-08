# حصنك

تطبيق أذكار عربي مبني باستخدام TanStack Start وReact.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS


## العمل بدون إنترنت

تم تجهيز الـ PWA ليحتفظ بالـ App Shell وملفات التطبيق في Service Worker. بعد فتح التطبيق مرة واحدة أثناء الاتصال بالإنترنت، يمكن فتحه واستخدام الأذكار والتنقل داخل الصفحات الأساسية بدون اتصال. بيانات الأذكار مدمجة داخل التطبيق، وحالة المستخدم تُحفظ محليًا عبر `localStorage`.

> ملاحظة: أول فتح وتثبيت يحتاجان اتصالًا بالإنترنت حتى يتم تحميل التطبيق وتخزين الملفات محليًا.
