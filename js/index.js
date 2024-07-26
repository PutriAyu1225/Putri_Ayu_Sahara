// URL untuk mengambil data dari API The New York Times
const url = 'https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=Pb0ua8srT5GWCP17mTRGC7vNXld0YNze';

// Opsi untuk permintaan fetch, termasuk metode HTTP dan header yang diterima
const options = {
    method: "GET", // Menggunakan metode GET untuk mengambil data
    headers: { "Accept": "application/json" }, // Menyatakan bahwa respons yang diharapkan adalah dalam format JSON
};

// Mengambil data dari API menggunakan fetch
fetch(url, options)
    .then(response => response.ok ? response.json() : Promise.reject({
        status: response.status, // Mengambil status respons jika tidak ok
        statusText: response.statusText, // Mengambil teks status respons jika tidak ok
        errorMessage: response.json(), // Mengambil pesan error dalam format JSON
    }))
    .then(data => {
        // Menampilkan novel dari data yang diterima, memisahkan antara novel dalam rentang 0-12 dan 12-24
        displayNovels(data.results.lists, 'novel-list', 0, 12);
        displayNovels(data.results.lists, 'novel-new', 12, 24);
    })
    .catch(err => console.error(err)); // Menangani dan mencetak error jika terjadi masalah

// Fungsi untuk menampilkan novel di elemen dengan ID tertentu
function displayNovels(lists, elementId, startIndex, endIndex) {
    // Mengambil elemen HTML berdasarkan ID
    const container = document.getElementById(elementId);
    // Mengosongkan konten elemen tersebut sebelum menambahkan novel baru
    container.textContent = '';

    let index = 0; // Indeks untuk melacak posisi buku dalam daftar

    // Iterasi melalui setiap daftar buku
    lists.forEach(list => {
        // Iterasi melalui buku dalam rentang yang ditentukan (startIndex hingga endIndex)
        list.books.slice(startIndex, endIndex).forEach(book => {
            if (index >= startIndex && index < endIndex) {
                // Membuat elemen div untuk item novel
                const novelItem = document.createElement('div');
                novelItem.className = 'novel-item';

                // Membuat elemen gambar untuk cover buku
                const bookImage = document.createElement('img');
                bookImage.src = book.book_image; // Mengatur sumber gambar dari API
                bookImage.alt = book.title; // Mengatur teks alternatif gambar

                // Membuat tombol 'Buy Now'
                const buyButton = document.createElement('button');
                buyButton.textContent = 'Buy Now'; // Menetapkan teks tombol
                // Menambahkan aksi klik tombol untuk membuka tautan pembelian buku
                buyButton.onclick = () => window.open(book.buy_links[0].url, '_self');

                // Menambahkan gambar dan tombol ke elemen item novel
                novelItem.append(bookImage, buyButton);
                // Menambahkan item novel ke kontainer
                container.appendChild(novelItem);
            }
            index++;
        });
    });
}

// Menambahkan event listener untuk mengatur menu toggle saat halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
    // Mengambil elemen tombol menu toggle dan daftar menu navigasi
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    // Menambahkan event listener klik pada tombol menu toggle
    menuToggle.addEventListener('click', function () {
        // Menambahkan atau menghapus kelas 'active' pada daftar menu navigasi
        navMenu.classList.toggle('active');
    });
});
