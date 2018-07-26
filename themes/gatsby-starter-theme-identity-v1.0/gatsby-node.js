const path = require(`path`);
const { gqextract, gqloader } = require('./gqm')

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  const config = gqloader.load(path.resolve('./identity.yaml'))
  const data = await gqloader.fetch(graphql, config.query)

  const browserData = {
    displayName: gqextract.getTemplateValueByKey('displayName', config.mappings, data),
    copyright: gqextract.getTemplateValueByKey('copyright', config.mappings, data),
    headline: gqextract.getTemplateValueByKey('headline', config.mappings, data),
    socialIcons: gqextract.getTemplateValueByKey('socialIcons', config.mappings, data),
    displayPhoto: gqextract.getTemplateValueByKey('displayPhoto', config.mappings, data),
    backgroundImage: gqextract.getTemplateValueByKey('backgroundImage', config.mappings, data),
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
