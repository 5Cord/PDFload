
# 📄 PDFLoader – Сервис сохранения страниц в PDF  
> 💡 *Задание по практике для ГПН (Газпромнефть)* 

# 💬 Описание  
**PDFLoader** — это удобный сервис, позволяющий сохранять веб-страницы в формате PDF. Подходит для последующей печати или архивации информации.

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
### ▶️ Запуск проекта
Запускает все необходимые сервисы одновременно:
- **Фронтенд-приложение** (Vite) → `http://localhost:5173/page`
- **Мок-сервер данные** (JSON Server) → `http://localhost:8000/`
- **Мок-сервер данные эндпоинт** (JSON Server) → `http://localhost:8000/students`


```
npm start 
```

### ▶️ Также запустим серверную часть
```
cd .\puppeteer\
node .\server.js
```
___



### 🔧 Стек технологий
- React — интерфейс

- TypeScript — типизация

- Puppeteer — генерация PDF

- Node.js + Express — серверная логика

- json-server — моковые данные

