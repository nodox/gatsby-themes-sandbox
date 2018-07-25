const path = require(`path`);
const { gqextract, gqgenerate, gqloader } = require('./gqm')

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  let templateData = gqloader.load(path.resolve('./identity.yaml'))
  let identityData

  try {
    let query = gqgenerate.composeQuery(templateData.query)
    identityData = await graphql(query)

  } catch (e) {
    // TODO: Handle errors when there is parsing issues, prevent silent fail

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
