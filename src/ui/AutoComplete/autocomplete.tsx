import { FC, useEffect, useRef, useState } from "react";

import { TAutoCompleteProps, KEYBOARDKEYS } from "./autocomplete.type";
import { useDebounce } from "../../services/hooks/useDebounce";
import { ChevronDown, ChevronUp } from "../Icon";
import CloseIcon from "../Icon/closeIcon";

import "./autocomplete.css";
import HighlightedOption from "./components/HighlightedOption";

const DEBOUNCE_TIME = 500;

const AutoComplete: FC<TAutoCompleteProps> = ({
  placerholder,
  onChange,
  onSelected,
  keyExtractor,
}) => {
  const [value, setValue] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const [showOptions, setShowOptions] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const debouncedValue = useDebounce<string>(search, DEBOUNCE_TIME);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case KEYBOARDKEYS.ArrowDown:
        e.preventDefault();
        if (focusedIndex === null || focusedIndex === options.length - 1) {
          setFocusedIndex(0);
        } else {
          setFocusedIndex(focusedIndex + 1);
        }
        break;
      case KEYBOARDKEYS.ArrowUp:
        e.preventDefault();
        if (focusedIndex === null || focusedIndex === 0) {
          setFocusedIndex(options.length - 1);
        } else {
          setFocusedIndex(focusedIndex - 1);
        }
        break;
      case KEYBOARDKEYS.Enter:
        e.preventDefault();
        if (focusedIndex !== null) {
          const selectedOption = options[focusedIndex];
          setSearch(selectedOption);
          setValue(selectedOption);
          setShowOptions(false);
        }
        break;
      default:
        break;
    }
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value as string;
    setSearch(search);
    setValue(search);
    setShowOptions(true);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target as Node)) {
      setShowOptions(false);
    }
  };

  const handleToggleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleClickOption = (option: string) => {
    setValue(option);
    setShowOptions(false);
  };

  const clearValue = () => {
    setValue("");
    setSearch("");
    setShowOptions(false);
  };

  useEffect(() => {
    const handleFilter = async () => {
      setLoading(true);
      try {
        if (onChange) {
          const filterList = await onChange(debouncedValue);
          const newOptions = filterList.map((item) => {
            if (keyExtractor && typeof keyExtractor === "function") {
              return keyExtractor(item);
            }
            if (keyExtractor && typeof keyExtractor === "string") {
              if (
                typeof item === "object" &&
                item !== null &&
                keyExtractor in item
              ) {
                return (item as Record<string, unknown>)[keyExtractor];
              }
              return item;
            }
            return item;
          }) as string[];
          setOptions(newOptions);
        }
      } catch (_) {
        setOptions([]);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    handleFilter();
  }, [debouncedValue, onChange, keyExtractor]);

  useEffect(() => {
    if (focusedIndex !== null && optionRefs.current[focusedIndex]) {
      const currentOptionRef = optionRefs.current[focusedIndex];
      if (currentOptionRef) {
        currentOptionRef.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [focusedIndex]);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (onSelected && value) {
      onSelected(value);
    }
  }, [onSelected, value]);

  return (
    <div className="select-wrapper" ref={wrapperRef}>
      <div className="selected-option" tabIndex={0}>
        <input
          type="text"
          className="input-full-width"
          placeholder={placerholder}
          onChange={onSearch}
          onClick={handleToggleShowOptions}
          onKeyDown={handleKeyDown}
          value={value}
        />
        <div className="icon-container">
          {value && (
            <button className="icon close-icon" onClick={clearValue}>
              <CloseIcon />
            </button>
          )}
          <button className="icon arrow-icon" onClick={handleToggleShowOptions}>
            {showOptions ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </div>
      <div>
        {showOptions && (
          <ul>
            {loading ? (
              <li className="option">
                <span className="option-text">Loading...</span>
              </li>
            ) : options.length === 0 ? (
              <li className="option">
                <span className="option-text">
                  {hasError ? "An error occurred" : "No records found"}
                </span>
              </li>
            ) : (
              options.map((option, index) => (
                <li
                  className={`option ${
                    focusedIndex === index ? "highlighted" : ""
                  }`}
                  tabIndex={0}
                  key={index}
                  onMouseOver={() => setFocusedIndex(index)}
                  onClick={() => handleClickOption(option)}
                >
                  <HighlightedOption option={option} query={search} />
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutoComplete;
