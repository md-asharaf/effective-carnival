import { any, z } from "zod";

// Enums

export const AdminCreateSchema = z.object({
    email: z.string().email("Invalid email format"),
});

export const AdminSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Base schemas for creating/updating records
export const UserCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["visitor", "room_owner", "guide", "vendor_owner"]).default("visitor"),
});
export const UserUpdateSchema = UserCreateSchema.partial();

export const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string().nullable().optional(),
    password: z.string(),
    role: z.enum(["visitor", "room_owner", "guide", "vendor_owner"]),
    createdAt: z.date(),
});

export const VillageCreateSchema = z.object({
    name: z.string().min(1, "Village name is required"),
    location: z.string().optional(),
    description: z.string().optional(),
});
export const VillageUpdateSchema = VillageCreateSchema.partial();
export const VillageSchema = z.object({
    id: z.string(),
    name: z.string(),
    location: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    createdAt: z.date(),
});
export const VillageWithRelationsSchema = VillageSchema.extend({
    rooms: z.array(z.lazy(() => RoomSchema)).optional(),
    guides: z.array(z.lazy(() => GuideSchema)).optional(),
    vendors: z.array(z.lazy(() => VendorSchema)).optional(),
    products: z.array(z.lazy(() => ProductSchema)).optional(),
    villageImages: z.array(z.lazy(() => VillageImageSchema)).optional(),
});

// Room
export const RoomCreateSchema = z.object({
    villageId: z.string(),
    name: z.string().min(1, "Room name is required"),
    description: z.string().optional(),
    price: z.number(),
    available: z.boolean().optional(),
});
export const RoomUpdateSchema = RoomCreateSchema.partial();
export const RoomSchema = z.object({
    id: z.string(),
    villageId: z.string(),
    name: z.string(),
    description: z.string().nullable().optional(),
    price: z.number(),
    available: z.boolean(),
    createdAt: z.date(),
});
export const RoomWithRelationsSchema = RoomSchema.extend({
    village: z.lazy(() => VillageSchema).optional(),
    bookings: z.array(z.lazy(() => BookingSchema)).optional(),
});

// Booking
export const BookingCreateSchema = z.object({
    userId: z.string(),
    roomId: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    totalPrice: z.number(),
    status: z.string().optional(),
});
export const BookingUpdateSchema = BookingCreateSchema.partial();
export const BookingSchema = z.object({
    id: z.string(),
    userId: z.string(),
    roomId: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    totalPrice: z.number(),
    status: z.string(),
    createdAt: z.date(),
});
export const BookingWithRelationsSchema = BookingSchema.extend({
    user: z.lazy(() => UserSchema).optional(),
    room: z.lazy(() => RoomSchema).optional(),
});

// Guide
export const GuideCreateSchema = z.object({
    userId: z.string(),
    villageId: z.string(),
    bio: z.string().optional(),
    languages: z.string().optional(),
    rating: z.number().optional(),
});
export const GuideUpdateSchema = GuideCreateSchema.partial();
export const GuideSchema = z.object({
    id: z.string(),
    userId: z.string(),
    villageId: z.string(),
    bio: z.string().nullable().optional(),
    languages: z.string().nullable().optional(),
    rating: z.number(),
    createdAt: z.date(),
});
export const GuideWithRelationsSchema = GuideSchema.extend({
    user: z.lazy(() => UserSchema).optional(),
    village: z.lazy(() => VillageSchema).optional(),
    guideBookings: z.array(z.lazy(() => GuideBookingSchema)).optional(),
});

// GuideBooking
export const GuideBookingCreateSchema = z.object({
    userId: z.string(),
    guideId: z.string(),
    villageId: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    status: z.string().optional(),
});
export const GuideBookingUpdateSchema = GuideBookingCreateSchema.partial();
export const GuideBookingSchema = z.object({
    id: z.string(),
    userId: z.string(),
    guideId: z.string(),
    villageId: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    status: z.string(),
    createdAt: z.date(),
});
export const GuideBookingWithRelationsSchema = GuideBookingSchema.extend({
    user: z.lazy(() => UserSchema).optional(),
    guide: z.lazy(() => GuideSchema).optional(),
    village: z.lazy(() => VillageSchema).optional(),
});

// Vendor
export const VendorCreateSchema = z.object({
    userId: z.string(),
    villageId: z.string(),
    name: z.string().min(1, "Vendor name is required"),
    contact: z.string().optional(),
    rating: z.number().optional(),
});
export const VendorUpdateSchema = VendorCreateSchema.partial();
export const VendorSchema = z.object({
    id: z.string(),
    userId: z.string(),
    villageId: z.string(),
    name: z.string(),
    contact: z.string().nullable().optional(),
    rating: z.number(),
    createdAt: z.date(),
});
export const VendorWithRelationsSchema = VendorSchema.extend({
    user: z.lazy(() => UserSchema).optional(),
    village: z.lazy(() => VillageSchema).optional(),
    products: z.array(z.lazy(() => ProductSchema)).optional(),
});

// Product
export const ProductCreateSchema = z.object({
    vendorId: z.string(),
    villageId: z.string(),
    name: z.string().min(1, "Product name is required"),
    description: z.string().optional(),
    price: z.number(),
    rating: z.number().optional(),
});
export const ProductUpdateSchema = ProductCreateSchema.partial();
export const ProductSchema = z.object({
    id: z.string(),
    vendorId: z.string(),
    villageId: z.string(),
    name: z.string(),
    description: z.string().nullable().optional(),
    price: z.number(),
    rating: z.number(),
    createdAt: z.date(),
});
export const ProductWithRelationsSchema = ProductSchema.extend({
    vendor: z.lazy(() => VendorSchema).optional(),
    village: z.lazy(() => VillageSchema).optional(),
    productImages: z.array(z.lazy(() => ProductImageSchema)).optional(),
});

// ProductImage
export const ProductImageCreateSchema = z.object({
    productId: z.string(),
    url: z.string().url("Invalid URL format"),
});
export const ProductImageUpdateSchema = ProductImageCreateSchema.partial();
export const ProductImageSchema = z.object({
    id: z.string(),
    productId: z.string(),
    url: z.string(),
    createdAt: z.date(),
});
export const ProductImageWithRelationsSchema = ProductImageSchema.extend({
    product: z.lazy(() => ProductSchema).optional(),
});

// VillageImage
export const VillageImageCreateSchema = z.object({
    villageId: z.string(),
    url: z.string().url("Invalid URL format"),
});
export const VillageImageUpdateSchema = VillageImageCreateSchema.partial();
export const VillageImageSchema = z.object({
    id: z.string(),
    villageId: z.string(),
    url: z.string(),
    createdAt: z.date(),
});
export const VillageImageWithRelationsSchema = VillageImageSchema.extend({
    village: z.lazy(() => VillageSchema).optional(),
});

// Review
export const ReviewCreateSchema = z.object({
    userId: z.string(),
    targetType: z.enum(["room", "guide", "product"]),
    targetId: z.string(),
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
});
export const ReviewUpdateSchema = ReviewCreateSchema.partial();
export const ReviewSchema = z.object({
    id: z.string(),
    userId: z.string(),
    targetType: z.enum(["room", "guide", "product"]),
    targetId: z.string(),
    rating: z.number(),
    comment: z.string().nullable().optional(),
    createdAt: z.date(),
});
export const ReviewWithRelationsSchema = ReviewSchema.extend({
    user: z.lazy(() => UserSchema).optional(),
});

// Type exports
export type AdminCreate = z.infer<typeof AdminCreateSchema>;
export type Admin = z.infer<typeof AdminSchema>;

export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type User = z.infer<typeof UserSchema>;

export type VillageCreate = z.infer<typeof VillageCreateSchema>;
export type VillageUpdate = z.infer<typeof VillageUpdateSchema>;
export type Village = z.infer<typeof VillageSchema>;
export type VillageWithRelations = z.infer<typeof VillageWithRelationsSchema>;

export type RoomCreate = z.infer<typeof RoomCreateSchema>;
export type RoomUpdate = z.infer<typeof RoomUpdateSchema>;
export type Room = z.infer<typeof RoomSchema>;
export type RoomWithRelations = z.infer<typeof RoomWithRelationsSchema>;

export type BookingCreate = z.infer<typeof BookingCreateSchema>;
export type BookingUpdate = z.infer<typeof BookingUpdateSchema>;
export type Booking = z.infer<typeof BookingSchema>;
export type BookingWithRelations = z.infer<typeof BookingWithRelationsSchema>;

export type GuideCreate = z.infer<typeof GuideCreateSchema>;
export type GuideUpdate = z.infer<typeof GuideUpdateSchema>;
export type Guide = z.infer<typeof GuideSchema>;
export type GuideWithRelations = z.infer<typeof GuideWithRelationsSchema>;

export type GuideBookingCreate = z.infer<typeof GuideBookingCreateSchema>;
export type GuideBookingUpdate = z.infer<typeof GuideBookingUpdateSchema>;
export type GuideBooking = z.infer<typeof GuideBookingSchema>;
export type GuideBookingWithRelations = z.infer<typeof GuideBookingWithRelationsSchema>;

export type VendorCreate = z.infer<typeof VendorCreateSchema>;
export type VendorUpdate = z.infer<typeof VendorUpdateSchema>;
export type Vendor = z.infer<typeof VendorSchema>;
export type VendorWithRelations = z.infer<typeof VendorWithRelationsSchema>;

export type ProductCreate = z.infer<typeof ProductCreateSchema>;
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductWithRelations = z.infer<typeof ProductWithRelationsSchema>;

export type ProductImageCreate = z.infer<typeof ProductImageCreateSchema>;
export type ProductImageUpdate = z.infer<typeof ProductImageUpdateSchema>;
export type ProductImage = z.infer<typeof ProductImageSchema>;
export type ProductImageWithRelations = z.infer<typeof ProductImageWithRelationsSchema>;

export type VillageImageCreate = z.infer<typeof VillageImageCreateSchema>;
export type VillageImageUpdate = z.infer<typeof VillageImageUpdateSchema>;
export type VillageImage = z.infer<typeof VillageImageSchema>;
export type VillageImageWithRelations = z.infer<typeof VillageImageWithRelationsSchema>;

export type ReviewCreate = z.infer<typeof ReviewCreateSchema>;
export type ReviewUpdate = z.infer<typeof ReviewUpdateSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type ReviewWithRelations = z.infer<typeof ReviewWithRelationsSchema>;

