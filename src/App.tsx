import React, { Suspense, useState } from 'react';
import { IntlProvider, useIntl } from 'react-intl';

import { useAppSelector } from '@/store/hooks';
import { selectLang, selectLangMsg } from './store/slices/app.slice';

import PrivateRoutes from '@/routes/index';

function App () {
  const lang = useAppSelector(selectLang);
  const langMsg = useAppSelector(selectLangMsg);

  return (
    <div className="App">
      <IntlProvider
        locale={ lang }
        messages={ langMsg }
      >
        <Suspense fallback={ <span>loading</span> }>
          <PrivateRoutes />
        </Suspense>
      </IntlProvider>
    </div>
  );
}

export default App;
