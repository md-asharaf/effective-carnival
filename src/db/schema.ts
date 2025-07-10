import { pgTable, text, timestamp, boolean, integer, decimal, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// User
export const userRoleEnum = pgEnum('user_role', [
  'visitor',
  'room_owner',
  'guide',
  'vendor_owner',
]);

export const admins = pgTable('admins', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text('email').unique().notNull(),
})


export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  phone: text('phone').unique(),
  password: text('password').notNull(),
  role: userRoleEnum('role').default('visitor').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Village
export const villages = pgTable('villages', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  location: text('location'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Room
export const rooms = pgTable('rooms', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  villageId: text('village_id').notNull().references(() => villages.id),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price').notNull(),
  available: boolean('available').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Booking
export const bookings = pgTable('bookings', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id),
  roomId: text('room_id').notNull().references(() => rooms.id),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  totalPrice: decimal('total_price').notNull(),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Review (for rooms, guides, products)
export const reviews = pgTable('reviews', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id),
  targetType: text('target_type').notNull(), // 'room' | 'guide' | 'product'
  targetId: text('target_id').notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Guide
export const guides = pgTable('guides', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id),
  villageId: text('village_id').notNull().references(() => villages.id),
  bio: text('bio'),
  languages: text('languages'), // comma-separated or use a join table for normalization
  rating: decimal('rating').default('0'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// GuideBooking
export const guideBookings = pgTable('guide_bookings', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id),
  guideId: text('guide_id').notNull().references(() => guides.id),
  villageId: text('village_id').notNull().references(() => villages.id),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Vendor
export const vendors = pgTable('vendors', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id),
  villageId: text('village_id').notNull().references(() => villages.id),
  name: text('name').notNull(),
  contact: text('contact'),
  rating: decimal('rating').default('0'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Product
export const products = pgTable('products', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  vendorId: text('vendor_id').notNull().references(() => vendors.id),
  villageId: text('village_id').notNull().references(() => villages.id),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price').notNull(),
  rating: decimal('rating').default('0'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ProductImage
export const productImages = pgTable('product_images', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  productId: text('product_id').notNull().references(() => products.id),
  url: text('url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// VillageImage
export const villageImages = pgTable('village_images', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  villageId: text('village_id').notNull().references(() => villages.id),
  url: text('url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// --- Relations ---
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
  guideBookings: many(guideBookings),
  guides: many(guides),
  vendors: many(vendors),
  reviews: many(reviews),
}));

export const villagesRelations = relations(villages, ({ many }) => ({
  rooms: many(rooms),
  guides: many(guides),
  vendors: many(vendors),
  products: many(products),
  villageImages: many(villageImages),
}));

export const roomsRelations = relations(rooms, ({ one, many }) => ({
  village: one(villages, {
    fields: [rooms.villageId],
    references: [villages.id],
  }),
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  room: one(rooms, {
    fields: [bookings.roomId],
    references: [rooms.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

export const guidesRelations = relations(guides, ({ one, many }) => ({
  user: one(users, {
    fields: [guides.userId],
    references: [users.id],
  }),
  village: one(villages, {
    fields: [guides.villageId],
    references: [villages.id],
  }),
  guideBookings: many(guideBookings),
}));

export const guideBookingsRelations = relations(guideBookings, ({ one }) => ({
  user: one(users, {
    fields: [guideBookings.userId],
    references: [users.id],
  }),
  guide: one(guides, {
    fields: [guideBookings.guideId],
    references: [guides.id],
  }),
  village: one(villages, {
    fields: [guideBookings.villageId],
    references: [villages.id],
  }),
}));

export const vendorsRelations = relations(vendors, ({ one, many }) => ({
  user: one(users, {
    fields: [vendors.userId],
    references: [users.id],
  }),
  village: one(villages, {
    fields: [vendors.villageId],
    references: [villages.id],
  }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  vendor: one(vendors, {
    fields: [products.vendorId],
    references: [vendors.id],
  }),
  village: one(villages, {
    fields: [products.villageId],
    references: [villages.id],
  }),
  productImages: many(productImages),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const villageImagesRelations = relations(villageImages, ({ one }) => ({
  village: one(villages, {
    fields: [villageImages.villageId],
    references: [villages.id],
  }),
}));

