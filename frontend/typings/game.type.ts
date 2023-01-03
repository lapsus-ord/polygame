export type GameDefinitionType = {
  slug: string;
  name: string;
  logo: string;
  description: string;
  color: string;
};

export type GameDefinitionAdminType = GameDefinitionType & {
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateDefinitionDto = {
  slug: string;
  name: string;
  logo?: string;
  description?: string;
  color?: string;
};

export type UpdateDefinitionDto = {
  slug?: string;
  name?: string;
  logo?: string;
  description?: string;
  color?: string;
};
