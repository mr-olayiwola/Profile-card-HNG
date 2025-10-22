
document.addEventListener('DOMContentLoaded', function () {
    const timeEl = document.querySelector('[data-testid="test-user-time"]');
    const updatedAt = document.getElementById('updated-at');

    function tick(now) {
        const ms = now || Date.now();
        timeEl.textContent = String(ms);
        updatedAt.textContent = new Date(ms).toLocaleString();
    }

    tick(Date.now());


    setInterval(() => tick(Date.now()), 1000);

    const upload = document.querySelector('[data-testid="test-avatar-upload"]');
    const avatar = document.querySelector('[data-testid="test-user-avatar"]');

    upload.addEventListener('change', function (e) {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (ev) {
            avatar.src = ev.target.result;
            tick(Date.now());
        };
        reader.readAsDataURL(file);
    });
});

/*Contact Page*/

const form = document.getElementById('contactForm');
const success = document.getElementById('success');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;
    success.hidden = true;

    // Clear all error messages
    document.querySelectorAll('.error').forEach(err => err.textContent = '');

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    if (!name.value.trim()) {
        valid = false;
        document.getElementById('error-name').textContent = 'Full name is required.';
    }

    if (!email.value.trim()) {
        valid = false;
        document.getElementById('error-email').textContent = 'Email is required.';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
        valid = false;
        document.getElementById('error-email').textContent = 'Enter a valid email.';
    }

    if (!subject.value.trim()) {
        valid = false;
        document.getElementById('error-subject').textContent = 'Subject is required.';
    }

    if (message.value.trim().length < 10) {
        valid = false;
        document.getElementById('error-message').textContent = 'Message must be at least 10 characters.';
    }

    if (valid) {
        success.hidden = false;
        form.reset();
    }
});
