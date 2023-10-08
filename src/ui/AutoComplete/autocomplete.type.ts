export type TAutoCompleteProps = {
  placerholder?: string;
  onSelected: (value: string) => void;
  onChange: (value: string) => Promise<unknown[]>;
  keyExtractor: string | ((item: unknown) => string);
};

export enum KEYBOARDKEYS {
  ArrowDown = "ArrowDown",
  ArrowUp = "ArrowUp",
  Enter = "Enter",
  Space = " ",
}
