import chalk from 'chalk';
import dayjs from 'dayjs';

enum Privilege {
  VVIP = 'VVIP',
  VIP = 'VIP'
}

class People {
  constructor(
    public name: string,
    public age: number,
    public gender: string,
    public dob: Date,
    public privilege?: Privilege
  ) {}
}

interface Item {
  name: string;
  type: string;
  price: number;
}

interface Discount {
  value: number;
  type: 'flat' | 'percent';
}

interface BasketItem {
  item: Item;
  name: string;
  price: number;
  amount: number;
  total: number;
  applied?: boolean;
}

interface ConditionItem {
  field: string;
  type: string;
  condition: string;
  valueToBeCompared?: any;
}

interface Tariff {
  title: string;
  description: string;
  patientConditions?: ConditionItem[];
  itemConditions?: ConditionItem[];
  startDate: Date;
  endDate: Date;
}

// =============================== ITEM LIST =======================================

const itemList: Item[] = [
  {
    name: 'Paracetamal',
    type: 'medicine',
    price: 100
  },
  {
    name: 'Aspirine',
    type: 'medicine',
    price: 1000
  },
  {
    name: 'Arm Slings',
    type: 'medical supply',
    price: 100
  },
  {
    name: 'Athletic Supporters',
    type: 'medical supply',
    price: 1000
  },
  {
    name: 'Vitamin A',
    type: 'vitamin & mineral',
    price: 100
  },
  {
    name: 'Vitamin C',
    type: 'vitamin & mineral',
    price: 1000
  },
  {
    name: 'Anxiety Therapy',
    type: 'therapy service',
    price: 100
  },
  {
    name: 'Trauma Counseling',
    type: 'therapy service',
    price: 1000
  },
  {
    name: 'Dr. Hannibal Lecter',
    type: 'doctor fee',
    price: 100
  },
  {
    name: 'Dr. James Fallon',
    type: 'doctor fee',
    price: 1000
  },
];

// ======================================================================
// =============================== PATIENT LIST =======================================

const peopleList: People[] = [
  new People('Anuchit', 61, 'male', new Date(1960, 0, 1)), // 0
  new People('Boonyarit', 51, 'male', new Date(1970, 1, 2), Privilege.VVIP), // 1
  new People('Chalermpon', 51, 'male', new Date(1970, 11, 3)), // 2
  new People('Dharinee', 41, 'female', new Date(1980, 3, 4)), // 3
  new People('Emorn', 41, 'female', new Date(1980, 4, 5)), // 4
  new People('Falida', 36, 'female', new Date(1985, 5, 6), Privilege.VIP), // 5
  new People('Giat', 31, 'male', new Date(1990, 6, 7)), // 6
  new People('Hattaya', 21, 'female', new Date(2000, 7, 8), Privilege.VIP), // 7
  new People('Ittirit', 17, 'male', new Date(2004, 8, 9)), // 8
  new People('Jetsada', 16, 'male', new Date(2005, 9, 10), Privilege.VVIP), // 9
];

// ======================================================================
// =============================== COMPARISON CONDITIONs =======================================

class Comparator {
  constructor(private operand: any) {}

  isEqual(field: string, target: string | number): boolean {
    return this.operand[field] === target;
  }

  isGreaterThan(field: string, target: number): boolean {
    return this.operand[field] > target;
  }

  isLessThan(field: string, target: number): boolean {
    return this.operand[field] < target;
  }

  isNot(field: string, target: string): boolean {
    return this.operand[field] !== target;
  }

  isIn(field: string, target: string[]): boolean {
    return target.includes(this.operand[field]);
  }

  isOlderThan(field: string, target: number): boolean {
    const date1 = dayjs(this.operand[field]);
    const diff = dayjs().diff(date1, 'year');
    return diff >= target;
  }

  isYoungerThan(field: string, target: number): boolean {
    const date1 = dayjs(this.operand[field]);
    const diff = dayjs().diff(date1, 'year');
    return diff < target;
  }

  isOnBirthMoth(field: string): boolean {
    return this.operand[field].getMonth() === (new Date()).getMonth();
  }
}

// ===========================================================================================
// =============================== SIMULATE ITEMS IN PATIENT'S BASKET =======================================

// Basket
const basket: BasketItem[] = [
  { item: itemList[0], name: itemList[0].name, price: itemList[0].price, amount: 10, total: 0, applied: false },
  { item: itemList[1], name: itemList[1].name, price: itemList[1].price, amount: 10, total: 0, applied: false },
  { item: itemList[2], name: itemList[2].name, price: itemList[2].price, amount: 10, total: 0, applied: false },
  { item: itemList[3], name: itemList[3].name, price: itemList[3].price, amount: 10, total: 0, applied: false },
  { item: itemList[4], name: itemList[4].name, price: itemList[4].price, amount: 10, total: 0, applied: false },
  { item: itemList[5], name: itemList[5].name, price: itemList[5].price, amount: 10, total: 0, applied: false },
  { item: itemList[6], name: itemList[6].name, price: itemList[6].price, amount: 1, total: 0, applied: false },
  { item: itemList[7], name: itemList[7].name, price: itemList[7].price, amount: 1, total: 0, applied: false },
  { item: itemList[8], name: itemList[8].name, price: itemList[8].price, amount: 1, total: 0, applied: false },
  { item: itemList[9], name: itemList[9].name, price: itemList[9].price, amount: 1, total: 0, applied: false },
];

// ===========================================================================================
// ============================== TARIFF LIST <pick any you wanna test at performConditionsApply() > ========================================

const middleAgedManTariff: Tariff = {
  title: 'Middle Aged Man Tariff',
  description: 'Applies to men above 40 on medicine & doctor fee',
  patientConditions: [
    { field: 'dob', type: 'patient', condition: 'isOlderThan', valueToBeCompared: 40 }, // patient is older than 40
    { field: 'gender', type: 'patient', condition: 'isEqual', valueToBeCompared: 'male' }, // patient is older than 40
  ],
  itemConditions: [
    { field: 'type', type: 'item', condition: 'isIn', valueToBeCompared: ['medicine', 'doctor fee'] }, // item type is in this range
  ],
  startDate: new Date(2021, 11, 1),
  endDate: new Date(2021, 11, 31)
};

const birthMonthTariff: Tariff = {
  title: 'Birth Month Tariff',
  description: 'Applies to everyone who was born on current month',
  patientConditions: [
    { field: 'dob', type: 'patient', condition: 'isOnBirthMoth' }, // patient is older than 40
  ],
  itemConditions: [
    { field: 'type', type: 'item', condition: 'isIn', valueToBeCompared: ['medicine', 'doctor fee'] }, // item type is in this range
  ],
  startDate: new Date(2021, 11, 1),
  endDate: new Date(2021, 11, 31)
};

// ===========================================================================================
// =============================== CORE BUSINESS LOGIC =======================================

const checkDateValidity = (tariff) => {
  const result = isDateBetween(Date.now(), tariff);

  if (result) {
    console.log(`${chalk.green.bgWhiteBright('tariff:')} ${chalk.green(`"${tariff.title}"`)} is in active period`)
  } else {
    console.log(`${chalk.green.bgWhiteBright('tariff:')} ${chalk.green(`"${tariff.title}"`)} is not in active period`);
  }
  return result;
};

const checkPatientConditionsApply = (patient, tariff) => {
  if (!Array.isArray(tariff.patientConditions)) return true;

  const patientConditions = tariff.patientConditions.filter((item) => item.type === 'patient');

  const patientResult = patientConditions.map(c => {
    const cond = new Comparator(patient);
    return cond[c.condition](c.field, c.valueToBeCompared);
  }).every(i => i === true);

  if (patientResult) {
    console.log(`${chalk.red.bgWhiteBright('patient:')} ${chalk.red(`"${patient.name}"`)} has tariff apply`);
  } else {
    console.log(`${chalk.red.bgWhiteBright('patient:')} ${chalk.red(`"${patient.name}"`)} doesn't have tariff apply`);
  }

  return patientResult;
};

const checkItemConditionsApply = (list, tariff) => {
  if (!Array.isArray(tariff.itemConditions)) {
    const applyAllItems = list.map((l) => {
      l.applied = true;
      return l;
    });
    return applyAllItems;
  }

  const itemConditions = tariff.itemConditions.filter((item) => item.type === 'item');

  const result = list.map((item) => {
    const itemResult = itemConditions.map(c => {
      const cond = new Comparator(item.item);
      const booleanResult = cond[c.condition](c.field, c.valueToBeCompared);
      return booleanResult;
    }).every(i => i === true);

    item.applied = itemResult;

    return item;
  });

  return result;
};

// ======================================================================

const performConditionsApply = (patient, list, tariff) => {
  // Conditions apply
  const checkDateValidityResult = checkDateValidity(tariff);
  if (!checkDateValidityResult) return list;

  const checkPatientConditionsResult = checkPatientConditionsApply(patient, tariff);
  if (!checkPatientConditionsResult) return list;

  const checkItemConditionsResult = checkItemConditionsApply(list, tariff);

  return checkItemConditionsResult;
};

const isDateBetween = (dateTarget: number, tariff: Tariff): boolean => {
  return tariff.startDate.getTime() < dateTarget && dateTarget < tariff.endDate.getTime();
}

const getCoverageItem = performConditionsApply(peopleList[2], basket, middleAgedManTariff);

console.table(getCoverageItem);
