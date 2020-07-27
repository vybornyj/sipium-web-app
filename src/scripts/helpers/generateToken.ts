const rand = (): string => Math.random().toString(36).substr(2)

export const generateToken = (): string => rand() + rand() + rand()
