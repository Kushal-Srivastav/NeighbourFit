export const mockPrisma = {
  neighborhood: {
    findMany: () => Promise.resolve([]),
    create: (data: any) => Promise.resolve({ id: 1, ...data }),
  },
  userPreference: {
    create: (data: any) => Promise.resolve({ id: 'pref1', ...data }),
  },
  match: {
    create: (data: any) => Promise.resolve({ id: 'match1', ...data }),
  },
  review: {
    create: (data: any) => Promise.resolve({ id: 1, ...data }),
  },
};
