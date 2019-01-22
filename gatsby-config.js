var marked = require('marked');
var striptags = require('striptags');

module.exports = {
  siteMetadata: {
    title: 'Oddments',
    description: 'A timeline of projects, large and small. By Brian Jones.',
    siteUrl: 'http://oddments.brianjon.es',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/data/`,
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      }
    },
    'gatsby-transformer-json',
        {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            serialize: ({ query: { allProjectsJson } }) => {
              return allProjectsJson.edges.map(({ node }) => {
                return Object.assign({}, {
                  title: node.title,
                  description: striptags(marked(node.blurb)),
                  date: node.date,
                  url: node.linkTarget,
                  guid: node.linkTarget,
                  custom_elements: [{ "content:encoded": marked(node.blurb) }],
                })
              });
            },
            query: `
              {
                allProjectsJson(sort: {fields: date, order: DESC}) {
                  edges {
                    node {
                      title
                      linkTarget
                      blurb
                      date
                    }
                  }
                }
              }
            `,
            output: "/feed.xml",
          }
        ]
      }
    }
  ],
}
