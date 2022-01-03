echo "Initializing roles, databases, and extensions"
psql -Xv ON_ERROR_STOP=1 << HERE
-- Create the roles
create role ${DATABASE_OWNER} with login password '${DATABASE_OWNER_PASSWORD}';
grant ${DATABASE_OWNER} to ${POSTGRES_USER};
create role ${DATABASE_USER} noinherit;
create role ${DATABASE_VISITOR};
grant ${DATABASE_VISITOR} to ${DATABASE_USER};
-- Create the databases
create database ${DATABASE_NAME} owner ${DATABASE_OWNER};
create database ${DATABASE_NAME}_shadow owner ${DATABASE_OWNER};
-- Database permissions
revoke all on database ${DATABASE_NAME} from public;
revoke all on database ${DATABASE_NAME}_shadow from public;
grant all on database ${DATABASE_NAME} to ${DATABASE_OWNER};
grant all on database ${DATABASE_NAME}_shadow to ${DATABASE_OWNER};
\c ${DATABASE_NAME}
create extension if not exists "uuid-ossp" with schema public;
create extension if not exists citext with schema public;
create extension if not exists pgcrypto with schema public;
HERE
