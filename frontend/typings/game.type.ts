export type GameDefinitionType = {
  slug: string;
  name: string;
  logo: string;
  description: string;
  bgColor: string;
  textColor: string;
};

export type GameDefinitionAdminType = GameDefinitionType & {
  enabled: boolean;
};
