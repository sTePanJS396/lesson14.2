'use strict'

const button = document.getElementById('start');
button.disabled = true;
// Кнопка "Рассчитать"
const buttonTagOne = document.querySelector('.income_add');
// Первый "Плюсик"
const buttonTagTwo = document.querySelector('.expenses_add');
// Второй "Плюсик"
const checkBox = document.querySelector('#deposit-check');
// Чекбокс
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
// Поля для ввода возможных доходов
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
// Дневной бюджет
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
// Расход за месяц
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
// Возможные доходы
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
// Возможные расходы
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
// Накопления за период
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
// Срок достижения цели в месяцах
const salaryAmount = document.querySelector('.salary-amount');
// Месячный доход
const incomeTitle = document.querySelector('.income-title1');
const incomeAmount = document.querySelector('.income-amount')
// Дополнительный доход/Наименование
// Дополнительный доход/Сумма
const expensesTitle = document.querySelector('.expenses-title1');
// Обязательные расходы/Наименование
const expensesAmount = document.querySelector('.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
// Обязательные расходы/Сумма
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
// Возможные расходы
const depositCheck = document.querySelector('#deposit-check');
// Чекбокс депозит
const periodSelect = document.querySelector('.period-select');
// Range 
const budgetMonthValue = document.querySelector('.budget_month-value');
const targetAmount = document.querySelector('.target-amount');
let incomeItems = document.querySelectorAll('.income-items');
const periodAmout = document.querySelector('.period-amount');
const buttonCancel = document.querySelector('#cancel');
const input = document.querySelectorAll('input');
const inputValueText = document.querySelectorAll('input[type=text]');

salaryAmount.addEventListener('input', () => {
    button.disabled = false;
});

const AppData = function () {
    this.income =  {};
    this.addIncome =  [];
    this.incomeMonth =  0;
    this.expenses =  {};
    this.addExpenses =  [];
    this.deposit =  false;
    this.percentDeposit =  0;
    this.moneyDeposit =  0;
    this.budget =  0;
    this.budgetMonth =  0;
    this.expensesMonth =  0;
    this.periodSelects =  0;
}

AppData.prototype.start = function () {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.expMonth();
    this.whyBudgetDay();
    this.getAddExpenses();
    this.getAddIncome();
    this.addPeriodSelect();
    this.getTargetMonth();
    this.getBudget();
    this.showResult();
};

AppData.prototype.showResult = function () {
    budgetMonthValue.value = +this.budgetMonth;
    budgetDayValue.value = this.whyBudgetDay();
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    periodSelect.addEventListener('input', () => {
        incomePeriodValue.value = this.calcSavedMoney();
    });
    targetMonthValue.value = this.getTargetMonth(); //Math.round(targetAmount.value / appData.budgetMonth); 
    incomePeriodValue.value = this.calcSavedMoney();

};

AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonTagTwo);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        buttonTagTwo.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function () {
    let cloneItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneItem, buttonTagOne);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        buttonTagOne.style.display = 'none';
    }
};

AppData.prototype.getAddExpenses = function () {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item)
        } 
    });
};

AppData.prototype.getAddIncome =  function () {
    const _this = this;
    additionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        } 
    });
};

AppData.prototype.getExpenses = function () {
    const _this = this;
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title1').value;
        let cashExpenses = +item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};

AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title1').value;
        let cashIncome = +item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }

        let result = 0;
        for (let key in _this.income) {
            result += +_this.income[key];
        };
        _this.incomeMonth = +result;
    });    
};

AppData.prototype.addPeriodSelect = function () {
    const _this = this;
    periodAmout.textContent = periodSelect.value;
    _this.periodSelects = +periodSelect.value;
};

AppData.prototype.whyBudgetDay = function() {
    return Math.floor(appData.budgetMonth / 30);
};

AppData.prototype.expMonth = function () {
    const _this = this;
    let res = 0;
    for (let key in _this.expenses) {
        res += _this.expenses[key];
    }
    return _this.expensesMonth = res;
};

AppData.prototype.getBudget =  function() {
    const _this = this;
    _this.budgetMonth = +(this.budget + this.incomeMonth) - this.expensesMonth;
};

AppData.prototype.getTargetMonth =  function() {
    return Math.round(targetAmount.value / this.budgetMonth);    
};

AppData.prototype.getBudgetDay =  function() {
    return Math.floor(this.getBudget() / 30);
};

AppData.prototype.calcSavedMoney =  function () {
    return this.budgetMonth * this.periodSelects;
};

AppData.prototype.blocking =  function () {
    button.style.display = 'none';
    buttonCancel.style.display = 'block';
    inputValueText.forEach(item => {
        item.disabled = true;
    });
};

AppData.prototype.reset =  function () {
    inputValueText.forEach(item => {
        item.value = '';
    });
    buttonCancel.style.display = 'none';
    button.style.display = 'block';
    inputValueText.forEach(item => {
        item.disabled = false;
    });
    periodSelect.value = 1;
    periodAmout.textContent = '1';
};

AppData.prototype.eventListeners = function () {
    const _this = this;
    button.addEventListener('click',  appData.start.bind(appData));
    button.addEventListener('click', _this.blocking);
    buttonCancel.addEventListener('click', _this.reset);
    buttonTagTwo.addEventListener('click', _this.addExpensesBlock);
    buttonTagOne.addEventListener('click', _this.addIncomeBlock);
    periodSelect.addEventListener('input', _this.addPeriodSelect);
};


const appData = new AppData();
AppData.prototype.eventListeners();
// console.log(appData);
