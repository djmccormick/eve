-- Enter migration here

-- Create a new table to house widgets
drop table if exists widgets;
create table if not exists widgets (
	id serial primary key,
	name varchar(255) not null,
	description text,
	created_at timestamp default now()
);

-- Insert some widgets
insert into widgets(id, name, description, created_at)
values
	(1, E'Doodad', E'Purple in color', E'2022-01-02 00:25:34.321157'),
	(2, E'Doohickey', E'Cold to the touch', E'2022-01-02 00:33:47.939024');
