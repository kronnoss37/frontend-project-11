export default {
  translation: {
    appItems: {
      title: 'RSS агрегатор',
      description: 'Начните читать RSS сегодня! Это легко, это красиво.',
      label: 'Ссылка RSS',
      submitButton: 'Добавить',
      example: 'Пример: https://lorem-rss.hexlet.app/feed',
    },
    errors: {
      validation: {
        required: 'Данное поле являестя обязательным...',
        duplicated: 'Введенный RSS-адрес уже существует...',
        incorrecredUrl: 'Введенный RSS-адрес должен быть валидным Url...',
      },
    },
    processStates: {
      success: 'RSS успешно загружен',
      fail: 'Ресурс не содержит валидный RSS',
    },
  },
}
