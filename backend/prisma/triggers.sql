-- --------------
-- Delete generated game when room is deleted

CREATE OR REPLACE FUNCTION public.delete_game()
    RETURNS TRIGGER
AS
$$
BEGIN
    DELETE FROM public.games g WHERE g.id = OLD.game_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_game_when_room_deleted
    AFTER DELETE
    ON public.rooms
    FOR EACH ROW
EXECUTE PROCEDURE public.delete_game();
