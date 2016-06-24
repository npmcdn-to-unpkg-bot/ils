# alexa-search-country-ranking

# Stack

- Reqwest - my current favorite requester. Promise based works with https works well on browser and Nodejs and most importantly, it helps create non-jQuery workflow.
- Expressjs - for creating some basic data request to the server
- Firebase and MongoDB as data store centers
- Async - for sanity in controling the logic flow
- ES6 - the new features are pure "developer"-ish pleasure

# How it works

Request to Expressjs trigger the scraping. The country codes are predefined and the pattern of Alexa top 500 for each contry is also known. Then all is needed is to chain some **Async** maps to take all the urls and their respective position. The final result is in the form of:
```
{
"github|com":"103-BG|012-UK|001-DE",
// and so on
}
```

# Frontend

The collected data is useless without proper UI and I cannot look beyond Reactjs for this purpose. React code will be published soon.
