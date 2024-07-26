// Mendapatkan elemen tombol sign-in dan sign-up
const sign_in_btn = document.querySelector("#sign-in-btn"); // Tombol untuk sign-in
const sign_up_btn = document.querySelector("#sign-up-btn"); // Tombol untuk sign-up
const container = document.querySelector(".container"); // Kontainer yang akan diubah tampilannya
const sign_in_btn2 = document.querySelector("#sign-in-btn2"); // Tombol sign-in untuk tampilan responsif
const sign_up_btn2 = document.querySelector("#sign-up-btn2"); // Tombol sign-up untuk tampilan responsif

// Menambahkan event listener untuk tombol sign-up
sign_up_btn.addEventListener("click", () => {
    // Menambahkan kelas 'sign-up-mode' pada elemen container
    // Kelas ini mungkin mengubah tampilan kontainer untuk menampilkan form sign-up
    container.classList.add("sign-up-mode");
});

// Menambahkan event listener untuk tombol sign-in
sign_in_btn.addEventListener("click", () => {
    // Menghapus kelas 'sign-up-mode' dari elemen container
    // Kelas ini mungkin mengubah tampilan kontainer untuk menampilkan form sign-in
    container.classList.remove("sign-up-mode");
});

// Menambahkan event listener untuk tombol sign-up pada tampilan responsif
sign_up_btn2.addEventListener("click", () => {
    // Menambahkan kelas 'sign-up-mode2' pada elemen container untuk tampilan responsif
    container.classList.add("sign-up-mode2");
});

// Menambahkan event listener untuk tombol sign-in pada tampilan responsif
sign_in_btn2.addEventListener("click", () => {
    // Menghapus kelas 'sign-up-mode2' dari elemen container untuk tampilan responsif
    container.classList.remove("sign-up-mode2");
});

// Menambahkan event listener untuk form sign-in saat disubmit
document.querySelector("#sign-in-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah submit form secara default untuk mencegah reload halaman
    const username = document.querySelector("#sign-in-username").value; // Mendapatkan nilai input username
    const password = document.querySelector("#sign-in-password").value; // Mendapatkan nilai input password
    if (username && password) {
        // Jika username dan password diisi, arahkan pengguna ke halaman home
        window.location.href = 'index.html';
    } else {
        // Jika ada field yang kosong, tampilkan alert
        alert("Please fill in all fields.");
    }
});

// Menambahkan event listener untuk form sign-up saat disubmit
document.querySelector("#sign-up-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah submit form secara default untuk mencegah reload halaman
    const username = document.querySelector("#sign-up-username").value; // Mendapatkan nilai input username
    const email = document.querySelector("#sign-up-email").value; // Mendapatkan nilai input email
    const password = document.querySelector("#sign-up-password").value; // Mendapatkan nilai input password
    if (username && email && password) {
        // Jika username, email, dan password diisi, arahkan pengguna ke halaman home
        window.location.href = 'index.html';
    } else {
        // Jika ada field yang kosong, tampilkan alert
        alert("Please fill in all fields.");
    }
});

// Mendapatkan elemen ikon toggle password untuk form sign-in
const togglePasswordSignIn = document.querySelector('#toggle-password-sign-in img');
// Mendapatkan elemen ikon toggle password untuk form sign-up
const togglePasswordSignUp = document.querySelector('#toggle-password-sign-up img');

// Menambahkan event listener untuk toggle password pada form sign-in
togglePasswordSignIn.addEventListener('click', function (e) {
    const passwordInput = document.querySelector('#sign-in-password'); // Mendapatkan elemen input password
    // Mengubah tipe input antara 'password' dan 'text'
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type); // Mengatur tipe input

    // Mengubah ikon toggle sesuai dengan tipe input password
    if (type === 'password') {
        this.src = "https://cdn-icons-png.flaticon.com/128/10812/10812267.png"; // Ikon untuk password tersembunyi
    } else {
        this.src = "https://cdn-icons-png.flaticon.com/128/159/159604.png"; // Ikon untuk password terlihat
    }
});

// Menambahkan event listener untuk toggle password pada form sign-up
togglePasswordSignUp.addEventListener('click', function (e) {
    const passwordInput = document.querySelector('#sign-up-password'); // Mendapatkan elemen input password
    // Mengubah tipe input antara 'password' dan 'text'
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type); // Mengatur tipe input

    // Mengubah ikon toggle sesuai dengan tipe input password
    if (type === 'password') {
        this.src = "https://cdn-icons-png.flaticon.com/128/10812/10812267.png"; // Ikon untuk password tersembunyi
    } else {
        this.src = "https://cdn-icons-png.flaticon.com/128/159/159604.png"; // Ikon untuk password terlihat
    }
});
