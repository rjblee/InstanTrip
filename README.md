# InstanTrip
InstanTrip is an app that can make travel plans for users. User can save places they want to visit into the wishlist of the target destination.

By entering the amount of day they prefer to stay, The app automatically separate places in the wishlist into day schedules based on the distances between them using a K-mean clustering model. Then, after choosing the starting location and end location of each day schedule, the app will find the most optimized routes that direct user through all places in that daily schedule.

Also, users can search place information by image URL and then add found places into the corresponding wishlist for a future visit.

## Contributors
* [Sean Lin](https://github.com/Sean-HL-Lin)
* [Jiadan Wang](https://github.com/jiadanw)
* [Ralph Lee](https://github.com/rjblee)

## Awards
Best project of Lighthouse Lab's Sept 2019 Demo Day

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
Create city card
!['Create city card'](https://github.com/Sean-HL-Lin/InstanTrip/blob/master/Doc/createCityCard.png)

Image search function
!['Image search function'](https://github.com/Sean-HL-Lin/InstanTrip/blob/master/Doc/imageSearch.png)

All places in wishlist
!['All places in wishlist](https://github.com/Sean-HL-Lin/InstanTrip/blob/master/Doc/allPlaces.png)

Autoplanned schedule 1
!['Autoplanned schedule 1'](https://github.com/Sean-HL-Lin/InstanTrip/blob/master/Doc/autoPlanedSchedule1.png)

Autoplanned schedule 2
!['Autoplanned schedule 2'](https://github.com/Sean-HL-Lin/InstanTrip/blob/master/Doc/autoPlanedSchedule2.png)

Optimized route
!['Optimized route'](https://github.com/Sean-HL-Lin/InstanTrip/blob/master/Doc/optimizedRoute.png)