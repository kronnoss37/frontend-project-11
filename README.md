# 📰 RSS Reader — Веб-приложение для агрегации RSS-лент

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-26A69A)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)
![Async](https://img.shields.io/badge/Async-JavaScript-orange)
![Yup](https://img.shields.io/badge/Yup-Validation-blue)

#### Hexlet tests and linter status:

[![Actions Status](https://github.com/kronnoss37/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/kronnoss37/frontend-project-11/actions)
<!-- Badges -->
[![CI](https://github.com/kronnoss37/frontend-project-11/actions/workflows/ci.yml/badge.svg)](https://github.com/kronnoss37/frontend-project-11/actions/workflows/ci.yml)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=kronnoss37_frontend-project-11&metric=bugs)](https://sonarcloud.io/summary/new_code?id=kronnoss37_frontend-project-11)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=kronnoss37_frontend-project-11&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=kronnoss37_frontend-project-11)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=kronnoss37_frontend-project-11&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=kronnoss37_frontend-project-11)

## 📘 Описание проекта

**RSS Reader** — это веб-приложение для агрегации RSS-потоков. Позволяет добавлять RSS-ленты, автоматически обновлять их и просматривать новые публикации в удобном интерфейсе.

Приложение решает задачу централизованного чтения новостей и обновлений из различных источников.  
Пользователь может добавить несколько RSS-лент, после чего приложение:

- регулярно запрашивает обновления
- автоматически добавляет новые записи
- помечает просмотренные статьи
- корректно обрабатывает ошибки загрузки

## ✨ Возможности

- ➕ Добавление неограниченного количества RSS-лент  
- 🔄 Автоматическое обновление контента  
- ✔️ Добавление новых записей в общий поток
- 👀 Отметка прочитанных публикаций  
- 🪟 Просмотр статьи в модальном окне или через переход по ссылке  
- ⚠️ Обработка ошибок сети и некорректных RSS  

## 🛠 Используемые технологии

- JavaScript (ES6+)
- Axios
- Yup
- Bootstrap
- i18next
- Vite

## 🌐 Демо

#### 👉 [Открыть приложение в браузере](https://frontend-project-11-gules-nine.vercel.app/)

## 🚀 Установка и запуск

```bash
# Clone the repository
git clone https://github.com/kronnoss37/frontend-project-11.git

# Navigate to the project directory
cd frontend-project-11

# Install dependencies for the program to work correctly
make install

# Running the app in development mode
make run

# Build the project
make build
```

## 👤 Автор

#### Kirill — Frontend Developer