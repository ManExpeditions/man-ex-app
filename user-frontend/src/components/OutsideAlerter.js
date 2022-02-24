import React, { useRef, useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, setState, stateValue) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setState(stateValue);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setState, stateValue]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter({ children, setState, stateValue }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setState, stateValue);

  return <div ref={wrapperRef}>{children}</div>;
}
