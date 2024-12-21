import { SortOptions } from '@const';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

type SortOptionsProps = {
  onSortChange: (option: SortOptions) => void;
};

function SortingOptions({ onSortChange }: SortOptionsProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState(SortOptions.Popular);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLFormElement | null>(null);

  const options = useMemo(() => Object.values(SortOptions), []);

  const handleSortChange = useCallback(
    (option: SortOptions) => {
      setSelectedOption(option);
      onSortChange(option);
      setIsOpen(false);
    },
    [onSortChange]
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>, option: SortOptions) => {
      if (event.key === 'Enter') {
        handleSortChange(option);
      } else if (event.key === 'Escape') {
        setIsOpen(false);
      }
    },
    [handleSortChange]
  );

  // Закрытие выпадающего списка при клике вне его
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <form ref={dropdownRef} className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleDropdown}
      >
        {selectedOption}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {options.map((option) => (
          <li
            key={option}
            className={`places__option ${option === selectedOption ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortChange(option)}
            onKeyDown={(event) => handleKeyDown(event, option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

const MemoizedSortingOptions = memo(SortingOptions);
export default MemoizedSortingOptions;
