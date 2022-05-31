begin;

create or replace function current_user_id() returns uuid as $$
	select nullif(current_setting('user.id', true)::text, '')::uuid;
$$ language sql stable;

comment on function current_user_id is E'The ID of the current user.';

grant all on function current_user_id to :DATABASE_USER;

commit;
