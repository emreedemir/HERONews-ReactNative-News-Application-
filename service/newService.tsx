import axios from 'axios';

const API_KEY =process.env.EXPO_PUBLIC_NEWS_API;

const getApiUrl = (category: string) => {
    const categoryParam = category ? `&category=${category}` : '';
    return `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}${categoryParam}`;
};

export const getNews = async (category: string) => {
    try {
        const apiUrl = getApiUrl(category);
        const response = await axios.get(apiUrl);
        
        return response.data; 
    }
    catch (error) {
        console.error("Global haberler çekilirken hata oluştu:", error);
        return null;   
    }
};