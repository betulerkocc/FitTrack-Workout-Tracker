//sayfa acıldıgında kullanıcı kontrolu yap
const aktifUser = JSON.parse(sessionStorage.getItem("aktifKullanici"));

if (!aktifUser) {
    window.location.href = "index.html"; //giris yapmamıssa geri gonder
}
else {
    document.getElementById("user-greeting").innerText = "Hoşgeldin " + aktifUser.kullaniciAdi;
    listele(); //varsa eski antrenmanlari getir
}

function antrenmanEkle() {
    const name = document.getElementById("ex-name").value;
    const weight = document.getElementById("ex-weight").value;
    const reps = document.getElementById("ex-reps").value;

    if (!name || !weight || !reps) {
        alert("Lütfen boş alan birakmayiniz!");
        return;
    }

    const yeniEgzersiz = {
        id: Date.now(),
        ad: name,
        kg: weight,
        tekrar: reps,
        tarih: new Date().toLocaleDateString()
    };

    //kullanıcıya özel anahtar
    const storageKey = `workouts_${aktifUser.eposta}`;
    let liste = JSON.parse(localStorage.getItem(storageKey)) || [];

    liste.push(yeniEgzersiz);
    localStorage.setItem(storageKey, JSON.stringify(liste));

    document.getElementById('ex-name').value = "";
    document.getElementById('ex-weight').value = "";
    document.getElementById('ex-reps').value = "";

    console.log("Veri kaydedildi:", yeniEgzersiz); // Hata ayıklama için konsola yazdır
    listele(); // Listeyi anında güncelle
}


function listele() {
    console.log("Listeleme fonksiyonu çalisti!");

    const container = document.getElementById("list-container");
    console.log("Aktif kullanıcı:", aktifUser);

    const storageKey = `workouts_${aktifUser.eposta}`;
    const veri = localStorage.getItem(storageKey);
    const liste = JSON.parse(veri) || [];

    console.log("Okunan Anahtar:", storageKey);
    console.log("Liste İçeriği:", liste);

    //test satiri
    container.innerHTML = "<h4>Liste Yükleniyor...</h4>";

    // Eğer liste boşsa kullanıcıya bilgi ver
    if (liste.length === 0) {
        container.innerHTML = "<p style='color: #666;'>Henüz bir antrenman eklemediniz.</p>";
        return;
    }

    // Listeyi ekrana basma
    container.innerHTML = liste.map(item => `
        <div class="workout-card" style="background:white; color:black; margin:5px; padding:10px; border-radius:10px; border-left:5px solid blue;">
            <strong>${item.ad}</strong> - ${item.kg}kg x ${item.tekrar}
        </div>
    `).join('');
}

function sil(id) {
    const storageKey = `workouts_${aktifUser.eposta}`;
    let liste = JSON.parse(localStorage.getItem(storageKey)) || [];
    liste = liste.filter(item => item.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(liste));
    listele();
}

function cikisYap() {
    sessionStorage.removeItem("aktifKullanici");
    window.location.href = "index.html";
}