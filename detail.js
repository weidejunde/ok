// Lấy chữ từ URL
function getParameterByName(name) {
    const url = window.location.href;
    const nameRegex = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${nameRegex}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);

    if (!results || !results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Biến toàn cục để lưu trữ dữ liệu
let jsonData = [];

// Hàm tải dữ liệu từ file Excel
function loadExcelData(callback) {
    fetch('dian.xlsx')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.arrayBuffer();
        })
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            console.log("Dữ liệu đã được tải:", jsonData); // Thêm dòng này để kiểm tra dữ liệu
            if (callback) callback();
        })
        .catch(error => console.error('Error loading Excel file:', error));
}

// Hàm hiển thị thông tin chữ
function displayCharacterInfo(chu) {
    const detailContainer = document.getElementById('detail-container');

    if (chu) {
        const dataRow = jsonData.find(row => row[0] === chu);

        if (dataRow) {
            detailContainer.innerHTML = `
                <h2>${chu}</h2>
                <p>${dataRow[1]}</p>
                <p>${dataRow[2]} <strong>Nét</strong></p>
                <p><strong>Hán</strong> ${dataRow[3]}</p>
                <p><strong>Bộ</strong> ${dataRow[4]}</p>
            `;
        } else {
            detailContainer.innerHTML = `<p>Không có kết quả.</p>`;
        }
    } else {
        detailContainer.innerHTML = `<p>Không có chữ nào được chọn.</p>`;
    }
}

// Khi trang được tải, hãy tải dữ liệu và hiển thị thông tin
document.addEventListener('DOMContentLoaded', () => {
    loadExcelData(() => {
        const chu = getParameterByName('chu'); // Lấy chữ từ URL
        displayCharacterInfo(chu); // Hiển thị thông tin cho chữ
    });
});