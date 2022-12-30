import { ResultDataType, ResultType } from '~/typings/auth.type';
import { FetchError } from 'ofetch/dist/node';

export const handleFetchError = (error: FetchError | null): ResultType => {
  const errorData: ResultDataType = {
    status: 0,
    messages: [],
  };

  if (error) {
    errorData.status = error.data.statusCode;
    errorData.messages = [error.data.message]
      .flat<string[]>()
      .map((msg: string) => errorsTranslations[msg] ?? msg);
  }

  return {
    hasSucceeded: false,
    data: errorData,
  };
};

const errorsTranslations: Record<string, string> = {
  'register.credentials.taken': 'Pseudo déjà pris',
  'register.username.empty': 'Le pseudo ne doit pas être vide',
  'register.password.empty': 'Le mot de passe ne doit pas être vide',
  'register.username.min_length': 'Le pseudo doit faire minimum 3 caractères',
  'register.username.max_length': 'Le pseudo doit faire maximum 13 caractères',
  'login.credentials.wrong': 'Mauvais identifiants',
  'room.not_found': "Le salon n'existe pas...",
  'room.user_already_in': 'Vous êtes déjà présents dans le salon',
  'room.user_not_in': "Vous n'êtes pas présent dans le salon",
  'room.creator_cannot_leave':
    'Le créateur du salon ne peut pas quitter son propre salon',
  'room.name.empty': 'Le nom du salon ne doit pas être vide',
  'game_definition.not_found': "Ce modèle de jeu n'existe pas",
};
