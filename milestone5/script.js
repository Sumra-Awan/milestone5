document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumeDisplayElement = document.getElementById('resume-display');
    var shareableLinkContainer = document.getElementById('shareable-link-container');
    var shareableLinkElement = document.getElementById('shareable-link');
    var downloadPdfButton = document.getElementById('Download-pdf');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var Username = document.getElementById('Username').value;
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('Education').value;
        var experience = document.getElementById('Experience').value;
        var skills = document.getElementById('Skills').value;
        var resumedata = {
            name: name,
            email: email,
            phone: phone,
            education: education,
            experience: experience,
            skills: skills,
        };
        localStorage.setItem(Username, JSON.stringify(resumedata));
        var resumeHTML = "\n        <h2><b>Editable Resume</b></h2>\n        <h3>Personal Information</h3>\n        <p><b>Name:</b><span contenteditable=\"true\"> ".concat(name, "</span></p>\n        <p><b>Email:</b><span contenteditable=\"true\"> ").concat(email, "</span></p>\n        <p><b>Phone:</b><span contenteditable=\"true\"> ").concat(phone, "</span></p>\n        \n        <h3>Education</h3>\n        <p contenteditable=\"true\">").concat(education, "</p>\n\n        <h3>Experience</h3>\n        <p contenteditable=\"true\">").concat(experience, "</p>\n\n        <h3>Skills</h3>\n        <p contenteditable=\"true\">").concat(skills, "</p>");
        resumeDisplayElement.innerHTML = resumeHTML;
        var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(Username));
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    });
    downloadPdfButton.addEventListener('click', function () {
        window.print();
    });
    // Prefill form from localStorage based on URL username
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
        else {
            console.error('No resume data found for the provided username.');
        }
    }
});
