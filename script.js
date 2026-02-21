//formlar arasi gecis
function formDegistir() {
    const regForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    if (regForm.style.display === "none") { //suan kayıt formu gizli mi?
        regForm.style.display = "block"; //kayıt formunu görünür yap
        loginForm.style.display = "none";
    }

    else {
        regForm.style.display = "none";
        loginForm.style.display = "block";
    }
}

//kayit fonksiyonu

function kayitOl() {
    //input verileri
    const user = document.getElementById("reg-username").value; //kutu içindeki yazıyı almak için value yaparız
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    if (localStorage.getItem(email)) {
        alert("Bu e-posta adresi zaten kayitli");
        return;
    }


    //basit bir e-posta dogrulama
    if (user === "" || email === "" || password === "") {
        alert("Lutfen tum alanlari doldurun!")
        return; //burada fonksiyonu durdururuz
    }

    //kullaniciyi bir nesneye atiyoruz
    const yeniKullanici = {
        kullaniciAdi: user,
        eposta: email,
        sifre: password
    };

    //kullanici verisini LocalStorage e kaydediyoruz. Sadece string saklar
    localStorage.setItem(email, JSON.stringify(yeniKullanici)); //anahtar olarak e-posta kullanıyoruz benzersiz oldugu için
    alert("Kayit basariyla tamamlandi! Giris yapabilirsiniz.");
    formDegistir(); //kayit olduktan sonra otomatik giris formuna gecer

    document.getElementById("reg-username").value = "";
    document.getElementById("reg-email").value = "";
    document.getElementById("reg-password").value = "";


}

function girisYap() {
    const girilenEmail = document.getElementById("login-email").value;
    const girilenSifre = document.getElementById("login-password").value;

    //localStorage de bu e-posta ya ait veri var mı?
    const kayitliVeri = localStorage.getItem(girilenEmail);

    //kayitli veri varsa obje yap
    if (kayitliVeri) {

        const kullaniciObjesi = JSON.parse(kayitliVeri);

        if (kullaniciObjesi.sifre === girilenSifre) {
            sessionStorage.setItem("aktifKullanici", JSON.stringify(kullaniciObjesi));
            window.location.href = "panel.html"; //panel sayfasına yönlendirir
            alert("Giris basarili! " + kullaniciObjesi.kullaniciAdi + " hos geldin!");
        }
        else {
            alert("Sifre hatali lütfen tekrar girin!")
        }
    }

    else {
        alert("Kayitli kullanici bulunamadi!")
    }
}