import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import _isEmpty from 'lodash/isEmpty';

function PrivateRoute ({component: Component, ...rest}) {
  const [authed] = useCookies();
  return (
    <Route
      {...rest}
      render={(props) => !_isEmpty(authed?.token)
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export default PrivateRoute;