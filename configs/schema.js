import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CarListing = pgTable("CarListing", {
  fullName: varchar("full_name").notNull(),
  id: serial("id").primaryKey(),
  listing_title: varchar("listing_title").notNull(),
  tagline: varchar("tagline"),
  selling_price: varchar("selling_price").notNull(),
  category: varchar("category").notNull(),
  condition: varchar("condition").notNull(),
  model: varchar("model"),
  make:varchar("make").notNull(),
  fuel_type: varchar("fuel_type").notNull(),
  mileage: varchar("mileage").notNull(),
  color: varchar("color").notNull(),
  listing_description: varchar("listing_description").notNull(),
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

export const MobilesListing = pgTable("MobilesListing", {
  id: serial("id").primaryKey(),
  brand: varchar("brand").notNull(),
  model: varchar("model").notNull(),
  price: varchar("price").notNull(),
  condition: varchar("condition").notNull(),
  description: varchar("description").notNull(),
  features: json("features"),
  postedOn: varchar("postedOn"),
  fullName: varchar("full_name").notNull(),
  createdBy: varchar("createdBy").notNull(),
  username: varchar("userName").notNull(),
  userImageUrl: varchar("userimageurl"),
});

export const MobilesImages = pgTable("mobilesImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  mobilelistingId: integer("mobilelistingId")
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
  fullName: varchar("full_name").notNull(),
  createdBy: varchar("createdBy").notNull(),
  username: varchar("userName").notNull(),
  userImageUrl: varchar("userimageurl"),
});

export const JobsImages = pgTable("JobsImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  jobslistingId: integer("jobslistingId")
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
  fullName: varchar("full_name").notNull(),
  createdBy: varchar("createdBy").notNull(),
  username: varchar("userName").notNull(),
  userImageUrl: varchar("userimageurl"),
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
  fullName: varchar("full_name").notNull(),
  createdBy: varchar("createdBy").notNull(),
  username: varchar("userName").notNull(),
  userImageUrl: varchar("userimageurl"),
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
  fullName: varchar("full_name").notNull(),
  createdBy: varchar("createdBy").notNull(),
  username: varchar("userName").notNull(),
  userImageUrl: varchar("userimageurl"),
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
  fullName: varchar("full_name").notNull(),
  createdBy: varchar("createdBy").notNull(),
  username: varchar("userName").notNull(),
  userImageUrl: varchar("userimageurl"),
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
  fullName: varchar("full_name").notNull(),
  createdBy: varchar("createdBy").notNull(),
  username: varchar("userName").notNull(),
  userImageUrl: varchar("userimageurl"),
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
  fullName: varchar("full_name").notNull(),
  createdBy: varchar("createdBy").notNull(),
  username: varchar("userName").notNull(),
  userImageUrl: varchar("userimageurl"),
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
  fullName: varchar("full_name").notNull(),
  createdBy: varchar("createdBy").notNull(),
  username: varchar("userName").notNull(),
  userImageUrl: varchar("userimageurl"),
});

export const PetsImages = pgTable("PetsImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  PetsListingId: integer("carlistingId")
    .notNull()
    .references(() => PetsListing.id),
});
