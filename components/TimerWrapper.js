import { useSelector, shallowEqual } from 'react-redux'
import Timer from './Timer';

const clockSelector = state => ({
  lastUpdate: state.lastUpdate,
  light: state.light,
});

function TimerWrapper () {
  const { lastUpdate, light } = useSelector(clockSelector, shallowEqual);
  return (
    <div>
      <Timer lastUpdate={lastUpdate} light={light} />
    </div>
  )
}

export default TimerWrapper;
