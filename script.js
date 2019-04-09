const itemDescription = document.querySelector("#item-description");
const itemCost = document.querySelector("#item-cost");
const addButton = document.querySelector(".add-button");
const select = document.querySelector("select");
const option = document.querySelectorAll("option");
const incomeData = document.querySelector(".income-data");
const expenseData = document.querySelector(".expense-data");
const balanceResult = document.querySelector('.balance-result');
// =========================================================================
// CREATE OBJECT (ACCOUNT BALANCE)
const accountBalance = {
  name: 'Simon',
  lastName: 'Maher',
  incomes: [
    {
      description: "salary",
      amount: 2000,
      time: displayDateTime()
    },
    {
      description: "Bonus",
      amount: 500,
      time: displayDateTime()
    }
  ],
  expenses: [
    {
      description: "rent",
      amount: 7000,
      time: displayDateTime()
    },
    {
      description: "food",
      amount: 500,
      time: displayDateTime()
    }
  ],
  // ==========================================================================
  addIncome: function (description, amount) {
    let time = displayDateTime();
    this.incomes.push({ description, amount, time });

    let json = localStorage.getItem('incomes');
    const retreivedFromLocal = JSON.parse(json);
    retreivedFromLocal.push({ description, amount, time });
    localStorage.setItem(
      'incomes',
      JSON.stringify(retreivedFromLocal),
      undefined,
      2
    );

  },
  // ==============================================================================
  addExpense: function (description, amount) {
    let time = displayDateTime();
    this.expenses.push({ description, amount, time });

    let json = localStorage.getItem('expenses');
    const retreivedFromLocal = JSON.parse(json);
    retreivedFromLocal.push({ description, amount, time });
    localStorage.setItem(
      'expenses',
      JSON.stringify(retreivedFromLocal),
      undefined,
      4
    );

  },
  // ==============================================================================
  totalIncome: function () {
    let sum = 0;
    let dataIncome = JSON.parse(localStorage.getItem('incomes'))
    dataIncome.forEach(element => {
      sum = sum + element.amount;
    });
    return sum;
  },
  // ====================================
  totalExpense: function () {
    let sum = 0;
    let dataExpence = JSON.parse(localStorage.getItem('expenses'))
    dataExpence.forEach(element => {
      sum = sum + element.amount;
    })
    return sum;
  },
  // ====================================
  calculateBalance: function () {
    let balance = this.totalIncome() - this.totalExpense();
    return balanceResult.innerHTML = `Your current balance is ${balance}`;
  },
  // =====================================
  getIncomeData: function () {
    let dataIncome = JSON.parse(localStorage.getItem('incomes'));

    incomeData.innerHTML = '';
    let result = dataIncome.forEach(data => {

      incomeData.innerHTML += `<div class= "incomes"><p>${
        data.description
        }</p><br>
      <p>${data.amount}</p><br><p>${data.time}</p><br>
      </div>`;
    })
    return result

  },
  // =======================================================================================
  getExpenseData: function () {
    let dataExpense = JSON.parse(localStorage.getItem('expenses'));
    expenseData.innerHTML = '';
    let result = dataExpense.forEach(data => {
      expenseData.innerHTML += `<div class= "incomes"><p>${
        data.description
        }</p><br>
        <p>${data.amount}</p><br><p>${data.time}</p><br>
        </div>`;
    })
    return result;
  }
}
// =====================================================================================
addButton.addEventListener('click', function () {
  let selectedValue = select.options[select.selectedIndex].value;

  if (selectedValue === 'income') {
    accountBalance.addIncome(itemDescription.value, parseInt(itemCost.value))
  } else if (selectedValue === 'expense') {
    accountBalance.addExpense(itemDescription.value, parseInt(itemCost.value))
  } else {
    console.log('Please select an option');
  }
  accountBalance.getIncomeData();
  accountBalance.getExpenseData();
  accountBalance.calculateBalance();
  clearFields()
})
// =============================================================================
function displayDateTime() {
  var myDate = new Date();

  var dd = myDate.getDate();
  var mm = myDate.getMonth() + 1;
  var yyyy = myDate.getFullYear();
  // var mytime = myDate.getTime();
  var hrs = myDate.getHours();
  var min = myDate.getMinutes();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  var setDate = `${dd}/${mm}/${yyyy} ${hrs}:${min}`;

  return setDate;
}
// =========================================================================
if (localStorage.length === 0 || localStorage.length == null) {
  localStorage.setItem('incomes', JSON.stringify(accountBalance.incomes, undefined, 2));
  localStorage.setItem('expenses', JSON.stringify(accountBalance.expenses, undefined, 2));
} else {
  accountBalance.getIncomeData();
  accountBalance.getExpenseData();
  accountBalance.calculateBalance();
}


function clearFields() {
  itemDescription.value = '';
  itemCost.value = '';
  select.value = 'select';

}
