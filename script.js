// --- 请在这里替换成你自己的API密钥 ---
const API_KEY = 'ad2e0852ff9968064f8c171bdd452d49'; 
// ------------------------------------

const newsContainer = document.getElementById('news-container');

// 定义要获取新闻的国家和类别，例如获取美国的科技新闻
const country = 'us'; // us:美国, gb:英国, de:德国, jp:日本
const category = 'technology'; // business, entertainment, general, health, science, sports, technology

// 构建API请求的URL
const API_URL = `https://gnews.io/api/v4/top-headlines?lang=en&topic=technology&token=${API_KEY}`;


// 使用fetch函数异步获取新闻数据
async function getNews() {
    try {
        const response = await fetch(API_URL);
        
        // 检查请求是否成功
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // 可以在浏览器控制台看到原始数据

        displayNews(data.articles);
    } catch (error) {
        console.error("获取新闻失败:", error);
        newsContainer.innerHTML = '<div class="loading">加载新闻失败，请检查API密钥或网络连接。</div>';
    }
}

// 将获取到的新闻数据显示在页面上
function displayNews(articles) {
    // 首先清空容器中的“正在加载”提示
    newsContainer.innerHTML = '';

    // 如果没有文章，显示提示信息
    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = '<div class="loading">暂时没有相关新闻。</div>';
        return;
    }

    // 遍历每一篇文章，并为它创建一个HTML元素
    articles.forEach(article => {
        // 如果文章没有标题或描述，就跳过它
        if (!article.title || !article.description) {
            return;
        }

        // 创建一个div作为文章的容器
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');

        // 使用模板字符串构建文章的HTML内容
        articleElement.innerHTML = `
            ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}">` : ''}
            <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">阅读全文 &rarr;</a>
        `;

        // 将创建好的文章元素添加到新闻容器中
        newsContainer.appendChild(articleElement);
    });
}

// 当页面加载完成后，立即执行getNews函数
getNews();