const path = require(`path`);

// exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
//   const { createNodeField } = boundActionCreators
//   if (node.internal.type === `MarkdownRemark`) {
//     const slug = createFilePath({ node, getNode, basePath: `pages` })
//     createNodeField({
//       node,
//       name: `slug`,
//       value: slug,
//     })
//   }
// };

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

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  const templateData = {
    query: [
      {
        source: "contentfulBio",
        args: `
          name: {
            regex: \"/identity/\"
          }
        `,
        body: `{
            name
            displayName
            headline
            email
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
        body: `{
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
        field: "displayPhoto",
      },
      socialIcons: {
        querySource: "allContentfulSocialProfiles",
        field: "displayPhoto",
      },
    }
  }


  let identityData
  // let socialIconsData = []
  //
  // const querySource = templateData['query']['source']
  // const queryArgs = templateData['query']['args']
  // const queryBody = templateData['query']['body']
  // const { socialIcons } = templateData.mappings


  try {
    identityData = await graphql(composeQuery(templateData.query))

    console.log(identityData);

    // identityData['data'][querySource][socialIcons]['data'].forEach(profile => {
    //     const { name, url } = profile
    //
    //     const iconData = {
    //       className: `fa-${name.toLowerCase()}`,
    //       html: name,
    //       href: url,
    //     }
    //
    //     socialIconsData.push(iconData)
    // })

  } catch (e) {
    console.log(e);
  }

  // let browserData = {
  //   displayName: identityData['data'][querySource][templateData.mappings.displayName],
  //   headline: identityData['data'][querySource][templateData.mappings.headline],
  //   socialIcons: socialIconsData,
  //   displayPhoto: identityData['data'][querySource][templateData.mappings.displayPhoto],
  // }
  //
  // createPage({
  //   path: "/",
  //   component: path.resolve(`./src/templates/index.js`),
  //   context: {
  //     // Data passed to context is available in page queries as GraphQL variables.
  //     // i.e. -> pathContext: {}
  //     data: browserData,
  //   },
  // })
  //

}
