import Loadable from 'react-loadable';
import Spinner from './Spinner';
import Skeletoner from "./Skeletoner";
function CustomLoadable(opts) {
    return Loadable(
        Object.assign(
            {
                loading: Skeletoner,
                delay: 200,
                timeout: 10000
            },
            opts
        )
    );
}
export default CustomLoadable;
