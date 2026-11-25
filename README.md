# AVTO TEST 4D

O‘zbekiston haydovchilik nazariyasi va rasmli mashq testlari. Vue, Vite, Node.js va PostgreSQL. Veb-ilova va API bitta domen orqali ishlaydi. Akkauntlar, kirish seanslari, test javoblari, natijalar, yuklangan rasmlar va kirish jurnali PostgreSQL’da saqlanadi.

## Windows PowerShell’da ishga tushirish

Node.js 24 LTS, npm va PostgreSQL kerak. PostgreSQL uchun quyidagi Docker Compose namunasi yoki mavjud PostgreSQL 17+ bazasidan foydalaning.

ZIP ichidagi `avto-test-4d-postgres` papkasiga o‘ting. `Get-Item .\package.json` faylni ko‘rsatishi kerak. So‘ng:

```powershell
Copy-Item .env.example .env
notepad .env
docker compose up -d postgres
npm ci
npm run build
npm start
```

`.env` ichida `ADMIN_EMAIL` va kamida 14 belgili noyob `ADMIN_PASSWORD` kiriting. Mavjud PostgreSQL serveringiz bo‘lsa, `DATABASE_URL`ni almashtiring va Docker qadamini o‘tkazing. Brauzerda [http://127.0.0.1:3000](http://127.0.0.1:3000) manzilini oching. Admin uchun [http://127.0.0.1:3000/admin](http://127.0.0.1:3000/admin).

Frontendni tahrirlashda ikki terminaldan foydalaning. Birinchisida `npm run server`, ikkinchisida `npm run dev` va [http://127.0.0.1:5173](http://127.0.0.1:5173). Vite /api so‘rovlarini 3000-portga uzatadi. `NODE_ENV=production` cookie uchun HTTPS talab qiladi.

## Ishlash tartibi

- Ro‘yxatdan o‘tish → kirish sahifasi → ro‘yxatdagi Gmail yoki boshqa email va platformada tanlangan parol. Gmail manzili bilan kirish Google OAuth’ga ulanmaydi va email tasdiqlash xatini jo‘natmaydi.
- A, B, C va D toifalari, aralash test, belgilar, chorrahalar, avtomobil tuzilishi, mototsikl, yuk tashish va yo‘lovchi tashish. Har bir savolda rasm yoki mavzuga mos o‘quv chizmasi mavjud.
- Natija serverda hisoblanadi. Davom etayotgan test brauzer yangilanganda saqlanadi va to‘g‘ri javoblar test yakunlangach ko‘rsatiladi.
- `/admin` ichida **Kirish jurnali** va **Savollar** mavjud. Admin savol qo‘shishi, tahrirlashi, rasm yuklashi yoki savolni bankdan olib tashlashi mumkin. Avvalgi natijalar saqlanadi.
- Kirish jurnali muvaffaqiyatli kirish vaqtini Toshkent mintaqasida, qurilma va brauzer bildirgan ma’lumotlarni, qisqartirilgan tarmoq prefiksini va IP orqali taxminiy mamlakatni ko‘rsatadi. VPN, proksi va qisqartirilgan User-Agent aniqlikka ta’sir qiladi. Qurilma modeli mavjud bo‘lsa ko‘rinadi. GPS olinmaydi, to‘liq IP jurnalda saqlanmaydi. Ma’lumot 30 kun saqlanadi (`LOGIN_LOG_DAYS` bilan o‘zgaradi). `GEOIP_DISABLED=true` mamlakat qidiruvini o‘chiradi. Mamlakat ma’lumoti [DB-IP](https://db-ip.com/db/lite.php) bazasi orqali mahalliy aniqlanadi.
- Avvalgi lokal versiyadagi brauzer akkauntlari va natijalari bu bazaga avtomatik ko‘chmaydi. Eski versiya ZIP’i alohida qoladi.

## O‘quv materiallari

2026-yil 25-noyabrda yuklab olingan [Lex.uz, 172-son qaror](https://lex.uz/docs/-5953883) bo‘yicha YHQ matni, 30 bob, 4 ilova va 18 rasmiy jadval yoki tasvir. Belgilar sahifasida ma’nolar bo‘yicha qidiruv va rasmiy jadvallar mavjud. Mashq bankidagi savollar o‘quv maqsadida yozilgan. Ularning bir qismi rasmiy belgilar chizmalari asosida, texnik savollar esa alohida o‘quv chizmalari bilan beriladi. Yangi tahrirlar uchun Lex.uz sahifasidan foydalaning.

## GitHub va Railway

1. GitHub’da bo‘sh repozitoriy yarating. ZIP ichidagi **loyiha papkasi** repo ildizi bo‘lsin. `.env`, `node_modules` va `dist` Git’ga yuborilmaydi.
   Repo ildizida `git init -b main`, `git add .`, `git commit -m "Initial release"`, `git remote add origin <GitHub-repo-URL>` va `git push -u origin main` buyruqlarini bajaring.
2. Railway’da GitHub repozitoriyasini manba sifatida ulang. Xizmat ildizida `Dockerfile` va `railway.toml` mavjud.
3. Loyihaga PostgreSQL xizmati qo‘shing. Web xizmatining Variables bo‘limida `DATABASE_URL=${{Postgres.DATABASE_URL}}`, `ADMIN_EMAIL`, noyob `ADMIN_PASSWORD`, `TRUST_PROXY_HOPS=1` kiriting. Ma’lumotlar bazasi xizmatingiz boshqa nomda bo‘lsa, `Postgres` o‘rniga o‘sha nomni ishlating. Container `PORT`ni Railway’dan oladi va `/health` bazaga ulanishni tekshiradi. Docker ishlab chiqarish rejimida ishlaydi.
4. Servis uchun HTTPS domen yarating. `/health`, `/admin`, ro‘yxatdan o‘tish va kirish jurnalidagi proksi manzilini tekshiring. Qo‘shimcha proksi oldiga qo‘yilsa, ishonchli hop sozlamasini topologiyaga moslang.
5. Birinchi muvaffaqiyatli ishga tushishda jadvallar va boshlang‘ich savollar avtomatik yaratiladi. Administrator paroli faqat yangi administrator yaratilganda qo‘llanadi. Mavjud parol redeploy orqali o‘zgarmaydi. Railway/PostgreSQL zaxiralarini yoqing va tiklashni alohida bazada tekshiring.

Mahsulotni ommaviy ishga tushirishdan oldin akkaunt va kirish ma’lumotlarini qaysi hududda saqlashni hamda xalqaro uzatish shartlarini tekshiring. [Shaxsga doir ma’lumotlar to‘g‘risidagi qonun, 27¹-modda](https://lex.uz/docs/-4396419)

[Railway PostgreSQL](https://docs.railway.com/databases/postgresql) · [Railway Healthchecks](https://docs.railway.com/deployments/healthchecks)
