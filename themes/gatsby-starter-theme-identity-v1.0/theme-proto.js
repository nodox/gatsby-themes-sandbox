
// for specific queries



// YAML is definitely the way to go
// floow the same graphql DSL
// for all queries
// {
//   "query": {
//     "source": "allMarkdownRemark",
//     "args": {
//       "limit": 3,
//       "sort": {
//         "fields": [frontmatter___date],
//         "order": "ASC",
//       }
//       "filter": {
//         "frontmatter": {
//           "date": {
//             "ne": null
//           }
//         }
//       }
//     },
//     "body": [
//       'name',
//       'photo': {
//         'sizes': [
//           'aspectRatio',
//           'src',
//           'sizes',
//         ]
//       },
//       'email',
//     	'social': {
//   			'profiles': [
//   			  'url',
//   			  'name',
//   			]
//       }
//     ]
//   }
// }



// v0.0.1
query:
  source: contentfulBio
  args:
    name:
      regex: "/identity/"
  body:
    displayname: displayname
    headline: headline
    email: email
    socialIcons:
      social:
        profiles:
          url:
          name:
    displayPhoto:
      photo:
        sizes:
          src:
          sizes:
    templateMappings:
      displayname:
      headline:
      email:
      socialIcons:
      displayPhoto:

// v0.0.2
query:
  source: `contentfulBio` // string
  args: `` // fields + json
  body: `` // json
templateMappings:
  displayName:
  displayPhoto:
  headline:
  email:
  socialIcons:

// v0.0.3
query:
  source: `contentfulBio` // string
  args: `` // fields + json
  body: `` // json
mappings:
  displayName:
  displayPhoto:
  headline:
  email:
  socialIcons:
