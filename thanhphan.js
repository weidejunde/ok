
     // Bản đồ ký tự
     const charMap = {
        'LR': '⿰',
        'LL': '⿲',
        'UD': '⿱',
        'UU': '⿳',
        'RD': '⿸',
        'RU': '⿺',
        'LD': '⿹',
        'LU': '⿽',
        'OD': '⿵',
        'OR': '⿷',
        'OU': '⿶',
        'OL': '⿼',
        'OC': '⿴',
        'XX': '⿻',
        'MI': '⿾',
        'RO': '⿿',
        'SU': '㇯',

        'lr': '⿰',
        'll': '⿲',
        'ud': '⿱',
        'uu': '⿳',
        'rd': '⿸',
        'ru': '⿺',
        'ld': '⿹',
        'lu': '⿽',
        'od': '⿵',
        'or': '⿷',
        'ou': '⿶',
        'ol': '⿼',
        'oc': '⿴',
        'xx': '⿻',
        'mi': '⿾',
        'ro': '⿿',
        'su': '㇯'
    };

    // Hàm chèn ký tự
    function insertChar(character) {
        const searchInput = document.getElementById('search-input');
        const start = searchInput.selectionStart; // Vị trí bắt đầu bôi đen
        const end = searchInput.selectionEnd; // Vị trí kết thúc bôi đen
        const currentValue = searchInput.value; // Giá trị hiện tại của ô tìm kiếm

        // Nếu có phần bôi đen, thay thế nó bằng ký tự mới
        const newValue = currentValue.slice(0, start) + character + currentValue.slice(end);

        searchInput.value = newValue; // Cập nhật giá trị mới
        searchInput.setSelectionRange(start + 1, start + 1); // Đặt con trỏ ngay sau ký tự vừa chèn
        searchInput.focus(); // Đưa con trỏ trở lại ô tìm kiếm
    }

    // Lắng nghe sự kiện nhập liệu trong ô tìm kiếm
    document.getElementById('search-input').addEventListener('input', function(event) {
        const inputValue = event.target.value.trim();
        const char = charMap[inputValue];
        if (char) {
            event.target.value = char; // Thay thế giá trị ô nhập bằng ký tự tương ứng
        }
    });   

    const specialChars = [
        { char: '⿰', desc: 'LR' },
        { char: '⿲', desc: 'LL' },
        { char: '⿱', desc: 'UD' },
        { char: '⿳', desc: 'UU' },
        { char: '⿸', desc: 'RD' },
        { char: '⿺', desc: 'RU' },
        { char: '⿹', desc: 'LD' },
        { char: '⿽', desc: 'LU' },
        { char: '⿵', desc: 'OD' },
        { char: '⿷', desc: 'OR' },
        { char: '⿶', desc: 'OU' },
        { char: '⿼', desc: 'OL' },
        { char: '⿴', desc: 'OC' },
        { char: '⿻', desc: 'XX' },
        { char: '⿾', desc: 'MI' },
        { char: '⿿', desc: 'RO' },
        { char: '㇯', desc: 'SU' }
    ];

    const container = document.getElementById('special-char-buttons');

// Tạo hàng đầu tiên với 8 nút
const firstRow = document.createElement('div');
firstRow.className = 'button-row';
for (let i = 0; i < 8; i++) {
    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'special-char-button';
    button.textContent = specialChars[i].char;
    button.onclick = () => insertChar(specialChars[i].char);

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = specialChars[i].desc;

    buttonDiv.appendChild(button);
    buttonDiv.appendChild(description);
    firstRow.appendChild(buttonDiv);
}
container.appendChild(firstRow);

// Tạo hàng thứ hai với 9 nút
const secondRow = document.createElement('div');
secondRow.className = 'button-row';
for (let i = 8; i < specialChars.length; i++) {
    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'special-char-button';
    button.textContent = specialChars[i].char;
    button.onclick = () => insertChar(specialChars[i].char);

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = specialChars[i].desc;

    buttonDiv.appendChild(button);
    buttonDiv.appendChild(description);
    secondRow.appendChild(buttonDiv);
}
container.appendChild(secondRow);
function insertChar(character) {
    const searchInput = document.getElementById('search-input');
    const start = searchInput.selectionStart; // Vị trí bắt đầu bôi đen
    const end = searchInput.selectionEnd; // Vị trí kết thúc bôi đen
    const currentValue = searchInput.value; // Giá trị hiện tại của ô tìm kiếm

    // Nếu có phần bôi đen, thay thế nó bằng ký tự mới
    const newValue = currentValue.slice(0, start) + character + currentValue.slice(end);

    searchInput.value = newValue; // Cập nhật giá trị mới
    searchInput.setSelectionRange(start + 1, start + 1); // Đặt con trỏ ngay sau ký tự vừa chèn
    searchInput.focus(); // Đưa con trỏ trở lại ô tìm kiếm
}

let jsonData = []; // Biến toàn cục để lưu dữ liệu JSON

fetch('dian.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        const tableHeader = document.querySelector('#header-row');
        const tableBody = document.querySelector('#data-table tbody');

        // Tạo tiêu đề từ hàng đầu tiên của tệp Excel
        const headers = ["Chữ", "tp1", "tp2", "tpx", "tpp", "tp"];
        headers.forEach(header => {
            let cell = document.createElement('th');
            cell.textContent = header;
            tableHeader.appendChild(cell);
        });

        function cleanText(text) {
            // Loại bỏ các phần tử trong dấu ngoặc {}
            text = text.replace(/{.*?}/g, '').trim();
            // Loại bỏ các phần tử trong dấu ngoặc () không có dấu # phía trước
            text = text.replace(/(?<!#)\(.*?\)/g, '').trim();
            return text;
        }

        function expandText(initialText, dictionary) {
            let expandedText = new Set([initialText]);
            let newTexts = new Set();

            function addText(text) {
                let anyChange = false;

                Object.keys(dictionary).forEach(key => {
                    const regex = new RegExp(key, 'g');
                    if (regex.test(text)) {
                        anyChange = true;
                        dictionary[key].split(';').forEach(subPart => {
                            const replaced = text.replace(regex, subPart);
                            newTexts.add(replaced);
                            addText(replaced);
                        });
                    }
                });

                if (!anyChange) {
                    newTexts.add(text);
                }
            }

            expandedText.forEach(text => addText(text));

            return [...newTexts].join('\n');
        }

        function transformParts(text) {
            text = text.replace(/⿰⿰/g, '⿲');
            text = text.replace(/⿱⿱/g, '⿳');
            text = text.replace(/⿰(.)⿰/g, '⿲$1');
            text = text.replace(/⿱(.)⿱/g, '⿳$1');
            return text;
        }

        function removeDuplicates(tpxText, tppText) {
            const tpxParts = tpxText.split('<br>').map(part => part.trim());
            const tppParts = tppText.split('<br>').map(part => part.trim());
            const uniqueParts = tppParts.filter(part => !tpxParts.includes(part));
            return uniqueParts.join('<br>');
        }

        const dictionary = {};

        jsonData.slice(1).forEach(row => {
            dictionary[row[0]] = cleanText(row[1]);
        });

        jsonData.slice(1).forEach(row => {
            const tp2Parts = cleanText(row[1]).split(';');
            let dataRow = document.createElement('tr');

            let cellChu = document.createElement('td');
            cellChu.textContent = row[0];
            dataRow.appendChild(cellChu);

            let cellTP1 = document.createElement('td');
            cellTP1.textContent = cleanText(row[1]);
            dataRow.appendChild(cellTP1);

            let cellTP2 = document.createElement('td');
            cellTP2.textContent = tp2Parts[0];
            dataRow.appendChild(cellTP2);

            let cellTPX = document.createElement('td');
            const expandedParts = expandText(tp2Parts[0], dictionary).split('\n').map(part => part.trim()).join('<br>');
            cellTPX.innerHTML = expandedParts;
            dataRow.appendChild(cellTPX);

            let cellTPP = document.createElement('td');
            const transformedParts = transformParts(expandedParts);
            const uniqueParts = removeDuplicates(expandedParts, transformedParts);
            cellTPP.innerHTML = uniqueParts;
            dataRow.appendChild(cellTPP);

            let cellTP = document.createElement('td'); 
            cellTP.textContent = row[1];
            dataRow.appendChild(cellTP);

            tableBody.appendChild(dataRow);

            for (let i = 1; i < tp2Parts.length; i++) {
                let subRow = document.createElement('tr');

                let subCellChu = document.createElement('td');
                subCellChu.textContent = row[0];
                subRow.appendChild(subCellChu);

                let emptyCellTP1 = document.createElement('td');
                subRow.appendChild(emptyCellTP1);

                let subCellTP2 = document.createElement('td');
                subCellTP2.textContent = tp2Parts[i];
                subRow.appendChild(subCellTP2);

                let subCellTPX = document.createElement('td');
                const subExpandedParts = expandText(tp2Parts[i], dictionary).split('\n').map(part => part.trim()).join('<br>');
                subCellTPX.innerHTML = subExpandedParts;
                subRow.appendChild(subCellTPX);

                let subCellTPP = document.createElement('td');
                const subTransformedParts = transformParts(subExpandedParts);
                const subUniqueParts = removeDuplicates(subExpandedParts, subTransformedParts);
                subCellTPP.innerHTML = subUniqueParts;
                subRow.appendChild(subCellTPP);

                tableBody.appendChild(subRow);
            }
        });

        window.search = function () {
            const searchText = document.getElementById('search-input').value.trim();
        
            if (searchText === '') {
                document.getElementById('search-results').innerHTML = '';
                return;
            }
        
            const regexSearchText = searchText
                .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escaping special characters
                .replace(/？/g, '.')
                .replace(/\*/g, '.*'); // Thay thế * bằng .* (bất kỳ chuỗi ký tự nào)
        
            const regex = new RegExp(`^${regexSearchText}`);
            const results = [];
        
            jsonData.slice(1).forEach(row => {
                const chu = row[0]; // Chữ gốc
                const tp2 = cleanText(row[1]); // Thành phần 2
                const tpx = expandText(tp2, dictionary); // Thành phần mở rộng
                const tpp = transformParts(tpx).split('<br>').join('\n');
                const tp = cleanText(row[1]); // Thành phần gốc
        
                const exactMatch =
                    chu.includes(searchText) ||
                    tp2.split(';').some(part => regex.test(part)) ||
                    tpx.split('\n').some(part => regex.test(part)) ||
                    tpp.split('\n').some(part => regex.test(part));
        
                if (chu.includes(searchText) || exactMatch) {
                    // Tạo liên kết dẫn đến trang chi tiết
                    const detailLink = `<a class="search-result" href="detail.html?chu=${encodeURIComponent(chu)}">${chu}</a>`;
                    results.push(detailLink);
                }
            });
        
            const resultsContainer = document.getElementById('search-results');
            if (results.length) {
                resultsContainer.innerHTML = results.join('');
            } else {
                resultsContainer.innerHTML = "Không tìm thấy kết quả phù hợp";
            }
        };


        document.getElementById('search-input').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                search();
            }
        });
    })
    .catch(error => console.error('Error fetching or reading the file:', error));

function exportToExcel() {
    const table = document.getElementById('data-table');
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Tạo Blob từ workbook và tạo URL tải xuống
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Bảng chữ và Thành phần.xlsx';
    link.click();

    // Giải phóng bộ nhớ
    URL.revokeObjectURL(link.href);
}

function toggleTable() {
            const table = document.getElementById('data-table');
            const button = document.getElementById('toggle-button');

            if (table.style.display === 'none' || table.style.display === '') {
                table.style.display = 'table'; // Hiện bảng
                button.textContent = 'Ẩn Bảng'; // Cập nhật văn bản nút
            } else {
                table.style.display = 'none'; // Ẩn bảng
                button.textContent = 'Hiện Bảng'; // Cập nhật văn bản nút
            }
        }

        // Hàm để hiển thị chi tiết ký tự
function loadDetail(chu) {
    fetch('dian.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            const dictionary = {};
            jsonData.slice(1).forEach(row => {
                dictionary[row[0]] = row;
            });

            const row = dictionary[chu];
            if (!row) {
                document.getElementById('detail-container').innerHTML = 'Không tìm thấy chi tiết cho chữ này.';
                return;
            }

            displayDetails(row);
        })
        .catch(error => {
            console.error('Error fetching or reading the file:', error);
            document.getElementById('detail-container').textContent = 'Lỗi khi tải dữ liệu.';
        });
}

// Hàm để hiển thị thông tin chi tiết trong trang hiện tại
function displayDetails(row) {
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML = `
        <h2>${row[0]}</h2>
        <p>${row[1]}</p>
        <p>${row[2]} <strong>nét</strong></p>
        <p><strong>Hán Việt:</strong> ${row[3]}</p>
        <p><strong>Bộ:</strong> ${row[4]}</p>
    `;
}

// Hàm để thêm sự kiện click vào kết quả tìm kiếm
function addClickEventToResults() {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('search-result')) {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt
            const chu = event.target.textContent;
            loadDetail(chu);
        }
    });
}

// Gọi hàm thêm sự kiện khi tìm kiếm xong
document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        search();
        addClickEventToResults();
    }
});

document.querySelector('button[onclick="search()"]').addEventListener('click', function() {
    search();
    addClickEventToResults();
});
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Ô tìm kiếm thứ nhất: Tìm chữ và hiển thị trang chi tiết trong iframe
function startSearch() {
    const searchInput = document.getElementById('search').value.trim();
    if (searchInput) {
        showLoading();
        const iframe = document.getElementById('detail-iframe');
        iframe.style.display = 'block'; // Hiển thị iframe
        iframe.src = `detail.html?chu=${searchInput}`; // Cập nhật URL của iframe với kết quả tìm kiếm
    }
}

// Ô tìm kiếm thứ hai: Tìm thành phần và hiển thị kết quả trong khu vực riêng
function search() {
    const searchInput = document.getElementById('search-input').value.trim();
    if (searchInput) {
        showLoading();
        const resultsDiv = document.getElementById('search-results');
        resultsDiv.innerHTML = ''; // Xóa kết quả trước đó
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.textContent = searchInput;
        resultItem.onclick = () => showDetail(searchInput);
        resultsDiv.appendChild(resultItem); // Hiển thị kết quả trong div
        hideLoading();
    }
}

// Hiển thị chi tiết chữ trong iframe
function showDetail(character) {
    showLoading();
    const iframe = document.getElementById('detail-iframe');
    iframe.style.display = 'block'; // Hiển thị iframe
    iframe.src = `detail.html?chu=${character}`; // Cập nhật URL của iframe với chi tiết chữ
}

window.onload = function() {
    hideLoading();
};
