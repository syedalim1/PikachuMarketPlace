import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CarListing = pgTable("CarListing", {
  fullName:varchar('full_name').notNull(),
  id: serial("id").primaryKey(),
  listing_title: varchar("listing_title").notNull(),
  tagline: varchar("tagline"),
  original_price: varchar("original_price"),
  selling_price: varchar("selling_price").notNull(),
  category: varchar("category").notNull(),
  condition: varchar("condition").notNull(),
  make: varchar("make").notNull(),
  model: varchar("model"),
  year: varchar("year"),
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
