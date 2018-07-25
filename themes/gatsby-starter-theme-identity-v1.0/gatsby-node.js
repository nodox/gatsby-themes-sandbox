const path = require(`path`);
const { gqextract, gqgenerate } = require('./gqm')

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  // TODO: Need to extract this into the parent file
  // TODO: YAML is more expressive than json, worth looking into
  const templateData = {
    query: [
      {
        source: "contentfulBio",
        args: `
          name: {
            regex: \"/identity/i\"
          }
        `,
        body: `{
            name
            displayName
            headline
            photo {
              sizes {
                src
              }
            }
          }
        `,
      },
      {
        source: "allContentfulSocialProfiles",
        args: `
          filter: {
            name: {
              regex: \"/(github|medium|twitter)/i\"
            }
          }
        `,
        body: `
          {
            edges {
              node {
                name
                url
                className
              }
            }
          }
        `,
      },
      {
        source: "contentfulAsset",
        args: `
          title: {
            regex: "/(nyc-chinatown-bw)/i"
          }
        `,
        body: `
          {
            title
            sizes(maxWidth: 1200, quality: 95) {
              src
            }
          }
        `,
      }
    ],
    mappings: {
      displayName: {
        querySource: "contentfulBio",
        field: "displayName",
      },
      headline: {
        querySource: "contentfulBio",
        field: "headline",
      },
      displayPhoto: {
        querySource: "contentfulBio",
        field: "photo",
      },
      socialIcons: {
        querySource: "allContentfulSocialProfiles",
        field: "edges",
      },
      backgroundImage: {
        querySource: "contentfulAsset",
        field: "sizes",
      },
    }
  }


  let identityData

  try {
    let query = gqgenerate.composeQuery(templateData.query)
    identityData = await graphql(query)

  } catch (e) {
    console.log(e);
  }

  let browserData = {
    displayName: gqextract.getTemplateValueByKey('displayName', templateData.mappings, identityData),
    headline: gqextract.getTemplateValueByKey('headline', templateData.mappings, identityData),
    socialIcons: gqextract.getTemplateValueByKey('socialIcons', templateData.mappings, identityData),
    displayPhoto: gqextract.getTemplateValueByKey('displayPhoto', templateData.mappings, identityData),
    backgroundImage: gqextract.getTemplateValueByKey('backgroundImage', templateData.mappings, identityData),
  }

  createPage({
    path: "/",
    component: path.resolve(`./src/templates/index.js`),
    context: {
      // Data passed to context is available in page queries as GraphQL variables.
      // i.e. -> pathContext: {}
      data: browserData,
    },
  })


}
