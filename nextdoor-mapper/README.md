# Nextdoor mapper idea

Map reports of real time events (blackouts, surges, sounds, smells, etc)

Inspiration: [https://nextdoor.com/news_feed/?post=199362353](https://nextdoor.com/news_feed/?post=199362353)

1. scrape (or fetch via API) comments for a nextdoor post
2. use NLP or other to extract locations from comments (e.g. "It was barely 2 seconds at 8:25 p.m.. `Sterling and 6th`.")
3. use google location apis to make google do the hard work of mapping location strings to lat/lon
4. pins on map
5. polling for changes to post; updating in real time; linking back to comments from pins
6. deployable to some cloud service

