export type GameDefinitionType = {
  slug: string;
  name: string;
  logo: string;
  description: string;
  color: string;
};

export type GameDefinitionAdminType = GameDefinitionType & {
  enabled: boolean;
};
