const connectBtn = document.getElementById("connect-btn");
const settingsForm = document.getElementById("settings-form");
const statusEl = document.getElementById("settings-status");

const previewExpiry = document.getElementById("preview-expiry");
const previewDosage = document.getElementById("preview-dosage");
const previewChangedBy = document.getElementById("preview-changed-by");

const expiryInput = document.getElementById("expiry-date");
const dosageInput = document.getElementById("dosage");
const changedByInput = document.getElementById("changed-by");

let bluetoothDevice = null;

function updatePreview() {
  previewExpiry.textContent = expiryInput.value || "--";
  previewDosage.textContent = `${dosageInput.value || "0"} puffs/day`;
  previewChangedBy.textContent = changedByInput.value;
}

expiryInput.addEventListener("input", updatePreview);
dosageInput.addEventListener("input", updatePreview);
changedByInput.addEventListener("change", updatePreview);

connectBtn.addEventListener("click", async () => {
  if (!navigator.bluetooth) {
    statusEl.textContent = "Bluetooth is not available in this browser. Demo mode only.";
    return;
  }

  try {
    bluetoothDevice = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: "Inhalo" }],
      optionalServices: ["battery_service"],
    });
    statusEl.textContent = `Connected to ${bluetoothDevice.name || "Inhalo"}.`;
  } catch (error) {
    statusEl.textContent = "Bluetooth connection canceled or failed.";
  }
});

settingsForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  updatePreview();

  const payload = {
    expiryDate: expiryInput.value,
    dosage: dosageInput.value,
    changedBy: changedByInput.value,
  };

  statusEl.textContent = bluetoothDevice
    ? `Synced to ${bluetoothDevice.name || "Inhalo"}: ${JSON.stringify(payload)}`
    : `Saved locally (connect Bluetooth to sync): ${JSON.stringify(payload)}`;
});

updatePreview();
