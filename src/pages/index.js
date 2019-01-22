import React from 'react'
import { graphql, Link } from 'gatsby'

import marked from 'marked'
import fecha from 'fecha'

import Layout from '../components/layout'

const IndexPage = ({ data }) => (
  <Layout>
    <div className="homepage-grid">
      <div className="homepage-grid__cell">
        <div className="homepage-grid__cell__contents highlight">
          <h1>{data.site.siteMetadata.title}</h1>
          <p>
            A timeline of projects, large and small.
          </p>
          <p>
            By <a href="https://brianjon.es">Brian Jones</a>
          </p>
        </div>
      </div>
      {data.allProjectsJson.edges.map(({ node }) => (
        <>
          <div className="homepage-grid__cell">
            <div className="homepage-grid__cell__contents">
              <h3>
                <a href={node.linkTarget}>{node.title}</a>
              </h3>
              {(node.image && node.image.length > 0) ? (
                <a href={node.linkTarget}>
                  <img src={`/static/images/content/${node.image}`} alt={node.imageAlt} />
                </a>
              ) : null}
              <div dangerouslySetInnerHTML={{__html: marked(node.blurb)}} />
              <p>
                {fecha.format(
                  fecha.parse(node.date, 'YYYY-MM-DD'),
                  'D MMM YYYY'
                )}
              </p>
            </div>
          </div>
        </>
      ))}
    </div>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allProjectsJson(sort: {fields:date, order:DESC}) {
      edges {
        node {
          title
          linkType
          linkTarget
          image
          imageAlt
          blurb
          date
        }
      }
    }
  }
`
