export const contactKeys = {
  all: () => [contactKeys.allKey()],
  detail: (id: number) => [contactKeys.singleKey(id)],
  // keys
  singleKey: (id: number) => `contact-${id}` as const,
  allKey: () => "contacts" as const,
} as const;
