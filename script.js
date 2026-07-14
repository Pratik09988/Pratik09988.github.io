const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (subject === "") {
        alert("Please enter the subject.");
        return;
    }

    if (message.length < 10) {
        alert("Message must be at least 10 characters long.");
        return;
    }

    const data = {
        access_key: document.getElementById("access_key").value,
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
        alert("✅ Thank you! Your message has been sent successfully.");
        form.reset();
    } else {
        alert("❌ Something went wrong. Please try again.");
    }

});