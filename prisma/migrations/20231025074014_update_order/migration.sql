/*
  Warnings:

  - You are about to drop the column `categories_id` on the `wp_products` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `wp_products_orders` table. All the data in the column will be lost.
  - Added the required column `description` to the `wp_products_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderID` to the `wp_products_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payerID` to the `wp_products_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentID` to the `wp_products_orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `wp_products` DROP FOREIGN KEY `wp_products_categories_id_fkey`;

-- AlterTable
ALTER TABLE `wp_products` DROP COLUMN `categories_id`,
    MODIFY `price` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `wp_products_orders` DROP COLUMN `token`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `orderID` VARCHAR(191) NOT NULL,
    ADD COLUMN `payerID` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentID` VARCHAR(191) NOT NULL,
    MODIFY `total_amount` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `wp_products` ADD CONSTRAINT `wp_products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `wp_products_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
