let data = [];

async function fetchData() {
  const response = await fetch('./data.json');
  data = await response.json();
  renderResults('');
}

function renderResults(query) {
  const resultDiv = document.getElementById('result');
  const searchBox = document.getElementById('search-box');
  const searchType = document.getElementById('search-type').value;
  resultDiv.innerHTML = ''; // Xóa kết quả cũ

  let results;
  if (query === '') {
    results = data;
  } else {
    results = data.filter(item => {
      if (searchType === 'hanzi') {
        return item.character.includes(query);
      } else if (searchType === 'pinyin') {
        return item.meaning.includes(query);
      } else { // Tìm tất cả
        return item.character.includes(query) || item.meaning.includes(query);
      }
    });
  }

  results.forEach(item => {
    const p = document.createElement('p');
    p.textContent = `${item.character}: ${item.meaning} (Số nét: ${item.strokes}, Bộ thủ: ${item.radical})`;
    p.classList.add('result-item'); // Thêm lớp CSS để nhận diện các phần tử kết quả
    p.addEventListener('click', () => openDetail(item)); // Thêm sự kiện click để mở trang chi tiết
    resultDiv.appendChild(p);
  });

  if (query === '') {
    searchBox.placeholder = searchType === 'hanzi' 
      ? "Nhập chữ Hán để tìm kiếm" 
      : searchType === 'pinyin' 
        ? "Nhập âm Hán Việt" 
        : "Tìm tất cả";
  } else {
    searchBox.placeholder = '';
  }

  if (results.length > 0) {
    const endText = document.createElement('p');
    endText.classList.add('end-text');
    endText.textContent = 'Hết';
    resultDiv.appendChild(endText);
  }
}

function openDetail(item) {
  const existingDetailDiv = document.querySelector('.detail-container');
  if (existingDetailDiv) {
    existingDetailDiv.style.display = 'none'; // Ẩn nội dung chi tiết hiện tại
  }

  const detailDiv = document.createElement('div');
  detailDiv.classList.add('detail-container');

  const characters = data.map(d => d.character);
  const definitionWithLinks = item.definition.replace(/\n/g, '<br>').replace(new RegExp(`([${characters.join('')}輔車相依])`, 'g'), function(char) {
    if (characters.includes(char)) {
      return `<a href="javascript:void(0);" onclick="openLinkedDetail('${char}')" style="color: red;">${char}</a>`;
    }
    return char;
  });

  detailDiv.innerHTML = `
    <h1>${item.character}</h1>
    <p>Nghĩa: ${item.meaning}</p>
    <p>Số nét: ${item.strokes}</p>
    <p>Bộ thủ: ${item.radical}</p>
    <p>Định nghĩa: ${definitionWithLinks}</p>
    <button id="back-button">Quay lại</button>
  `;
  document.body.appendChild(detailDiv);
  document.querySelector('.result-container').style.display = 'none';
  document.getElementById('back-button').addEventListener('click', () => {
    document.querySelector('.detail-container').remove();
    document.querySelector('.result-container').style.display = 'block';
    if (existingDetailDiv) {
      existingDetailDiv.style.display = 'block'; // Hiển thị lại nội dung chi tiết trước đó nếu có
    }
  });
}

function openLinkedDetail(character) {
  const item = data.find(d => d.character === character);
  if (item) {
    openDetail(item); // Mở nội dung chi tiết mới
  }
}

document.getElementById('search-box').addEventListener('input', function() {
  const query = this.value;
  renderResults(query);
});

document.getElementById('search-type').addEventListener('change', function() {
  const searchBox = document.getElementById('search-box');
  const searchType = this.value;
  searchBox.placeholder = searchType === 'hanzi' 
    ? "Nhập chữ Hán để tìm kiếm" 
    : searchType === 'pinyin' 
      ? "Nhập âm Hán Việt" 
      : "Tìm tất cả";
  
  const query = searchBox.value;
  renderResults(query);
});

// Load dữ liệu khi tải trang
fetchData();
