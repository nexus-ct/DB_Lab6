import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Проєкт студентів ФІОТу",
  description: "Лабораторні",
  base:"/DB_Lab6/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Автори', link: '/authors' },
      { text: 'Вступ', link: '/vstup_1' },
    ],
    sidebar: [
      { text: 'Головна', link: '/' },
      { text: 'Автори', link: '/authors' },
      { text: 'Вступ', link: '/vstup_1' },
      { text: 'Аналіз предметної області', link: '/vstup' },
      { text: 'Запити зацікавлених осіб', link: '/zapity'},
      { text: 'Модель прецедентів', link: '/lab2'},
      { text: 'Проєктування інформаційного забезпечення: проєктування бази данних', link: '/lab3' },
      { text: 'Реалізація інформаційного та програмного забезпечення', link: '/lab5' },
      { text: 'RestFull сервіс для управління відкритими даними', link: '/software' },
      { text: 'Тестування працездатності системи', link: '/testing' },
      { text: 'Висновки', link: '/conclusion' },
    ],


    socialLinks: [
      { icon: 'github', link: 'https://github.com/nexus-ct/DB_Lab6.git' }
    ]
  }
})
