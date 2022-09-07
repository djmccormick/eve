-- Enter migration here

-- Create a new table to house users
do $$ begin
	create domain email_address as text check (
		value ~ '[a-z0-9!#$%&''*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*'
	);
exception
    when duplicate_object then null;
end $$;

drop table if exists users cascade;
create table users (
	id uuid primary key not null default uuid_generate_v1mc(),
	email email_address not null unique,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

-- For testing
insert into users (email) values ('bob@thepriceisright.com');
insert into users (email) values ('drew@thepriceisright.com');
