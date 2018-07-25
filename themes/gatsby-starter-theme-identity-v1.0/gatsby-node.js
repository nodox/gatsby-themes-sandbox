const path = require(`path`);
const { gqextract, gqloader } = require('./gqm')

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

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
