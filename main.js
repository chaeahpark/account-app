// const header = document.querySelector(".header"); // Get the navbar
// const sticky = header.offsetTop; // Get the offset position of the navbar

// // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
// const addStickyClass = () => {
//   if (window.pageYOffset >= sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// };

// // When the user scrolls the page, execute myFunction
// window.onscroll = function() {
//   addStickyClass();
// };
const form = document.querySelector(".input__form");
const deleteBtn = document.querySelectorAll(".deleteBtn");
const incomeList = document.querySelector("#income-list");
const expenseList = document.querySelector("#expense-list");

//Income List
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

//Expense List
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

//UI class
class UI {
  // display income list
  static displayIncome() {
    const incomes = Store.getIncomes();

    incomes.forEach(income => {
      console.log(income);
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
    <td class="income-amount">${income.amount}</td>
    <td>${income.date}</td>
    <td><a class="deleteBtn" href="#">X</a></td>
    `;
    incomeList.appendChild(row);
  }

  // display total income
  static displayTotalIncome() {
    const incomes = Store.getIncomes();
    let incomeAmountArr = incomes.map(income => Number(income.amount));
    UI.addTotalIncomeToList(incomeAmountArr);
  }

  static addTotalIncomeToList(arr) {
    const totalIncomeList = document.getElementById("total-income");
    const totalIncomeAmount = arr.reduce((acc, income) => {
      return acc + income;
    });
    totalIncomeList.innerHTML = `<p>Total: € <span id="totalIncomeAmount">${totalIncomeAmount}</span></p>`;
  }

  // display expense list
  static displayExpense() {
    const expenses = Store.getExpense();

    expenses.forEach(expense => {
      UI.addExpenseToList(expense);
    });
  }

  //add expense to list
  static addExpenseToList(expense) {
    const expenseList = document.querySelector("#expense-list");
    const row = document.createElement("tr");
    row.className = "tb-row";
    row.id = expense.id;
    row.innerHTML = `
      <td>${expense.envelop}</td>
      <td>${expense.amount}</td>
      <td>${expense.date}</td>
      <td><a class="deleteBtn" href="#">X</a></td>
      `;
    expenseList.appendChild(row);
  }

  //display total expense
  static displayTotalExpense() {
    const expenses = Store.getExpense();
    let expenseAmountArr = expenses.map(expense => Number(expense.amount));
    UI.addTotalExpenseToList(expenseAmountArr);
  }

  static addTotalExpenseToList(arr) {
    const totalExpenseList = document.getElementById("total-expense");
    const totalExpenseAmount = arr.reduce((acc, expense) => {
      return acc + expense;
    });
    totalExpenseList.innerHTML = `<p>Total: € <span id="totalExpenseAmount">${totalExpenseAmount}<span></p>`;
  }

  //display balance
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
  }

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

  static clearFields() {
    document.getElementById("category").value = "";
    document.getElementById("envelop").value = "";
    document.getElementById("amount").value = null;
    document.getElementById("date").value = "";
  }

  static deleteItemFromList(elem) {
    if (elem.className === "deleteBtn") {
      elem.parentElement.parentElement.remove();
    }
  }
}

//Storage class
class Store {
  // get income
  static getIncomes() {
    let incomes;
    if (localStorage.getItem("incomes") === null) {
      incomes = [];
    } else {
      incomes = JSON.parse(localStorage.getItem("incomes"));
    }
    return incomes;
  }

  // add income
  static addIncome(income) {
    const incomes = Store.getIncomes();
    incomes.push(income);

    localStorage.setItem("incomes", JSON.stringify(incomes));
  }

  // remove income
  static removeIncome(elem) {
    const incomes = Store.getIncomes();
    incomes.forEach((income, index) => {
      if (income.id === elem.parentElement.parentElement.id) {
        incomes.splice(index, 1);
      }
    });
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }

  // get expense
  static getExpense() {
    let expenses;
    if (localStorage.getItem("expenses") === null) {
      expenses = [];
    } else {
      expenses = JSON.parse(localStorage.getItem("expenses"));
    }
    return expenses;
  }

  // add expense
  static addExpense(expense) {
    const expenses = Store.getExpense();
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  // remove expense
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

//Events
document.addEventListener("DOMContentLoaded", () => {
  UI.displayIncome();
  UI.displayTotalIncome();
  UI.displayExpense();
  UI.displayTotalExpense();
  UI.displayBalance();
});
// When add button is clicked
form.addEventListener("submit", e => {
  e.preventDefault();
  const category = document.getElementById("category").value;
  const envelop = document.getElementById("envelop").value;
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;

  //Validate
  if (category === "" || envelop === "" || amount === "" || date === "") {
    UI.showAlert("Please fill in all fields", "danger");
  }

  //Instantiate income and expense
  if (category === "income") {
    const income = new Income(envelop, amount, date);
    UI.addIncomeToList(income);
    Store.addIncome(income);
    UI.displayTotalIncome();
    UI.displayBalance();
  } else if (category === "expense") {
    const expense = new Expense(envelop, amount, date);
    UI.addExpenseToList(expense);
    Store.addExpense(expense);
    UI.displayTotalExpense();
    UI.displayBalance();
  }

  UI.showAlert("The item added.", "success");
  //clear input fields
  UI.clearFields();
});

// When remove button(x) is clicked
incomeList.addEventListener("click", e => {
  console.log(e.target);
  UI.deleteItemFromList(e.target);
  Store.removeIncome(e.target);
  UI.displayTotalIncome();
  UI.displayBalance();
  UI.showAlert("The item removed.", "success");
});

expenseList.addEventListener("click", e => {
  console.log(e.target);
  UI.deleteItemFromList(e.target);
  Store.removeExpense(e.target);
  UI.displayTotalExpense();
  UI.displayBalance();
  UI.showAlert("The item removed.", "success");
});
