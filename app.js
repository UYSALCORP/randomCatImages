//! VARIABLES
const cardDiv = document.getElementById("cardDiv");
const loadingDiv = document.getElementById("loading");
const btn = document.querySelector(".btn");
const containerDiv = document.querySelector(".container");
const tarih = document.getElementById("tarih");

//! Loading divimizi 3sn durduktan sonra gönderiyoruz.
setTimeout(() => {
  loadingDiv.style.display = "none";
  containerDiv.style.display = "block";
}, 3000);

//! async-await ile fetch
const fetchCatImages = async () => {
// Fetch-then ile database istek atma
await fetch("https://api.thecatapi.com/v1/images/search?limit=10")
  .then(async (res) => {
    if (!res.ok) {
      // Hata Kontrol
      throw new Error("Ağ Hatası!");
    }
    const veriVer = await res.json(); // Veri'yi js'e uygun hale getirdik.
    ekranaBastir(veriVer);
  })
  .then((data) => {
    ekranaBastir(data) // Veriler hatasızsa çalışacak
      .catch(() => {
        // Hatalı ise çalışacak
        const errorImg = document.createElement("img");
        errorImg.src = "./error.gif";
        errorImg.alt = "Error";
      });
  });
};
//! Ekrana bastıracağımız veriler
const ekranaBastir = (veri) => {
//   console.log(veri);
  veri.forEach((a) => {
    cardDiv.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-2 m-1">
                <div style="height:200px;">
                <img src="${a.url}" class="w-100 h-100" alt="cat images">
                </div>
            </div>
        `;
        // console.log(veri.url);
  });
};

//! Sayfa yüklenince ve btn tıklanınca resimler yenilensin.
window.onload = fetchCatImages()
btn.addEventListener("click", fetchCatImages)

//! Tarih saat
function updateDateTime() {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const hours = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const dateTime = `${day}.${month}.${year} ${hours}:${minute}:${second}`
    tarih.innerText = dateTime
}
updateDateTime()
setInterval(updateDateTime, 1000)