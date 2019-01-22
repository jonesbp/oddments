import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'normalize.css';
import './styles.scss'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'A bucket for small projects.' },
            { name: 'keywords', content: 'javascript, code, art, internet, projects' },
          ]}
        >
          <html lang="en" />
          <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:700|Work+Sans" rel="stylesheet" /> 
        </Helmet>
        {children}
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
