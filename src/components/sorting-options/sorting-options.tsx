import { SortOption } from '@const';
import { memo, useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { setSortType } from '../../store/app-data/app-data';
import { getSortType } from '../../store/app-data/selectors';

function SortingOptions(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentSortOptions = useAppSelector(getSortType);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const options = useMemo(() => Object.values(SortOption), []);

  const handleSortChange = useCallback(
    (option: SortOption) => {
      dispatch(setSortType(option));
      setIsOpen(false);
    },
    [dispatch]
  );

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleDropdown}
      >
        {currentSortOptions}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpen ? 'places__options--opened' : ''
        }`}
      >
        {options.map((option) => (
          <li
            key={option}
            className={`places__option ${
              currentSortOptions === option ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleSortChange(option)}
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
