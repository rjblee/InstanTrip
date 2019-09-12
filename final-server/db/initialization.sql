DROP TABLE IF EXISTS places;
DROP TABLE IF EXISTS schedules;
DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE cities (
  id SERIAL PRIMARY KEY NOT NULL,
  city VARCHAR(255),
  c_lat VARCHAR(255),
  c_lng VARCHAR(255),
  user_id INTEGER REFERENCES users(id),
  c_picture VARCHAR(1000)
);

CREATE TABLE schedules (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  city_id INTEGER REFERENCES cities(id),
  start_place VARCHAR(255),
  end_place VARCHAR(255),
  transit VARCHAR(255)
);

CREATE TABLE places (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  address VARCHAR(255),
  lat VARCHAR(255),
  lng VARCHAR(255),
  rating VARCHAR(255),
  picture VARCHAR(1000),
  placeId VARCHAR(255),
  city_id INTEGER REFERENCES cities(id),
  schedule_id INTEGER
);


INSERT INTO users (name, password) 
  VALUES ('Jiadan', '123');

INSERT INTO users (name, password) 
  VALUES ('Ralph', '123');
  
INSERT INTO users (name, password) 
  VALUES ('Sean', '123');

INSERT INTO cities (city, c_lat, c_lng, user_id, c_picture) 
  VALUES ('Vancouver', '49.246292', '-123.116226', 1, 'https://lh3.googleusercontent.com/p/AF1QipMY2PblrieyoxW-CyVSLa8AS6EGuKQOzAHIshdj=s1600-w200');

INSERT INTO cities (city, c_lat, c_lng, user_id, c_picture) 
  VALUES ('Los Angeles', '34.052235', '-118.243683', 1, 'https://lh3.googleusercontent.com/p/AF1QipMY2PblrieyoxW-CyVSLa8AS6EGuKQOzAHIshdj=s1600-w200');

INSERT INTO cities (city, c_lat, c_lng, user_id, c_picture) 
  VALUES ('Seattle', '47.608013', '-122.335167', 1, 'https://lh3.googleusercontent.com/p/AF1QipMY2PblrieyoxW-CyVSLa8AS6EGuKQOzAHIshdj=s1600-w200');
-- Vancouver

INSERT INTO places (name, address, lat, lng, rating, picture, placeId, city_id) 
  VALUES ('Canada Place', '999 Canada Pl, Vancouver, BC V6C 3T4, Canada', 49.2888248, -123.1111209, 4, 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjyt-qxgqzkAhWmGDQIHVSzBEkQjRx6BAgBEAQ&url=https%3A%2F%2Fdailyhive.com%2Fvancouver%2Fsurprise-concert-canada-place-september-2016&psig=AOvVaw1adsGU0TBglAO4tWg_jGcU&ust=1567303317348812', 'ChIJIeDiJJ1xhlQRCWHIheB_Bbc', 1);

INSERT INTO places (name, address, lat, lng, rating, picture, placeId, city_id) 
  VALUES ('Gastown', '305 Water St, Vancouver, BC V6B 1B9', 49.2849, -123.1113, 4.2, 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwit4_7mgqzkAhVcCTQIHfNuCqgQjRx6BAgBEAQ&url=https%3A%2F%2Fvictorianhotel.ca%2Fdiscover%2Fneighbourhoods%2F&psig=AOvVaw266-mE9LEXs3oafuQQKD9h&ust=1567303504364328', 'ChIJe_ROYXdxhlQRYYQ3bU2m_tE', 1);

INSERT INTO places (name, address, lat, lng, rating, picture, placeId, city_id) 
  VALUES ('Lighthouse Labs', '401 W Georgia St #600, Vancouver, BC V6B 5A1, Canada', '49.2812333', '-123.1149943', 5, 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwj7hdKRg6zkAhVYGjQIHeI8DGEQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.lighthouselabs.ca%2F&psig=AOvVaw0YpVS1vZ3SLxfiNHQ8SF72&ust=1567303598102557', 'ChIJVVVFhnlxhlQRVqDISA_7Lc8', 1);


-- Los Angeles

INSERT INTO places (name, address, lat, lng, rating, picture, placeId, city_id) 
  VALUES ('Universal Studios', '100 Universal City Plaza, Universal City, CA 91608, USA', '34.13811680000001', '-118.3533783', 4.2, 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjKrsCgg6zkAhVVHzQIHZS9B4MQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.insideuniversal.net%2F2019%2F03%2Fcalifornia-neighbor-pass-returns-to-universal-studios-hollywood%2F&psig=AOvVaw2YD4xkKnnAr7MihOCjL_nF&ust=1567303651082500', 'ChIJzzgyJU--woARcZqceSdQ3dM', 2);

INSERT INTO places (name, address, lat, lng, rating, picture, placeId, city_id) 
  VALUES ('Hollywood Walk of Fame', 'N Highland Ave &, Hollywood Blvd', '34.1016691', '-118.3336765', 3.3, 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi3hem2g6zkAhVQIjQIHRPeCtAQjRx6BAgBEAQ&url=https%3A%2F%2Fmetro.co.uk%2F2018%2F08%2F23%2Fhollywood-walk-of-fame-map-a-list-of-the-stars-lining-hollywood-boulevard-7874343%2F&psig=AOvVaw2Vaipdp9ZBGXTz_Nvs6-Rk&ust=1567303698466081', 'ChIJXyC7WTu_woARPvVMCHBXd4U', 2);

INSERT INTO places (name, address, lat, lng, rating, picture, placeId, city_id) 
  VALUES ('Santa Monica', 'Santa Monica, CA, USA', '34.0194543', '-118.4911912', 3.8, 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwj-zqXOg6zkAhXvGDQIHZqcB9QQjRx6BAgBEAQ&url=http%3A%2F%2Fcoraltreerealty.com%2Fhomes-for-sale-in-santa-monica-ca%2F&psig=AOvVaw0EKTlCKPQWGwjIimofsO36&ust=1567303733565640', 'ChIJGQCRws6kwoARq_Uj_7UKF7Q', 2);


-- Seattle

INSERT INTO places (name, address, lat, lng, rating, picture, placeId, city_id) 
  VALUES ('Pike Place Market', '85 Pike St, Seattle, WA 98101, USA', '47.6084287', '-122.340532', 3.1, 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiFsfHgg6zkAhV1HjQIHaS7A18QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.cnn.com%2Ftravel%2Farticle%2Fpike-place-market-what-to-do-seattle%2Findex.html&psig=AOvVaw0V4kz8vQFDMAXCK9SuuLNU&ust=1567303785816426', 'ChIJ6WlHxbJqkFQROOFv9HlMyZQ', 3);

INSERT INTO places (name, address, lat, lng, rating, picture, placeId, city_id) 
  VALUES ('Space Needle', '400 Broad St, Seattle, WA 98109, USA', '47.6205063', '-122.3492774', 2.8, 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjvxcGThKzkAhUxO30KHSaGBwoQjRx6BAgBEAQ&url=https%3A%2F%2Fseattle.curbed.com%2F2018%2F8%2F2%2F17645654%2Fspace-needle-remodel-glass-floor-photos&psig=AOvVaw0XHKtAAIAQu9TyKsr7sNM1&ust=1567303823293261', 'ChIJ-bfVTh8VkFQRDZLQnmioK9s', 3);

INSERT INTO places (name, address, lat, lng, rating, picture, placeId, city_id) 
  VALUES ('Seattle Premium Outlets', '10600 Quil Ceda Blvd, Tulalip, WA 98271, USA', '48.093542', '-122.1884153', 3.8, 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwj3obyyhKzkAhWUFzQIHez4BSAQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.premiumoutlets.com%2Foutlet%2Fseattle%2Fabout&psig=AOvVaw0TuomDMH2Nr-0arC0YJ8mz&ust=1567303931116045', 'ChIJg-JT6OJThVQR3UgpekWtBOs', 3);


