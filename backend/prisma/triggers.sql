CREATE OR REPLACE FUNCTION public.delete_game()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS
$$
BEGIN
  DELETE FROM games g WHERE g.id = OLD.gameId;
  RETURN OLD;
END;
$$;

CREATE TRIGGER delete_game_when_room_deleted
  AFTER DELETE ON rooms
  FOR EACH ROW
  EXECUTE PROCEDURE delete_game();