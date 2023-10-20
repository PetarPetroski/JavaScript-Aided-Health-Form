const receptionists = [
    { firstName: "Petar", lastName: "Petroski", password: "Password123!", id: 1234, phone: "201-699-8234", email: "petar.petroski2003@gmail.com" },
    { firstName: "Alice", lastName: "Smith", password: "P@ssw0rd", id: 5678, phone: "202-555-1234", email: "alice@example.com" },
    { firstName: "Michael", lastName: "Johnson", password: "SecurePwd123", id: 9123, phone: "203-555-5678", email: "michael@example.com" },
    { firstName: "Emily", lastName: "Davis", password: "Secret123!", id: 4567, phone: "204-555-9101", email: "emily@example.com" },
    { firstName: "Daniel", lastName: "Brown", password: "StrongPwd789", id: 8912, phone: "205-555-1122", email: "daniel@example.com" },
    { firstName: "Olivia", lastName: "Wilson", password: "Pa$$w0rd", id: 3456, phone: "206-555-3344", email: "olivia@example.com" },
    { firstName: "Ethan", lastName: "Thomas", password: "E@syPwd", id: 7891, phone: "207-555-5566", email: "ethan@example.com" },
    { firstName: "Ava", lastName: "Martinez", password: "Ava12345", id: 2345, phone: "208-555-7788", email: "ava@example.com" },
    { firstName: "Noah", lastName: "Lee", password: "Noah@2023", id: 6789, phone: "209-555-9900", email: "noah@example.com" },
    { firstName: "Sophia", lastName: "Garcia", password: "Secure2023!", id: 1011, phone: "210-555-1122", email: "sophia@example.com" }
];

function validate() {
    const firstName = document.getElementById("first").value;
    const lastName = document.getElementById("last").value;
    const password = document.getElementById("password").value;
    const id = document.getElementById("identification").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("tel").value;
    const isEmailConfirmationRequested = document.getElementById("confirmation").checked;

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,16}$/;
    const idRegex = /^\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{3,5}$/;
    const phoneRegex = /^\d{3}[-\s]\d{3}[-\s]\d{4}$/;

    let errorMessage = null;

    if (!firstName) {
        errorMessage = "Receptionist's First Name is missing. Please enter:";
        document.getElementById("first").focus();
    } else if (!lastName) {
        errorMessage = "Receptionist's Last Name is missing. Please enter:";
        document.getElementById("last").focus();
    } else if (!password) {
        errorMessage = "Receptionist's Password is missing. Please enter:";
        document.getElementById("password").focus();
    } else if (!id) {
        errorMessage = "Receptionist's ID is missing. Please enter:";
        document.getElementById("identification").focus();
    } else if (!phone) {
        errorMessage = "Receptionist's Number is missing. Please enter:";
        document.getElementById("tel").focus();
    } else if (!passwordRegex.test(password)) {
        errorMessage = "Password must contain at least 1 uppercase letter, 1 special character, 1 numeric character, and be at most 16 characters long.";
        document.getElementById("password").focus();
    } else if (!idRegex.test(id)) {
        errorMessage = "ID must be a 4-digit number.";
        document.getElementById("identification").focus();
    } else if (!phoneRegex.test(phone)) {
        errorMessage = "Invalid phone number format. Please enter a 10-digit phone number separated by spaces or dashes.";
        document.getElementById("tel").focus();
    } else if (!isEmailConfirmationRequested && email) {
        errorMessage ="Email confirmation is not requested, please remove the email address.";
        document.getElementById("email").focus();
    } else if ((isEmailConfirmationRequested && !email)) {
        errorMessage = "Email confirmation is requested. Please enter an email address:";
        document.getElementById("email").focus();
    } else if (isEmailConfirmationRequested && !emailRegex.test(email)) {
        errorMessage = "Invalid email address format. Please enter a valid email address:";
        document.getElementById("email").focus();
    }

    if (errorMessage) {
        alert(errorMessage);
    } else {
        const receptionistFound = verify(firstName, lastName, password, id, email);
        if (receptionistFound) {
            const selectedTransaction = document.getElementById("transaction").value;
            alert(`Welcome, ${firstName} ${lastName}! You have entered the system.\nTransaction: ${selectedTransaction}`);
        } else {
            alert(`Receptionist ${firstName} ${lastName} cannot be found.`);
        }
    }
}

function verify(firstName, lastName, password, id, email) {
    const receptionist = receptionists.find(r => r.firstName === firstName && r.lastName === lastName && r.password === password && r.id === parseInt(id) && (!email || r.email === email));
    return receptionist !== undefined;
}


document.getElementById("submit").addEventListener("click", validate);

document.getElementById("confirmation").addEventListener("change", function() {
    const emailRequiredMessage = document.getElementById("email-required");

    if (this.checked) {
        emailRequiredMessage.textContent = "REQUIRED";
    } else {
        emailRequiredMessage.textContent = "";
    }
});

document.getElementById("reset").addEventListener("click", function() {
    document.getElementById("first").value = "";
    document.getElementById("last").value = "";
    document.getElementById("password").value = "";
    document.getElementById("identification").value = "";
    document.getElementById("email").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("confirmation").checked = false;
    document.getElementById("transaction").selectedIndex = 0;
    document.getElementById("email-required").textContent = "";
});
