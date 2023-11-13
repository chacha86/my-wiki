
function getFetchData(url, callback) {
    fetch(url)
        .then(response => response.json()) // 서버로부터 받은 응답을 JSON으로 변환
        .then(data => callback(data)) // JSON 데이터 처리
        .catch(error => console.error('Fetch Error:', error)); // 에러 처리
}

