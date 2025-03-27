import { useCallback, useMemo, useRef } from "react";

/* Component remembers the order options are selected in a multiple select */
const Select = ({ options, onChange, ...props }) => {
  const valueRef = useRef(props.multiple ? props.value ?? [] : props.value ?? options[0]);  
  const children = useMemo(() => options.map(option => <option key={option} value={option}>{option}</option>), [options]);

  const isMultiple = props.multiple ? true : false;
  const handleOnChange = useCallback(event => {
    const newValues = Array.from(event.target.options).filter(option => option.selected).map(option => option.value);
    if (isMultiple) {
      if (newValues.length <= 1) {
        // If 0 or 1 are selected, simply replace the value
        valueRef.current = newValues;
      } else if (newValues.length < valueRef.current.length) {
        // If element was removed, find the removed element and remove it from the value
        const removedIndex = valueRef.current.findIndex(value => !newValues.includes(value));
        if (removedIndex >= 0) {
          valueRef.current.splice(removedIndex, 1);
        }
      } else if (newValues.length > valueRef.current.length) {
        // If element(s) were added, find the added element(s) and add it to the value
        let addIndex = newValues.findIndex(value => !valueRef.current.includes(value));
        do {
          valueRef.current.push(newValues[addIndex++]);
        } while (addIndex < newValues.length && newValues.length > valueRef.current.length);
      }
    } else {
      valueRef.current = newValues[0];
    }

    if (onChange) {
      onChange(valueRef.current);
    }
  }, [isMultiple, onChange]);

  return <select {...props} onChange={handleOnChange}>{children}</select>;
}

export default Select;