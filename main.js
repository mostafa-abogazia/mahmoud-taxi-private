const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait...";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            result.innerHTML = json.message;
            // عرض رسالة منبثقة عند النجاح
            Swal.fire({
                title: "تم الإرسال بنجاح!",
                text: 'تم إرسال البريد الإلكتروني بنجاح!',
                icon: "success",
                confirmButtonText: "موافق"
            });
        } else {
            console.log(response);
            result.innerHTML = json.message || "Something went wrong!";
            // عرض رسالة منبثقة عند الخطأ
            Swal.fire({
                title: 'خطأ!',
                text: json.message || 'حدث خطأ!',
                icon: 'error',
                confirmButtonText: 'موافق'
            });
        }
    })
    .catch(error => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
        // عرض رسالة منبثقة عند حدوث استثناء
        Swal.fire({
            title: 'خطأ!',
            text: 'حدث خطأ في الاتصال بالخادم!',
            icon: 'error',
            confirmButtonText: 'موافق'
        });
    })
    .then(function() {
        form.reset();
        setTimeout(() => {
            result.style.display = "none";
        }, 3000);
    });
});
