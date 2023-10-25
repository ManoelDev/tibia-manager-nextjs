/*
  Warnings:

  - Added the required column `id` to the `store_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store_history` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `wp_products` ADD COLUMN `quantity` INTEGER NULL;
