import { FC, useMemo } from "react";

type HighlightedOptionProps = {
  option: string;
  query: string;
};

const HighlightedOption: FC<HighlightedOptionProps> = ({ option, query }) => {
  const highlightedText = useMemo(() => {
    const index = option.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) {
      return option;
    }

    const beforeMatch = option.substring(0, index);
    const match = option.substring(index, index + query.length);
    const afterMatch = option.substring(index + query.length);

    return (
      <>
        {beforeMatch}
        <span className="highlight-text">{match}</span>
        {afterMatch}
      </>
    );
  }, [option, query]);

  return <>{highlightedText}</>;
};

export default HighlightedOption;
