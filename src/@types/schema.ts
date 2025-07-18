import { z } from 'zod';

// Base schemas
export const adminSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  createdAt: z.date(),
});

export const villageSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
});

export const hostSchema = z.object({
  id: z.string(),
  userId: z.string(),
  villageId: z.string(),
  bio: z.string().optional(),
  languages: z.string().optional(),
  rating: z.any(),
  createdAt: z.date(),
});

export const roomSchema = z.object({
  id: z.string(),
  hostId: z.string(),
  villageId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.any(),
  available: z.boolean(),
  createdAt: z.date(),
});

export const vendorSchema = z.object({
  id: z.string(),
  userId: z.string(),
  villageId: z.string(),
  name: z.string(),
  contact: z.string().optional(),
  rating: z.any(),
  createdAt: z.date(),
});

export const productSchema = z.object({
  id: z.string(),
  vendorId: z.string(),
  villageId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.any(), 
  rating: z.any(),
  createdAt: z.date(),
});

export const reviewSchema = z.object({
  id: z.string(),
  userId: z.string(),
  productId: z.string().optional(),
  hostId: z.string().optional(),
  villageId: z.string().optional(),
  roomId: z.string().optional(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  createdAt: z.date(),
});

export const imageSchema = z.object({
  id: z.string(),
  productId: z.string().optional(),
  villageId: z.string().optional(),
  roomId: z.string().optional(),
  hostId: z.string().optional(),
  reviewId: z.string().optional(),
  url: z.string().url(),
  createdAt: z.date(),
});

export const bookingSchema = z.object({
  id: z.string(),
  userId: z.string(),
  roomId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  totalPrice: z.any(), // Prisma Decimal type
  status: z.string(),
  createdAt: z.date(),
});

// Create schemas
export const createAdminSchema = adminSchema.omit({ id: true });
export const createUserSchema = userSchema.omit({ id: true, createdAt: true });
export const createVillageSchema = villageSchema.omit({ id: true, createdAt: true });
export const createHostSchema = hostSchema.omit({ id: true, createdAt: true });
export const createRoomSchema = roomSchema.omit({ id: true, createdAt: true });
export const createVendorSchema = vendorSchema.omit({ id: true, createdAt: true });
export const createProductSchema = productSchema.omit({ id: true, createdAt: true });
export const createReviewSchema = reviewSchema.omit({ id: true, createdAt: true });
export const createImageSchema = imageSchema.omit({ id: true, createdAt: true });
export const createBookingSchema = bookingSchema.omit({ id: true, createdAt: true });

// Update schemas
export const updateAdminSchema = createAdminSchema.partial();
export const updateUserSchema = createUserSchema.partial();
export const updateVillageSchema = createVillageSchema.partial();
export const updateHostSchema = createHostSchema.partial();
export const updateRoomSchema = createRoomSchema.partial();
export const updateVendorSchema = createVendorSchema.partial();
export const updateProductSchema = createProductSchema.partial();
export const updateReviewSchema = createReviewSchema.partial();
export const updateImageSchema = createImageSchema.partial();
export const updateBookingSchema = createBookingSchema.partial();

// Relation schemas
export const userWithRelationsSchema = userSchema.extend({
  bookings: z.array(bookingSchema).optional(),
  hosts: z.array(hostSchema).optional(),
  vendors: z.array(vendorSchema).optional(),
  reviews: z.array(reviewSchema).optional(),
});

export const villageWithRelationsSchema = villageSchema.extend({
  rooms: z.array(roomSchema).optional(),
  hosts: z.array(hostSchema).optional(),
  vendors: z.array(vendorSchema).optional(),
  products: z.array(productSchema).optional(),
  images: z.array(imageSchema).optional(),
  reviews: z.array(reviewSchema).optional(),
});

export const hostWithRelationsSchema = hostSchema.extend({
  user: userSchema.optional(),
  village: villageSchema.optional(),
  rooms: z.array(roomSchema).optional(),
  reviews: z.array(reviewSchema).optional(),
  images: z.array(imageSchema).optional(),
});

export const roomWithRelationsSchema = roomSchema.extend({
  village: villageSchema.optional(),
  host: hostSchema.optional(),
  bookings: z.array(bookingSchema).optional(),
  images: z.array(imageSchema).optional(),
  reviews: z.array(reviewSchema).optional(),
});

export const vendorWithRelationsSchema = vendorSchema.extend({
  user: userSchema.optional(),
  village: villageSchema.optional(),
  products: z.array(productSchema).optional(),
});

export const productWithRelationsSchema = productSchema.extend({
  vendor: vendorSchema.optional(),
  village: villageSchema.optional(),
  images: z.array(imageSchema).optional(),
  reviews: z.array(reviewSchema).optional(),
});

export const reviewWithRelationsSchema = reviewSchema.extend({
  user: userSchema.optional(),
  product: productSchema.optional(),
  host: hostSchema.optional(),
  village: villageSchema.optional(),
  room: roomSchema.optional(),
  images: z.array(imageSchema).optional(),
});

export const imageWithRelationsSchema = imageSchema.extend({
  product: productSchema.optional(),
  village: villageSchema.optional(),
  room: roomSchema.optional(),
  review: reviewSchema.optional(),
  host: hostSchema.optional(),
});

export const bookingWithRelationsSchema = bookingSchema.extend({
  user: userSchema.optional(),
  room: roomSchema.optional(),
});

// Export types
export type Admin = z.infer<typeof adminSchema>;
export type User = z.infer<typeof userSchema>;
export type Village = z.infer<typeof villageSchema>;
export type Host = z.infer<typeof hostSchema>;
export type Room = z.infer<typeof roomSchema>;
export type Vendor = z.infer<typeof vendorSchema>;
export type Product = z.infer<typeof productSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type Image = z.infer<typeof imageSchema>;
export type Booking = z.infer<typeof bookingSchema>;

export type CreateAdmin = z.infer<typeof createAdminSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type CreateVillage = z.infer<typeof createVillageSchema>;
export type CreateHost = z.infer<typeof createHostSchema>;
export type CreateRoom = z.infer<typeof createRoomSchema>;
export type CreateVendor = z.infer<typeof createVendorSchema>;
export type CreateProduct = z.infer<typeof createProductSchema>;
export type CreateReview = z.infer<typeof createReviewSchema>;
export type CreateImage = z.infer<typeof createImageSchema>;
export type CreateBooking = z.infer<typeof createBookingSchema>;

export type UpdateAdmin = z.infer<typeof updateAdminSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UpdateVillage = z.infer<typeof updateVillageSchema>;
export type UpdateHost = z.infer<typeof updateHostSchema>;
export type UpdateRoom = z.infer<typeof updateRoomSchema>;
export type UpdateVendor = z.infer<typeof updateVendorSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
export type UpdateReview = z.infer<typeof updateReviewSchema>;
export type UpdateImage = z.infer<typeof updateImageSchema>;
export type UpdateBooking = z.infer<typeof updateBookingSchema>;

// Add missing type aliases for controllers
export type AdminCreate = CreateAdmin;
export type AdminUpdate = UpdateAdmin;
export type UserCreate = CreateUser;
export type UserUpdate = UpdateUser;
export type VillageCreate = CreateVillage;
export type VillageUpdate = UpdateVillage;
export type HostCreate = CreateHost;
export type HostUpdate = UpdateHost;
export type RoomCreate = CreateRoom;
export type RoomUpdate = UpdateRoom;
export type VendorCreate = CreateVendor;
export type VendorUpdate = UpdateVendor;
export type ProductCreate = CreateProduct;
export type ProductUpdate = UpdateProduct;
export type ReviewCreate = CreateReview;
export type ReviewUpdate = UpdateReview;
export type ImageCreate = CreateImage;
export type ImageUpdate = UpdateImage;
export type BookingCreate = CreateBooking;
export type BookingUpdate = UpdateBooking;

export type UserWithRelations = z.infer<typeof userWithRelationsSchema>;
export type VillageWithRelations = z.infer<typeof villageWithRelationsSchema>;
export type HostWithRelations = z.infer<typeof hostWithRelationsSchema>;
export type RoomWithRelations = z.infer<typeof roomWithRelationsSchema>;
export type VendorWithRelations = z.infer<typeof vendorWithRelationsSchema>;
export type ProductWithRelations = z.infer<typeof productWithRelationsSchema>;
export type ReviewWithRelations = z.infer<typeof reviewWithRelationsSchema>;
export type ImageWithRelations = z.infer<typeof imageWithRelationsSchema>;
export type BookingWithRelations = z.infer<typeof bookingWithRelationsSchema>;

