const path = require(`path`);

function generateQueryTemplate(source, args, body) {
  // TODO: needs to make if compatible with no args
  const template = `
    ${source} (
      ${args}
    )
    ${body}
  `
  return template
}

function composeQuery(queryList) {
  var masterQuery = ''
  queryList.forEach(({ source, args, body }) => {
    let partial = generateQueryTemplate(source, args, body)
    masterQuery = masterQuery.concat(partial)
  })

  const graphqlQuery = `
    {
      ${masterQuery}
    }
  `
  return graphqlQuery

}

function getSocialIcons(mappings, queryResult) {
  const { socialIcons } = mappings
  let socialIconsData = []


  queryResult['data'][socialIcons.querySource][socialIcons.field].forEach(obj => {
      const { name, url, className } = obj.node

      const iconData = {
        className: className,
        html: name,
        href: url,
      }

      socialIconsData.push(iconData)
  })

  return socialIconsData
}

function getHeadline(mappings, queryResult) {
  const { headline } = mappings
  return queryResult['data'][headline.querySource][headline.field]
}

function getDisplayName(mappings, queryResult) {
  const { displayName } = mappings
  return queryResult['data'][displayName.querySource][displayName.field]
}

function getDisplayPhoto(mappings, queryResult) {
  const { displayPhoto } = mappings
  return queryResult['data'][displayPhoto.querySource][displayPhoto.field]
}

function getBackgroundImage(mappings, queryResult) {
  const { backgroundImage } = mappings
  return queryResult['data'][backgroundImage.querySource][backgroundImage.field]
}

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
    let query = composeQuery(templateData.query)
    identityData = await graphql(query)
    console.log(identityData.data.contentfulAsset);

  } catch (e) {
    console.log(e);
  }

  let browserData = {
    displayName: getDisplayName(templateData.mappings, identityData),
    headline: getHeadline(templateData.mappings, identityData),
    socialIcons: getSocialIcons(templateData.mappings, identityData),
    displayPhoto: getDisplayPhoto(templateData.mappings, identityData),
    backgroundImage: getBackgroundImage(templateData.mappings, identityData),
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
