begin;

-- DOCUMENTATION
comment on table widgets is 'All known widgets';
-- comment on column widgets.id is 'The unique identifier for this record';
-- comment on column widgets.name is 'The name of the widget';
-- comment on column widgets.description is 'A description of the widget';
-- comment on column widgets.created_at is 'The creation timestamp for this record';


-- -- AUTHORIZATION
-- drop policy if exists insert on widgets;
-- drop policy if exists read on widgets;
-- drop policy if exists update on widgets;
-- drop policy if exists delete on widgets;

-- create policy insert on widgets for insert with check (
--     false
-- );
-- create policy read on widgets for select using (
--     true
-- );
-- create policy update on widgets for update using (
--     false
-- );
-- create policy delete on widgets for delete using (
--     false
-- );

-- alter table widgets enable row level security;

-- -- grant all on widgets to authenticated;

commit;
