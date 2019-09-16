# InstanTrip
InstanTrip is a app that can make travel plans for users. User can save places they want to visit into the wishlist of target destination. 

By entering the amount of day they prefer to stay, The app automatically seperate places in the wishlist into day schedules based on the distances between them using a K-mean clustering model. Then, after choosing starting location and end location of each day schedule, the app will find the most optimized routes that direct use through all places in that day schedule.

Also, user can search place informations by image url and then add found places into corresponding wishlist for future visit.

## Contributors
* [Sean Lin](https://github.com/Sean-HL-Lin)
* [Jiadan Wang](https://github.com/jiadanw)
* [Ralph Lee](https://github.com/rjblee)

## Setup
1. Clone this repositories
2. [Client side setup](https://github.com/Sean-HL-Lin/InstanTrip/blob/master/final-client/README.md)
3. [Server side setup](https://github.com/Sean-HL-Lin/InstanTrip/blob/master/final-server/README.md)

## Tech stack

Front-end
* React
* Google Map API
* Google Direction API 
* Ant design
* Bootstrap
* Axio
* K-mean Clustering

Back-end
* NodeJS
* Express
* PostgresSQL
* Cloud Vision API 
* Google Place Text Search API
* Google Place photo Search API

## Examples
