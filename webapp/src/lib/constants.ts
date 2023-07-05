export const contactKeys = {
  all: () => [contactKeys.allKey()],
  detail: (id: string) => [...contactKeys.all(), contactKeys.singleKey(id)],
  // keys
  singleKey: (id: string) => `contact-${id}` as const,
  allKey: () => "contacts" as const,
} as const;
