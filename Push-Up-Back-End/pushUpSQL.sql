create schema pushup;
--create user admi with password 'secure';
grant all privileges on pushup to admi;
GRANT ALL ON SCHEMA pushup TO admi;
GRANT ALL PRIVILEGES ON ALL tables IN SCHEMA pushup TO admi;
grant all privileges on table posts to admi;
grant all privileges on table likes to admi;
grant all privileges on table comments_table to admi;
grant all privileges on table users to admi;
grant all privileges on table user_view to admi;
grant all privileges on table verif to admi;
grant references, trigger on all tables in schema pushup to admi;
grant create on schema pushup to admi;
grant usage on schema pushup to admi;

----------------------
--- Table Creation ---
----------------------

create table users(
	id serial primary key,
	email text not null unique,
	password text not null,
	firstName text,
	lastName text,
	isVerified boolean default(false)
);

create table comments_table(
	comId serial primary key,
	comText text,
	comLikes integer,
	postId integer references posts(postId)
);

create table verify(
	code integer primary key,
	userId integer references users(id),
	used boolean default(false)
);

--------------
--- CREATE ---
--------------

--users
insert into users (bio, email, firstname, interests, lastname, "password", picurl, status, username) values (
'Yo bio brah.', 'yo@yoyo.yeee', 'Ye', 'I do it alllll', 'Pee', 'ye', 'http://www.google.com/images', 'Life is good. Well kinda.', 'ye');
insert into users (bio, email, firstname, interests, lastname, "password", picurl, status, username) values (
'My bio', 'wee@wee.ye', 'Wee', 'You already know', 'Bee', 'ye', 'http://www.google.com/images', 'I enjoy my life a little too much rn.', 'wee');

--posts
insert into posts (post_text, usersid) values
('You already know.', 1);
insert into posts (post_text, usersid) values
('Man what a day huh? Golly gosh I tell ya.', 3);

-------------
--- DROPS ---
-------------

drop table posts;
drop table users;
drop table likes;
drop table comments_table;
drop table verif;

drop view user_view;
drop trigger hashPass on users;

--------------
--- ALTERS ---
--------------

ALTER TABLE users
ADD verified boolean default(false);
update users set "password" 
= 'ye' where id = 1;

update users set "password" 
= 'ye' where id = 3;



-------------
--- VIEWS ---
-------------

create view user_view as select u.user_id, u.username, u.password, u.first_name,
u.last_name, u.email, p.pic, p.status, p.bio, p.interests from users u join profiles p on 
u.user_id = p.profile_id order by u.user_id asc;

---------------
--- SELECTS ---
---------------

--practice
--select * from users u where u.user_id in (select author from reimbursement r where r.status_id = 2); 
--select * from users u join reimbursement r on u.user_id = r.author;

select md5('ye');

select * from user_view;
select * from users;
select * from posts;
select * from likes;
select * from verify;

delete from verify where code = 879218741;
delete from users where userid = 10;

select * from verif where code = 529166 and used = false;
----------------
--- TRIGGERS ---
----------------

create or replace function hashPassword() 
returns trigger 
as $$ 
begin 
if(new.password=old.password)then 
return new; 
end if; 
new.password :=  
md5(new.password); 
return new; 
end; 
$$ language plpgsql;

create trigger hashPass 
before insert or update on users 
for each row
execute function hashPassword();