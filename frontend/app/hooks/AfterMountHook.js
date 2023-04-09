import {useEffect, useRef} from 'react';

export default function useEffectAfterMount(callback, deps) {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      callback();
    } else {
      didMount.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export {
  useEffectAfterMount,
};
