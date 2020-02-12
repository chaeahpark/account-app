// Income class to create income objects.
class Income {
  constructor(envelop, amount, date) {
    this.envelop = envelop;
    this.amount = amount;
    this.date = date;
    this.id = this.generateKey();
  }
  generateKey() {
    return (
      "_" +
      Math.random()
      .toString(36)
      .substr(2, 9)
    );
  }
}

// Expense class to create expense objects.
class Expense {
  constructor(envelop, amount, date) {
    this.envelop = envelop;
    this.amount = amount;
    this.date = date;
    this.id = this.generateKey();
  }
  generateKey() {
    return (
      "_" +
      Math.random()
      .toString(36)
      .substr(2, 9)
    );
  }
}

// UI class dealing with UI.
class UI {
  // Display income on the list
  static displayIncome() {
    const incomes = Store.getIncomes();

    incomes.forEach(income => {
      UI.addIncomeToList(income);
    });
  }

  static addIncomeToList(income) {
    const incomeList = document.querySelector("#income-list");
    const row = document.createElement("tr");

    row.className = "tb-row";
    row.id = income.id;
    row.innerHTML = `
    <td>${income.envelop}</td>
    <td align="right" class="income-amount">€${income.amount}</td>
    <td>${income.date}</td>
    <td align="center"><a class="deleteBtn" href="#">X</a></td>
    `;
    incomeList.appendChild(row);
  }

  // Display total income on the list.
  static displayTotalIncome() {
    const incomes = Store.getIncomes();
    const incomeAmountArr = incomes.map(income => Number(income.amount));
    UI.addTotalIncomeToList(incomeAmountArr);
  }

  static addTotalIncomeToList(arr) {
    const totalIncomeList = document.getElementById("total-income");
    const totalIncomeAmount = arr.reduce((acc, income) => {
      return acc + income;
    });
    totalIncomeList.innerHTML = `Total: € <span id="totalIncomeAmount">${totalIncomeAmount}</span>`;
  }

  // Display expense on the list
  static displayExpense() {
    const expenses = Store.getExpense();

    expenses.forEach(expense => {
      UI.addExpenseToList(expense);
    });
  }

  static addExpenseToList(expense) {
    const expenseList = document.querySelector("#expense-list");
    const row = document.createElement("tr");
    row.className = "tb-row";
    row.id = expense.id;
    row.innerHTML = `
      <td>${expense.envelop}</td>
      <td align="right">€${expense.amount}</td>
      <td>${expense.date}</td>
      <td align="center"><a class="deleteBtn" href="#">X</a></td>
      `;
    expenseList.appendChild(row);
  }

  // Display total expense on the list.
  static displayTotalExpense() {
    const expenses = Store.getExpense();
    const expenseAmountArr = expenses.map(expense => Number(expense.amount));
    UI.addTotalExpenseToList(expenseAmountArr);
  }

  static addTotalExpenseToList(arr) {
    const totalExpenseList = document.getElementById("total-expense");
    const totalExpenseAmount = arr.reduce((acc, expense) => {
      return acc + expense;
    });
    totalExpenseList.innerHTML = `Total: € <span id="totalExpenseAmount">${totalExpenseAmount}<span>`;
  }

  // Display balance on the list.
  static displayBalance() {
    const totalIncome = Number(
      document.getElementById("totalIncomeAmount").textContent
    );
    const totalExpense = Number(
      document.getElementById("totalExpenseAmount").textContent
    );
    const balance = totalIncome - totalExpense;
    const balanceList = document.getElementById("balanceAmount");
    balanceList.innerHTML = `€ <span>${balance}</span>`;

    if (balance >= 0) {
      document.querySelector("#balanceAmount").style.color = "#05b9f0";
    } else if (balance < 0) {
      document.querySelector("#balanceAmount").style.color = "#ff562b"
    }
  }

  // Show an alert message.
  static showAlert(msg, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.textContent = msg;
    const container = document.querySelector(".container");
    const input = document.querySelector(".input");
    container.insertBefore(div, input);
    // vanish in 3 sec
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  // Clear all fields after submit the form.
  static clearFields() {
    document.getElementById("category").firstChild.value = "default";
    document.getElementById("envelop").value = "";
    document.getElementById("amount").value = null;
    document.getElementById("date").value = "";
  }

  // Remove the item from the list.
  static deleteItemFromList(elem) {
    if (elem.className === "deleteBtn") {
      elem.parentElement.parentElement.remove();
    }
  }
}

// Store class for the local storage.
class Store {
  // Get income
  static getIncomes() {
    let incomes;
    // If there is no income,
    // set it as an empty array.
    if (localStorage.getItem("incomes") === null) {
      incomes = [];
    }
    // If there is any income,
    // get the value of the key 'incomes'
    else {
      incomes = JSON.parse(localStorage.getItem("incomes"));
    }
    return incomes;
  }

  // Add income to the local storage
  static addIncome(income) {
    const incomes = Store.getIncomes();
    incomes.push(income);
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }

  // Remove income from the local storage.
  static removeIncome(elem) {
    const incomes = Store.getIncomes();
    incomes.forEach((income, index) => {
      if (income.id === elem.parentElement.parentElement.id) {
        incomes.splice(index, 1);
      }
    });
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }

  // Get expense from the local storage.
  static getExpense() {
    let expenses;
    // If the key 'expenses' is empty,
    // set it as an empty array.
    if (localStorage.getItem("expenses") === null) {
      expenses = [];
    }
    // If the key 'expenses' is not empty,
    // get the value with the key of 'expenses'
    else {
      expenses = JSON.parse(localStorage.getItem("expenses"));
    }
    return expenses;
  }

  // Add expense to the local storage.
  static addExpense(expense) {
    const expenses = Store.getExpense();
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  // Remove expense from the local storage.
  static removeExpense(elem) {
    const expenses = Store.getExpense();
    expenses.forEach((expense, index) => {
      if (expense.id === elem.parentElement.parentElement.id) {
        expenses.splice(index, 1);
      }
    });
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
}

// Events
// Global variables for events.
const form = document.querySelector(".input__form");
const deleteBtn = document.querySelectorAll(".deleteBtn");
const incomeList = document.querySelector("#income-list");
const expenseList = document.querySelector("#expense-list");

// When the document is loaded
document.addEventListener("DOMContentLoaded", () => {
  UI.displayIncome();
  UI.displayTotalIncome();
  UI.displayExpense();
  UI.displayTotalExpense();
  UI.displayBalance();
});
// When the 'add' button is clicked
form.addEventListener("submit", e => {
  e.preventDefault();
  const category = document.getElementById("category").value;
  const envelop = document.getElementById("envelop").value;
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;

  // Validate the form
  if (category === "" || envelop === "" || amount === "" || date === "") {
    UI.showAlert("Please fill in all fields", "danger");
  }
  //Instantiate income and expense
  else if (category === "income" && envelop && amount && date) {
    const income = new Income(envelop, amount, date);
    UI.addIncomeToList(income);
    Store.addIncome(income);
    UI.displayTotalIncome();
    UI.displayBalance();
    UI.showAlert("The item added.", "success");
  } else if (category === "expense" && envelop && amount && date) {
    const expense = new Expense(envelop, amount, date);
    UI.addExpenseToList(expense);
    Store.addExpense(expense);
    UI.displayTotalExpense();
    UI.displayBalance();
    UI.showAlert("The item added.", "success");
  }

  // Clear input fields
  UI.clearFields();
});

// When the remove button(x) is clicked
incomeList.addEventListener("click", e => {
  UI.deleteItemFromList(e.target);
  Store.removeIncome(e.target);
  UI.displayTotalIncome();
  UI.displayBalance();
  UI.showAlert("The item removed.", "success");
});

expenseList.addEventListener("click", e => {
  UI.deleteItemFromList(e.target);
  Store.removeExpense(e.target);
  UI.displayTotalExpense();
  UI.displayBalance();
  UI.showAlert("The item removed.", "success");
});