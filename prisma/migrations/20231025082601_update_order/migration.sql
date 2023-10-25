/*
  Warnings:

  - Made the column `payerID` on table `wp_products_orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `wp_products_orders` MODIFY `payerID` VARCHAR(191) NOT NULL;
