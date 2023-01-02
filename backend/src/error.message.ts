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
  refreshToken: {
    notBelongToAnyone: 'refresh_token.no_one',
    notMatching: 'refresh_token.not_matching',
  },
  rooms: {
    notFound: 'room.not_found',
    userAlreadyIn: 'room.user_already_in',
    userNotIn: 'room.user_not_in',
    creatorCannotLeave: 'room.creator_cannot_leave',
    nameEmpty: 'room.name.empty',
    nameMinLength: 'room.name.min_length',
    nameMaxLength: 'room.name.max_length',
  },
  gameDefinitions: {
    notFound: 'game_definition.not_found',
    notImplemented: 'game_definition.not_implemented',
    slugNotEmpty: 'game_definition.slug.not_empty',
    slugTaken: 'game_definition.slug.taken',
    nameNotEmpty: 'game_definition.name.not_empty',
    colorIsNotHex: 'game_definition.color.not_hex',
  },
};
