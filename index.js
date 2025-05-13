let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

// Helper to save leads and render
function saveAndRenderLeads() {
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
}

// Improved render with index as key
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target='_blank' rel='noopener noreferrer' href='${leads[i]}'>
          ${leads[i]}
        </a>
      </li>
    `;
  }
  ulEl.innerHTML = listItems;
}

// Prevent saving empty or duplicate input
inputBtn.addEventListener("click", function () {
  const inputValue = inputEl.value.trim();
  if (inputValue && !myLeads.includes(inputValue)) {
    myLeads.push(inputValue);
    inputEl.value = "";
    saveAndRenderLeads();
  }
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;
    if (url && !myLeads.includes(url)) {
      myLeads.push(url);
      saveAndRenderLeads();
    }
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.removeItem("myLeads");
  myLeads = [];
  render(myLeads);
});
