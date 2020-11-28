// calculate tip function
function calcaulateTip() {
    removeOldOutput();
    const billAmt = document.querySelector('#billAmount').value;
    const serviceOption = parseFloat(document.querySelector('#serviceOption').value);
    const numberOfPeople = document.querySelector('#numberOfPeople').value;
    const total = ((billAmt * serviceOption) / numberOfPeople).toFixed(2);
    const validate  = validateFields(billAmt, serviceOption, numberOfPeople);
    if (validate) {
        showAlert(`Please enter all details!`, 'danger');
    } else {
        displayOutput(billAmt, serviceOption, numberOfPeople, total);
        showAlert(`Tip calculated!`, 'success');
    }
    clearFields();

}

// display output
function displayOutput(billAmt, serviceOption, numberOfPeople, total) {
    let service;
    if (serviceOption === 0.3) {
        service = 'Outstanding (30%)'
    } else if (serviceOption === 0.2) {
        service = 'Good (20%)'
    } else if (serviceOption === 0.15) {
        service = 'Ok (15%)'
    } else if (serviceOption === 0.1) {
        service = 'Bad (10%)'
    } else if (serviceOption === 0.05) {
        service = 'Terrible (5%)'
    }
    const div = document.querySelector('#display-output');
    const span = document.createElement('span');
    span.classList.add('oldOutput')
    span.innerHTML = `Bill Amount: ${billAmt}<br />
    Service: ${service}<br />
    Number of people: ${numberOfPeople}<br />
    Tip Amount ${total} each`;
    div.appendChild(span);
}

// remove old output
function removeOldOutput() {
    const div = document.querySelector('#display-output');
    if (div.querySelector('.oldOutput')) 
        div.querySelector('.oldOutput').remove();
    else
        return;
}

// validation
function validateFields(billAmt, serviceOption, numberOfPeople) {
    if (billAmt === '' || typeof(serviceOption) != "number" || serviceOption === 0 || numberOfPeople === '')
        return true;
    else
        return false;
}

// showAlert
function showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#tip-form');
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
    clearFields();
}

// clear fields
function clearFields() {
    document.querySelector('#billAmount').value = '';
    document.querySelector('#serviceOption').value = 0;
    document.querySelector('#numberOfPeople').value = '';
}

// event listener for submit
document.querySelector('#tip-form').addEventListener('submit', (e) => {
    e.preventDefault();
    calcaulateTip();
})