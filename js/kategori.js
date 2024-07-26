// URL untuk mengambil data dari API The New York Times
const url = 'https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=Pb0ua8srT5GWCP17mTRGC7vNXld0YNze';

// Opsi untuk permintaan fetch, termasuk metode HTTP dan header yang diterima
const options = {
    method: "GET", // Metode HTTP yang digunakan, yaitu GET untuk mengambil data
    headers: { "Accept": "application/json" }, // Menetapkan header agar server mengirimkan data dalam format JSON
};

// Mengambil data dari API
fetch(url, options) // Mengirim permintaan ke API menggunakan URL dan opsi yang ditentukan
    .then(response => response.json()) // Mengubah respons dari server menjadi format JSON
    .then(data => {
        // Mengambil elemen dropdown untuk kategori
        const categorySelect = document.getElementById('category-select');
        // Mengambil elemen container untuk menampilkan buku
        const booksContainer = document.getElementById('books');
        // Mengambil elemen container untuk menampilkan penulis
        const authorsContainer = document.getElementById('authors-container');
        // Mengambil daftar buku dari data yang diterima
        const lists = data.results.lists;

        // Membuat opsi kategori di dropdown
        lists.forEach(list => {
            const option = document.createElement('option'); // Membuat elemen <option> untuk dropdown
            option.value = list.list_name_encoded; // Menetapkan nilai opsi dengan nama kategori yang telah dienkode
            option.textContent = list.list_name; // Menetapkan teks opsi dengan nama kategori
            categorySelect.appendChild(option); // Menambahkan opsi ke dropdown kategori
        });

        // Menampilkan buku untuk kategori pertama secara default
        if (lists.length > 0) displayBooks(lists[0].books); // Jika ada daftar buku, tampilkan buku dari kategori pertama

        // Menampilkan buku untuk kategori yang dipilih
        categorySelect.addEventListener('change', event => {
            const selectedList = lists.find(list => list.list_name_encoded === event.target.value); // Mencari daftar yang dipilih
            displayBooks(selectedList.books); // Menampilkan buku dari daftar yang dipilih
        });

        // Mengumpulkan penulis unik
        const authors = new Map(); // Membuat Map untuk menyimpan penulis dan gambar buku
        lists.forEach(list => list.books.forEach(book => {
            if (!authors.has(book.author)) { // Jika penulis belum ada di Map
                authors.set(book.author, book.book_image); // Menambahkan penulis dan gambar buku ke Map
            }
        }));

        // Membuat kartu penulis
        authors.forEach((image, name) => {
            const authorCard = document.createElement('div'); // Membuat elemen <div> untuk kartu penulis
            authorCard.className = 'author-card'; // Menetapkan kelas CSS untuk kartu penulis

            const img = document.createElement('img'); // Membuat elemen <img> untuk gambar penulis
            img.src = image; // Menetapkan sumber gambar penulis
            img.alt = name; // Menetapkan teks alternatif untuk gambar

            const authorName = document.createElement('h3'); // Membuat elemen <h3> untuk nama penulis
            authorName.textContent = name; // Menetapkan nama penulis

            authorCard.append(img, authorName); // Menambahkan gambar dan nama penulis ke kartu penulis
            authorsContainer.appendChild(authorCard); // Menambahkan kartu penulis ke container penulis
        });
    })
    .catch(error => console.error('Error fetching data:', error)); // Menangani kesalahan jika permintaan gagal

    
    // Fungsi untuk menampilkan buku
    function displayBooks(books) {
    const booksContainer = document.getElementById('books'); // Mengambil elemen container untuk menampilkan buku
    clearContainer(booksContainer); // Membersihkan buku yang sudah ada di kontainer

    books.forEach(book => {
        const bookElement = document.createElement('div'); // Membuat elemen <div> untuk setiap buku
        bookElement.className = 'book'; // Menetapkan kelas CSS untuk elemen buku

        const link = document.createElement('a'); // Membuat elemen <a> untuk tautan ke buku
        link.href = book.amazon_product_url; // Menetapkan URL tautan
        link.target = '_self'; // Menetapkan target tautan
        link.className = 'book-link'; // Menetapkan kelas CSS untuk tautan
        
        const img = document.createElement('img'); // Membuat elemen <img> untuk gambar buku
        img.src = book.book_image; // Menetapkan sumber gambar buku
        img.alt = book.title; // Menetapkan teks alternatif untuk gambar

        const title = document.createElement('h3'); // Membuat elemen <h3> untuk judul buku
        title.textContent = book.title; // Menetapkan teks judul buku
        
        link.append(img, title); // Menambahkan gambar dan judul buku ke tautan
        bookElement.appendChild(link); // Menambahkan tautan ke elemen buku
        booksContainer.appendChild(bookElement); // Menambahkan elemen buku ke kontainer buku
    });
}


    // Fungsi untuk mengalihkan visibilitas menu
    function toggleMenu() {
        const navUl = document.querySelector('nav ul'); // Mengambil elemen <ul> di dalam <nav>
        navUl.classList.toggle('showing'); // Mengalihkan kelas 'showing' untuk menampilkan atau menyembunyikan menu
    }
    
    // Fungsi untuk membersihkan kontainer tanpa menggunakan innerHTML
    function clearContainer(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild); // Menghapus semua anak elemen dari kontainer
        }
    }