import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, cb, state) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      // console.log(event.target.innerText.includes('Add'))
      window.e = event;
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target?.innerText?.toLowerCase().includes("add")
      ) {
        if (state) {
          cb();
        }
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [ref, cb, state]);
}
export default useOutsideAlerter;
