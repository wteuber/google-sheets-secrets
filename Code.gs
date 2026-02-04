/**
 * Runs when spreadsheet opens. Adds custom Secrets menu.
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🔐 Secrets')
    .addItem('➕ Add Entry', 'showEncryptDialog')
    .addItem('🔓 Decrypt Selected Row', 'showDecryptDialog')
    .addToUi();
}

/**
 * Returns the currently ACTIVE sheet (no "Secrets" restriction).
 */
function getActiveSheet_() {
  return SpreadsheetApp.getActiveSheet();
}

/**
 * Shows "Add Entry" dialog (works on ANY sheet).
 */
function showEncryptDialog() {
  const template = HtmlService.createTemplateFromFile('encryptDialog');
  const html = template.evaluate()
    .setWidth(520)
    .setHeight(650)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showModalDialog(html, 'Add New Secret Entry');
}

/**
 * Shows decrypt dialog for selected row (works on ANY sheet).
 */
function showDecryptDialog() {
  const sheet = getActiveSheet_();
  const range = sheet.getActiveRange();

  if (!range) {
    SpreadsheetApp.getUi().alert('Please select a cell first.');
    return;
  }

  const row = range.getRow();
  if (row < 2) {
    SpreadsheetApp.getUi().alert('Please select row 2 or below.');
    return;
  }

  const label = sheet.getRange(row, 1).getValue();
  const encryptedJsonRaw = sheet.getRange(row, 2).getValue();
  const encryptedJson = encryptedJsonRaw ? String(encryptedJsonRaw) : '';

  const template = HtmlService.createTemplateFromFile('decryptDialog');
  template.rowIndex = Number(row);
  template.label = label || '';
  template.encryptedJson = encryptedJson;

  const html = template.evaluate()
    .setWidth(520)
    .setHeight(550)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);

  SpreadsheetApp.getUi().showModalDialog(html, 'Decrypt Secret');
}

/**
 * Adds new entry to first empty row in ACTIVE sheet.
 */
function addNewEntry(label, encryptedJson) {
  if (!label || typeof label !== 'string' || !label.trim()) {
    throw new Error('Label is required');
  }
  if (typeof encryptedJson !== 'string' || encryptedJson.trim() === '') {
    throw new Error('encryptedJson must be a non-empty string');
  }

  const sheet = getActiveSheet_();
  
  // Find first COMPLETELY empty row (both A and B empty), starting from row 2
  const lastRow = sheet.getLastRow();
  let targetRow = 2;
  
  for (let row = 2; row <= lastRow + 10; row++) {
    const colAValue = sheet.getRange(row, 1).getValue();
    const colBValue = sheet.getRange(row, 2).getValue();
    
    if ((!colAValue || colAValue.toString().trim() === '') &&
        (!colBValue || colBValue.toString().trim() === '')) {
      targetRow = row;
      break;
    }
  }
  
  // Write label and encrypted data
  sheet.getRange(targetRow, 1).setValue(label.trim());
  sheet.getRange(targetRow, 2).setValue(encryptedJson);
  
  return { row: targetRow, label: label.trim(), status: 'added' };
}

/**
 * Checks for duplicate labels in active sheet.
 */
function checkDuplicateLabel(label) {
  if (!label || typeof label !== 'string' || !label.trim()) {
    return { exists: false };
  }
  
  const sheet = getActiveSheet_();
  const labels = sheet.getRange('A:A').getValues().flat();
  
  for (let i = 1; i < labels.length; i++) {
    const existingLabel = labels[i];
    if (existingLabel && existingLabel.toString().trim().toLowerCase() === label.trim().toLowerCase()) {
      return { 
        exists: true, 
        label: existingLabel.toString().trim(), 
        row: i + 1 
      };
    }
  }
  
  return { exists: false };
}
