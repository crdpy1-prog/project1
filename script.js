
const API_KEY = '0fe36ee8e12f4e6aa1a24633250708';
const API_URL = 'https://api.weatherapi.com/v1/current.json';

// DOM 요소들
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherContainer = document.getElementById('weatherContainer');
const loading = document.getElementById('loading');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');

// 날씨 정보 요소들
const cityName = document.getElementById('cityName');
const country = document.getElementById('country');
const temp = document.getElementById('temp');
const weatherIcon = document.getElementById('weatherIcon');
const condition = document.getElementById('condition');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const visibility = document.getElementById('visibility');

// 초기 로딩 숨기기
loading.style.display = 'none';

// 이벤트 리스너
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// 검색 처리 함수
async function handleSearch() {
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('도시명을 입력해주세요.');
        return;
    }
    
    await fetchWeather(city);
}

// 날씨 데이터 가져오기
async function fetchWeather(city) {
    // 로딩 상태 표시
    showLoading();
    
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}&aqi=no&lang=ko`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        displayWeather(data);
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError();
    }
}

// 날씨 정보 표시
function displayWeather(data) {
    const { location, current } = data;
    
    // 위치 정보
    cityName.textContent = location.name;
    country.textContent = `${location.region}, ${location.country}`;
    
    // 현재 날씨
    temp.textContent = Math.round(current.temp_c);
    weatherIcon.src = `https:${current.condition.icon}`;
    weatherIcon.alt = current.condition.text;
    condition.textContent = current.condition.text;
    
    // 상세 정보
    feelsLike.textContent = Math.round(current.feelslike_c);
    humidity.textContent = current.humidity;
    windSpeed.textContent = current.wind_kph;
    visibility.textContent = current.vis_km;
    
    // UI 업데이트
    hideLoading();
    weatherInfo.style.display = 'block';
    errorMessage.style.display = 'none';
}

// 로딩 상태 표시
function showLoading() {
    loading.style.display = 'block';
    weatherInfo.style.display = 'none';
    errorMessage.style.display = 'none';
}

// 로딩 숨기기
function hideLoading() {
    loading.style.display = 'none';
}

// 에러 표시
function showError() {
    hideLoading();
    weatherInfo.style.display = 'none';
    errorMessage.style.display = 'block';
}

// 페이지 로드 시 서울 날씨 기본 표시
window.addEventListener('load', () => {
    cityInput.value = 'Seoul';
    fetchWeather('Seoul');
});
