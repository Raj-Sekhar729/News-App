// const apiKey = CONFIG.NEWS_API_KEY;

//  const blogContainer = document.getElementById("blog-container");

//  async function fetchRandomNews(){
//     try{
//         const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`;
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         return data.articles;
//     }
//     catch(error){
//         console.error("Error fetching random news", error);
//         return []
//     }
//  } 

//  function displayBlogs(articles){
//     blogContainer.innerHTML = "";
//     articles.forEach((article) => {
//         const blogCard = document.createElement("div");
//         blogCard.classList.add("blog-card");
//         const img = document.createElement("img");
//         img.src = article.urlToImage;
//         img.alt = article.title;

//         const title = document.createElement("h2");
//         title.textContent = article.title;
        
//         const description = document.createElement("p");
//         description.textContent = article.description;

//         blogCard.appendChild(img);
//         blogCard.appendChild(title);
//         blogCard.appendChild(description);
//         blogContainer.appendChild(blogCard);
//     });
//  }  

//  (async () =>{
//     try{
//         const articles = await fetchRandomNews();
//         displayBlogs(articles);
//     }
//     catch(error){
//         console.error("Error fetching random news", error);
//     }
//  })();



const apiKey = CONFIG.NEWS_API_KEY;
const blogContainer = document.getElementById("blog-container");
const inputField = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Add error checking for API response
        // if (data.status === 'error') {
        //     console.error('API Error:', data.message);
        //     return [];
        // }
        //console.log('API Response:', data); // Debug log

        return data.articles;
    }
    catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

searchBtn.addEventListener("click", async ()=>{
    const query = inputField.value.trim();

    if(query != "")
     {
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        }
        catch(error){
            console.log("Error fetching news by query", error);
        }
     }   
})

async function fetchNewsQuery(query){
     try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }
    catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    
    // Check if articles exist and is an array
    if (!articles || !Array.isArray(articles) || articles.length === 0) {
        blogContainer.innerHTML = '<p>No articles found or failed to load news.</p>';
        return;
    }
    
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        
        const img = document.createElement("img");
        // Handle missing images
        img.src = article.urlToImage || 'https://placehold.co/600x400?text=No+Image';
        img.alt = article.title || 'News Image';
        
        // Add error handling for broken images
        img.onerror = function() {
            this.src = 'https://placehold.co/600x400?text=Image+Not+Available';
        };

        const title = document.createElement("h2");
        title.textContent = article.title || 'No Title Available';

        const description = document.createElement("p");
        description.textContent = article.description || 'No description available.';

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", ()=>{
            window.open(article.url, "_blank");
        })
        blogContainer.appendChild(blogCard);
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    try{
        console.log('Fetching news...'); // Debug log
        const articles = await fetchRandomNews();
        console.log('Articles received:', articles); // Debug log
        displayBlogs(articles);
    }
    catch(error){
        console.error("Error fetching random news", error);
        blogContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
    }
});