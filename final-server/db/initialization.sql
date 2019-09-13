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
  VALUES ('Los Angeles', '34.052235', '-118.243683', 1, 'https://upload.wikimedia.org/wikipedia/commons/3/30/Echo_Park_Lake_with_Downtown_Los_Angeles_Skyline.jpg');

INSERT INTO cities (city, c_lat, c_lng, user_id, c_picture) 
  VALUES ('Seattle', '47.608013', '-122.335167', 1, 'https://www.irishtimes.com/polopoly_fs/1.3295470.1510907845!/image/image.jpg_gen/derivatives/box_620_330/image.jpg');
