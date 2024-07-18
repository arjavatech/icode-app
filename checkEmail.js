<script type="text/javascript">
    (function () {
        emailjs.init("LJRc5OMln0aJ4QPYv"); // Replace with your EmailJS user ID
    })();

    function generateOTP() {
        var otp = '';
        var characters = '0123456789';
        for (var i = 0; i < 6; i++) {
            otp += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return otp;
    }

    var generatedOtp = '';

    document.getElementById('subButton').addEventListener('click', function () {
        var email = document.getElementById('forgetEmail').value;
        generatedOtp = generateOTP(); // Generate OTP

        console.log('Sending email to:', email);
        console.log('Generated OTP:', generatedOtp); // For debugging purposes

        var templateParams = {
            to_email: email,
            from_name: "Your Service Name", // Sender's name
            subject: "Password Reset OTP",
            message: `Your OTP for password reset is: ${generatedOtp}`
        };

        emailjs.send('service_nv0u86q', 'template_glkc6yl', templateParams)
            .then(function (response) {
                console.log('EmailJS response:', response);
                alert("Email sent successfully!");
                document.getElementById('otpSection').style.display = 'block';
            }, function (error) {
                console.error("Error encountered while sending email:", error);
                alert("Error encountered while sending email. Please try again later.");
            });
    });

    document.getElementById('verifyOtpButton').addEventListener('click', function () {
        var enteredOtp = document.getElementById('otpInput').value;

        if (enteredOtp === generatedOtp) {
            alert("OTP verified successfully!");
            setTimeout(() => {
                window.location.href = "updatePassword.html";
            }, 100);
        } else {
            alert("Invalid OTP. Please try again.");
        }
    });
</script>
