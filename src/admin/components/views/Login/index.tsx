import React from 'react';
import RenderCustomComponent from '../../utilities/RenderCustomComponent';
import DefaultLogin from './Default';
import { useConfig } from '../../utilities/Config';

const LoginView: React.FC = () => {
  const {
    admin: {
      components: {
        views: {
          Login: CustomLogin,
        },
      } = {},
    },
  } = useConfig();

  return (
    <RenderCustomComponent
      DefaultComponent={DefaultLogin}
      CustomComponent={CustomLogin}
    />
  );
};

export default LoginView;
