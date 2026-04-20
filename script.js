// Data anggota disimpan dalam array (penyimpanan sementara)
let members = [];

// Fungsi untuk menyimpan anggota ke localStorage agar data tetap ada saat refresh halaman
function loadMembersFromStorage() {
    const stored = localStorage.getItem("techCommunityMembers");
    if (stored) {
        members = JSON.parse(stored);
    } else {
        // Data contoh awal
        members = [
            { name: "Andi Wijaya", email: "andi@example.com", interest: "Web Development" },
            { name: "Budi Santoso", email: "budi@example.com", interest: "Data Science" }
        ];
        saveMembersToStorage();
    }
}

function saveMembersToStorage() {
    localStorage.setItem("techCommunityMembers", JSON.stringify(members));
}

// Fungsi untuk menampilkan tabel di halaman utama
function displayMemberTable() {
    const tableBody = document.querySelector("#memberTable tbody");
    if (!tableBody) return;
    tableBody.innerHTML = "";
    if (members.length === 0) {
        const row = tableBody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 3;
        cell.textContent = "Belum ada anggota terdaftar.";
        cell.style.textAlign = "center";
        return;
    }
    members.forEach(member => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = member.name;
        row.insertCell(1).textContent = member.email;
        row.insertCell(2).textContent = member.interest;
    });
}

// Fungsi untuk menambah anggota baru dari form
function addMember(event) {
    const form = document.getElementById("memberForm");
    if (!form) return;
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const interest = document.getElementById("interest").value;
    if (name === "" || email === "") {
        showFormMessage("Nama dan Email harus diisi!", "red");
        return;
    }
    // Cek duplikat email sederhana
    if (members.some(m => m.email === email)) {
        showFormMessage("Email sudah terdaftar!", "red");
        return;
    }
    members.push({ name, email, interest });
    saveMembersToStorage();
    showFormMessage("Pendaftaran berhasil!", "green");
    form.reset();
    // Jika di halaman utama, update tabel
    displayMemberTable();
}

function showFormMessage(msg, color) {
    const msgDiv = document.getElementById("formMessage");
    if (msgDiv) {
        msgDiv.textContent = msg;
        msgDiv.style.color = color;
        setTimeout(() => {
            msgDiv.textContent = "";
        }, 3000);
    }
}

// Halaman multimedia interaksi
function setupMultimediaPage() {
    const greetBtn = document.getElementById("greetButton");
    const greetMsg = document.getElementById("greetingMessage");
    if (greetBtn && greetMsg) {
        greetBtn.addEventListener("click", () => {
            greetMsg.textContent = "Halo! Selamat bergabung di Tech Community 🚀";
            greetMsg.style.color = "#1abc9c";
        });
    }
}

// Inisialisasi saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    loadMembersFromStorage();
    displayMemberTable();

    // Handle form submission jika ada di halaman form
    const form = document.getElementById("memberForm");
    if (form) {
        form.addEventListener("submit", addMember);
    }

    setupMultimediaPage();
});