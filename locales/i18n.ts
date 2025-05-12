import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Инициализация i18next
i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: {
        title: 'Вход в систему',
        selectRole: 'Выберите роль',
        selectScenario: 'Выберите сценарий',
        selectLanguage: 'Выберите язык',
        login: 'Войти',
        client: 'Клиент',
        staff: 'Сотрудник банка',
        ideal: 'Идеальный клиент - Одобрение',
        gray: 'Пограничный случай - Доп. проверка',
        reject: 'Заявка с проблемами - Отказ',
        error: 'Технический сбой - Ошибка',
        scenarioDescription: {
          ideal: 'Клиент с идеальной кредитной историей. Заявка обрабатывается быстро и одобряется автоматически.',
          gray: 'Клиент с некоторыми рисками. Заявка требует дополнительной проверки и решения андеррайтера.',
          reject: 'Клиент с негативной кредитной историей. Высокий риск, заявка будет отклонена.',
          error: 'Демонстрация сценария технической ошибки при обработке заявки.'
        },
        common: {
          appName: 'Демо Платформа Залогового Кредитования',
          staffPortal: 'Портал Сотрудника',
          home: 'Главная',
          loading: 'Загрузка...',
          error: 'Произошла ошибка',
          success: 'Успешно',
          cancel: 'Отмена',
          save: 'Сохранить',
          delete: 'Удалить',
          edit: 'Редактировать',
          search: 'Поиск',
          filter: 'Фильтр',
          reset: 'Сбросить',
          status: 'Статус',
          actions: 'Действия',
          all: 'Все',
          none: 'Нет данных',
          details: 'Подробнее',
          back: 'Назад'
        },
        navigation: {
          dashboard: 'Панель управления',
          application: 'Заявка',
          applications: 'Заявки',
          newApplication: 'Новая заявка',
          applicationDetails: 'Детали заявки',
          staff: 'Сотрудники',
          about: 'О системе',
          settings: 'Настройки'
        },
        auth: {
          logout: 'Выйти',
          register: 'Регистрация',
          forgotPassword: 'Забыли пароль?',
          username: 'Имя пользователя',
          password: 'Пароль',
          email: 'Email',
          role: 'Роль',
          scenario: 'Сценарий',
          idealScenario: 'Идеальный клиент',
          grayScenario: 'Пограничный случай',
          rejectScenario: 'Отказ по заявке',
          errorScenario: 'Технический сбой'
        },
        application: {
          product: 'Продукт',
          mortgage: 'Ипотека',
          autoloan: 'Автокредит',
          amount: 'Сумма кредита',
          term: 'Срок кредита',
          payment: 'Ежемесячный платеж',
          rate: 'Процентная ставка',
          personalData: 'Личные данные',
          documents: 'Документы',
          review: 'Проверка заявки',
          submit: 'Отправить заявку',
          draft: 'Черновик',
          submitted: 'Отправлена',
          scoring: 'Скоринг',
          underwriting: 'Андеррайтинг',
          approved: 'Одобрена',
          rejected: 'Отклонена',
          issued: 'Выдан кредит',
          calcParams: 'Параметры кредита'
        },
        staffSection: {
          underwriting: 'Андеррайтинг',
          riskAssessment: 'Оценка рисков',
          requestDocs: 'Запрос документов',
          decision: 'Решение',
          approve: 'Одобрить',
          reject: 'Отклонить',
          comment: 'Комментарий',
          highRisk: 'Высокий риск',
          lowRisk: 'Низкий риск',
          scoreRecommendation: 'Рекомендация по скорингу',
          additionalDocs: 'Дополнительные документы',
          issueCredit: 'Выдать кредит'
        },
        visualization: {
          systemArchitecture: 'Архитектура системы',
          processFlow: 'Процесс обработки заявки',
          activeServices: 'Активные сервисы',
          dataFlow: 'Поток данных',
          startFlow: 'Запустить поток',
          stopFlow: 'Остановить поток'
        }
      }
    },
    en: {
      translation: {
        title: 'System Login',
        selectRole: 'Select Role',
        selectScenario: 'Select Scenario',
        selectLanguage: 'Select Language',
        login: 'Login',
        client: 'Client',
        staff: 'Bank Employee',
        ideal: 'Ideal Client - Approval',
        gray: 'Borderline Case - Additional Check',
        reject: 'Problematic Application - Rejection',
        error: 'Technical Error - Failure',
        scenarioDescription: {
          ideal: 'Client with perfect credit history. Application is processed quickly and approved automatically.',
          gray: 'Client with some risk factors. Application requires additional verification and underwriter decision.',
          reject: 'Client with negative credit history. High risk, application will be rejected.',
          error: 'Demonstration of a technical error scenario during application processing.'
        },
        common: {
          appName: 'Demo Pledge Lending Platform',
          staffPortal: 'Staff Portal',
          home: 'Home',
          loading: 'Loading...',
          error: 'An error occurred',
          success: 'Success',
          cancel: 'Cancel',
          save: 'Save',
          delete: 'Delete',
          edit: 'Edit',
          search: 'Search',
          filter: 'Filter',
          reset: 'Reset',
          status: 'Status',
          actions: 'Actions',
          all: 'All',
          none: 'No data',
          details: 'Details',
          back: 'Back'
        },
        navigation: {
          dashboard: 'Dashboard',
          application: 'Application',
          applications: 'Applications',
          newApplication: 'New Application',
          applicationDetails: 'Application Details',
          staff: 'Staff',
          about: 'About',
          settings: 'Settings'
        },
        auth: {
          logout: 'Logout',
          register: 'Register',
          forgotPassword: 'Forgot Password?',
          username: 'Username',
          password: 'Password',
          email: 'Email',
          role: 'Role',
          scenario: 'Scenario',
          idealScenario: 'Ideal Client',
          grayScenario: 'Borderline Case',
          rejectScenario: 'Application Rejection',
          errorScenario: 'Technical Error'
        },
        application: {
          product: 'Product',
          mortgage: 'Mortgage',
          autoloan: 'Auto Loan',
          amount: 'Loan Amount',
          term: 'Loan Term',
          payment: 'Monthly Payment',
          rate: 'Interest Rate',
          personalData: 'Personal Data',
          documents: 'Documents',
          review: 'Application Review',
          submit: 'Submit Application',
          draft: 'Draft',
          submitted: 'Submitted',
          scoring: 'Scoring',
          underwriting: 'Underwriting',
          approved: 'Approved',
          rejected: 'Rejected',
          issued: 'Loan Issued',
          calcParams: 'Loan Parameters'
        },
        staffSection: {
          underwriting: 'Underwriting',
          riskAssessment: 'Risk Assessment',
          requestDocs: 'Request Documents',
          decision: 'Decision',
          approve: 'Approve',
          reject: 'Reject',
          comment: 'Comment',
          highRisk: 'High Risk',
          lowRisk: 'Low Risk',
          scoreRecommendation: 'Scoring Recommendation',
          additionalDocs: 'Additional Documents',
          issueCredit: 'Issue Loan'
        },
        visualization: {
          systemArchitecture: 'System Architecture',
          processFlow: 'Application Processing Flow',
          activeServices: 'Active Services',
          dataFlow: 'Data Flow',
          startFlow: 'Start Flow',
          stopFlow: 'Stop Flow'
        }
      }
    }
  },
  lng: 'ru', // Язык по умолчанию
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false // React уже экранирует
  }
});

export default i18n; 