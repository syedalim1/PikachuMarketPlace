import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CarListing = pgTable("CarListing", {
  fullName: varchar("full_name").notNull(),
  id: serial("id").primaryKey(),
  listing_title: varchar("listing_title").notNull(),
  tagline: varchar("tagline"),
  original_price: varchar("original_price"),
  selling_price: varchar("selling_price").notNull(),
  category: varchar("category").notNull(),
  condition: varchar("condition").notNull(),
  make: varchar("make").notNull(),
  model: varchar("model"),
  drive_type: varchar("drive_type").notNull(),
  transmission: varchar("transmission").notNull(),
  fuel_type: varchar("fuel_type").notNull(),
  mileage: varchar("mileage").notNull(),
  engine_size: varchar("engine_size"),
  cylinder: varchar("cylinder"),
  color: varchar("color").notNull(),
  door: varchar("door").notNull(),
  offer_type: varchar("offer_type"),
  vin: varchar("vin"),
  listing_description: varchar("listing_description").notNull(),
  features: json("features"),
  createdBy: varchar("createdBy").notNull(),
  username: varchar("userName").notNull(),
  userImageUrl: varchar("userimageurl"),
  postedOn: varchar("postedOn"),
});

export const CarImages = pgTable("carImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  carlistingId: integer("carlistingId")
    .notNull()
    .references(() => CarListing.id),
});

export const MobilesListing = pgTable("Mobiles", {
  id: serial("id").primaryKey(),
  brand: varchar("brand").notNull(),
  model: varchar("model").notNull(),
  price: varchar("price").notNull(),
  condition: varchar("condition").notNull(),
  description: varchar("description").notNull(),
  features: json("features"),
  postedOn: varchar("postedOn"),
});

export const MobilesImages = pgTable("MobileImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  mobilelistingId: integer("carlistingId")
    .notNull()
    .references(() => MobilesListing.id),
});

export const JobsListing = pgTable("Jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  company: varchar("company").notNull(),
  location: varchar("location").notNull(),
  salary: varchar("salary"),
  job_type: varchar("job_type").notNull(),
  description: varchar("description").notNull(),
  requirements: json("requirements"),
  postedOn: varchar("postedOn"),
});

export const JobsImages = pgTable("JobsImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  jobslistingId: integer("carlistingId")
    .notNull()
    .references(() => JobsListing.id),
});

export const BikesListing = pgTable("Bikes", {
  id: serial("id").primaryKey(),
  brand: varchar("brand").notNull(),
  model: varchar("model").notNull(),
  price: varchar("price").notNull(),
  condition: varchar("condition").notNull(),
  description: varchar("description").notNull(),
  features: json("features"),
  postedOn: varchar("postedOn"),
});

export const BikesImages = pgTable("BikesImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  bikeslistingId: integer("carlistingId")
    .notNull()
    .references(() => BikesListing.id),
});

export const ElectronicsListing = pgTable("Electronics", {
  id: serial("id").primaryKey(),
  category: varchar("category").notNull(),
  brand: varchar("brand"),
  model: varchar("model"),
  price: varchar("price").notNull(),
  condition: varchar("condition").notNull(),
  description: varchar("description").notNull(),
  features: json("features"),
  postedOn: varchar("postedOn"),
});

export const ElectronicsImages = pgTable("ElectronicsImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  ElectronicslistingId: integer("carlistingId")
    .notNull()
    .references(() => ElectronicsListing.id),
});

export const CommercialListing = pgTable("Commercial", {
  id: serial("id").primaryKey(),
  type: varchar("type").notNull(),
  location: varchar("location").notNull(),
  price: varchar("price").notNull(),
  size: varchar("size"),
  description: varchar("description").notNull(),
  features: json("features"),
  postedOn: varchar("postedOn"),
});

export const CommercialImages = pgTable("CommercialImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  CommercialImageslistingId: integer("carlistingId")
    .notNull()
    .references(() => CommercialListing.id),
});

export const FurnitureListing = pgTable("Furniture", {
  id: serial("id").primaryKey(),
  category: varchar("category").notNull(),
  material: varchar("material"),
  price: varchar("price").notNull(),
  condition: varchar("condition").notNull(),
  description: varchar("description").notNull(),
  features: json("features"),
  postedOn: varchar("postedOn"),
});

export const FurnitureImages = pgTable("FurnitureImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  FurnitureListingId: integer("carlistingId")
    .notNull()
    .references(() => FurnitureListing.id),
});

export const FashionListing = pgTable("Fashion", {
  id: serial("id").primaryKey(),
  category: varchar("category").notNull(),
  brand: varchar("brand"),
  size: varchar("size"),
  price: varchar("price").notNull(),
  condition: varchar("condition").notNull(),
  description: varchar("description").notNull(),
  features: json("features"),
  postedOn: varchar("postedOn"),
});

export const FashionImages = pgTable("FashionImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  FashionListingId: integer("carlistingId")
    .notNull()
    .references(() => FashionListing.id),
});

export const SportsListing = pgTable("Sports", {
  id: serial("id").primaryKey(),
  category: varchar("category").notNull(),
  brand: varchar("brand"),
  price: varchar("price").notNull(),
  condition: varchar("condition").notNull(),
  description: varchar("description").notNull(),
  features: json("features"),
  postedOn: varchar("postedOn"),
});

export const SportsImages = pgTable("SportsImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  SportsListingId: integer("carlistingId")
    .notNull()
    .references(() => SportsListing.id),
});

export const PetsListing = pgTable("Pets", {
  id: serial("id").primaryKey(),
  type: varchar("type").notNull(),
  breed: varchar("breed"),
  age: varchar("age"),
  price: varchar("price"),
  description: varchar("description").notNull(),
  features: json("features"),
  postedOn: varchar("postedOn"),
});

export const PetsImages = pgTable("PetsImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  PetsListingId: integer("carlistingId")
    .notNull()
    .references(() => PetsListing.id),
});
