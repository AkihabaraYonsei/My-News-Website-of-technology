
const API_KEY = 'ad2e0852ff9968064f8c171bdd452d49'; 

const newsContainer = document.getElementById('news-container');


const country = 'us'; // us:美国, gb:英国, de:德国, jp:日本
const category = 'technology'; // business, entertainment, general, health, science, sports, technology


const API_URL = `https://gnews.io/api/v4/top-headlines?lang=en&topic=technology&token=${API_KEY}`;



async function getNews() {
    try {
        const response = await fetch(API_URL);
        
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); 

        displayNews(data.articles);
    } catch (error) {
        console.error("获取新闻失败:", error);
        newsContainer.innerHTML = '<div class="loading">加载新闻失败，请检查API密钥或网络连接。</div>';
    }
}


function displayNews(articles) {
    
    newsContainer.innerHTML = '';

   
    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = '<div class="loading">暂时没有相关新闻。</div>';
        return;
    }

   
    articles.forEach(article => {
       
        if (!article.title || !article.description) {
            return;
        }

       
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');

        
        articleElement.innerHTML = `
            ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}">` : ''}
            <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">阅读全文 &rarr;</a>
        `;

        
        newsContainer.appendChild(articleElement);
    });
}
getNews();
