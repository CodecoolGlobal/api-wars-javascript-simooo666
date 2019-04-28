--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

ALTER TABLE IF EXISTS users DROP CONSTRAINT IF EXISTS users_pkey CASCADE;
ALTER TABLE IF EXISTS planet_votes DROP CONSTRAINT IF EXISTS planet_votes_pkey CASCADE;
ALTER TABLE IF EXISTS users DROP CONSTRAINT IF EXISTS planet_votes_user_id_fkey CASCADE;


DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id serial NOT NULL PRIMARY KEY,
    user_name text UNIQUE,	
    password text
);

DROP TABLE IF EXISTS planet_votes;
CREATE TABLE planet_votes (
	id serial NOT NULL PRIMARY KEY,
	planet_id integer,
	planet_name varchar,
	user_id integer,
	submission_time timestamp without time zone
);


ALTER TABLE planet_votes
	ADD FOREIGN KEY (user_id) REFERENCES users(id);

