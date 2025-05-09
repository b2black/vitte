import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users.schema'

export const posts = pgTable(
  'posts',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    slug: text('slug').unique().notNull(),
    image: text('image'),
    description: text('description'),
    created_at: timestamp('created_at').defaultNow(),
    user_id: integer('user_id').notNull().references(() => users.id),
  },
)

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  post_id: integer('post_id').notNull().references(() => posts.id),
  user_id: integer('user_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
})

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, { fields: [comments.post_id], references: [posts.id] }),
  user: one(users, { fields: [comments.user_id], references: [users.id] }),
}))

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.user_id],
    references: [users.id],
  }),
  comments: many(comments),
}))
