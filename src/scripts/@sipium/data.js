export const ACTIVE_GATES_RATE = 100 / 39
export const ACTIVATION_WEIGHT_MULTIPLIER = 4

export const PLUS_MINUS_PROTEINS_DEFICIT = 150
export const PLUS_MINUS_FATS_DEFICIT = 80
export const PLUS_MINUS_CARBS_DEFICIT = 70

export const PLUS_MINUS_PROTEINS_CUT = 190
export const PLUS_MINUS_FATS_CUT = 50
export const PLUS_MINUS_CARBS_CUT = 70

export const DEFAULT_MULTIPLIER = 4.1
export const FATS_MULTIPLIER = 9.29

export const centers = [
  { ru: 'темя' },
  { ru: 'аджна' },
  { ru: 'горло' },
  { ru: 'джи' },
  { ru: 'корень' },
  { ru: 'сакрал' },
  { ru: 'селезенка' },
  { ru: 'эго' },
  { ru: 'эмоции' }
]

export const physiologyArr = [
  {
    id: 1,
    ru: 'печень, энергия чи'
  },
  {
    id: 2,
    ru: 'грудина'
  },
  {
    id: 3,
    ru: 'пупок'
  },
  {
    id: 4,
    ru: 'щитовидная железа'
  },
  {
    id: 5,
    ru: 'грудь (сердце)'
  },
  {
    id: 6,
    ru: 'щитовидная железа, глаза'
  },
  {
    id: 7,
    ru: 'тонкая кишка'
  },
  {
    id: 8,
    ru: 'продолговатый мозг'
  },
  {
    id: 9,
    ru: 'солнечное сплетение'
  },
  {
    id: 10,
    ru: 'неокортекс'
  },
  {
    id: 11,
    ru: 'печень'
  },
  {
    id: 12,
    ru: 'почки'
  },
  {
    id: 13,
    ru: 'сакральное сплетение'
  },
  {
    id: 14,
    ru: 'надпочечники'
  },
  {
    id: 15,
    ru: 'внутреннее ухо'
  },
  {
    id: 16,
    ru: 'желчный пузырь'
  },
  {
    id: 17,
    ru: 'краниальные ганглии'
  },
  {
    id: 18,
    ru: 'толстая кишка'
  },
  {
    id: 19,
    ru: 'шишковидная железа'
  },
  {
    id: 20,
    ru: 'крестцовое сплетение'
  },
  {
    id: 21,
    ru: 'лимфатическая система'
  },
  {
    id: 22,
    ru: 'волосы'
  },
  {
    id: 23,
    ru: 'промежность'
  },
  {
    id: 24,
    ru: 'селезенка'
  },
  {
    id: 25,
    ru: 'мочеполовая диафрагма'
  },
  {
    id: 26,
    ru: 'копчик'
  },
  {
    id: 99,
    ru: 'Неизвестно !!!'
  }
]

export const activityLevels = [
  {
    id: 1,
    ru: 'Без зала',
    rate: 1
  },
  {
    id: 2,
    ru: '2-3 раза в неделю, не силовые',
    rate: 1.2
  },
  {
    id: 3,
    ru: '3-4 раза в неделю, по часу',
    rate: 1.375
  },
  {
    id: 4,
    ru: '3-4 раза в неделю, по 1.5-2 часа',
    rate: 1.55
  },
  {
    id: 5,
    ru: 'Каждый день в зале, интенсивно',
    rate: 1.725
  },
  {
    id: 6,
    ru: 'Две тренировки в день',
    rate: 1.9
  }
]

export const calorieDiet = [
  {
    id: 1,
    ru: 'Стандарт',
    rate: 1
  },
  {
    id: 2,
    ru: 'Дефицит',
    rate: 0.8
  },
  {
    id: 3,
    ru: 'Сушка',
    rate: 0.7
  }
]

export const sinusoidCalorieDaysWeek = [
  {
    id: 1,
    ru: 'Понедельник',
    rate: 1
  },
  {
    id: 2,
    ru: 'Вторник',
    rate: 0.8
  },
  {
    id: 3,
    ru: 'Среда',
    rate: 1.2
  },
  {
    id: 4,
    ru: 'Четверг',
    rate: 1
  },
  {
    id: 5,
    ru: 'Пятница',
    rate: 0.9
  },
  {
    id: 6,
    ru: 'Суббота',
    rate: 1.1
  },
  {
    id: 7,
    ru: 'Воскресенье',
    rate: 1
  }
]

export const acidsInFood = [
  {
    id: 1,
    ru: 'L-Аланин',
    pills: 4.22,
    chicken: 1.313
  },
  {
    id: 2,
    ru: 'L-Аргинин',
    pills: 2.56,
    chicken: 1.521
  },
  {
    id: 3,
    ru: 'L-Аспарагиновая Кислота',
    pills: 9.58,
    chicken: 2.116
  },
  {
    id: 4,
    ru: 'L-Цистеин',
    pills: 2.01,
    chicken: 0.236
  },
  {
    id: 5,
    ru: 'L-Глутаминовая Кислота',
    pills: 17.28,
    chicken: 3.333
  },
  {
    id: 6,
    ru: 'L-Глицин',
    pills: 1.61,
    chicken: 0.996
  },
  {
    id: 7,
    ru: 'L-Гистидин',
    pills: 1.65,
    chicken: 0.839
  },
  {
    id: 8,
    ru: 'L-Изолейцин',
    pills: 6.12,
    chicken: 1.104
  },
  {
    id: 9,
    ru: 'L-Лейцин',
    pills: 12.84,
    chicken: 1.861
  },
  {
    id: 10,
    ru: 'L-Лизин',
    pills: 9.81,
    chicken: 2.163
  },
  {
    id: 11,
    ru: 'L-Метионин',
    pills: 1.83,
    chicken: 0.585
  },
  {
    id: 12,
    ru: 'L-Фенилаланин',
    pills: 2.68,
    chicken: 0.908
  },
  {
    id: 13,
    ru: 'L-Пролин',
    pills: 5.01,
    chicken: 0.715
  },
  {
    id: 14,
    ru: 'L-Серин',
    pills: 4.68,
    chicken: 0.858
  },
  {
    id: 15,
    ru: 'L-Треонин',
    pills: 6.02,
    chicken: 1.009
  },
  {
    id: 16,
    ru: 'L-Триптофан',
    pills: 1.57,
    chicken: 0.283
  },
  {
    id: 17,
    ru: 'L-Тирозин',
    pills: 2.96,
    chicken: 0.81
  },
  {
    id: 18,
    ru: 'L-Валин',
    pills: 7.12,
    chicken: 1.165
  }
]
