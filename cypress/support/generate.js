import { build, fake } from '@jackfranklin/test-data-bot'

const userBuilder = build('User', {
  fields: {
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password())
  }
})

const bookmarkBuilder = build('Bookmark', {
  fields: {
    title: fake((f) => f.internet.domainName()),
    url: fake((f) => f.internet.url()),
    description: fake((f) => f.lorem.words())
  }
})

export {
  userBuilder,
  bookmarkBuilder
}