export type TAutoCompleteProps = {
  placeholder?: string;
  onSelected: (value: string) => void;
  onFetchOptions: (value: string) => Promise<unknown[]>;
  keyField?: string;
  keyExtractor?: (item: unknown) => string;
  defaultOptions?: string[];
  onError?: (error: Error) => void;
};

export enum KEYBOARDKEYS {
  ArrowDown = "ArrowDown",
  ArrowUp = "ArrowUp",
  Enter = "Enter",
  Space = " ",
  Escape = "Escape",
}
