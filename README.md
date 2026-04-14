
# 📄 PDFLoader – Сервис сохранения страниц в PDF  
> 💡 *Задание по практике для ГПН (Газпромнефть)* 

# 💬 Описание  
**PDFLoader** — сервис мониторинга успеваемости студентов с возможностью формировать PDF-отчёты по группам. Данные по студентам встроены прямо в приложение — запускать бэкенд для просмотра не нужно.

![image](https://github.com/user-attachments/assets/89f4b0aa-1d0c-4f6d-8251-1807bd7b8d32)


---

## 🚀 Быстрый старт

### 🔽 Клонирование репозитория
```bash
git clone https://github.com/ваш-username/PDFLoader.git  
```

### 📦 Установка зависимостей
```
npm install 
```  

### ▶️ Способ 1 — только фронтенд (без бэкенда)
Данные студентов встроены в приложение (`src/data/mockStudents.ts`). Бэкенд и json-server не нужны.
```
npm run dev
```
Приложение: `http://localhost:5173`

---

### ▶️ Способ 2 — полный запуск (с бэкендом и генерацией PDF)

**Шаг 1.** Запустить фронтенд + json-server одновременно:
```
npm start
```
- Фронтенд → `http://localhost:5173`
- JSON Server (данные из `db.json`) → `http://localhost:8000/students`

**Шаг 2.** В отдельном терминале запустить Puppeteer-сервер:
```
cd .\puppeteer\
node .\server.js
```
- Puppeteer API → `http://localhost:8001`

После этого кнопка «Создать отчёт» сформирует PDF со скриншотами всех групп.

---

### 🔧 Стек технологий
- React + TypeScript — интерфейс
- Vite — сборка
- Puppeteer — генерация PDF
- Node.js + Express — серверная часть для PDF
- Consta UIKit — компонентная библиотека

