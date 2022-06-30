class Account {
  constructor(readonly name: string) {}

  toString(): string {
    return `${this.name}`;
  }

}

export const accounts = [
  new Account('Общедоступный'),
  new Account('Приватный'),
];
