import * as React from 'react'
import { addLocaleData, injectIntl, IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import { RootState } from '../store'

// import 'intl/locale-data/jsonp/en'
import * as en from 'react-intl/locale-data/en'
import * as id from 'react-intl/locale-data/id'

export function withLang<T>(
  // tslint:disable-next-line:no-any
  messages: any
) {
  return (WrappedComponent: React.ComponentClass<Anything>) => {
    const InjectedComponent = injectIntl(WrappedComponent)

    class WithLang extends React.Component<Anything> {
      render() {
        addLocaleData([...en, ...id])
        const { lang } = this.props
        return (
          <IntlProvider locale={lang} messages={messages[lang]}>
            <InjectedComponent {...this.props} />
          </IntlProvider>
        )
      }
    }

    return connect<{}, {}, T, RootState>(state => ({
      lang: state.common.lang
    }))(WithLang)
  }
}
