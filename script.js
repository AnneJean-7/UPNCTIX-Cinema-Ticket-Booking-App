const daftarFilm = [
    { id: 1, judul: "10 Things I Hate About You", genre: "Romance/Comedy", harga: 15000, studio: "Studio 1", jamTayang: "08.30", poster: "10things.jpg" },
    { id: 2, judul: "The Truman Show", genre: "Drama/Sci-Fi", harga: 18000, studio: "Studio 2", jamTayang: "11.00", poster: "trumanshow.jpg" },
    { id: 3, judul: "La La Land", genre: "Musical/Romance", harga: 22000, studio: "Studio 1", jamTayang: "14.15", poster: "lalaland.jpg" },
    { id: 4, judul: "Michael", genre: "Biography/Musical", harga: 25000, studio: "Studio 2", jamTayang: "16.45", poster: "michael.jpg" },
    { id: 5, judul: "How to Train Your Dragon", genre: "Adventure/Fantasy", harga: 32000, studio: "Studio 1", jamTayang: "19.00", poster: "dragon.jpg" }
];

let currentUser = "";
let filmTerpilih = null;
let kursiTerpilih = [];
let riwayatTransaksi = [];

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('fade-out');
        }
    }, 1500);

    renderMovies(daftarFilm);
    updateProfileStats();
});

function navigateToPage(pageId, navElement = null) {
    if (pageId === 'booking-modal' && !filmTerpilih) {
        alert("Silakan pilih film terlebih dahulu melalui menu utama!");
        return;
    }

    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');

    if (navElement) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        navElement.classList.add('active');
    }
}

function login() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        alert("Username atau password salah!");
        return;
    }

    currentUser = username;

    document.getElementById("profile-name").innerText = username;
    document.getElementById("welcome-text").innerText = `Welcome Back, ${username}!`;

    navigateToPage("home-page");
}

function logout() {
    document.getElementById('loginUsername').value = "";
    document.getElementById('loginPassword').value = "";
    filmTerpilih = null;
    kursiTerpilih = [];
    riwayatTransaksi = [];
    updateProfileStats();

    const homeNav = document.querySelector(".nav-item[onclick*='home-page']");
    navigateToPage('login-page', homeNav);
}

function showSignup() {
    document.getElementById("login-page").classList.remove("active");
    document.getElementById("signup-page").classList.add("active");
}

function showLogin() {
    document.getElementById("signup-page").classList.remove("active");
    document.getElementById("login-page").classList.add("active");
}

function signup() {
    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (username === "" || password === "") {
        alert("Lengkapi data terlebih dahulu!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const sudahAda = users.some(user => user.username === username);

    if (sudahAda) {
        alert("Username sudah digunakan!");
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Akun berhasil dibuat!");
    showLogin();
}

function renderMovies(movies) {
    const container = document.getElementById('movie-container');
    if (!container) return;
    container.innerHTML = '';

    if (movies.length === 0) {
        container.innerHTML = '<p style="text-align:center; font-size:12px; color:#ff3344; margin-top:20px;">Film tidak ditemukan...</p>';
        return;
    }

    movies.forEach(film => {
        container.innerHTML += `
            <div class="movie-card" onclick="openDetailModal(${film.id})">
                <img src="${film.poster}" alt="Poster" referrerpolicy="no-referrer" onerror="this.src='https://via.placeholder.com/65x90?text=No+Image'">
                <div class="movie-info">
                    <h4>${film.judul}</h4>
                    <p>${film.genre} • <span>${film.studio}</span></p>
                    <span class="tag">Jam ${film.jamTayang} WIB</span>
                </div>
                <div class="movie-price">
                    <span>Harga</span>
                    <strong>Rp${film.harga.toLocaleString('id-ID')}</strong>
                </div>
            </div>
        `;
    });
}

const searchInput = document.getElementById('searchInput');
const priceFilter = document.getElementById('priceFilter');

function filterMovies() {
    const kataKunci = document.getElementById('searchInput').value.toLowerCase();
    const kategoriHarga = document.getElementById('priceFilter').value;

    const filmTersaring = daftarFilm.filter(film => {
        const cocokTeks =
            film.judul.toLowerCase().includes(kataKunci) ||
            film.genre.toLowerCase().includes(kataKunci);

        let cocokHarga = true;

        if (kategoriHarga === "low") {
            cocokHarga = film.harga <= 20000;
        } else if (kategoriHarga === "middle") {
            cocokHarga = film.harga > 20000 && film.harga <= 25000;
        } else if (kategoriHarga === "high") {
            cocokHarga = film.harga > 25000;
        }

        return cocokTeks && cocokHarga;
    });

    renderMovies(filmTersaring);
}

searchInput.addEventListener('input', filterMovies);
priceFilter.addEventListener('change', filterMovies);

function openModal(modalId) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById(modalId).style.display = 'none';
}

function openDetailModal(id) {
    filmTerpilih = daftarFilm.find(f => f.id === id);
    if (!filmTerpilih) return;

    document.getElementById('detailPoster').src = filmTerpilih.poster;
    document.getElementById('detailPoster').setAttribute('referrerpolicy', 'no-referrer');

    document.getElementById('detailTitle').innerText = filmTerpilih.judul;
    document.getElementById('detailGenre').innerText = `Genre: ${filmTerpilih.genre}`;
    document.getElementById('detailStudio').innerText = `Lokasi: ${filmTerpilih.studio}`;
    document.getElementById('detailJam').innerText = `Waktu Tayang: ${filmTerpilih.jamTayang} WIB`;
    document.getElementById('detailHarga').innerText = `Tarif: Rp${filmTerpilih.harga.toLocaleString('id-ID')}`;

    document.getElementById('detailBooking').onclick = () => {
        closeModal('movie-detail-modal');
        initBookingGrid();
    };
    openModal('movie-detail-modal');
}

function initBookingGrid() {
    kursiTerpilih = [];
    document.getElementById('booking-title').innerText = filmTerpilih.judul;

    const grid = document.getElementById('seat-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const baris = ['A', 'B', 'C', 'D', 'E'];
    baris.forEach(b => {
        for (let k = 1; k <= 6; k++) {
            const kodeKursi = `${b}${k}`;
            const isBooked = (b === 'A' && k === 2) || (b === 'C' && k === 4) || (b === 'E' && k === 5);

            grid.innerHTML += `
                <div id="seat-${kodeKursi}" 
                     class="seat ${isBooked ? 'booked' : 'available'}" 
                     onclick="${isBooked ? '' : `toggleSeat('${kodeKursi}')`}">
                     ${isBooked ? 'X' : kodeKursi}
                </div>
            `;
        }
    });

    updateBookingSummary();
    openModal('booking-modal');
}

function toggleSeat(kodeKursi) {
    const el = document.getElementById(`seat-${kodeKursi}`);
    if (!el) return;

    if (kursiTerpilih.includes(kodeKursi)) {
        kursiTerpilih = kursiTerpilih.filter(s => s !== kodeKursi);
        el.className = "seat available";
    } else {
        kursiTerpilih.push(kodeKursi);
        el.className = "seat selected";
    }
    updateBookingSummary();
}

function updateBookingSummary() {
    const total = filmTerpilih ? filmTerpilih.harga * kursiTerpilih.length : 0;
    document.getElementById('selectedSeats').innerText = kursiTerpilih.length > 0 ? kursiTerpilih.join(', ') : '-';
    document.getElementById('totalPrice').innerText = `Rp${total.toLocaleString('id-ID')}`;
}

function checkoutPayment() {
    if (kursiTerpilih.length === 0) {
        alert("Silakan tentukan pilihan baris tempat duduk Anda terlebih dahulu!");
        return;
    }
    closeModal('booking-modal');

    const tokenTrx = "QRIS" + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('qris-id').innerText = `ID TRANSAKSI: ${tokenTrx}`;
    openModal('payment-modal');
}

function confirmPayment() {
    closeModal('payment-modal');

    const rawID = document.getElementById('qris-id').innerText.split(': ')[1];
    const hitungTotal = filmTerpilih.harga * kursiTerpilih.length;

    const dataTiket = {
        id: rawID,
        nama: currentUser,
        judul: filmTerpilih.judul,
        studio: filmTerpilih.studio,
        jam: filmTerpilih.jamTayang,
        kursi: kursiTerpilih.join(', '),
        total: hitungTotal
    };

    riwayatTransaksi.push(dataTiket);

    document.getElementById('mono-ticket-content').innerHTML = `
        <div class="eticket">
            <div class="eticket-header">
                <h2>UPNCTIX</h2>
                <span>E-TICKET</span>
            </div>
            <div class="ticket-grid">
                <div>
                    <small>FILM</small>
                    <h4>${dataTiket.judul}</h4>
                </div>
                <div>
                    <small>STUDIO</small>
                    <h4>${dataTiket.studio}</h4>
                </div>
                <div>
                    <small>JAM TAYANG</small>
                    <h4>${dataTiket.jam} WIB</h4>
                </div>
                <div>
                    <small>KURSI</small>
                    <h4>${dataTiket.kursi}</h4>
                </div>
                <div>
                    <small>PEMESAN</small>
                    <h4>${dataTiket.nama}</h4>
                </div>
                <div>
                    <small>ID TRANSAKSI</small>
                    <h4>${dataTiket.id}</h4>
                </div>
            </div>
            <div class="ticket-total">
                Rp${dataTiket.total.toLocaleString('id-ID')}
            </div>
            <div class="ticket-tagline">
                SALAM BELA NEGARA 
            </div>
        </div>
    `;

    updateProfileStats();
    showToastNotification();
    openModal('ticket-modal');
}

function confirmSaveHistory() {
    closeModal('ticket-modal');
    filmTerpilih = null;
    kursiTerpilih = [];
    updateBookingSummary();
}

function updateProfileStats() {
    let totalTiket = 0;
    riwayatTransaksi.forEach(t => {
        totalTiket += t.kursi.split(', ').length;
    });

    document.getElementById('stat-tickets').innerText = totalTiket;
    document.getElementById('stat-transactions').innerText = riwayatTransaksi.length;

    renderHistoryCards();
}

function renderHistoryCards() {
    const hContainer = document.getElementById('history-container');
    if (!hContainer) return;
    hContainer.innerHTML = '';

    if (riwayatTransaksi.length === 0) {
        hContainer.innerHTML = '<p style="text-align:center; font-size:12px; color:#ff3344; margin-top:20px;">Belum ada riwayat transaksi.</p>';
        return;
    }

    riwayatTransaksi.forEach(trx => {
        hContainer.innerHTML += `
            <div class="eticket">
                <div class="eticket-header">
                    <h2>UPNCTIX</h2>
                    <span>E-TICKET</span>
                </div>
                <div class="ticket-grid">
                    <div>
                        <small>FILM</small>
                        <h4>${trx.judul}</h4>
                    </div>
                    <div>
                        <small>STUDIO</small>
                        <h4>${trx.studio}</h4>
                    </div>
                    <div>
                        <small>JAM</small>
                        <h4>${trx.jam} WIB</h4>
                    </div>
                    <div>
                        <small>KURSI</small>
                        <h4>${trx.kursi}</h4>
                    </div>
                </div>
                <div class="ticket-total">
                    Rp${trx.total.toLocaleString('id-ID')}
                </div>
                <div class="ticket-tagline">
                    SALAM BELA NEGARA 
                </div>
            </div>
        `;
    });
}

function showToastNotification() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
}