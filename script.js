// Receptionists data for verification
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


console.log(receptionists);


function validate() {
    // Retrieve form input values
    const firstName = document.getElementById("first").value;
    const lastName = document.getElementById("last").value;
    const password = document.getElementById("password").value;
    const id = document.getElementById("identification").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("tel").value;
    const isEmailConfirmationRequested = document.getElementById("confirmation").checked;
    
    // Regular expressions for validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,16}$/;
    const idRegex = /^\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{3,5}$/;
    const phoneRegex = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;

    // Validation checks
    if (!firstName || !lastName || !password || !id || !phone || (isEmailConfirmationRequested && !email)) {
        alert("All fields are required.");
    } else if (!passwordRegex.test(password)) {
        alert("Password must contain at least 1 uppercase letter, 1 special character, 1 numeric character, and be at most 16 characters long.");
    } else if (!idRegex.test(id)) {
        alert("ID must be a 4-digit number.");
    } else if (!phoneRegex.test(phone)) {
        alert("Invalid phone number format. Please enter a 10-digit phone number separated by spaces or dashes.");
    } else if (!isEmailConfirmationRequested && email) {
        alert("Email confirmation is not requested, please remove the email address.");
    } else if (isEmailConfirmationRequested && !emailRegex.test(email)) {
        alert("Invalid email address format.");
    } else {
        // Validation successful, proceed with verification
        verify(firstName, lastName, password, id, phone, email);
    }
}

function verify(firstName, lastName, password, id, phone, email) {
    const receptionist = receptionists.find(r => r.firstName === firstName && r.lastName === lastName && r.password === password && r.phone === phone && r.id === parseInt(id) && (!email || r.email === email));
    
    if (receptionist) {
        const selectedTransaction = document.getElementById("transaction").value;
        alert(`Welcome, ${firstName} ${lastName}! You have entered the system.\nTransaction: ${selectedTransaction}`);
    } else {
        alert(`Receptionist ${firstName} ${lastName} cannot be found.`);
    }
}

// Event listener for the Submit button
document.getElementById("submit").addEventListener("click", validate);

document.getElementById("confirmation").addEventListener("change", function() {
    const emailRequiredMessage = document.getElementById("email-required");

    if (this.checked) {
        emailRequiredMessage.textContent = "REQUIRED";
    } else {
        emailRequiredMessage.textContent = "";
    }
});

// Event listener for the Reset button
document.getElementById("reset").addEventListener("click", function() {
    // Reset form fields and clear the email-required message
    document.getElementById("first").value = "";
    document.getElementById("last").value = "";
    document.getElementById("password").value = "";
    document.getElementById("identification").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("confirmation").checked = false;
    document.getElementById("transaction").selectedIndex = 0;
    document.getElementById("email-required").textContent = ""; // Clear the email-required message
});