-- --------------
-- Delete generated game when room is deleted

create or replace function public.delete_game()
    returns trigger
as
$$
begin
    delete from public.games g where g.id = old.game_id;
    return old;
end;
$$ language plpgsql;

create or replace trigger delete_game_when_room_deleted_trigger
    after delete
    on public.rooms
    for each row
execute procedure public.delete_game();

-- --------------
-- Delete room when nobody is in it

create or replace function public.delete_room()
    returns trigger
as
$$
begin
    delete
    from public.rooms r
    where r.id = old.room_id
      and 0 = (select count(1)
               from public.users_in_rooms u_r
               where u_r.room_id = old.room_id);
    return old;
end;
$$ language plpgsql;

create or replace trigger delete_room_when_nobody_is_in_it_trigger
    after delete
    on public.users_in_rooms
    for each row
execute procedure public.delete_room();
