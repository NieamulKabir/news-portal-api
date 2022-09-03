// load all news category
const loadAllNewsCategory = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url)
        const data = await res.json()
        displayAllCategory(data.data.news_category)
    }
    catch {

    }

}

// display all news category
const displayAllCategory = (newses) => {
    const allNewsCategoryContainer = document.getElementById('all-news-category')
    allNewsCategoryContainer.textContent = '';

    newses.forEach(news => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="mx-auto text-center font-bold">
            <button
                onclick="loadAllNews('${news.category_id}')"
                >${news.category_name}
            </button>
        </div>
        `
        allNewsCategoryContainer.appendChild(div)
    })
}

// load individual category all news

const loadAllNews = async category_id => {
    toggleSpinner('block');
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
        const res = await fetch(url)
        const data = await res.json()
        displayAllNews(data.data);
    }
    catch {

    }
}

//spinner
const toggleSpinner = displayStyle => {
    document.getElementById('toggle_spinner').style.display = displayStyle;
}


// display individual category all news
const displayAllNews = allNews => {

    //error handle
    document.getElementById('error_messsage').innerText = '';
    if (allNews.length === 0) {
        document.getElementById('error_messsage').innerText = 'Not Found';
        toggleSpinner('none');
    }
    const lengthContainer = document.getElementById('length')
    const newsContainer = document.getElementById('news-details')
    const p = document.createElement('p')
    lengthContainer.textContent = ''
    p.innerHTML = `
         ${allNews.length} Items Found for the category
    `
    lengthContainer.appendChild(p)
    newsContainer.textContent = ''

    allNews.forEach(newsAll => {
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl mx-auto my-5">
                <figure><img class='' src=${newsAll.thumbnail_url} alt="Album"></figure>
                <div class="card-body">
                    <h2 class="card-title">${newsAll.title}</h2>
                    <p>${newsAll.details.slice(0, 400)}...</p>
                    <div class="flex justify-evenly items-center">
                        <div class="flex items-center">
                            <figure><img class='w-12  px-2' src=${newsAll.author.img} alt="Album"></figure>
                            <p>${newsAll.author.name ? newsAll.author.name : 'Not Found'}</p>
                        </div>
                        <div>
                            <p class='flex items-center'>
                            <svg class='w-3 h-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z"/></svg>${newsAll.total_view?newsAll.total_view : 'Not Found'}</p>
                        </div>
                        <div>
                            <p class='flex items-center'> 
                            <svg class='w-3 h-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                            ${newsAll.rating.number}</p>
                        </div>
                        <div class="card-actions">
                            <label for="my-modal-6" 
                            onclick="loadNewsDetails('${newsAll._id}')" class="btn btn-primary" modal-button">Details</label>
                        </div>
                    </div>
                </div>
          </div>
    `
        newsContainer.appendChild(div)
    })
    toggleSpinner('none');
}
// load news details
const loadNewsDetails = async news_id => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${news_id}`
        const res = await fetch(url)
        const data = await res.json()
        displayNewsDetails(data.data);
    }
    catch {

    }
}
// display news details ion the UI
const displayNewsDetails = newsDetails => {
    console.log();
    const modalContainer = document.getElementById('modal')
    modalContainer.textContent = ''

    const div = document.createElement('div')
    div.innerHTML = `
    <h1 class="font-bold"> ${newsDetails[0].title}<h1>
        <div class='flex justify-evenly items-center mt-7'>
            <div>
                <img class='pr-5 w-80' src=${newsDetails[0].thumbnail_url} alt="">
            </div>

            <div> 
                <p class="font-medium"><span class='text-purple-600'>  Author : </span> <span>${newsDetails[0].author.name ? newsDetails[0].author.name : 'Not Found'} </span> </p>
                <p class="font-medium"><span class='text-purple-600'>  Details : </span> <span>${newsDetails[0].details.slice(0, 100) ? newsDetails[0].details.slice(0, 100) : 'Not Found'}.... </span> </p>
                <p class="font-medium"><small><span class='text-purple-600'>  Published Date: </span> <span> ${newsDetails[0].author.published_date ? newsDetails[0].author.published_date : 'Not Found'}</small> </span> </p>

                <p class="font-medium">
                    <small> 
                        <span class='text-purple-600'>  Ratting: </span> <span> ${newsDetails[0].rating.number ? newsDetails[0].rating.number : 'No data available'} </span>,,
                        <span class='text-purple-600'>  Badge:</span> <span> ${newsDetails[0].rating.badge ? newsDetails[0].rating.badge : 'No data available'} </span>,,
                        <span class='text-purple-600'>Total-View :</span> <span> ${newsDetails[0].total_view ? newsDetails[0].total_view : 'No data available'}   </span>
                    </small>
                </p> 
                
            </div>
        </div>           
  `
    modalContainer.appendChild(div)
}

loadAllNewsCategory()