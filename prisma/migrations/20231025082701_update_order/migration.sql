/*
  Warnings:

  - Made the column `orderID` on table `wp_products_orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `wp_products_orders` MODIFY `orderID` VARCHAR(191) NOT NULL,
    MODIFY `payerID` VARCHAR(191) NULL;
