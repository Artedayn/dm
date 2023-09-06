export const MONTHS_RU = [
  {
    number: 1,
    numberString: '01',
    nameNominative: 'Январь',
    nameGenitive: 'Января',
  },
  {
    number: 2,
    numberString: '02',
    nameNominative: 'Февраль',
    nameGenitive: 'Февраля',
  },
  {
    number: 3,
    numberString: '03',
    nameNominative: 'Март',
    nameGenitive: 'Марта',
  },
  {
    number: 4,
    numberString: '04',
    nameNominative: 'Апрель',
    nameGenitive: 'Апреля',
  },
  {
    number: 5,
    numberString: '05',
    nameNominative: 'Май',
    nameGenitive: 'Мая',
  },
  {
    number: 6,
    numberString: '06',
    nameNominative: 'Июнь',
    nameGenitive: 'Июня',
  },
  {
    number: 7,
    numberString: '07',
    nameNominative: 'Июль',
    nameGenitive: 'Июля',
  },
  {
    number: 8,
    numberString: '08',
    nameNominative: 'Август',
    nameGenitive: 'Августа',
  },
  {
    number: 9,
    numberString: '09',
    nameNominative: 'Сентябрь',
    nameGenitive: 'Сентября',
  },
  {
    number: 10,
    numberString: '10',
    nameNominative: 'Октябрь',
    nameGenitive: 'Октября',
  },
  {
    number: 11,
    numberString: '11',
    nameNominative: 'Ноябрь',
    nameGenitive: 'Ноября',
  },
  {
    number: 12,
    numberString: '12',
    nameNominative: 'Декабрь',
    nameGenitive: 'Декабря',
  },
];

const monthsReg = MONTHS_RU.map(elem => elem.nameGenitive).join('|');
const monthsRegLower = MONTHS_RU.map(elem =>
  elem.nameGenitive.toLowerCase(),
).join('|');

export const MONTHS_RU_REG = monthsReg + '|' + monthsRegLower;
