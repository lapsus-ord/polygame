export const errors = {
  register: {
    credentialsTaken: 'register.credentials.taken',
    usernameEmpty: 'register.username.empty',
    passwordEmpty: 'register.password.empty',
    usernameMinLength: 'register.username.min_length',
    usernameMaxLength: 'register.username.max_length',
  },
  login: {
    credentialsWrong: 'login.credentials.wrong',
  },
  rooms: {
    notFound: 'room.not_found',
    userAlreadyIn: 'room.user_already_in',
    userNotIn: 'room.user_not_in',
    creatorCannotLeave: 'room.creator_cannot_leave',
    nameEmpty: 'room.name.empty',
  },
  gameDefinitions: {
    notFound: 'game_definition.not_found',
  },
};
