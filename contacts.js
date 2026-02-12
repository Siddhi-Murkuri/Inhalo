const form = document.getElementById("contact-form");
const list = document.getElementById("contact-list");
const statusEl = document.getElementById("contact-status");
const simulateBtn = document.getElementById("simulate-emergency");

const STORAGE_KEY = "inhalo-emergency-contacts";

function readContacts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveContacts(contacts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

function renderContacts() {
  const contacts = readContacts();
  list.innerHTML = "";

  if (!contacts.length) {
    const empty = document.createElement("li");
    empty.textContent = "No emergency contacts saved yet.";
    list.appendChild(empty);
    return;
  }

  contacts.forEach((contact, index) => {
    const item = document.createElement("li");
    item.className = "contact-item";
    item.innerHTML = `
      <span><strong>${contact.name}</strong><br />${contact.phone}</span>
      <button type="button" data-index="${index}">Remove</button>
    `;
    list.appendChild(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("contact-name").value.trim();
  const phone = document.getElementById("contact-phone").value.trim();

  if (!name || !phone) {
    statusEl.textContent = "Please enter both name and phone number.";
    return;
  }

  const contacts = readContacts();
  contacts.push({ name, phone });
  saveContacts(contacts);
  renderContacts();
  form.reset();
  statusEl.textContent = "Emergency contact saved.";
});

list.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLButtonElement)) return;
  const idx = Number(event.target.dataset.index);
  const contacts = readContacts();
  contacts.splice(idx, 1);
  saveContacts(contacts);
  renderContacts();
  statusEl.textContent = "Contact removed.";
});

simulateBtn.addEventListener("click", () => {
  const contacts = readContacts();
  if (!contacts.length) {
    statusEl.textContent = "No contacts to alert.";
    return;
  }

  const numbers = contacts.map((contact) => contact.phone).join(", ");
  statusEl.textContent = `Simulation only: emergency alert would notify ${numbers}`;
});

renderContacts();
